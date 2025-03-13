import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid') // 🔥 Agora usa UUID para consistência
  id: string;

  @Column()
  name: string;

  @Column()
  availableTickets: number;

  @OneToMany(() => Ticket, (ticket) => ticket.event) // 🔥 Relacionamento reverso com Ticket
  tickets: Ticket[];

  @Column({ default: 0, nullable: false }) // 🔥 Corrigido: não pode ser NULL
  soldTickets: number;

  @Column({ default: 0, nullable: false }) // 🔥 Corrigido: não pode ser NULL
  totalTickets: number;
}
