import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductCategory } from './utils/product-category.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.productsRepository.find();
        resolve(found);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findOneById(id: number): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.productsRepository.findOne({ where: { id } });
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

  async findByCategory(category: string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!Object.values(ProductCategory).includes(category)) {
          reject({
            code: HttpStatus.BAD_REQUEST,
            detail: 'Invalid category',
          });
        }

        const found = await this.productsRepository.find({
          where: { categoryId: parseInt(ProductCategory[category]) },
        });

        resolve(found);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
