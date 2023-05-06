import { Test } from '@nestjs/testing';
import { CreateCustomerService } from './create.customer.service';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { PrismaService } from '../../../infra/database/prisma.service';

describe('CreateCustomerService', () => {
  let sut: CreateCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CreateCustomerService, CustomerRepository, PrismaService],
    }).compile();

    sut = module.get<CreateCustomerService>(CreateCustomerService);
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

  describe('Create customer - Alternative Flow', () => {
    it('should to throw a exception if name field is missing', async () => {
      const customerDataInput = {
        name: undefined,
        email: 'johndoe@example.com',
        facebook: 'johndoe',
        instagram: 'johndoe',
      };

      expect(sut.execute(customerDataInput)).rejects.toThrowError(
        'The name field is missing',
      );
    });

    it('should to throw a exception if email field is missing', async () => {
      const customerDataInput = {
        name: 'any_name',
        email: undefined,
        facebook: 'johndoe',
        instagram: 'johndoe',
      };

      expect(sut.execute(customerDataInput)).rejects.toThrowError(
        'The email field is missing',
      );
    });

    it('should to throw a exception if occurs a error in database', async () => {
      const customerDataInput = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        facebook: 'johndoe',
        instagram: 'johndoe',
      };

      prismaService.customer.create = jest
        .fn()
        .mockRejectedValueOnce(new Error());

      expect(sut.execute(customerDataInput)).rejects.toThrowError();
    });
  });
});
