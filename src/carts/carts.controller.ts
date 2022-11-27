import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Cart> {
    try {
      return await this.cartsService.findOne(+id);
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

  @Patch(':id/products')
  updateProducts(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Cart> {
    try {
      return this.cartsService.updateProducts(+id, product);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }

  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    try {
      return this.cartsService.removeProduct(+id, +productId);
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
}
