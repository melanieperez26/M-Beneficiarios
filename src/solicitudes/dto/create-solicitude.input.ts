import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateSolicitudeInput {
  @Field(() => String)
  @IsString()
  productos_necesitados: string;

  @Field(() => String)
  @IsString()
  urgencia: string;

  @Field(() => Int)
  @IsNumber()
  organizacionId: number;
}
