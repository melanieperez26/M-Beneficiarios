import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('organizacion')
export class Organizacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({nullable: true})
    lat: number;

    @Column({nullable: true})
    lng: number;

    @Column()
    capacidad: number;

    @Column()
    usuarioId: number;
}
