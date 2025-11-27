import { customerManager } from '../services/customerManager';
import { messageService } from '../services/messageService';
import { aiService } from '../services/aiService';
import { categories, getItemsByCategory, searchItems } from '../data/menu';

export class MessageHandler {
  // Método para Baileys
  async handleBaileysMessage(sock: any, message: any, messageText: string): Promise<void> {
    const phoneNumber = message.key.remoteJid!;
    const customer = customerManager.getCustomer(phoneNumber);

    console.log(`📱 Mensagem de ${phoneNumber}: ${messageText}`);
    console.log(`👤 Estado atual do cliente: ${customer.conversationState}`);

    const lowerMessage = messageText.toLowerCase();

    // Função para enviar resposta
    const sendReply = async (text: string) => {
      await sock.sendMessage(phoneNumber, { text });
    };

    if (customer.conversationState === 'ended') {
      console.log('🔄 Conversa estava encerrada, reiniciando...');
      await sendReply(messageService.getWelcomeMessage());
      customerManager.updateCustomerState(phoneNumber, 'initial');
      return;
    }

    if (this.isGreeting(lowerMessage)) {
      console.log('👋 Saudação detectada, enviando boas-vindas...');
      await sendReply(messageService.getWelcomeMessage());
      customerManager.updateCustomerState(phoneNumber, 'initial');
      return;
    }

    if (this.isMenuRequest(lowerMessage)) {
      console.log('📋 Solicitação de menu detectada...');
      await sendReply(messageService.getWelcomeMessage());
      customerManager.updateCustomerState(phoneNumber, 'initial');
      return;
    }

    switch (customer.conversationState) {
      case 'initial':
        await this.handleInitialStateBaileys(sendReply, messageText, phoneNumber);
        break;
      case 'browsing_menu':
        await this.handleBrowsingMenuBaileys(sendReply, messageText, phoneNumber);
        break;
      case 'viewing_category':
        await this.handleViewingCategoryBaileys(sendReply, messageText, phoneNumber);
        break;
      case 'adding_to_cart':
        await this.handleAddingToCartBaileys(sendReply, messageText, phoneNumber);
        break;
      case 'in_cart':
        await this.handleInCartBaileys(sendReply, messageText, phoneNumber);
        break;
      case 'checkout_address':
        await this.handleCheckoutAddressBaileys(sendReply, messageText, phoneNumber);
        break;
      case 'checkout_payment':
        await this.handleCheckoutPaymentBaileys(sendReply, messageText, phoneNumber);
        break;
      default:
        await this.handleWithAIBaileys(sendReply, messageText, phoneNumber);
    }
  }

  // Métodos Baileys
  private async handleInitialStateBaileys(sendReply: Function, text: string, phoneNumber: string): Promise<void> {
    const option = text.trim();

    switch (option) {
      case '1':
        await sendReply(messageService.getCategoryMenu());
        customerManager.updateCustomerState(phoneNumber, 'browsing_menu');
        break;
      case '2':
        await sendReply(messageService.getCartSummary(phoneNumber));
        customerManager.updateCustomerState(phoneNumber, 'in_cart');
        break;
      case '3':
        const cart = customerManager.getCart(phoneNumber);
        if (cart.length === 0) {
          await sendReply('Seu carrinho está vazio! Adicione itens primeiro. 😊\n\nDigite *1* para ver o cardápio.');
        } else {
          await sendReply(messageService.getCartSummary(phoneNumber));
          customerManager.updateCustomerState(phoneNumber, 'in_cart');
        }
        break;
      case '4':
        await sendReply('Em breve você poderá acompanhar seus pedidos! 🚚\n\nPor enquanto, entre em contato conosco para mais informações.');
        break;
      case '5':
        await sendReply(messageService.getContactHumanMessage());
        break;
      case '11':
        await sendReply(messageService.getGoodbyeMessage());
        customerManager.clearCart(phoneNumber);
        customerManager.updateCustomerState(phoneNumber, 'ended');
        break;
      default:
        await this.handleWithAIBaileys(sendReply, text, phoneNumber);
    }
  }

  private async handleBrowsingMenuBaileys(sendReply: Function, text: string, phoneNumber: string): Promise<void> {
    const option = parseInt(text.trim());

    if (option === 0) {
      await sendReply(messageService.getWelcomeMessage());
      customerManager.updateCustomerState(phoneNumber, 'initial');
      return;
    }

    if (option >= 1 && option <= categories.length) {
      const category = categories[option - 1];
      const customer = customerManager.getCustomer(phoneNumber);
      (customer as any).tempCategory = category.id;
      await sendReply(messageService.getItemsInCategory(category.id));
      customerManager.updateCustomerState(phoneNumber, 'viewing_category');
    } else {
      await sendReply('Opção inválida. Digite um número de 0 a ' + categories.length);
    }
  }

