import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { UsersController } from './controllers/users/users.controller';
import { CostumersController } from './controllers/costumers/costumers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsService } from './services/products/products.service';
import { CategoriesService } from './services/categories/categories.service';
import { BrandsService } from './services/brands/brands.service';
import { UsersService } from './services/users/users.service';
import { CostumersService } from './services/costumers/costumers.service';
import { OrdersService } from './services/orders/orders.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    BrandsController,
    UsersController,
    CostumersController,
    OrdersController,
  ],
  providers: [
    AppService,
    ProductsService,
    CategoriesService,
    BrandsService,
    UsersService,
    CostumersService,
    OrdersService,
  ],
})
export class AppModule {}
