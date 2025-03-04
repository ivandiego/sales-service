import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [
    // Configuração do banco de dados TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'example',
      database: process.env.DB_NAME || 'ticket_system',
      entities: [Event, Ticket],
      synchronize: true, // 🔴 Em produção, deve ser `false` e usar migrations!
    }),

    // Registra as entidades para serem usadas nos repositórios do TypeORM
    TypeOrmModule.forFeature([Event, Ticket]),

    // Configuração do microserviço Kafka
    ClientsModule.register([
      {
        name: 'SALES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'sales-service',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
