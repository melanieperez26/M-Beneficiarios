import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UsuarioType {
  @Field(() => ID)
  UsuariosId: number;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  correo: string;

  @Field()
  telefono: string;

  @Field()
  tipo: string;
}

@ObjectType()
export class VoluntarioType {
  @Field(() => ID)
  voluntarios_id: number;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  correo: string;

  @Field()
  telefono: string;

  @Field()
  estado: string;
}
