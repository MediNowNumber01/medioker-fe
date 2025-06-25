export type UserAddress = {
  id: string;
  fullAddress: string;
  postalCode: string;
  label: string
  latitude: string;
  longitude: string;
  isPrimary: boolean;
  userId?: string;
};
