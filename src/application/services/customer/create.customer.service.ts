import { BadRequestException, Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerDto } from 'src/application/dtos/customer/create.customer.dto';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';

@Injectable()
export class CreateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(data: CreateCustomerDto): Promise<Customer> {
    const { name, email, facebook, instagram } = data;

    if (name == undefined) {
      throw new BadRequestException('The name field is missing');
    }

    if (email == undefined) {
      throw new BadRequestException('The email field is missing');
    }
    const customer = new Customer(name, email, facebook, instagram);
    let result = null;
    try {
      result = await this.customerRepository.create(customer);
    } catch (error) {
      throw new BadRequestException('It was occured a database error');
    }
    return result;
  }
}
