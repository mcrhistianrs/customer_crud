import { CreateCustomerUseCase } from './create.customer.usecase';
import { CreateCustomerService } from '../../services/customer/create.customer.service';
import { CreateCustomerDto } from '../../../application/dtos/customer/create.customer.dto';
import { CustomerRepository } from 'src/infra/repositories/customer.repository';

describe('CreateCustomerUseCase - Main Flow', () => {
  let sut: CreateCustomerUseCase;
  let createCustomerService: CreateCustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(() => {
    createCustomerService = new CreateCustomerService(customerRepository);
    sut = new CreateCustomerUseCase(createCustomerService);
  });

  it('should create a new customer using only mandatory fields', async () => {
    const data: CreateCustomerDto = {
      name: 'any_name',
      email: 'any_email',
    };

    const customerData = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      facebook: undefined,
      isntagram: undefined,
    };

    // Mock the create method of the CreateCustomerService
    createCustomerService.execute = jest
      .fn()
      .mockResolvedValueOnce(customerData);

    const result = await sut.execute(data);

    expect(result).toMatchObject(customerData);
  });

  it('should create a new customer using all  fields', async () => {
    const data: CreateCustomerDto = {
      name: 'any_name',
      email: 'any_email',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };

    const customerData = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      facebook: 'any_facebook',
      instagram: 'any_instagram',
    };

    // Mock the create method of the CreateCustomerService
    createCustomerService.execute = jest
      .fn()
      .mockResolvedValueOnce(customerData);

    const result = await sut.execute(data);

    expect(result).toMatchObject(customerData);
  });
});

describe('CreateCustomerUseCase - Alternative Flow', () => {
  let sut: CreateCustomerUseCase;
  let createCustomerService: CreateCustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(() => {
    createCustomerService = new CreateCustomerService(customerRepository);
    sut = new CreateCustomerUseCase(createCustomerService);
  });

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
});
