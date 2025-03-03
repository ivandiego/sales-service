import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @MessagePattern('sales-created')
  async handleUserCreated(data: any) {
    console.log('Novo usuário criado:', data);
  }
}

