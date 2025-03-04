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
    return await this.appService.getAvailableEvents();
     
  }

  // ✅ Comprar bilhete com validação (Kafka)
  @MessagePattern('buy_ticket')
  async handleBuyTicket(dto: CreateTicketDto) {
    const ticket = await this.appService.buyTicket(dto);
    return JSON.parse(JSON.stringify(ticket)); 

  }
}


