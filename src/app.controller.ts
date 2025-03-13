import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ✅ Buscar eventos disponíveis (Kafka)
  @MessagePattern('get_available_events')
  async handleGetAvailableEvents() {
    console.log("ivanivan")
    const ticket = await this.appService.getAvailableEvents();
    return JSON.parse(JSON.stringify(ticket));
  }

  // ✅ Processar compra e enviar para Kafka
  @MessagePattern('buy_ticket_all')
  async buyTicket(data: { userId: string; eventId: string; quantity: number }) {
    // return this.appService.buyTicket(data.userId, data.eventId, data.quantity);
  }

  // @MessagePattern('ticket_purchase_confirmed')
  // async handlePurchaseConfirmation(data: { userId: string; eventId: string; quantity: number }) {
  //   console.log(`🎉 Confirmação recebida: ${JSON.stringify(data)}`);

  //   await this.appService.confirmTicketPurchase(data.userId, data.eventId, data.quantity);
  // }
}


