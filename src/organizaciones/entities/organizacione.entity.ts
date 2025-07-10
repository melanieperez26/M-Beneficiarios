import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name: 'organizacion'})
export class Organizacione {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  nombre: string;

  @Field(() => Float, {nullable: true})
  @Column({type: 'double precision', nullable: true})
  lat: number;

  @Field(() => Float, {nullable: true})
  @Column({type: 'double precision', nullable: true})
  lng: number;

  @Field(() => Int)
  @Column()
  capacidad: number;

  @Field(() => Int)
  @Column()
  usuarioId: number;
}
