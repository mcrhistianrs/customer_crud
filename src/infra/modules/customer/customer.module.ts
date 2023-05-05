import { Module } from '@nestjs/common';
import { CustomersController } from '../../../interfaces/controllers/customers/customers.controllers';
import { CreateCustomerService } from '../../../application/services/customer/create-customer-service';
import { CreateCustomerUseCase } from '../../../application/use-cases/customer/create.customer.usecase';
import { CustomerRepository } from '../../repositories/customer.repository';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  controllers: [CustomersController],
  providers: [
    CreateCustomerService,
    CreateCustomerUseCase,
    CustomerRepository,
    PrismaService,
  ],
})
export class CustomerModule {}
