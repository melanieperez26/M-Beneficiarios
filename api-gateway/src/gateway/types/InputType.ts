import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEventoInput {
  @Field(() => Int)
  eventosId: number;

  @Field()
  nombre: string;

  @Field()
  fecha: string;

  @Field()
  hora: string;

}

@InputType()
export class UpdateEventoInput {
  @Field(() => Int)
  eventosId: number;

  @Field()
  nombre: string;

  @Field()
  fecha: string;

  @Field()
  hora: string;

}

@InputType()
export class DeleteEventoInput {
  @Field(() => Int)
  eventosId: number;

}

@InputType()
export class CreateVoluntarioInput {
  @Field(() => Int)
  voluntariosId: number;
  
  @Field()
  habilidades: string;

  @Field()
  disponibilidad: string;

  @Field(() => Int)
  usuarioId: number;

}

@InputType()
export class UpdateVoluntarioInput {
  @Field(() => Int)
  voluntariosId: number;

  @Field()
  nombre: string;

  @Field()
  habilidades: string;

  @Field()
  disponibilidad: string;

}

@InputType()
export class DeleteVoluntarioInput {
  @Field(() => Int)
  voluntariosId: number;

}

@InputType()
export class CreateUsuarioInput {
  @Field(() => Int)
  UsuariosId: number;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  correo: string;

  @Field()
  telefono: number;

  @Field()
  tipo: string;
}

@InputType()
export class UpdateUsuarioInput {
  @Field(() => Int)
  voluntariosId: number;

}

@InputType()
export class DeleteUsuarioInput {
  @Field(() => Int)
  voluntariosId: number;

}

