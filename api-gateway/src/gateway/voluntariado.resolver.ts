import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import axios from 'axios';
import { VoluntarioType } from './types/voluntariado.type';
import { UsuarioType } from './types/voluntariado.type';
import { EventoType } from './types/voluntariado.type';
import { CreateEventoInput } from './types/InputType';
import { CreateUsuarioInput } from './types/InputType';
import { CreateVoluntarioInput } from './types/InputType';
import { UpdateEventoInput } from './types/InputType';
import { UpdateUsuarioInput } from './types/InputType';
import { UpdateVoluntarioInput } from './types/InputType';
import { DeleteEventoInput } from './types/InputType';
import { DeleteUsuarioInput } from './types/InputType';
import { DeleteVoluntarioInput } from './types/InputType';

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
          lugar
          tipo
          estado
        }
      }
    `;
    const data = await this.graphqlRequest(query);
    return data.getEventos || [];
}


  //Para mutaciones 
  @Mutation(() => EventoType)
  async createEvento(@Args('input') input: CreateEventoInput) {
    const mutation = `
      mutation CreateEvento(
        $eventosId: Int!,
        $nombre: String!,
        $fecha: String!,
        $hora: String!,
      ) {
        createEvento(evento: {
          eventosId: $eventosId,
          nombre: $nombre,
          fecha: $fecha,
          hora: $hora,
        }) {
          eventosId
          nombre
          fecha
        }
      }
    `;
    const variables = { ...input };
    const data = await this.graphqlRequest(mutation, variables);
    return data.createEvento;
  }


  //Crear y borra usuario
  @Mutation(() => UsuarioType)
  async createUsuario(@Args('input') input: CreateUsuarioInput) {
    const mutation = `
      mutation CreateUsuario($usuario: UsuariosInput!) {
        createUsuario(usuario: $usuario) {
          UsuariosId
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
  async updateUsuario(@Args('input') input: UpdateUsuarioInput) {
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
    const variables = { usuario: input };
    const data = await this.graphqlRequest(mutation, variables);
    return data.updateUsuario;
  }

  @Mutation(() => Boolean)
  async deleteUsuario(@Args('input') input: DeleteUsuarioInput) {
    const mutation = `
      mutation DeleteUsuario($usuario: UsuariosDelete!) {
        deleteUsuario(usuario: $usuario)
      }
    `;
    const variables = { usuario: input };
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
  async updateVoluntario(@Args('input') input: UpdateVoluntarioInput) {
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
    const variables = { voluntario: input };
    const data = await this.graphqlRequest(mutation, variables);
    return data.updateVoluntario;
  }

  @Mutation(() => Boolean)
  async deleteVoluntario(@Args('input') input: DeleteVoluntarioInput) {
    const mutation = `
      mutation DeleteVoluntario($voluntario: VoluntariosDelete!) {
        deleteVoluntario(voluntario: $voluntario)
      }
    `;
    const variables = { voluntario: input };
    const data = await this.graphqlRequest(mutation, variables);
    return data.deleteVoluntario;
  }
}
