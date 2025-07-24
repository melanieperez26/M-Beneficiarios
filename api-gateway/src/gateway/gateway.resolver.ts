import { Resolver, Query,Args } from '@nestjs/graphql';
import axios from 'axios';
import { OrganizacionesType } from './types/organizaciones.type';
import { DistribucionesType } from './types/distribuciones.type';
import { InventariosType } from './types/inventarios.type';
import { SolicitudesType } from './types/solicitudes.type';
import { RutasOptimasType } from './types/rutasoptimas.type';


@Resolver()
export class GatewayResolver {
    private microserviceUrl=  'http://localhost:3000/graphql';

    @Query(() => [OrganizacionesType])
    async organizaciones(): Promise<OrganizacionesType[]> {
        const response = await axios.post(this.microserviceUrl, {
            query: `
                query {
                    organizaciones {
                        id
                        nombre
                        lat
                        lng
                        capacidad
                        usuarioId
                    }
                }
            `
        });

        return response.data.data.organizaciones;
    }

    @Query(() => [DistribucionesType])
    async distribuciones(): Promise<DistribucionesType[]> {
        const response = await axios.post(this.microserviceUrl, {
            query: `
                query {
                    distribuciones {
                        id
                        organizacionId
                        donanteId
                        cantidad
                        productos
                    }
                }
            `
        });

        return response.data.data.distribuciones;
    }

    @Query(() => [InventariosType])
    async inventarios(): Promise<InventariosType[]> {
        const response = await axios.post(this.microserviceUrl, {
            query: `
                query {
                    inventarios {
                        id
                        organizacionId
                        producto
                        cantidad
                        ultimoAbastecimiento
                    }
                }
            `
        });

        return response.data.data.inventarios;
    }

    @Query(() => [SolicitudesType])
    async solicitudes(): Promise<SolicitudesType[]> {
        const response = await axios.post(this.microserviceUrl, {
            query: `
                query {
                    solicitudes {
                        id
                        productos_necesitados
                        urgencia
                        organizacionId
                    }
                }
            `
        });

        return response.data.data.solicitudes;
    }

    @Query(() => [RutasOptimasType])
    async rutasOptimas(): Promise<RutasOptimasType[]> {
        const response = await axios.post(this.microserviceUrl, {
            query: `
                query {
                    rutasOptimas {
                        id
                        secuencia
                        distancia
                        distribucionId
                    }
                }
            `
        });

        return response.data.data.rutasOptimas;
    }
}
