// src/application/use-cases/customer/create-customer.usecase.ts

import { Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerDto } from '../../../application/dtos/customer/create.customer.dto';
import { CreateCustomerService } from '../../services/customer/create.customer.service';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  async execute(data: CreateCustomerDto): Promise<Customer> {
    return await this.createCustomerService.execute(data);
  }
}
