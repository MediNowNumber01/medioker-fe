"use client";

import { createContext, useContext } from "react";


interface LocationContextType {
  latitude: string | null;
  longitude: string | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => void; 
}


export const LocationContext = createContext<LocationContextType | undefined>(undefined);


export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};