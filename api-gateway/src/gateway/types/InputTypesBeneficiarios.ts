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
  @Field(() => Int)
  organizacionId: number;

  @Field()
  producto: string;

  @Field(() => Int)
  cantidad: number;

  @Field(() => Date)
  ultimoAbastecimiento: Date;
}
