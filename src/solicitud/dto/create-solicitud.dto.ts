import { IsString, IsNumber } from 'class-validator';

export class CreateSolicitudDto {
  @IsString()
  productos_necesitados: string;

  @IsString()
  urgencia: string; 

  @IsNumber()
  organizacionId: number;
}
