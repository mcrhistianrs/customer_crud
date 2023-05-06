import { Test } from '@nestjs/testing';
import { FindAllCustomerService } from './findall.customer.service';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { PrismaService } from '../../../infra/database/prisma.service';

describe('FindBydIdCustomerService - Main Flow', () => {
  let sut: FindAllCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FindAllCustomerService, CustomerRepository, PrismaService],
    }).compile();
    sut = module.get<FindAllCustomerService>(FindAllCustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should find all customers and show all them', async () => {
    const customersDataMock = [
      {
        id: 'any_id',
        name: 'any_name',
        facebook: 'any_facebook',
        instagram: 'any_instagram',
      },
    ];
    prismaService.customer.findMany = jest
      .fn()
      .mockResolvedValue(customersDataMock);

    const result = await sut.execute();
    expect(result).toMatchObject(customersDataMock);
  });

  it('should find all customers by if theres is no customer then show a empty array', async () => {
    const customersDataMock = [];
    prismaService.customer.findMany = jest
      .fn()
      .mockResolvedValue(customersDataMock);

    const result = await sut.execute();
    expect(result).toMatchObject(customersDataMock);
  });
});

describe('FindBydIdCustomerService - Alternative Flow', () => {
  let sut: FindAllCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FindAllCustomerService, CustomerRepository, PrismaService],
    }).compile();
    sut = module.get<FindAllCustomerService>(FindAllCustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should not  find all customers if occurs a database error', async () => {
    prismaService.customer.findMany = jest.fn().mockRejectedValue(new Error());
    await expect(sut.execute()).rejects.toThrowError();
  });
});
