import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudeInput {
  @Field()
  productos_necesitados: string;

  @Field()
  urgencia: string;

  @Field(() => Int)
  organizacionId: number;
}

@InputType()
export class UpdateSolicitudeInput {
  @Field(() => String)
  id: string;

  @Field()
  productos_necesitados: string;

  @Field()
  urgencia: string;

  @Field(() => Int)
  organizacionId: number;
}

@InputType()
export class DeleteSolicitudeInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class CreateOrganizacioneInput {

  @Field()
  nombre: string;

  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  capacidad: number;

  @Field(() => Int)
  usuarioId: number;

}

@InputType()
export class UpdateOrganizacioneInput {
  @Field(() => String)
  id: string;

  @Field()
  nombre: string;

  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  capacidad: number;

  @Field(() => Int)
  usuarioId: number;
}

@InputType()
export class DeleteOrganizacioneInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class CreateInventarioInput {
  @Field(() => Int)
  organizacionId: number;

  @Field()
  producto: string;

  @Field(() => Int)
  cantidad: number;

  @Field(() => Date)
  ultimoAbastecimiento: Date;
}

@InputType()
export class UpdateInventarioInput {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  organizacionId: number;

  @Field()
  producto: string;

  @Field(() => Int)
  cantidad: number;

  @Field(() => String, { nullable: true })
  ultimoAbastecimiento?: string;
}

@InputType()
export class DeleteInventarioInput {
  @Field(() => String)
  id: string;
}
