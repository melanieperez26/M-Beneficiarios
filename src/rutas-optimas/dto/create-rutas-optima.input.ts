import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateRutasOptimaInput {

  @Field(() => String)
  secuencia: string;

  @Field(() => Float)
  @IsNumber()
  distancia: number;

  @Field(() => String)
  @IsString()
  distribucionId: string;
}
