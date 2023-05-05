import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, Customer } from '@prisma/client';
import { ICustomerRepository } from 'src/domain/repositories/customer.interface';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return await this.prisma.customer.create({ data });
  }

  async findById(id: string): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({ where: { id } });
  }

  async findAll(): Promise<Customer[]> {
    return await this.prisma.customer.findMany();
  }

  async update(
    id: string,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    return await this.prisma.customer.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Customer> {
    return await this.prisma.customer.delete({ where: { id } });
  }
}
