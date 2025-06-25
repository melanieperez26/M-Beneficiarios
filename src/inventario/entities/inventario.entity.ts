import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizacionId: number;

  @Column()
  producto: string;

  @Column()
  cantidad: number;

  @Column({ type: 'timestamp' })
  ultimoAbastecimiento: Date;
}
