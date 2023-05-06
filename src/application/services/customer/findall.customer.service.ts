import { BadRequestException, Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';

@Injectable()
export class FindAllCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<Customer[]> {
    let result = null;
    try {
      result = await this.customerRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Its occured a database error');
    }
    return result;
  }
}
