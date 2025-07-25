import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudInput {
  @Field(() => Int)
  solicitudesId: number;

  @Field()
  productos_necesitados: string;

  @Field()
  urgencia: string;

  @Field(() => ID)
  organizacionId: string;
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
  @Field(() => ID)
  id: string;

  @Field()
  organizacionId: string;

  @Field()
  producto: string;

  @Field()
  cantidad: number;

  @Field()
  ultimoAbastecimiento: Date;
}
