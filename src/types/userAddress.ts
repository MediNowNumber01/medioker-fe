// types.ts

export type UserAddress = {
  id: string;
  fullAddress: string;
  postalCode: string;
  label: string
  latitude: string;
  longitude: string;
  isPrimary: boolean;
  // deletedAt: Date | null;
  // createdAt: Date;
  // updatedAt: Date;
  userId?: string;
};

export const MOCK_USER_ADDRESSES: UserAddress[] = [
  { id: 'addr1', label: 'Rumah', fullAddress: 'Jl. Pahlawan No. 123, Sleman, Yogyakarta', postalCode: '55281', latitude: '-7.782', longitude: '110.369', isPrimary: true },
  { id: 'addr2', label: 'Kantor', fullAddress: 'Jl. Jenderal Sudirman No. 45, Gondokusuman, Yogyakarta', postalCode: '55224', latitude: '-7.782', longitude: '110.375', isPrimary: false },
];