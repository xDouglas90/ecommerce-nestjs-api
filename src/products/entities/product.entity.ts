import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from '../utils/product-category.enum';

@Entity('products', { schema: 'exercise' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: false, length: 100 })
  name: string;

  @Column('integer', { name: 'price', nullable: false })
  price: number;

  @Column('character varying', {
    name: 'description',
    nullable: false,
    length: 255,
  })
  description: string;

  @Column('boolean', { name: 'is_available', nullable: false })
  isAvailable: boolean;

  @Column('integer', { name: 'category_id', nullable: false })
  categoryId: ProductCategory;
}
