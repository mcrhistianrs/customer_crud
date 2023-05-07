import { Module } from '@nestjs/common';
import { CustomersController } from '../../../interfaces/controllers/customers/customers.controllers';
import { CreateCustomerService } from '../../../application/services/customer/create.customer.service';
import { CreateCustomerUseCase } from '../../../application/use-cases/customer/create.customer.usecase';
import { CustomerRepository } from '../../repositories/customer.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { FindByIdCustomerUseCase } from '../../../application/use-cases/customer/findbyid.customer.usecase';
import { FindByIdCustomerService } from '../../../application/services/customer/findbyid.customer.service';

@Module({
  controllers: [CustomersController],
  providers: [
    CreateCustomerUseCase,
    CreateCustomerService,
    FindByIdCustomerUseCase,
    FindByIdCustomerService,
    CustomerRepository,
    PrismaService,
  ],
})
export class CustomerModule {}
