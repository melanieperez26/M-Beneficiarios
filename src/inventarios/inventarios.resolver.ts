import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InventariosService } from './inventarios.service';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioInput } from './dto/create-inventario.input';
import { UpdateInventarioInput } from './dto/update-inventario.input';

@Resolver(() => Inventario)
export class InventariosResolver {
  constructor(private readonly inventariosService: InventariosService) {}

  @Mutation(() => Inventario)
  createInventario(@Args('createInventarioInput') createInventarioInput: CreateInventarioInput): Promise<Inventario> {
    return this.inventariosService.create(createInventarioInput);
  }

  @Query(() => [Inventario], { name: 'inventarios' })
  findAll(): Promise<Inventario[]> {
    return this.inventariosService.findAll();
  }

  @Query(() => Inventario, { name: 'inventario' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Inventario | null> {
    return this.inventariosService.findOne(id);
  }

  @Mutation(() => Inventario)
  updateInventario(@Args('updateInventarioInput') updateInventarioInput: UpdateInventarioInput): Promise<Inventario> {
    return this.inventariosService.update(updateInventarioInput.id, updateInventarioInput);
  }

  @Mutation(() => Inventario)
  removeInventario(@Args('id', { type: () => String }) id: string): Promise<Inventario> {
    return this.inventariosService.remove(id);
  }
}
