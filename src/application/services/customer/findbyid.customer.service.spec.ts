import { Test } from '@nestjs/testing';
import { FindByIdCustomerService } from './findbyid.customer.service';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { PrismaService } from '../../../infra/database/prisma.service';

describe('FindBydIdCustomerService - Main Flow', () => {
  let sut: FindByIdCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FindByIdCustomerService, CustomerRepository, PrismaService],
    }).compile();
    sut = module.get<FindByIdCustomerService>(FindByIdCustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should find a customer by id and show it', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };
    prismaService.customer.findUnique = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id');
    expect(result).toMatchObject(customerDataMock);
  });
});

describe('FindBydIdCustomerService - Alternative Flow', () => {
  let sut: FindByIdCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FindByIdCustomerService, CustomerRepository, PrismaService],
    }).compile();
    sut = module.get<FindByIdCustomerService>(FindByIdCustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should not find a customer when the id threre is not exists and show a error', async () => {
    prismaService.customer.findUnique = jest.fn().mockResolvedValue(null);
    await expect(sut.execute('id_not_found')).rejects.toThrowError();
  });
});
