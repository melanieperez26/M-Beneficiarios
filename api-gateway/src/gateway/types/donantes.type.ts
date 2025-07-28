import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@InputType('DonanteInput')
export class DonanteInputType {
  @Field()
  nombre: string;

  @Field()
  email: string;

  @Field()
  tipo: string;

  @Field()
  telefono: string;

  @Field(() => String, { nullable: true })
  contacto?: string;

  @Field()
  direccion: string;
}

@ObjectType('Donante')
export class DonanteType {
  @Field(() => ID)
  id: number;

  @Field()
  nombre: string;

  @Field()
  email: string;

  @Field()
  tipo: string;

  @Field()
  telefono: string;

  @Field(() => String, { nullable: true })
  contacto: string | null;

  @Field()
  direccion: string;
}

@InputType('ReceptorInput')
export class ReceptorInputType {
  @Field()
  nombre: string;

  @Field()
  email: string;

  @Field()
  telefono: string;

  @Field(() => String, { nullable: true })
  contacto?: string;

  @Field()
  direccion: string;

  @Field(() => String, { nullable: true })
  tipo?: string; // 'persona' o 'fundación'

  @Field({ nullable: true })
  ubicacion?: string;
}

@ObjectType('Receptor')
export class ReceptorType {
  @Field(() => ID)
  id: number;

  @Field()
  nombre: string;

  @Field()
  email: string;

  @Field()
  telefono: string;

  @Field(() => String, { nullable: true })
  contacto: string | null;

  @Field()
  direccion: string;

  @Field()
  tipo: string; // 'persona' o 'fundación'

  @Field()
  ubicacion: string;
}
