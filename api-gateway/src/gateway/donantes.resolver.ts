import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DonantesService, ReceptoresService } from './donantes.service';
import { DonanteType, DonanteInputType, ReceptorType, ReceptorInputType } from './types/donantes.type';

@Resolver(() => DonanteType)
export class DonantesResolver {
  constructor(private readonly donantesService: DonantesService) {}

  @Query(() => [DonanteType], { 
    name: 'donantes',
    description: 'Obtiene la lista de todos los donantes',
    nullable: 'items' 
  })
  async obtenerDonantes() {
    return this.donantesService.obtenerTodos();
  }

  @Query(() => DonanteType, { 
    name: 'donante',
    description: 'Obtiene un donante por su ID',
    nullable: true
  })
  async obtenerDonante(
    @Args('id', { type: () => Number }) id: number
  ) {
    return this.donantesService.obtenerPorId(id);
  }

  @Mutation(() => DonanteType, {
    name: 'crearDonante',
    description: 'Crea un nuevo donante'
  })
  async crearDonante(
    @Args('donanteInput') donanteInput: DonanteInputType
  ) {
    return this.donantesService.crearDonante(donanteInput);
  }

  @Mutation(() => Boolean, {
    name: 'eliminarDonante',
    description: 'Elimina un donante por su ID'
  })
  async eliminarDonante(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.donantesService.eliminarDonante(id);
  }
}

@Resolver(() => ReceptorType)
export class ReceptoresResolver {
  constructor(private readonly receptoresService: ReceptoresService) {}

  @Query(() => [ReceptorType], { 
    name: 'receptores',
    description: 'Obtiene la lista de todos los receptores',
    nullable: 'items' 
  })
  async obtenerReceptores() {
    return this.receptoresService.obtenerTodos();
  }

  @Query(() => ReceptorType, { 
    name: 'receptor',
    description: 'Obtiene un receptor por su ID',
    nullable: true
  })
  async obtenerReceptor(
    @Args('id', { type: () => Number }) id: number
  ) {
    return this.receptoresService.obtenerPorId(id);
  }

  @Mutation(() => ReceptorType, {
    name: 'crearReceptor',
    description: 'Crea un nuevo receptor'
  })
  async crearReceptor(
    @Args('receptorInput') receptorInput: ReceptorInputType
  ) {
    return this.receptoresService.crearReceptor(receptorInput);
  }

  @Mutation(() => Boolean, {
    name: 'eliminarReceptor',
    description: 'Elimina un receptor por su ID'
  })
  async eliminarReceptor(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.receptoresService.eliminarReceptor(id);
  }
}
