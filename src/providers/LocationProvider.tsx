"use client";

import { LocationContext } from "@/contexts/LocationContext";
import { useState, useCallback, ReactNode } from "react";
import { toast } from "sonner";

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      toast.warning("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
        toast.error("Could not get your location. Please grant permission.");
      }
    );
  }, []);

  const value = {
    latitude,
    longitude,
    isLoading,
    error,
    requestLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};