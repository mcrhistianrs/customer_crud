import { BadRequestException, Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerDto } from '../../../application/dtos/customer/create.customer.dto';
import { CreateCustomerService } from '../../services/customer/create.customer.service';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  async execute(data: CreateCustomerDto): Promise<Customer> {
    const { name, email } = data;
    if (name == undefined) {
      throw new BadRequestException('The name field is missing');
    }

    if (email == undefined) {
      throw new BadRequestException('The email field is missing');
    }
    return await this.createCustomerService.execute(data);
  }
}
