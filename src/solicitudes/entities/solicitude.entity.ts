import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity({name: 'solicitud'})
export class Solicitude {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('text')
  productos_necesitados: string;

  @Field(() => String)
  @Column()
  urgencia: string;

  @Field(() => Int)
  @Column()
  organizacionId: number;
}
