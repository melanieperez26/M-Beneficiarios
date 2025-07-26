import { Resolver, Query,Args, Mutation } from '@nestjs/graphql';
import axios from 'axios';
import { OrganizacionesType } from './types/organizaciones.type';
import { DistribucionesType } from './types/distribuciones.type';
import { InventariosType } from './types/inventarios.type';
import { SolicitudesType } from './types/solicitudes.type';
import { RutasOptimasType } from './types/rutasoptimas.type';
import { CreateOrganizacioneInput, CreateInventarioInput, CreateSolicitudeInput } from './types/InputTypesBeneficiarios';


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
        try {
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

            // Ensure dates are properly formatted
            const inventarios = response.data?.data?.inventarios?.map(item => ({
                ...item,
                ultimoAbastecimiento: item.ultimoAbastecimiento 
                    ? new Date(item.ultimoAbastecimiento).toISOString() 
                    : null
            })) || [];

            return inventarios;
        } catch (error) {
            console.error('Error fetching inventarios:', error);
            return [];
        }
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

    @Mutation(() => InventariosType)
    async createInventario(
        @Args('createInventarioInput') input: CreateInventarioInput
    ): Promise<InventariosType> {
        // Asegurarnos de que la fecha esté en formato ISO string
        const inputData = {
            organizacionId: input.organizacionId,
            producto: input.producto,
            cantidad: input.cantidad,
            ultimoAbastecimiento: input.ultimoAbastecimiento.toISOString()
        };

        const mutation = `
            mutation CreateInventario($input: CreateInventarioInput!) {
                createInventario(createInventarioInput: $input) {
                    id
                    organizacionId
                    producto
                    cantidad
                    ultimoAbastecimiento
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

            if (!response.data?.data?.createInventario) {
                console.error('Unexpected response format:', response.data);
                throw new Error('Unexpected response format from microservice');
            }

            // Convertir la respuesta para manejar correctamente la fecha
            const result = response.data.data.createInventario;
            return {
                ...result,
                ultimoAbastecimiento: new Date(result.ultimoAbastecimiento)
            };
        } catch (error) {
            console.error('\n===== ERROR DETAILS =====');
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received. Request details:', {
                    url: this.microserviceUrl,
                    method: 'POST',
                    data: JSON.stringify(requestData, null, 2)
                });
            } else {
                console.error('Error Message:', error.message);
            }
            throw new Error('Failed to create inventario: ' + error.message);
        } finally {
            console.log('\n===== REQUEST COMPLETED =====\n');
        }
    }

    @Mutation(() => SolicitudesType)
    async createSolicitude(
        @Args('createSolicitudeInput') input: CreateSolicitudeInput
    ): Promise<SolicitudesType> {
        // Ensure organizacionId is a number
        const numericInput = {
            ...input,
            organizacionId: typeof input.organizacionId === 'string' 
                ? parseInt(input.organizacionId, 10) 
                : input.organizacionId
        };
        const mutation = `
            mutation CreateSolicitude($input: CreateSolicitudeInput!) {
                createSolicitude(createSolicitudeInput: $input) {
                    id
                    productos_necesitados
                    urgencia
                    organizacionId
                }
            }
        `;

        try {
            console.log('\n===== REQUEST TO MICROSERVICE =====');
            console.log('URL:', 'http://localhost:3000/graphql');
            console.log('Request Data:', {
                query: mutation,
                variables: { input }
            });

            const response = await axios.post('http://localhost:3000/graphql', {
                query: mutation,
                variables: { input: numericInput }
            });

            console.log('\n===== RESPONSE FROM MICROSERVICE =====');
            console.log('Status:', response.status);
            console.log('Response Data:', response.data);

            if (!response.data.data || !response.data.data.createSolicitude) {
                throw new Error('Unexpected response format from microservice');
            }

            return response.data.data.createSolicitude;
        } catch (error) {
            console.error('\n===== ERROR DETAILS =====');
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Response Data:', error.response.data);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            console.error('\n===== REQUEST COMPLETED =====\n');
            throw new Error(`Failed to create solicitud: ${error.message}`);
        }finally {
            console.log('\n===== REQUEST COMPLETED =====\n');
        }
    }
}
