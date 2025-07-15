import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RutasOptimasService } from './rutas-optimas.service';
import { RutasOptima } from './entities/rutas-optima.entity';
import { CreateRutasOptimaInput } from './dto/create-rutas-optima.input';
import { UpdateRutasOptimaInput } from './dto/update-rutas-optima.input';

@Resolver(() => RutasOptima)
export class RutasOptimasResolver {
  constructor(private readonly rutasOptimasService: RutasOptimasService) {}

  @Mutation(() => RutasOptima)
  createRutasOptima(@Args('createRutasOptimaInput') createRutasOptimaInput: CreateRutasOptimaInput): Promise<RutasOptima> {
    return this.rutasOptimasService.create(createRutasOptimaInput);
  }

  @Query(() => [RutasOptima], { name: 'rutasOptimas' })
  findAll(): Promise<RutasOptima[]> {
    return this.rutasOptimasService.findAll();
  }

  @Query(() => RutasOptima, { name: 'rutasOptima' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<RutasOptima | null> {
    return this.rutasOptimasService.findOne(id);
  }

  @Mutation(() => RutasOptima)
  updateRutasOptima(@Args('updateRutasOptimaInput') updateRutasOptimaInput: UpdateRutasOptimaInput): Promise<RutasOptima | null> {
    return this.rutasOptimasService.update(updateRutasOptimaInput.id, updateRutasOptimaInput);
  }

  @Mutation(() => RutasOptima)
  removeRutasOptima(@Args('id', { type: () => String }) id: string): Promise<RutasOptima | null> {
    return this.rutasOptimasService.remove(id);
  }
}
