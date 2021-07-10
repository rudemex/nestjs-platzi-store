import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto, FilterOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order, 'mysqlDB') private orderRepo: Repository<Order>,
    @InjectRepository(Customer, 'mysqlDB') private customerRepo: Repository<Customer>,
  ) {}

  findAll(params?: FilterOrderDto) {
    if (params.limit && params.offset) {
      const { limit, offset } = params;
      return this.orderRepo.find({
        take: limit,
        skip: offset,
      });
    }
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      order.customer = await this.customerRepo.findOne(data.customerId);
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (changes.customerId) {
      order.customer = await this.customerRepo.findOne(changes.customerId);
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
