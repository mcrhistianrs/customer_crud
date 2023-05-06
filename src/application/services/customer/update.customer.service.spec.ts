import { Test } from '@nestjs/testing';
import { UpdateCustomerService } from './update.customer.service';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { PrismaService } from '../../../infra/database/prisma.service';

describe('FindBydIdCustomerService - Main Flow', () => {
  let sut: UpdateCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UpdateCustomerService, CustomerRepository, PrismaService],
    }).compile();
    sut = module.get<UpdateCustomerService>(UpdateCustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should update the name field and show the customer updated', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name_changed',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };
    prismaService.customer.update = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id', { name: 'any_name_changed' });
    expect(result).toMatchObject(customerDataMock);
  });

  it('should update the email field and show the customer updated', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email_changed',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };
    prismaService.customer.update = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id', { email: 'any_name_changed' });
    expect(result).toMatchObject(customerDataMock);
  });

  it('should update the facebook field and show the customer updated', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      facebook: 'any_facebook_changed',
      instagram: 'any_instagram',
    };
    prismaService.customer.update = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id', {
      facebook: 'any_name_changed',
    });
    expect(result).toMatchObject(customerDataMock);
  });

  it('should update the instagram field and show the customer updated', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email_changed',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };
    prismaService.customer.update = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id', {
      instagram: 'any_name_changed',
    });
    expect(result).toMatchObject(customerDataMock);
  });
});

describe('FindBydIdCustomerService - Alternative Flow', () => {
  let sut: UpdateCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UpdateCustomerService, CustomerRepository, PrismaService],
    }).compile();
    sut = module.get<UpdateCustomerService>(UpdateCustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should not update the id is invalid and show a error', async () => {
    prismaService.customer.update = jest.fn().mockResolvedValue(null);
    await expect(
      sut.execute('any_not_found_id', { name: 'any_name_change' }),
    ).rejects.toThrowError();
  });

  it('should not update a customer when occurs a database error', async () => {
    prismaService.customer.update = jest.fn().mockRejectedValue(new Error());
    await expect(
      sut.execute('any_id', { name: 'any_name_change' }),
    ).rejects.toThrowError();
  });
});
