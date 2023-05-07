import { Test } from '@nestjs/testing';
import { CustomersController } from './customers.controllers';
import { CreateCustomerUseCase } from '../../../application/use-cases/customer/create.customer.usecase';
import { CreateCustomerService } from '../../../application/services/customer/create.customer.service';
import { CustomerRepository } from '../../../infra/repositories/customer.repository';
import { PrismaService } from '../../../infra/database/prisma.service';
import { FindByIdCustomerUseCase } from '../../../application/use-cases/customer/findbyid.customer.usecase';
import { FindByIdCustomerService } from '../../../application/services/customer/findbyid.customer.service';

describe('CustomersController Create-  Main Flow', () => {
  let sut: CustomersController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomersController,
        CreateCustomerUseCase,
        CreateCustomerService,
        FindByIdCustomerUseCase,
        FindByIdCustomerService,
        CustomerRepository,
        PrismaService,
      ],
    }).compile();

    sut = module.get<CustomersController>(CustomersController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

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

    expect(await sut.create(customerDataInput)).toMatchObject(
      createdCustomerMock,
    );
  });
});

describe('CustomersController  Create-  Alternative Flow', () => {
  let sut: CustomersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomersController,
        CreateCustomerUseCase,
        CreateCustomerService,
        FindByIdCustomerUseCase,
        FindByIdCustomerService,
        CustomerRepository,
        PrismaService,
      ],
    }).compile();

    sut = module.get<CustomersController>(CustomersController);
  });

  it('should not  create a customer if the name field is missing and must show a error', async () => {
    const customerDataInput = {
      name: undefined,
      email: 'johndoe@example.com',
      facebook: 'johndoe',
      instagram: 'johndoe',
    };
    await expect(sut.create(customerDataInput)).rejects.toThrowError();
  });

  it('should not  create a customer if the email field is missing and must show a error', async () => {
    const customerDataInput = {
      name: 'any_name',
      email: undefined,
      facebook: 'johndoe',
      instagram: 'johndoe',
    };
    await expect(sut.create(customerDataInput)).rejects.toThrowError();
  });
});

describe('CustomersController FindById-  Main Flow', () => {
  let sut: CustomersController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomersController,
        CreateCustomerUseCase,
        CreateCustomerService,
        FindByIdCustomerUseCase,
        FindByIdCustomerService,
        CustomerRepository,
        PrismaService,
      ],
    }).compile();

    sut = module.get<CustomersController>(CustomersController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should find  a customer by id ', async () => {
    const createdCustomerMock = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };

    prismaService.customer.findUnique = jest
      .fn()
      .mockResolvedValue(createdCustomerMock);

    expect(await sut.getCustomerById('any_id')).toMatchObject(
      createdCustomerMock,
    );
  });
});

describe('CustomersController FindById-  Alternative Flow', () => {
  let sut: CustomersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomersController,
        CreateCustomerUseCase,
        CreateCustomerService,
        FindByIdCustomerUseCase,
        FindByIdCustomerService,
        CustomerRepository,
        PrismaService,
      ],
    }).compile();

    sut = module.get<CustomersController>(CustomersController);
  });

  it('should not find  a customer if the id field is missing ', async () => {
    await expect(sut.getCustomerById(undefined)).rejects.toThrowError();
  });
});
