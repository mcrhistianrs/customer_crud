import {
  Controller,
  Post,
  Body,
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common';
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
    const { name, email } = createCustomerDto;

    if (name == undefined) {
      throw new BadRequestException('Its missing the name field');
    }

    if (email == undefined) {
      throw new BadRequestException('Its missing the name field');
    }

    return await this.createCustomerUseCase.execute(createCustomerDto);
  }
}
