import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity({name: 'distribuciones'})
export class Distribucione {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  organizacionId: number;

  @Field(() => Int)
  @Column()
  donanteId: number;

  @Field(() => Int)
  @Column()
  cantidad: number;

  @Field(() => [String])
  @Column({ type: 'json' , nullable: true } )
  productos: any;
}
