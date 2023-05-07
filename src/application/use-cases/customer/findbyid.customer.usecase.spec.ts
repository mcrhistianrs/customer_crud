import { FindByIdCustomerUseCase } from './findbyid.customer.usecase';
import { FindByIdCustomerService } from '../../services/customer/findbyid.customer.service';
import { CustomerRepository } from 'src/infra/repositories/customer.repository';

describe('FindByIdCustomerUseCase - Main Flow', () => {
  let sut: FindByIdCustomerUseCase;
  let findByIdCustomerService: FindByIdCustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(() => {
    findByIdCustomerService = new FindByIdCustomerService(customerRepository);
    sut = new FindByIdCustomerUseCase(findByIdCustomerService);
  });

  it('should find a customer by id', async () => {
    const customerData = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      facebook: undefined,
      isntagram: undefined,
    };

    findByIdCustomerService.execute = jest
      .fn()
      .mockResolvedValueOnce(customerData);

    const result = await sut.execute('any_id');

    expect(result).toMatchObject(customerData);
  });
});

describe('FindByIdCustomerUseCase - Alternative Flow', () => {
  let sut: FindByIdCustomerUseCase;
  let findByIdCustomerService: FindByIdCustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(() => {
    findByIdCustomerService = new FindByIdCustomerService(customerRepository);
    sut = new FindByIdCustomerUseCase(findByIdCustomerService);
  });
  it('should not find a customer when the id is missing and show a error', async () => {
    expect(sut.execute(undefined)).rejects.toThrowError();
  });
});
