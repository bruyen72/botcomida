import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Pizzas
  {
    id: 'pizza-001',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela, manjericão fresco',
    price: 45.90,
    category: 'pizzas',
    available: true
  },
  {
    id: 'pizza-002',
    name: 'Pizza Calabresa',
    description: 'Molho de tomate, mussarela, calabresa, cebola',
    price: 49.90,
    category: 'pizzas',
    available: true
  },
  {
    id: 'pizza-003',
    name: 'Pizza Portuguesa',
    description: 'Molho de tomate, mussarela, presunto, ovos, cebola, azeitonas',
    price: 52.90,
    category: 'pizzas',
    available: true
  },
  {
    id: 'pizza-004',
    name: 'Pizza Quatro Queijos',
    description: 'Molho de tomate, mussarela, catupiry, parmesão, provolone',
    price: 54.90,
    category: 'pizzas',
    available: true
  },

  // Hambúrgueres
  {
    id: 'burger-001',
    name: 'X-Burger Clássico',
    description: 'Pão, hambúrguer 180g, queijo, alface, tomate, cebola',
    price: 28.90,
    category: 'hamburgueres',
    available: true
  },
  {
    id: 'burger-002',
    name: 'X-Bacon',
    description: 'Pão, hambúrguer 180g, queijo, bacon crocante, molho especial',
    price: 32.90,
    category: 'hamburgueres',
    available: true
  },
  {
    id: 'burger-003',
    name: 'X-Egg',
    description: 'Pão, hambúrguer 180g, queijo, ovo, presunto',
    price: 30.90,
    category: 'hamburgueres',
    available: true
  },

  // Bebidas
  {
    id: 'drink-001',
    name: 'Coca-Cola 2L',
    description: 'Refrigerante Coca-Cola 2 litros',
    price: 12.90,
    category: 'bebidas',
    available: true
  },
  {
    id: 'drink-002',
    name: 'Guaraná 2L',
    description: 'Refrigerante Guaraná 2 litros',
    price: 10.90,
    category: 'bebidas',
    available: true
  },
  {
    id: 'drink-003',
    name: 'Suco Natural 500ml',
    description: 'Suco natural de laranja, limão ou morango',
    price: 8.90,
    category: 'bebidas',
    available: true
  },

  // Sobremesas
  {
    id: 'dessert-001',
    name: 'Brownie com Sorvete',
    description: 'Brownie de chocolate quente com sorvete de creme',
    price: 18.90,
    category: 'sobremesas',
    available: true
  },
  {
    id: 'dessert-002',
    name: 'Petit Gateau',
    description: 'Bolinho de chocolate quente com sorvete',
    price: 22.90,
    category: 'sobremesas',
    available: true
  }
];

export const categories = [
  { id: 'pizzas', name: '🍕 Pizzas', emoji: '🍕' },
  { id: 'hamburgueres', name: '🍔 Hambúrgueres', emoji: '🍔' },
  { id: 'bebidas', name: '🥤 Bebidas', emoji: '🥤' },
  { id: 'sobremesas', name: '🍰 Sobremesas', emoji: '🍰' }
];

export function getItemById(id: string): MenuItem | undefined {
  return menuItems.find(item => item.id === id);
}

export function getItemsByCategory(category: string): MenuItem[] {
  return menuItems.filter(item => item.category === category && item.available);
}

export function searchItems(query: string): MenuItem[] {
  const lowerQuery = query.toLowerCase();
  return menuItems.filter(item =>
    item.available && (
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    )
  );
}
