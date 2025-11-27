import { Customer, CartItem, ConversationState } from '../types';

class CustomerManager {
  private customers: Map<string, Customer> = new Map();

  getCustomer(phoneNumber: string): Customer {
    if (!this.customers.has(phoneNumber)) {
      this.customers.set(phoneNumber, {
        phoneNumber,
        lastInteraction: new Date(),
        cart: [],
        conversationState: 'initial'
      });
    }

    const customer = this.customers.get(phoneNumber)!;
    customer.lastInteraction = new Date();
    return customer;
  }

  updateCustomerState(phoneNumber: string, state: ConversationState): void {
    const customer = this.getCustomer(phoneNumber);
    customer.conversationState = state;
  }

  addToCart(phoneNumber: string, item: CartItem): void {
    const customer = this.getCustomer(phoneNumber);
    const existingItem = customer.cart.find(
      cartItem => cartItem.item.id === item.item.id
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
      if (item.observations) {
        existingItem.observations = item.observations;
      }
    } else {
      customer.cart.push(item);
    }
  }

  removeFromCart(phoneNumber: string, itemId: string): boolean {
    const customer = this.getCustomer(phoneNumber);
    const initialLength = customer.cart.length;
    customer.cart = customer.cart.filter(item => item.item.id !== itemId);
    return customer.cart.length < initialLength;
  }

  clearCart(phoneNumber: string): void {
    const customer = this.getCustomer(phoneNumber);
    customer.cart = [];
  }

  getCart(phoneNumber: string): CartItem[] {
    return this.getCustomer(phoneNumber).cart;
  }

  getCartTotal(phoneNumber: string): number {
    const customer = this.getCustomer(phoneNumber);
    return customer.cart.reduce(
      (total, item) => total + (item.item.price * item.quantity),
      0
    );
  }

  setCustomerName(phoneNumber: string, name: string): void {
    const customer = this.getCustomer(phoneNumber);
    customer.name = name;
  }

  getInactiveCustomers(minutes: number): Customer[] {
    const now = new Date();
    const inactiveCustomers: Customer[] = [];

    this.customers.forEach(customer => {
      const diffMinutes = (now.getTime() - customer.lastInteraction.getTime()) / (1000 * 60);
      if (diffMinutes >= minutes && customer.conversationState !== 'initial') {
        inactiveCustomers.push(customer);
      }
    });

    return inactiveCustomers;
  }
}

export const customerManager = new CustomerManager();
