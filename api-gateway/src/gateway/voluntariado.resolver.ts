import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import axios from 'axios';
import { VoluntarioType } from './types/voluntariado.type';
import { UsuarioType } from './types/voluntariado.type';

@Resolver()
export class VoluntariadoResolver {
  private graphqlUrl = 'http://localhost:8000/graphql'; 


  async graphqlRequest(query: string, variables = {}) {
    const res = await axios.post(this.graphqlUrl, { query, variables });
    console.log("🔎 Respuesta del módulo:", JSON.stringify(res.data, null, 2));
    return res.data.data;
  }
  
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
          voluntarios_id
          nombre
          apellido
          correo
          telefono
          estado
        }
      }
    `;
    const data = await this.graphqlRequest(query);
    return data.getVoluntarios || [];
  }

  // Agrega más queries o mutaciones según lo necesites
}


