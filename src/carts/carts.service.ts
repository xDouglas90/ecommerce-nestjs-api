import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all carts`;
  }

  async findOne(id: number): Promise<Cart> {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.cartsRepository.findOne({ where: { id } });
        if (!found) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'Product not found',
          });
        }
        resolve(found);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async updateProducts(id: number, product: Product): Promise<Cart> {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.cartsRepository.findOne({ where: { id } });
        if (!found) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'Cart not found',
          });
        }

        const productFound = await this.productsRepository.findOne({
          where: { id: product.id },
        });

        if (!productFound) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'Product not found',
          });
        }

        const updated = await this.cartsRepository.save({
          ...found,
          products: [...found.products, product],
        });

        const total = await this.calculateTotal(id);

        const updatedTotal = await this.cartsRepository.save({
          ...updated,
          total,
        });

        resolve(updatedTotal);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }

  async removeProduct(id: number, productId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.cartsRepository.findOne({ where: { id } });
        if (!found) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'Cart not found',
          });
        }

        const productFound = await this.productsRepository.findOne({
          where: { id: productId },
        });

        if (!productFound) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'Product not found',
          });
        }

        const updated = await this.cartsRepository.save({
          ...found,
          products: found.products.filter((p) => p.id !== productId),
        });

        const total = await this.calculateTotal(id);

        const updatedTotal = await this.cartsRepository.save({
          ...updated,
          total,
        });

        resolve(updatedTotal);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  private async calculateTotal(id: number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.cartsRepository.findOne({ where: { id } });
        if (!found) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'Cart not found',
          });
        }

        const total = found.products.reduce((acc, product) => {
          return acc + product.price;
        }, 0);

        resolve(total);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
}
