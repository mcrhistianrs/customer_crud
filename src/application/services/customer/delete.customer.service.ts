import { BadRequestException, Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerDto } from 'src/application/dtos/customer/create.customer.dto';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { Prisma } from '@prisma/client';
import { throwError } from 'rxjs';

@Injectable()
export class DeleteCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<Customer> {
    let result = null;
    try {
      result = await this.customerRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Its occured a database error');
    }

    if (result == null) {
      throw new BadRequestException('The id was not found');
    }
    return result;
  }
}
