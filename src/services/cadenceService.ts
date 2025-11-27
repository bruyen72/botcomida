import { Client } from 'whatsapp-web.js';
import { customerManager } from './customerManager';
import { messageService } from './messageService';

export class CadenceService {
  private client: Client;
  private inactivityMinutes: number;
  private checkInterval: NodeJS.Timeout | null = null;

  constructor(client: Client, inactivityMinutes: number = 5) {
    this.client = client;
    this.inactivityMinutes = inactivityMinutes;
  }

  start(): void {
    console.log(`🔔 Sistema de cadência iniciado (${this.inactivityMinutes} minutos)`);

    this.checkInterval = setInterval(() => {
      this.checkInactiveCustomers();
    }, 60000);
  }

  stop(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log('🔕 Sistema de cadência parado');
    }
  }

  private async checkInactiveCustomers(): Promise<void> {
    const inactiveCustomers = customerManager.getInactiveCustomers(this.inactivityMinutes);

    for (const customer of inactiveCustomers) {
      try {
        const chatId = customer.phoneNumber;

        if (customer.conversationState !== 'order_confirmed' &&
            customer.conversationState !== 'initial') {

          console.log(`⏰ Enviando mensagem de cadência para ${chatId}`);

          await this.client.sendMessage(chatId, messageService.getInactivityMessage());

          customer.lastInteraction = new Date();
        }
      } catch (error) {
        console.error(`Erro ao enviar mensagem de cadência para ${customer.phoneNumber}:`, error);
      }
    }
  }

  setInactivityTime(minutes: number): void {
    this.inactivityMinutes = minutes;
    console.log(`⏱️ Tempo de inatividade atualizado para ${minutes} minutos`);
  }
}
