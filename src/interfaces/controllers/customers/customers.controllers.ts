import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { CreateCustomerDto } from '../../../application/dtos/customer/create.customer.dto';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerUseCase } from '../../../application/use-cases/customer/create.customer.usecase';
import { FindByIdCustomerUseCase } from '../../../application/use-cases/customer/findbyid.customer.usecase';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findByIdCustomerUseCase: FindByIdCustomerUseCase,
  ) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { name, email } = createCustomerDto;
    console.log(name);
    if (name == undefined) {
      throw new BadRequestException('Its missing the name field');
    }

    if (email == undefined) {
      throw new BadRequestException('Its missing the email field');
    }

    return await this.createCustomerUseCase.execute(createCustomerDto);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    if (id == undefined) {
      throw new BadRequestException('The id is missing');
    }
    return await this.findByIdCustomerUseCase.execute(id);
  }
}
