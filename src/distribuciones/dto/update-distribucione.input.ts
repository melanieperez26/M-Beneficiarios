import { CreateDistribucioneInput } from './create-distribucione.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateDistribucioneInput extends PartialType(CreateDistribucioneInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
