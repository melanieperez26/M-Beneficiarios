import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('organizacion')
export class Organizacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column('double precision')
    lat: number;

    @Column('double precision')
    lng: number;

    @Column()
    capacidad: number;

    @Column()
    usuarioId: number;
}
