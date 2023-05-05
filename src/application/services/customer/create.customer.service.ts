import { Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerDto } from 'src/application/dtos/customer/create.customer.dto';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';

@Injectable()
export class CreateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(data: CreateCustomerDto): Promise<Customer> {
    const { name, email, facebook, instagram } = data;
    const customer = new Customer(name, email, facebook, instagram);
    return await this.customerRepository.create(customer);
  }
}
