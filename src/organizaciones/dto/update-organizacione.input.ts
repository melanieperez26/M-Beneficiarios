import { IsUUID } from 'class-validator';
import { CreateOrganizacioneInput } from './create-organizacione.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizacioneInput extends PartialType(CreateOrganizacioneInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
