import { BadRequestException, Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(
    id: string,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    let result = null;
    try {
      result = await this.customerRepository.update(id, data);
    } catch (error) {
      throw new BadRequestException('Its occured a database error');
    }

    return result;
  }
}
