import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Inicializa o servidor HTTP para expor os endpoints REST
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3003); // Porta 3003 para o sales-service

  console.log('Sales Service rodando em http://localhost:3003');

  // Inicializa o microserviço Kafka para comunicação assíncrona
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'sales-service',
      },
    },
  });

  await microservice.listen();
  console.log('Sales Service conectado ao Kafka');
}

bootstrap();
