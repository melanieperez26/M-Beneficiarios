import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import axios from 'axios';
import { VoluntarioType } from './types/voluntariado.type';
import { UsuarioType } from './types/voluntariado.type';
import { EventoType } from './types/voluntariado.type';
import { CreateEventoInput } from './types/InputType';
import { CreateUsuarioInput } from './types/InputType';
import { CreateVoluntarioInput } from './types/InputType';
import { UsuariosInput } from './types/InputType';
import { VoluntariosInput } from './types/InputType';
import { UsuariosDelete } from './types/InputType';
import { VoluntariosDelete } from './types/InputType';
import { EventosInput } from './types/InputType';
import { EventosDelete } from './types/InputType';


@Resolver()
export class VoluntariadoResolver {
  private graphqlUrl = 'http://localhost:8000/graphql'; 


  async graphqlRequest(query: string, variables = {}) {
    const res = await axios.post(this.graphqlUrl, { query, variables });
    console.log("🔎 Respuesta del módulo:", JSON.stringify(res.data, null, 2));
    return res.data.data;
  }

  //Para Obtener las entidades
  
    @Query(() => [UsuarioType])
    async usuarios() {
    try {
      const query = `
        query {
          getUsuarios {
            usuariosId
            nombre
            apellido
            correo
            telefono
            tipo
          }
        }
      `;
      console.log('Ejecutando consulta de usuarios...');
      const response = await this.graphqlRequest(query);
      console.log('Respuesta del servidor (usuarios):', JSON.stringify(response, null, 2));
      
      if (!response) {
        console.error('No se recibió respuesta del servidor');
        return [];
      }
      
      if (!response.getUsuarios) {
        console.error('La respuesta no contiene el campo "getUsuarios":', Object.keys(response));
        return [];
      }
      
      console.log(`Se encontraron ${response.getUsuarios.length} usuarios`);
      return response.getUsuarios || [];
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }


  @Query(() => [VoluntarioType])
  async voluntarios() {
    try {
      const query = `
        query {
          getVoluntarios {
            voluntariosId
            habilidades
            disponibilidad
            usuario {
              usuariosId
              nombre
              apellido
              correo
              telefono
              tipo
            }
          }
        }
      `;
      console.log('Ejecutando consulta de voluntarios...');
      const response = await this.graphqlRequest(query);
      console.log('Respuesta del servidor:', JSON.stringify(response, null, 2));
      
      if (!response) {
        console.error('No se recibió respuesta del servidor');
        return [];
      }
      
      if (!response.getVoluntarios) {
        console.error('La respuesta no contiene el campo "getVoluntarios":', Object.keys(response));
        return [];
      }
      
      console.log(`Se encontraron ${response.getVoluntarios.length} voluntarios`);
      return response.getVoluntarios || [];
    } catch (error) {
      console.error('Error al obtener voluntarios:', error);
      return [];
    }
  }

  @Query(() => [EventoType])
  async eventos() {
    const query = `
      query {
        getEventos {
          eventosId
          nombre
          fecha
          hora
          ubicacion
          voluntariosNecesarios
          descripcionEventos
        }
      }
    `;
    try {
      const data = await this.graphqlRequest(query);
      console.log('Response from GraphQL server:', JSON.stringify(data, null, 2)); // Add this line for debugging
      return data?.getEventos || [];
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      return [];
    }
  }


  //Para mutaciones 
  @Mutation(() => EventoType)
  async createEvento(@Args('evento') evento: CreateEventoInput) {
    const mutation = `
      mutation CreateEvento($evento: EventosInput!) {
        createEvento(evento: $evento) {
          eventosId
          nombre
          fecha
          hora
          ubicacion
          voluntariosNecesarios
          descripcionEventos
        }
      }
    `;
    const variables = { evento };
    const data = await this.graphqlRequest(mutation, variables);
    return data.createEvento;

  }

  @Mutation(() => EventoType)
  async updateEvento(@Args('evento') evento: EventosInput) {
    const mutation = `
      mutation UpdateEvento($evento: EventosInput!) {
        updateEvento(evento: $evento) {
          eventosId
          nombre
          fecha
          hora
          ubicacion
          voluntariosNecesarios
          descripcionEventos
        }
      }
    `;
    const variables = { evento };
    const data = await this.graphqlRequest(mutation, variables);
    return data.updateEvento;
  }

  @Mutation(() => Boolean)
  async deleteEvento(@Args('evento') evento: EventosDelete) {
    const mutation = `
      mutation DeleteEvento($evento: EventosDelete!) {
        deleteEvento(evento: $evento)
      }
    `;
    const variables = { evento };
    const data = await this.graphqlRequest(mutation, variables);
    return data.deleteEvento;
  }


  //Crear y borra usuario
  @Mutation(() => UsuarioType)
  async createUsuario(@Args('input') input: CreateUsuarioInput) {
    const mutation = `
      mutation CreateUsuario($usuario: UsuariosInput!) {
        createUsuario(usuario: $usuario) {
          usuariosId
          nombre
          apellido
          correo
          telefono
          tipo
        }
      }
    `;
    const variables = { usuario: input };
    const data = await this.graphqlRequest(mutation, variables);
    return data.createUsuario;
  }

  @Mutation(() => UsuarioType)
  async updateUsuario(@Args('usuario') usuario: UsuariosInput) {  
    const mutation = `
      mutation UpdateUsuario($usuario: UsuariosInput!) {  
        updateUsuario(usuario: $usuario) {
          usuariosId
          nombre
          apellido
          correo
          telefono
          tipo
        }
      }
    `;
    const variables = { usuario };  
    const data = await this.graphqlRequest(mutation, variables);
    return data.updateUsuario;
  }

  @Mutation(() => Boolean)
  async deleteUsuario(@Args('usuario') usuario: UsuariosDelete) {
    const mutation = `
      mutation DeleteUsuario($usuario: UsuariosDelete!) {
        deleteUsuario(usuario: $usuario)
      }
    `;
    const variables = { 
      usuario: {
        usuariosId: usuario.usuariosId
      }
    };
    const data = await this.graphqlRequest(mutation, variables);
    return data.deleteUsuario;
  }

  // MUTACIONES VOLUNTARIOS

  @Mutation(() => VoluntarioType)
  async createVoluntario(@Args('voluntario') voluntario: CreateVoluntarioInput) {
    try {
      // If voluntariosId is not provided, find the next available ID
      let voluntariosId = voluntario.voluntariosId;
      
      if (!voluntariosId) {
        const getVoluntariosQuery = `
          query {
            getVoluntarios {
              voluntariosId
            }
          }
        `;
        
        const existingVoluntarios = await this.graphqlRequest(getVoluntariosQuery);
        const usedIds = existingVoluntarios?.getVoluntarios?.map((v: any) => v.voluntariosId) || [];
        voluntariosId = usedIds.length > 0 ? Math.max(...usedIds) + 1 : 1;
      }
      
      // Create new volunteer with the provided or generated ID
      const newVoluntario = {
        ...voluntario,
        voluntariosId
      };

      const mutation = `
        mutation CreateVoluntario($voluntario: VoluntariosInput!) {
          createVoluntario(voluntario: $voluntario) {
            voluntariosId
            habilidades
            disponibilidad
            usuario {
              usuariosId
              nombre
            }
          }
        }
      `;
      
      const variables = { voluntario: newVoluntario };
      const data = await this.graphqlRequest(mutation, variables);
      
      if (!data || !data.createVoluntario) {
        throw new Error('Failed to create volunteer: No data returned from server');
      }
      
      return data.createVoluntario;
    } catch (error) {
      console.error('Error creating volunteer:', error);
      throw error;
    }
  }   
  
  @Mutation(() => VoluntarioType)
  async updateVoluntario(@Args('voluntario') voluntario: VoluntariosInput) {
    const mutation = `
      mutation UpdateVoluntario($voluntario: VoluntariosInput!) {
        updateVoluntario(voluntario: $voluntario) {
          voluntariosId
          habilidades
          disponibilidad
          usuario {
            usuariosId
            nombre
          }
        }
      }
    `;
    const variables = { voluntario };
    const data = await this.graphqlRequest(mutation, variables);
    return data.updateVoluntario;
  }

  @Mutation(() => Boolean)
  async deleteVoluntario(@Args('voluntario') voluntario: VoluntariosDelete) {
    const mutation = `
      mutation DeleteVoluntario($voluntario: VoluntariosDelete!) {
        deleteVoluntario(voluntario: $voluntario)
      }
    `;
    const variables = { voluntario };
    const data = await this.graphqlRequest(mutation, variables);
    return data.deleteVoluntario;
  }
}
