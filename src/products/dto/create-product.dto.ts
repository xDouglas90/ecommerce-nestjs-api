import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ProductCategory } from '../utils/product-category.enum';

export class CreateProductDto {
  @IsString()
  @Matches(/^[a-zA-Z]+$/, {
    message: 'name must be only letters',
  })
  @IsNotEmpty({
    message: 'name is required',
  })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'price is required',
  })
  readonly price: number;

  @IsString()
  readonly description: string;

  @IsBoolean({
    message: 'isAvailable must be a boolean',
  })
  @IsNotEmpty({
    message: 'isAvailable is required',
  })
  readonly isAvailable: boolean;

  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    {
      message: 'categoryId must be an integer',
    },
  )
  @IsNotEmpty({
    message: 'categoryId is required',
  })
  readonly categoryId: ProductCategory;
}
