import { Column, Entity } from 'typeorm';

import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order {
  @Column({ type: 'date' })
  date: Date;
  user: User;
  products: Product[];
}
