import { PartialType } from '@nestjs/mapped-types';
import { CreateRutaOptimaDto } from './create-ruta-optima.dto';

export class UpdateRutaOptimaDto extends PartialType(CreateRutaOptimaDto) {}
