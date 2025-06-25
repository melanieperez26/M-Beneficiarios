import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrganizacionDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;

    @IsNumber()
    capacidad: number;

    @IsNumber()
    usuarioId: number;
}
