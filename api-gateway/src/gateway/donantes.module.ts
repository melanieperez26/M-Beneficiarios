import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DonantesService, ReceptoresService } from './donantes.service';
import { DonantesResolver, ReceptoresResolver } from './donantes.resolver';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    DonantesService, 
    DonantesResolver,
    ReceptoresService,
    ReceptoresResolver
  ],
  exports: [DonantesService, ReceptoresService],
})
export class DonantesModule {}
