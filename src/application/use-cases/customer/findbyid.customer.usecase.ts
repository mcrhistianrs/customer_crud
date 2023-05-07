import { BadRequestException, Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { FindByIdCustomerService } from '../../services/customer/findbyid.customer.service';

@Injectable()
export class FindByIdCustomerUseCase {
  constructor(
    private readonly findByIdCustomerService: FindByIdCustomerService,
  ) {}

  async execute(id: string): Promise<Customer> {
    if (id == undefined) {
      throw new BadRequestException('Its missing the id field');
    }
    return await this.findByIdCustomerService.execute(id);
  }
}
