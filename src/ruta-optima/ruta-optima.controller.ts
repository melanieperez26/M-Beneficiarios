import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RutaOptimaService } from './ruta-optima.service';
import { CreateRutaOptimaDto } from './dto/create-ruta-optima.dto';
import { UpdateRutaOptimaDto } from './dto/update-ruta-optima.dto';

@Controller('ruta-optima')
export class RutaOptimaController {
  constructor(private readonly rutaOptimaService: RutaOptimaService) {}

  @Post()
  create(@Body() createRutaOptimaDto: CreateRutaOptimaDto) {
    return this.rutaOptimaService.create(createRutaOptimaDto);
  }

  @Get()
  findAll() {
    return this.rutaOptimaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rutaOptimaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRutaOptimaDto: UpdateRutaOptimaDto) {
    return this.rutaOptimaService.update(+id, updateRutaOptimaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rutaOptimaService.remove(+id);
  }
}
