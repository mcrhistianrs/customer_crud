import { BadRequestException, Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerDto } from 'src/application/dtos/customer/create.customer.dto';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';

@Injectable()
export class FindByIdCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<Customer> {
    if (id == undefined) {
      throw new BadRequestException('Its missing the id field');
    }
    let result = null;
    result = await this.customerRepository.findById(id);
    if (result == null) {
      throw new BadRequestException('The id was not found');
    }
    return result;
  }
}
