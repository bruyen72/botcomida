import { MenuItem } from '../types';
import { categories, getItemsByCategory } from '../data/menu';
import { customerManager } from './customerManager';

export class MessageService {
  private restaurantName: string;

  constructor() {
    this.restaurantName = process.env.RESTAURANT_NAME || 'Nosso Delivery';
  }

  getWelcomeMessage(): string {
    return `Olá! Bem-vindo ao *${this.restaurantName}*! 👋

Estou aqui para ajudar com seu pedido. Como posso te atender?

*MENU PRINCIPAL:*
1️⃣ Ver cardápio
2️⃣ Ver meu carrinho
3️⃣ Fazer pedido
4️⃣ Acompanhar pedido
5️⃣ Falar com atendente
1️⃣1️⃣ Encerrar conversa

Digite o número da opção ou envie uma mensagem que eu respondo! 😊`;
  }

  getGoodbyeMessage(): string {
    return `Obrigado por usar o *${this.restaurantName}*! 👋

Sua conversa foi encerrada.

Se precisar de algo, é só enviar uma mensagem novamente que estarei aqui para ajudar! 😊

Até logo! 🍕`;
  }

  getCategoryMenu(): string {
    let message = `*📋 CARDÁPIO*\n\nEscolha uma categoria:\n\n`;

    categories.forEach((cat, index) => {
      message += `${index + 1}️⃣ ${cat.name}\n`;
    });

    message += `\n0️⃣ Voltar ao menu principal`;

    return message;
  }

  getItemsInCategory(categoryId: string): string {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 'Categoria não encontrada.';

    const items = getItemsByCategory(categoryId);

    let message = `*${category.name}*\n\n`;

    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}* - R$ ${item.price.toFixed(2)}\n`;
      message += `   ${item.description}\n\n`;
    });

    message += `Digite o número do item para adicionar ao carrinho\n`;
    message += `ou 0 para voltar às categorias.`;

    return message;
  }

  getItemDetails(item: MenuItem): string {
    return `*${item.name}*\n\n` +
      `${item.description}\n\n` +
      `💰 Preço: R$ ${item.price.toFixed(2)}\n\n` +
      `Quantas unidades deseja? (Digite um número)`;
  }

  getCartSummary(phoneNumber: string): string {
    const cart = customerManager.getCart(phoneNumber);

    if (cart.length === 0) {
      return `Seu carrinho está vazio! 🛒\n\nDigite *1* para ver o cardápio.`;
    }

    let message = `*🛒 SEU CARRINHO*\n\n`;

    cart.forEach((cartItem, index) => {
      const subtotal = cartItem.item.price * cartItem.quantity;
      message += `${index + 1}. *${cartItem.item.name}*\n`;
      message += `   Quantidade: ${cartItem.quantity}x\n`;
      message += `   Subtotal: R$ ${subtotal.toFixed(2)}\n`;
      if (cartItem.observations) {
        message += `   Obs: ${cartItem.observations}\n`;
      }
      message += `\n`;
    });

    const total = customerManager.getCartTotal(phoneNumber);
    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: R$ ${total.toFixed(2)}*\n\n`;

    message += `*OPÇÕES:*\n`;
    message += `1️⃣ Finalizar pedido\n`;
    message += `2️⃣ Adicionar mais itens\n`;
    message += `3️⃣ Limpar carrinho\n`;
    message += `0️⃣ Voltar ao menu`;

    return message;
  }

  getCheckoutAddressMessage(): string {
    return `*📍 ENDEREÇO DE ENTREGA*\n\n` +
      `Por favor, informe seu endereço completo para entrega:\n\n` +
      `Exemplo:\n` +
      `Rua das Flores, 123, Apto 45\n` +
      `Bairro Jardim, São Paulo - SP\n` +
      `CEP: 12345-678`;
  }

  getCheckoutPaymentMessage(): string {
    return `*💳 FORMA DE PAGAMENTO*\n\n` +
      `Como deseja pagar?\n\n` +
      `1️⃣ Dinheiro\n` +
      `2️⃣ Cartão de débito\n` +
      `3️⃣ Cartão de crédito\n` +
      `4️⃣ PIX\n\n` +
      `Digite o número da opção:`;
  }

  getOrderConfirmation(phoneNumber: string, address: string, payment: string): string {
    const cart = customerManager.getCart(phoneNumber);
    const total = customerManager.getCartTotal(phoneNumber);

    let message = `*✅ PEDIDO CONFIRMADO!*\n\n`;
    message += `Obrigado pelo seu pedido! 🎉\n\n`;

    message += `*RESUMO DO PEDIDO:*\n\n`;

    cart.forEach(cartItem => {
      message += `• ${cartItem.quantity}x ${cartItem.item.name}\n`;
    });

    message += `\n*Total:* R$ ${total.toFixed(2)}\n`;
    message += `*Endereço:* ${address}\n`;
    message += `*Pagamento:* ${payment}\n\n`;

    message += `⏱️ Tempo estimado de entrega: 40-50 minutos\n\n`;
    message += `Você receberá atualizações sobre seu pedido em breve!`;

    return message;
  }

  getInactivityMessage(): string {
    return `Olá! Notei que você ficou um tempo sem responder. 😊\n\n` +
      `Ainda está por aí? Posso ajudar com algo?\n\n` +
      `Digite *menu* para ver as opções ou envie uma mensagem!`;
  }

  getContactHumanMessage(): string {
    const phone = process.env.RESTAURANT_PHONE || '5511999999999';
    return `*👤 ATENDIMENTO HUMANO*\n\n` +
      `Nossa equipe está disponível para te atender!\n\n` +
      `📞 Telefone: ${this.formatPhone(phone)}\n\n` +
      `Ou continue conversando aqui que logo alguém vai te responder! 😊`;
  }

  private formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 13) {
      return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
    }
    return phone;
  }

  getErrorMessage(): string {
    return `Desculpe, não entendi sua mensagem. 😕\n\n` +
      `Digite *menu* para ver as opções ou tente reformular sua pergunta!`;
  }

  getPaymentMethodName(option: string): string {
    const methods: Record<string, string> = {
      '1': 'Dinheiro',
      '2': 'Cartão de débito',
      '3': 'Cartão de crédito',
      '4': 'PIX'
    };
    return methods[option] || 'Não especificado';
  }
}

export const messageService = new MessageService();
