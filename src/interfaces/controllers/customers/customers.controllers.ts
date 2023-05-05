import { Controller, Post, Body } from '@nestjs/common';
import { CreateCustomerDto } from '../../../application/dtos/customer/create.customer.dto';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerUseCase } from '../../../application/use-cases/customer/create.customer.usecase';

@Controller('customers')
export class CustomersController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return await this.createCustomerUseCase.execute(createCustomerDto);
  }
}
