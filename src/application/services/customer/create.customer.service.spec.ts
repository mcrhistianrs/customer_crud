import { Test } from '@nestjs/testing';
import { CreateCustomerService } from './create.customer.service';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { Customer } from '../../../domain/entities/customer.entity';
import { PrismaService } from '../../../infra/database/prisma.service';

describe('CreateCustomerService', () => {
  let sut: CreateCustomerService;
  let customerRepository: CustomerRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CreateCustomerService, CustomerRepository, PrismaService],
    }).compile();

    sut = module.get<CreateCustomerService>(CreateCustomerService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('Create customer - Main Flow', () => {
    it('should create a customer', async () => {
      const customerDataInput = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        facebook: 'johndoe',
        instagram: 'johndoe',
      };

      const createdCustomerMock = {
        id: 'b2ff8818-b4df-46cf-8b7c-f7e6d7f65700',
        name: customerDataInput.name,
        email: customerDataInput.email,
        facebook: customerDataInput.facebook,
        instagram: customerDataInput.instagram,
      };

      prismaService.customer.create = jest
        .fn()
        .mockResolvedValue(createdCustomerMock);

      const result = await sut.execute(customerDataInput);

      expect(result).toEqual(createdCustomerMock);
    });
  });
});
