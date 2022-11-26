import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carts', { schema: 'exercise' })
export class Cart {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'user_id', nullable: false, default: () => "'1'" })
  userId: number;

  @Column('integer', { name: 'total', nullable: false, default: () => "'0'" })
  total: number;

  @OneToMany(() => Product, (products) => products)
  products: Product[];
}
