import { Resolver, Query,Args, Mutation } from '@nestjs/graphql';
import axios from 'axios';
import { OrganizacionesType } from './types/organizaciones.type';
import { DistribucionesType } from './types/distribuciones.type';
import { InventariosType } from './types/inventarios.type';
import { SolicitudesType } from './types/solicitudes.type';
import { RutasOptimasType } from './types/rutasoptimas.type';
import { CreateOrganizacioneInput } from './types/InputTypesBeneficiarios';


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

    @Mutation(() => OrganizacionesType)
    async createOrganizacione(@Args('input') input: CreateOrganizacioneInput): Promise<OrganizacionesType> {
        const mutation = `
            mutation CreateOrganizacione($input: CreateOrganizacioneInput!) {
                createOrganizacione(createOrganizacioneInput: $input) {
                    id
                    nombre
                    lat
                    lng
                    capacidad
                    usuarioId
                }
            }
        `;
    
        const requestData = {
            query: mutation,
            variables: { input }
        };

        console.log('===== REQUEST TO MICROSERVICE =====');
        console.log('URL:', this.microserviceUrl);
        console.log('Request Data:', JSON.stringify(requestData, null, 2));
        console.log('Input Type:', typeof input, input);
        console.log('Input Keys:', Object.keys(input));
        console.log('Input Values:', Object.values(input));

        try {
            const response = await axios({
                method: 'post',
                url: this.microserviceUrl,
                data: requestData,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                validateStatus: () => true
            });

            console.log('\n===== RESPONSE FROM MICROSERVICE =====');
            console.log('Status:', response.status, response.statusText);
            console.log('Headers:', response.headers);
            console.log('Response Data:', JSON.stringify(response.data, null, 2));
            
            if (response.status !== 200) {
                console.error('HTTP Error Details:', {
                    status: response.status,
                    statusText: response.statusText,
                    data: response.data,
                    headers: response.headers
                });
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }

            if (response.data.errors) {
                console.error('GraphQL Errors:', response.data.errors);
                throw new Error('Error from microservice: ' + 
                    JSON.stringify(response.data.errors, null, 2));
            }

            if (!response.data?.data?.createOrganizacione) {
                console.error('Unexpected response format:', response.data);
                throw new Error('Unexpected response format from microservice');
            }

            return response.data.data.createOrganizacione;
        } catch (error) {
            console.error('\n===== ERROR DETAILS =====');
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
                console.error('Request Config:', {
                    url: error.config?.url,
                    method: error.config?.method,
                    data: error.config?.data,
                    headers: error.config?.headers
                });
            } else if (error.request) {
                console.error('No response received. Request details:', {
                    url: this.microserviceUrl,
                    method: 'POST',
                    data: JSON.stringify(requestData, null, 2)
                });
                console.error('Error Request:', error.request);
            } else {
                console.error('Error Message:', error.message);
                console.error('Error Stack:', error.stack);
            }
            throw new Error('Failed to create organizacion: ' + error.message);
        } finally {
            console.log('\n===== REQUEST COMPLETED =====\n');
        }
    }
}
