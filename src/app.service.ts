import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';
import { TicketOrder } from './entities/ticket-order.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,

    @InjectRepository(TicketOrder)
    private orderRepository: Repository<TicketOrder>,

    @Inject('SALES_SERVICE') private readonly salesServiceClient: ClientKafka,

  ) {}

  // ✅ Buscar eventos disponíveis
  async getAvailableEvents() {
    return this.eventRepository.find({ where: { availableTickets: MoreThan(0) } });
  }

  // // ✅ Processar compra e enviar para Kafka
  // async buyTicket(userId: string, eventId: string, quantity: number) {
  //   const event = await this.eventRepository.findOne({ where: { id: eventId } });

  //   if (!event || event.soldTickets + quantity > event.totalTickets) {
  //     throw new BadRequestException('Ingressos esgotados!');
  //   }

  //   // Atualiza temporariamente os ingressos vendidos
  //   event.soldTickets += quantity;
  //   await this.eventRepository.save(event);

  //   // Envia o pedido para a fila Kafka
  //   this.salesServiceClient.emit('ticket_purchase', { userId, eventId, quantity });

  //   return event;
  // }

  // // ✅ Atualiza venda após pagamento confirmado pelo Payment Service
  // async confirmTicketPurchase(userId: string, eventId: string, quantity: number) {
  //   await this.orderRepository.save({ userId, eventId, quantity });

  //   return { message: 'Venda registrada com sucesso!' };
  // }
}
