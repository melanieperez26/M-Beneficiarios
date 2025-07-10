import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateOrganizacioneInput {
  @Field(() => String)
  @IsString()
  nombre: string;

  @Field(() => Float)
  @IsNumber()
  lat: number;

  @Field(() => Float)
  @IsNumber()
  lng: number;

  @Field(() => Int)
  @IsNumber()
  capacidad: number;

  @Field(() => Int)
  @IsNumber()
  usuarioId: number;
}
