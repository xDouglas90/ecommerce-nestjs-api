import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Product> {
    try {
      return await this.productsService.findOneById(+id);
    } catch (error) {
      if (error.code === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          { message: error.detail },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':category')
  async findByCategory(
    @Param('category') category: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.findByCategory(category);
    } catch (error) {
      if (error.code === HttpStatus.BAD_REQUEST) {
        throw new HttpException(
          { message: error.detail },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
