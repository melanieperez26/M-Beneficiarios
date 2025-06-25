import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Solicitud')
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  productos_necesitados: string;

  @Column()
  urgencia: string;

  @Column()
  organizacionId: number;
}
