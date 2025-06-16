// Enums

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum AdminRole {
  DOCTOR = "DOCTOR",
  PHARMACIST = "PHARMACIST",
  CASHIER = "CASHIER",
}

export enum TypeHistory {
  TRANSACTION = "TRANSACTION",
  ADJUSTMENT = "ADJUSTMENT",
  RETURN = "RETURN",
}

export enum Golongan {
  OBAT_TERBATAS = "OBAT_TERBATAS",
  OBAT_KERAS = "OBAT_KERAS",
  OBAT_BEBAS = "OBAT_BEBAS",
}

export enum Acquisition {
  GENERIK = "GENERIK",
  NON_GENERIK = "NON_GENERIK",
  HERBAL = "HERBAL",
}

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

export enum OrderType {
  GENERAL = "GENERAL",
  PRESCRIPTION = "PRESCRIPTION",
}

// Interfaces

export interface Account {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  profilePict?: string | null;
  isVerified: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  User?: User | null;
  Admin?: Admin | null;
  SuperAdmin?: SuperAdmin | null;
}

export interface User {
  id: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  account: Account;
  user_addresses: UserAddresses[];
  Forum: Forum[];
  Order?: Order | null;
  Cart: Cart[];
}

export interface Banner {
  id: string;
  alt: string;
  source: string;
  linkTo: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAddresses {
  id: string;
  fullAddress: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
}

export interface Admin {
  id: string;
  createdAt: Date;
  updateAt: Date;
  deleteAt?: Date | null;
  adminRole: AdminRole;
  validToAnswerForum: boolean;
  accountId: string;
  account: Account;
  pharmacyId?: string | null;
  pharmacy?: Pharmacy | null;
  ForumComment: ForumComment[];
}

export interface SuperAdmin {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  accountId: string;
  account: Account;
}

export interface Pharmacy {
  id: string;
  name: string;
  description: string;
  slug: string;
  picture: string;
  isOpen: boolean;
  createdAt: Date;
  detailLocation: string;
  lat: string;
  lng: string;
  updatedAt: Date;
  deletedAt?: Date | null;
  isMain: boolean;
  Admin: Admin[];
  Order: Order[];
  Stock: Stock[];
}

export interface Stock {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  productId: string;
  product: Product;
  pharmacyId: string;
  pharmacy: Pharmacy;
  StockHistory: StockHistory[];
  Cart: Cart[];
  OrderStock: OrderStock[];
}

export interface StockHistory {
  id: string;
  quantityBefore: number;
  quantityAfter: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  stockId: string;
  stock: Stock;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  published: boolean;
  nameMIMS: string;
  golongan: Golongan;
  acquisition: Acquisition;
  nomorEdar: string;
  needsPrescription: boolean;
  brand: string;
  description: string;
  composition: string;
  dose: string;
  sideEffects: string;
  indication: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  ProductImage: ProductImage[];
  UnitProduct: UnitProduct[];
  ProductCategory?: ProductCategory[];
  Stock: Stock[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
  ProductCategory?: ProductCategory[];
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  isThumbnail: boolean;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  product: Product;
}

export interface UnitProduct {
  id: string;
  name: string;
  isMain: boolean;
  weight: number;
  price: number;
  ratioToMain: number;
  createdAt: Date;
  updatedAt: Date;
  Product: Product;
  productId: string;
  Cart: Cart[];
}

export interface ProductCategory {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  product?: Product;
  categoryId: string;
  category?: Category;
}

export interface Forum {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  userId: string;
  user: User;
  ForumComment: ForumComment[];
}

export interface ForumComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  forumId: string;
  forum: Forum;
  adminId: string;
  admin: Admin;
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
  orderType: OrderType;
  updateAt: Date;
  createAt: Date;
  deletedAt?: Date | null;
  userId: string;
  user: User;
  pharmacyId: string;
  pharmacy: Pharmacy;
  Prescription: Prescription[];
  OrderActivity: OrderActivity[];
  Delivery?: Delivery | null;
  OrderStock: OrderStock[];
}

export interface Prescription {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  source: string;
  orderId: string;
  order: Order;
}

export interface OrderStock {
  id: string;
  quantity_base_default: number;
  product_unit_name: string;
  quantity_unit: number;
  product_unit_weight: number;
  product_ratio: number;
  priceAtPurchase: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  order: Order;
  stockId: string;
  stock: Stock;
}

export interface OrderActivity {
  id: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  orderId: string;
  order: Order;
}

export interface Delivery {
  id: string;
  name: string;
  fullAddress: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  expedition: string;
  deliveryFee: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  orderId: string;
  order: Order;
}

export interface Cart {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  userId: string;
  user: User;
  stockId: string;
  stock: Stock;
  unitId: string;
  unit: UnitProduct;
}
