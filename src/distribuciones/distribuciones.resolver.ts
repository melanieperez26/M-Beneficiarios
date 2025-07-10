import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DistribucionesService } from './distribuciones.service';
import { Distribucione } from './entities/distribucione.entity';
import { CreateDistribucioneInput } from './dto/create-distribucione.input';
import { UpdateDistribucioneInput } from './dto/update-distribucione.input';

@Resolver(() => Distribucione)
export class DistribucionesResolver {
  constructor(private readonly distribucionesService: DistribucionesService) {}

  @Mutation(() => Distribucione)
  createDistribucione(@Args('createDistribucioneInput') createDistribucioneInput: CreateDistribucioneInput): Promise<Distribucione> {
    return this.distribucionesService.create(createDistribucioneInput);
  }

  @Query(() => [Distribucione], { name: 'distribuciones' })
  findAll(): Promise<Distribucione[]> {
    return this.distribucionesService.findAll();
  }

  @Query(() => Distribucione, { name: 'distribucione' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Distribucione | null> {
    return this.distribucionesService.findOne(id);
  }

  @Mutation(() => Distribucione)
  updateDistribucione(@Args('updateDistribucioneInput') updateDistribucioneInput: UpdateDistribucioneInput): Promise<Distribucione> {
    return this.distribucionesService.update(updateDistribucioneInput.id, updateDistribucioneInput);
  }

  @Mutation(() => Distribucione)
  removeDistribucione(@Args('id', { type: () => String }) id: string): Promise<Distribucione> {
    return this.distribucionesService.remove(id);
  }
}
