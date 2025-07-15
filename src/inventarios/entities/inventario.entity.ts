import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity({name: 'inventario'})
export class Inventario {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  organizacionId: number; 

  @Field(() => String)
  @Column()
  producto: string;

  @Field(() => Int)
  @Column()
  cantidad: number;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  ultimoAbastecimiento: Date;
}
