import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateInventarioDto {
  @IsNumber()
  organizacionId: number;

  @IsString()
  producto: string;

  @IsNumber()
  cantidad: number;

  @IsDateString()
  ultimoAbastecimiento: string;
}
