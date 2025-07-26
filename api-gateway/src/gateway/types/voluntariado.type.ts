import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UsuarioType {
  @Field(() => ID)
  usuariosId: number;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  correo: string;

  @Field(() => Number, { nullable: true })
  telefono?: number | null;

  @Field()
  tipo: string;
}

@ObjectType()
export class VoluntarioType {
  @Field(() => ID)
  voluntariosId: number;

  @Field({nullable: true})
  habilidades?: string;

  @Field({nullable: true})
  disponibilidad?: string;

  @Field(() => UsuarioType, {nullable: true})
  usuario?: UsuarioType;

}
@ObjectType()
export class EventoType {
  @Field(() => ID)
  eventosId: number;

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  fecha?: string;

  @Field({ nullable: true })
  hora?: string;

  @Field({ nullable: true })
  ubicacion?: string;

  @Field({ nullable: true })
  tipo?: string;

  @Field({ nullable: true })
  estado?: string;
}
