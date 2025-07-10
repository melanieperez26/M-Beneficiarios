import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsArray, IsString } from 'class-validator';

@InputType()
export class CreateDistribucioneInput {
  @Field(() => Int)
  @IsNumber()
  organizacionId: number;

  @Field(() => Int)
  @IsNumber()
  donanteId: number;

  @Field(() => Int)
  @IsNumber()
  cantidad: number;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  productos: string[];
}
