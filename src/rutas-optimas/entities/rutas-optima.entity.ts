import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity({name: 'rutas'})
export class RutasOptima {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [String])
  @Column('json')
  secuencia: string[];

  @Field(() => Float)
  @Column('float')
  distancia: number;

  @Field(() => String)
  @Column({nullable: true})
  distribucionId: string;
}
