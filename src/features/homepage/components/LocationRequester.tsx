"use client";

import { useLocation } from "@/contexts/LocationContext"; 
import { useEffect } from "react";

export function LocationRequester() {
  const { requestLocation, latitude } = useLocation();

  useEffect(() => {
    if (!latitude) {
      requestLocation();
    }
  }, [latitude, requestLocation]);

  return null;
}