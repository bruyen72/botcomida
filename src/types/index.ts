export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  observations?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  deliveryAddress?: string;
  paymentMethod?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Customer {
  phoneNumber: string;
  name?: string;
  lastInteraction: Date;
  cart: CartItem[];
  currentOrder?: Order;
  conversationState: ConversationState;
}

export type ConversationState =
  | 'initial'
  | 'browsing_menu'
  | 'viewing_category'
  | 'adding_to_cart'
  | 'in_cart'
  | 'checkout_address'
  | 'checkout_payment'
  | 'order_confirmed'
  | 'tracking_order'
  | 'ended';

export interface BotConfig {
  inactivityTimeMinutes: number;
  enableAI: boolean;
  restaurantName: string;
  restaurantPhone: string;
}
