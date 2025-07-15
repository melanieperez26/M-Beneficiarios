import { CreateRutasOptimaInput } from './create-rutas-optima.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateRutasOptimaInput extends PartialType(CreateRutasOptimaInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
