import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';

import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dtos';
import { of } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, 'mysqlDB') private productRepo: Repository<Product>,
    @InjectRepository(Brand, 'mysqlDB') private brandRepo: Repository<Brand>,
    @InjectRepository(Category, 'mysqlDB') private categoryRepo: Repository<Category>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const { limit, offset } = params;
      return this.productRepo.find({
        relations: ['brand'],
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    /*const newProduct = new Product();
    newProduct.image = data.image;
    newProduct.name = data.name;
    newProduct.description = data.description;
    newProduct.price = data.price;
    newProduct.stock = data.stock;*/
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      newProduct.brand = await this.brandRepo.findOne(data.brandId);
    }
    if (data.categoriesIds) {
      newProduct.categories = await this.categoryRepo.findByIds(data.categoriesIds);
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (changes.brandId) {
      product.brand = await this.brandRepo.findOne(changes.brandId);
    }
    if (changes.categoriesIds) {
      product.categories = await this.categoryRepo.findByIds(changes.categoriesIds);
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter((item) => item.id !== categoryId);
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId);
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
