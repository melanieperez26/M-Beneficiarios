import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ruta-optima')
export class RutaOptima {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  secuencia: any; // o string[] si prefieres

  @Column('float')
  distancia: number;

  @Column()
  distribucionId: number;
}