  private async handleViewingCategoryBaileys(sendReply: Function, text: string, phoneNumber: string): Promise<void> {
    const option = parseInt(text.trim());
    const customer = customerManager.getCustomer(phoneNumber);
    const categoryId = (customer as any).tempCategory;

    if (option === 0) {
      await sendReply(messageService.getCategoryMenu());
      customerManager.updateCustomerState(phoneNumber, 'browsing_menu');
      return;
    }

    const items = getItemsByCategory(categoryId);

    if (option >= 1 && option <= items.length) {
      const item = items[option - 1];
      (customer as any).tempItem = item;
      await sendReply(messageService.getItemDetails(item));
      customerManager.updateCustomerState(phoneNumber, 'adding_to_cart');
    } else {
      await sendReply('Opção inválida. Digite um número de 0 a ' + items.length);
    }
  }

  private async handleAddingToCartBaileys(sendReply: Function, text: string, phoneNumber: string): Promise<void> {
    const quantity = parseInt(text.trim());
    const customer = customerManager.getCustomer(phoneNumber);
    const item = (customer as any).tempItem;

    if (isNaN(quantity) || quantity < 1) {
      await sendReply('Por favor, digite um número válido de unidades (mínimo 1).');
      return;
    }

    customerManager.addToCart(phoneNumber, {
      item: item,
      quantity: quantity
    });

    delete (customer as any).tempItem;
    delete (customer as any).tempCategory;

    await sendReply(
      `✅ *${quantity}x ${item.name}* adicionado ao carrinho!\n\n` +
      `Subtotal: R$ ${(item.price * quantity).toFixed(2)}\n\n` +
      `O que deseja fazer agora?\n` +
      `1️⃣ Ver meu carrinho\n` +
      `2️⃣ Continuar comprando\n` +
      `0️⃣ Menu principal`
    );

    customerManager.updateCustomerState(phoneNumber, 'initial');
  }

  private async handleInCartBaileys(sendReply: Function, text: string, phoneNumber: string): Promise<void> {
    const option = text.trim();

    switch (option) {
      case '1':
        await sendReply(messageService.getCheckoutAddressMessage());
        customerManager.updateCustomerState(phoneNumber, 'checkout_address');
        break;
      case '2':
        await sendReply(messageService.getCategoryMenu());
        customerManager.updateCustomerState(phoneNumber, 'browsing_menu');
        break;
      case '3':
        customerManager.clearCart(phoneNumber);
        await sendReply('Carrinho limpo! 🗑️\n\nDigite *menu* para começar um novo pedido.');
        customerManager.updateCustomerState(phoneNumber, 'initial');
        break;
      case '0':
        await sendReply(messageService.getWelcomeMessage());
        customerManager.updateCustomerState(phoneNumber, 'initial');
        break;
      default:
        await sendReply('Opção inválida. Digite 1, 2, 3 ou 0.');
    }
  }

  private async handleCheckoutAddressBaileys(sendReply: Function, text: string, phoneNumber: string): Promise<void> {
    const customer = customerManager.getCustomer(phoneNumber);
    (customer as any).tempAddress = text;

    await sendReply(messageService.getCheckoutPaymentMessage());
    customerManager.updateCustomerState(phoneNumber, 'checkout_payment');
  }

  private async handleCheckoutPaymentBaileys(sendReply: Function, text: string, phoneNumber: string): Promise<void> {
    const option = text.trim();
    const customer = customerManager.getCustomer(phoneNumber);

    if (!['1', '2', '3', '4'].includes(option)) {
      await sendReply('Opção inválida. Digite um número de 1 a 4.');
      return;
    }

    const address = (customer as any).tempAddress;
    const payment = messageService.getPaymentMethodName(option);

    await sendReply(messageService.getOrderConfirmation(phoneNumber, address, payment));

    customerManager.clearCart(phoneNumber);
    delete (customer as any).tempAddress;
    customerManager.updateCustomerState(phoneNumber, 'order_confirmed');

    setTimeout(async () => {
      await sendReply(
        '🍳 Seu pedido está sendo preparado!\n\n' +
        'Em breve estará a caminho. Obrigado pela preferência! 😊'
      );
    }, 3000);
  }

  private async handleWithAIBaileys(sendReply: Function, text: string, phoneNumber: string): Promise<void> {
    const customer = customerManager.getCustomer(phoneNumber);

    if (aiService.isEnabled()) {
      const aiResponse = await aiService.getResponse(text, customer);
      if (aiResponse) {
        await sendReply(aiResponse);
        return;
      }
    }

    const searchResults = searchItems(text);
    if (searchResults.length > 0) {
      let response = `Encontrei estes itens relacionados:\n\n`;
      searchResults.slice(0, 3).forEach((item, index) => {
        response += `${index + 1}. *${item.name}* - R$ ${item.price.toFixed(2)}\n`;
        response += `   ${item.description}\n\n`;
      });
      response += `Digite *menu* para ver todas as opções!`;
      await sendReply(response);
      return;
    }

    await sendReply(messageService.getErrorMessage());
  }

  private isGreeting(text: string): boolean {
    const greetings = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'e aí', 'eai'];
    return greetings.some(greeting => text.includes(greeting));
  }

  private isMenuRequest(text: string): boolean {
    const menuWords = ['menu', 'cardapio', 'cardápio', 'opções', 'opcoes', 'começar', 'comecar', 'iniciar', 'start'];
    return menuWords.some(word => text.includes(word));
  }
}

export const messageHandler = new MessageHandler();
