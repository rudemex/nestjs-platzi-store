import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto, FilterBrandsDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand, 'mysqlDB') private brandRepo: Repository<Brand>) {}

  findAll(params?: FilterBrandsDto) {
    if (params.limit && params.offset) {
      const { limit, offset } = params;
      return this.brandRepo.find({
        take: limit,
        skip: offset,
      });
    }
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const product = await this.brandRepo.findOne({
      relations: ['products'],
    });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
  }

  remove(id: number) {
    /*const index = await this.findOne(id);
    if (!index) {
      throw new NotFoundException(`Brand #${id} not found`);
    }*/
    return this.brandRepo.delete(id);
  }
}
