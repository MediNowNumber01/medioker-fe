export type LatLngTuple = [number, number];

export interface LocationCoords {
  lat: number;
  lng: number;
}
export interface LocationType {
  lat: number;
  lng: number;
  address: string;
}

export interface AddressLocationType{
  latitude: number;
  longitude: number;
  fullAddress: string
}