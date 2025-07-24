import { Module } from '@nestjs/common';
import { VoluntariadoResolver } from './voluntariado.resolver';

@Module({
  providers: [VoluntariadoResolver],
})
export class VoluntariadoModule {}
