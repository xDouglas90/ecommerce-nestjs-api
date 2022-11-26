import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateCartDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty({
    message: 'total must be calculated',
  })
  readonly total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, {
    message: 'cart must have at least one product',
  })
  readonly products: Product[];
}
