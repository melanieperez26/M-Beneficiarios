import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SolicitudesService } from './solicitudes.service';
import { Solicitude } from './entities/solicitude.entity';
import { CreateSolicitudeInput } from './dto/create-solicitude.input';
import { UpdateSolicitudeInput } from './dto/update-solicitude.input';

@Resolver(() => Solicitude)
export class SolicitudesResolver {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Mutation(() => Solicitude)
  createSolicitude(@Args('createSolicitudeInput') createSolicitudeInput: CreateSolicitudeInput): Promise<Solicitude> {
    return this.solicitudesService.create(createSolicitudeInput);
  }

  @Query(() => [Solicitude], { name: 'solicitudes' })
  findAll(): Promise<Solicitude[]> {
    return this.solicitudesService.findAll();
  }

  @Query(() => Solicitude, { name: 'solicitude' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Solicitude | null> {
    return this.solicitudesService.findOne(id);
  }

  @Mutation(() => Solicitude)
  updateSolicitude(@Args('updateSolicitudeInput') updateSolicitudeInput: UpdateSolicitudeInput): Promise<Solicitude | null> {
    return this.solicitudesService.update(updateSolicitudeInput.id, updateSolicitudeInput);
  }

  @Mutation(() => Solicitude)
  removeSolicitude(@Args('id', { type: () => String }) id: string): Promise<Solicitude | null> {
    return this.solicitudesService.remove(id);
  }
}
