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
