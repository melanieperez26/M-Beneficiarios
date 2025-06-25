import { IsNumber, IsArray, IsString, IsDateString } from "class-validator";

export class CreateDistribucionDto {
    @IsNumber()
    organizacionId: number;

    @IsNumber()
    donanteId: number;

    @IsNumber()
    cantidad: number;

    @IsDateString()
    fecha: string;

    @IsArray()
    @IsString({ each: true })
    productos: string[];
}
