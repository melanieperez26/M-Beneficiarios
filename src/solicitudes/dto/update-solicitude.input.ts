import { CreateSolicitudeInput } from './create-solicitude.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateSolicitudeInput extends PartialType(CreateSolicitudeInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
