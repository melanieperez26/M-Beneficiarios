import { IsArray, IsNumber } from "class-validator";

export class CreateRutaOptimaDto {
    @IsArray()
    secuencia: string[]; 
    
    @IsNumber()
    distancia: number

    @IsNumber()
    distribucionId: number;
}
