"use client";

declare global {
  interface Window {
    L: any;
  }
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { FC, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/generateInitials";
import { LatLngTuple } from "leaflet";
import { LocationType } from "@/types/location";

interface LocationPickerProps {
  onLocationSelect: (location: LocationType) => void;
  initialPosition?: LatLngTuple;
  initialAddress?: string;
  className?: string;
}

interface GeocodingResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    municipality?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: [string, string, string, string];
}

// --- Internal Map Component (Client-Side Only) ---
// This component now loads Leaflet from a CDN to avoid build-time resolution issues.
function MapPickerComponent({
  position,
  onMapClick,
}: {
  position: LatLngTuple;
  onMapClick: (coords: { lat: number; lng: number }) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any | null>(null); // Using 'any' for Leaflet Map instance
  const markerInstanceRef = useRef<any | null>(null); // Using 'any' for Leaflet Marker instance
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Effect to load Leaflet script and CSS from a CDN
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if Leaflet is already loaded
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    // Load CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    cssLink.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    cssLink.crossOrigin = "";
    document.head.appendChild(cssLink);

    // Load JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // Clean up on unmount
      document.head.removeChild(cssLink);
      document.body.removeChild(script);
    };
  }, []);

  // Effect to initialize the map once Leaflet is loaded
  useEffect(() => {
    if (leafletLoaded && mapContainerRef.current && !mapInstanceRef.current) {
      const L = window.L;
      const map = L.map(mapContainerRef.current!).setView(position, 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const marker = L.marker(position).addTo(map);
      markerInstanceRef.current = marker;

      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        onMapClick({ lat, lng });
      });
    }
  }, [leafletLoaded, position, onMapClick]);

  // This effect runs whenever the external position prop changes
  useEffect(() => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      mapInstanceRef.current.flyTo(position, 13);
      markerInstanceRef.current.setLatLng(position);
    }
  }, [position]);

  if (!leafletLoaded) {
    return (
      <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
        <p>Loading Map Library...</p>
      </div>
    );
  }

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
  );
}

// --- Main Component ---
export const LocationPicker: FC<LocationPickerProps> = ({
  onLocationSelect,
  initialPosition = [-6.2000000, 106.816666], // Default to Jakarta, Indonesia
  initialAddress = "Jakarta, Indonesia",
  className,
}) => {
  const [position, setPosition] = useState<LatLngTuple>(initialPosition);
  const [address, setAddress] = useState<string>(initialAddress);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchTerm
        )}&format=json&limit=1`
      );
      const data: GeocodingResult[] = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition: LatLngTuple = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        setAddress(display_name);
        onLocationSelect({
          lat: newPosition[0],
          lng: newPosition[1],
          address: display_name,
        });
      } else {
        setError("Location not found. Please try a different search term.");
      }
    } catch (err) {
      setError("Failed to fetch location data. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapClick = async (coords: { lat: number; lng: number }) => {
    setSearchTerm(""); // Clear search term when clicking on the map
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
      );
      const data: GeocodingResult = await response.json();

      if (data && data.display_name) {
        const newPosition: LatLngTuple = [coords.lat, coords.lng];
        setPosition(newPosition);
        setAddress(data.display_name);
        onLocationSelect({
          lat: newPosition[0],
          lng: newPosition[1],
          address: data.display_name,
        });
      } else {
        setError("Could not find address for this location.");
      }
    } catch (err) {
      setError("Failed to fetch address data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn("w-full  mx-auto p-4", { className })}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location-search">
            Search by Address or Place Name
          </Label>
          <div className="flex space-x-2">
            <Input
              id="location-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., 'Monas, Jakarta' or a full address"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        <div className="p-3 bg-gray-50 rounded-md border text-sm">
          <p className="font-semibold">Selected Address:</p>
          <p className="text-muted-foreground">
            {address || "Click on the map or search to select a location."}
          </p>
        </div>

        <div className="h-[400px] w-full rounded-md overflow-hidden border">
          {isClient ? (
            <MapPickerComponent
              position={position}
              onMapClick={handleMapClick}
            />
          ) : (
            <Skeleton className="h-full w-full"></Skeleton>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LocationPicker;
