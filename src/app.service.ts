import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  // ✅ Buscar eventos disponíveis
  async getAvailableEvents() {
    return this.eventRepository.find({ where: { availableTickets: MoreThan(0) } });
  }

  // ✅ Criar um novo evento
  async createEvent(dto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(dto);
    return this.eventRepository.save(event);
  }

  // ✅ Criar um novo ticket (compra de bilhete)
  async createTicket(dto: CreateTicketDto): Promise<Ticket> {
    return this.buyTicket(dto);
  }

  // ✅ Comprar bilhete com regras de validação
  async buyTicket(dto: CreateTicketDto): Promise<Ticket> {
    const event = await this.eventRepository.findOne({ where: { id: dto.eventId } });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    if (event.availableTickets < dto.quantity) {
      throw new BadRequestException('Not enough tickets available');
    }

    const userTickets = await this.ticketRepository.count({
      where: { userId: dto.userId, event: { id: event.id } },
    });

    if (userTickets + dto.quantity > 5) {
      throw new BadRequestException('Maximum 5 tickets per user per event');
    }

    event.availableTickets -= dto.quantity;
    await this.eventRepository.save(event);

    const ticket = this.ticketRepository.create({ ...dto, event });
    return this.ticketRepository.save(ticket);
  }
}
