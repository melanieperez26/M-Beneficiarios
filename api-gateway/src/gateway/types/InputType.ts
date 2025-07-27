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

  @Field()
  ubicacion: string;

  @Field()
  voluntariosNecesarios: number;

  @Field()
  descripcionEventos: string;

}

@InputType()
export class EventosInput {
  @Field(() => Int)
  eventosId: number;

  @Field()
  nombre: string;

  @Field()
  fecha: string;

  @Field()
  hora: string;

  @Field()
  ubicacion: string;

  @Field()
  voluntariosNecesarios: number;

  @Field()
  descripcionEventos: string;

}

@InputType()
export class EventosDelete {
  @Field(() => Int)
  eventosId: number;

}

@InputType()
export class CreateVoluntarioInput {
  @Field(() => Int, { nullable: true })
  voluntariosId?: number;
  
  @Field()
  habilidades: string;

  @Field()
  disponibilidad: string;

  @Field(() => Int)
  usuarioId: number;
}


//para actualizar voluntario
@InputType()
export class VoluntariosInput {
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
export class VoluntariosDelete {
  @Field(() => Int)
  voluntariosId: number;

}

@InputType()
export class CreateUsuarioInput {
  @Field(() => Int)
  usuariosId: number;

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

//para actualizar usuario
@InputType()
export class UsuariosInput {
  @Field(() => Int)
  usuariosId: number;

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
export class UsuariosDelete {
  @Field(() => Int)
  usuariosId: number;

}

