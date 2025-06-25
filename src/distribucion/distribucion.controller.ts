import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DistribucionService } from './distribucion.service';
import { CreateDistribucionDto } from './dto/create-distribucion.dto';
import { UpdateDistribucionDto } from './dto/update-distribucion.dto';

@Controller('distribucion')
export class DistribucionController {
  constructor(private readonly distribucionService: DistribucionService) {}

  @Post()
  create(@Body() createDistribucionDto: CreateDistribucionDto) {
    return this.distribucionService.create(createDistribucionDto);
  }

  @Get()
  findAll() {
    return this.distribucionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distribucionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistribucionDto: UpdateDistribucionDto) {
    return this.distribucionService.update(+id, updateDistribucionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distribucionService.remove(+id);
  }
}
