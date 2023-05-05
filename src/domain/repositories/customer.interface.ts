import { Prisma, Customer } from '@prisma/client';

export interface ICustomerRepository {
  create(data: Prisma.CustomerCreateInput): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  update(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer>;
  delete(id: string): Promise<Customer>;
}
