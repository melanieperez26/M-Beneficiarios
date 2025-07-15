import { CreateInventarioInput } from './create-inventario.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateInventarioInput extends PartialType(CreateInventarioInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
