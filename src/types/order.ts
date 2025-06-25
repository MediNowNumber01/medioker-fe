
export enum Status {
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  PAYMENT_CONFIRMATION = "PAYMENT_CONFIRMATION",
  RECIPT_CONFIRMATION = "RECIPT_CONFIRMATION",
  USER_CONFIRMATION = "USER_CONFIRMATION",
  PROCESSING_ORDER = "PROCESSING_ORDER",
  DELIVERY = "DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
  WAITING_FOR_PICKUP = "WAITING_FOR_PICKUP",
  WAITING_FOR_REFUND = "WAITING_FOR_REFUND",
}

export enum OrederType {
  GENERAL = "GENERAL",
  PRESCRIPTION = "PRESCRIPTION",
}

export interface Order {
  id: string;
  reciptUUID: string;
  paymentMethod?: string | null;
  paymentProof?: string | null;
  productPrice: string;
  deliveryPrice: number;
  totalPrice: number;
  pickupCode?: string | null;
  note?: string | null;
  status: Status;
  orderType: OrederType;
  updateAt: Date;
  createAt: Date;
  deletedAt?: Date | null;
  userId: string;

}