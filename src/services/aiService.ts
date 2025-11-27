import OpenAI from 'openai';
import { Customer } from '../types';
import { menuItems } from '../data/menu';

class AIService {
  private openai: OpenAI | null = null;
  private enabled: boolean = false;

  constructor() {
    if (process.env.OPENAI_API_KEY && process.env.ENABLE_AI === 'true') {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      this.enabled = true;
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async getResponse(message: string, customer: Customer): Promise<string | null> {
    if (!this.enabled || !this.openai) {
      return null;
    }

    try {
      const systemPrompt = this.buildSystemPrompt();
      const userContext = this.buildUserContext(customer);

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'system', content: userContext },
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.7
      });

      return completion.choices[0]?.message?.content || null;
    } catch (error) {
      console.error('Erro ao obter resposta da IA:', error);
      return null;
    }
  }

  private buildSystemPrompt(): string {
    const restaurantName = process.env.RESTAURANT_NAME || 'Nosso Delivery';

    return `Você é um assistente virtual do restaurante ${restaurantName}.
Sua função é ajudar clientes com pedidos de delivery de forma amigável e eficiente.

INSTRUÇÕES IMPORTANTES:
- Seja cordial, simpático e prestativo
- Responda de forma breve e objetiva (máximo 2-3 linhas)
- Se o cliente perguntar sobre itens do cardápio, sugira opções relevantes
- Se o cliente quiser fazer pedido, incentive-o a usar o menu interativo
- Não invente informações sobre produtos ou preços
- Se não souber algo, seja honesto e direcione para o menu ou atendimento humano

CARDÁPIO DISPONÍVEL:
${this.getMenuSummary()}

Responda apenas sobre assuntos relacionados ao restaurante e pedidos.`;
  }

  private buildUserContext(customer: Customer): string {
    let context = `Cliente: ${customer.name || 'Novo cliente'}\n`;
    context += `Situação atual: ${this.getStateDescription(customer.conversationState)}\n`;

    if (customer.cart.length > 0) {
      context += `Carrinho: ${customer.cart.length} itens\n`;
    }

    return context;
  }

  private getMenuSummary(): string {
    const categories = ['pizzas', 'hamburgueres', 'bebidas', 'sobremesas'];
    let summary = '';

    categories.forEach(category => {
      const items = menuItems.filter(item => item.category === category && item.available);
      if (items.length > 0) {
        summary += `\n${this.getCategoryName(category)}:\n`;
        items.forEach(item => {
          summary += `- ${item.name} (R$ ${item.price.toFixed(2)})\n`;
        });
      }
    });

    return summary;
  }

  private getCategoryName(category: string): string {
    const names: Record<string, string> = {
      'pizzas': 'Pizzas',
      'hamburgueres': 'Hambúrgueres',
      'bebidas': 'Bebidas',
      'sobremesas': 'Sobremesas'
    };
    return names[category] || category;
  }

  private getStateDescription(state: string): string {
    const descriptions: Record<string, string> = {
      'initial': 'Iniciando conversa',
      'browsing_menu': 'Navegando no cardápio',
      'viewing_category': 'Visualizando categoria',
      'adding_to_cart': 'Adicionando ao carrinho',
      'in_cart': 'Revisando carrinho',
      'checkout_address': 'Informando endereço',
      'checkout_payment': 'Escolhendo forma de pagamento',
      'order_confirmed': 'Pedido confirmado',
      'tracking_order': 'Acompanhando pedido'
    };
    return descriptions[state] || state;
  }
}

export const aiService = new AIService();
