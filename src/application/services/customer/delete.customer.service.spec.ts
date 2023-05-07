import { Test } from '@nestjs/testing';
import { DeleteCustomerService } from './delete.customer.service';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { PrismaService } from '../../../infra/database/prisma.service';

describe('DeleteCustomerService - Main Flow', () => {
  let sut: DeleteCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DeleteCustomerService, CustomerRepository, PrismaService],
    }).compile();
    sut = module.get<DeleteCustomerService>(DeleteCustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should delete a customer and show the customer deleted', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name_changed',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };
    prismaService.customer.delete = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id');
    expect(result).toMatchObject(customerDataMock);
  });

  it('should delete the email field and show the customer updated', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email_changed',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };
    prismaService.customer.delete = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id');
    expect(result).toMatchObject(customerDataMock);
  });

  it('should delete the facebook field and show the customer updated', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      facebook: 'any_facebook_changed',
      instagram: 'any_instagram',
    };
    prismaService.customer.delete = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id');
    expect(result).toMatchObject(customerDataMock);
  });

  it('should delete the instagram field and show the customer updated', async () => {
    const customerDataMock = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email_changed',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };
    prismaService.customer.delete = jest
      .fn()
      .mockResolvedValue(customerDataMock);

    const result = await sut.execute('any_id');
    expect(result).toMatchObject(customerDataMock);
  });
});

describe('DeleteCustomerService - Alternative Flow', () => {
  let sut: DeleteCustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DeleteCustomerService, CustomerRepository, PrismaService],
    }).compile();
    sut = module.get<DeleteCustomerService>(DeleteCustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should not update a customer when occurs a database error', async () => {
    prismaService.customer.delete = jest.fn().mockRejectedValue(new Error());
    await expect(sut.execute('any_id')).rejects.toThrowError();
  });
});
