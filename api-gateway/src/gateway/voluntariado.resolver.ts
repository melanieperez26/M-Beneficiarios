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
    const query = `
        query {
        getUsuarios {
            UsuariosId
            nombre
            apellido
            correo
            telefono
            tipo
        }
        }
    `;
    const data = await this.graphqlRequest(query);
    return data.getUsuarios || [];
    }


  @Query(() => [VoluntarioType])
  async voluntarios() {
    const query = `
      query {
        getVoluntarios {
          voluntariosId
          habilidades
          disponibilidad
          usuario {
            UsuariosId
            nombre
            apellido
            correo
            telefono
            tipo
          }
        }
      }
    `;
    const data = await this.graphqlRequest(query);
    return data.voluntarios || [];
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
  async createVoluntario(@Args('input') input: CreateVoluntarioInput) {
    const mutation = `
      mutation CreateVoluntario($voluntario: VoluntariosInput!) {
        createVoluntario(voluntario: $voluntario) {
          voluntariosId
          habilidades
          disponibilidad
          usuario {
            UsuariosId
            nombre
          }
        }
      }
    `;
    const variables = { voluntario: input };
    const data = await this.graphqlRequest(mutation, variables);
    return data.createVoluntario;
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
            UsuariosId
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
  





