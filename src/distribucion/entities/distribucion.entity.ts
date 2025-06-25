import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('distribucion')
export class Distribucion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizacionId: number;

    @Column()
    donanteId: number;

    @Column({ type: 'timestamp' })
    fecha: Date;

    @Column()
    cantidad: number;

    @Column("text", { array: true })
    productos: string[];
}
