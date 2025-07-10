import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganizacionesService } from './organizaciones.service';
import { Organizacione } from './entities/organizacione.entity';
import { CreateOrganizacioneInput } from './dto/create-organizacione.input';
import { UpdateOrganizacioneInput } from './dto/update-organizacione.input';

@Resolver(() => Organizacione)
export class OrganizacionesResolver {
  constructor(private readonly organizacionesService: OrganizacionesService) {}

  @Mutation(() => Organizacione)
  createOrganizacione(@Args('createOrganizacioneInput') createOrganizacioneInput: CreateOrganizacioneInput): Promise<Organizacione> {
    return this.organizacionesService.create(createOrganizacioneInput);
  }

  @Query(() => [Organizacione], { name: 'organizaciones' })
  findAll(): Promise<Organizacione[]> {
    return this.organizacionesService.findAll();
  }

  @Query(() => Organizacione, { name: 'organizacione' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Organizacione | null> {
    return this.organizacionesService.findOne(id);
  }

  @Mutation(() => Organizacione)
  updateOrganizacione(@Args('updateOrganizacioneInput') updateOrganizacioneInput: UpdateOrganizacioneInput): Promise<Organizacione | null> {
    return this.organizacionesService.update(updateOrganizacioneInput.id, updateOrganizacioneInput);
  }

  @Mutation(() => Organizacione)
  removeOrganizacione(@Args('id', { type: () => String }) id: string): Promise<Organizacione | null> {
    return this.organizacionesService.remove(id);
  }
}
