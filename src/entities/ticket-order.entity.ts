import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['eventId', 'userId']) // ✅ Índice composto para melhorar buscas
export class TicketOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index() // ✅ Índice para consultas por evento
  eventId: string;

  @Column()
  @Index() // ✅ Índice para consultas por usuário
  userId: string;

  @Column()
  quantity: number;
}
