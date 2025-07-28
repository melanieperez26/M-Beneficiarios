import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DonanteType, ReceptorType, DonanteInputType, ReceptorInputType } from './types/donantes.type';
import { Buffer } from 'buffer';

@Injectable()
export class DonantesService {
  private readonly baseUrl = 'http://localhost:8080/api/donantes';
  private readonly logger = new Logger(DonantesService.name);
  
  // Configura tus credenciales aquí
  private readonly username = 'Nathalia';  // Reemplaza con tu usuario
  private readonly password = 'aracely123321'; // Reemplaza con tu contraseña

  constructor(private readonly httpService: HttpService) {}

  private getAuthHeaders() {
    // Usar Buffer para la codificación Base64 en Node.js
    const token = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    const authHeader = `Basic ${token}`;
    
    this.logger.debug('Generando encabezados de autenticación:', {
      username: this.username,
      tokenLength: token.length,
      authType: 'Basic Auth'
    });
    
    return {
      'Authorization': authHeader,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async obtenerTodos(): Promise<DonanteType[]> {
    try {
      const headers = this.getAuthHeaders();
      
      this.logger.debug('Solicitando lista de donantes', {
        url: this.baseUrl,
        method: 'GET',
        headers: {
          ...headers,
          Authorization: 'Basic [REDACTED]' // No exponer credenciales en logs
        }
      });
      
      const response = await firstValueFrom(
        this.httpService.get<DonanteType[]>(
          this.baseUrl,
          { 
            headers,
            validateStatus: (status) => {
              this.logger.debug(`Validando estado de respuesta: ${status}`);
              return status < 500; // Permitir códigos 4xx para manejo personalizado
            }
          }
        )
      );

      this.logger.debug('Respuesta recibida de la API:', {
        status: response.status,
        headers: response.headers,
        data: response.data
      });

      return Array.isArray(response.data) ? response.data : [response.data];
      
    } catch (error) {
      const errorDetails = {
        message: error.message,
        code: error.code,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          headers: error.response?.headers,
          data: error.response?.data
        },
        request: {
          method: error.config?.method,
          url: error.config?.url,
          headers: {
            ...error.config?.headers,
            Authorization: error.config?.headers?.Authorization ? 'Basic [REDACTED]' : undefined
          },
          data: error.config?.data
        }
      };
      
      this.logger.error('Error detallado al obtener donantes:', JSON.stringify(errorDetails, null, 2));
      
      let errorMessage = 'No se pudieron obtener los donantes. ';
      if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage = 'Error de autenticación. Verifica las credenciales.';
      } else if (error.response?.data?.message) {
        errorMessage += `Error del servidor: ${error.response.data.message}`;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'No se pudo conectar al servidor. Verifica que el servicio esté en ejecución.';
      } else if (error.response?.data) {
        errorMessage += `Detalles: ${JSON.stringify(error.response.data)}`;
      }
      
      throw new Error(errorMessage);
    }
  }

  async obtenerPorId(id: number): Promise<DonanteType | null> {
    try {
      const url = `${this.baseUrl}/${id}`;
      this.logger.log(`Haciendo petición a: ${url}`);
      
      const response = await firstValueFrom(
        this.httpService.get<DonanteType>(
          url,
          { headers: this.getAuthHeaders() }
        )
      );

      return response.data;
      
    } catch (error) {
      this.logger.error(`Error al obtener donante con ID ${id}:`, {
        message: error.message,
        status: error.response?.status,
      });
      return null;
    }
  }

  async crearDonante(donanteInput: DonanteInputType): Promise<DonanteType> {
    try {
      this.logger.log('Creando nuevo donante', { donanteInput });
      
      // Mapear los campos del input a los que espera el backend
      const requestBody = {
        nombre: donanteInput.nombre,
        email: donanteInput.email,
        tipo: donanteInput.tipo || 'persona', // Valor por defecto 'persona' si no se especifica
        telefono: donanteInput.telefono,
        contacto: donanteInput.contacto || null,
        direccion: donanteInput.direccion
      };
      
      const headers = {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json'
      };
      
      this.logger.debug('Enviando petición a la API:', {
        url: this.baseUrl,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: headers.Authorization ? 'Basic [REDACTED]' : undefined
        },
        data: requestBody
      });
      
      const response = await firstValueFrom(
        this.httpService.post<DonanteType>(
          this.baseUrl,
          requestBody,
          { 
            headers,
            validateStatus: (status) => status < 500
          }
        )
      );

      this.logger.log('Donante creado exitosamente', {
        id: response.data.id,
        status: response.status
      });

      return response.data;
      
    } catch (error) {
      const errorDetails = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: {
            ...error.config?.headers,
            Authorization: error.config?.headers?.Authorization ? 'Basic [REDACTED]' : undefined
          },
          data: error.config?.data
        }
      };
      
      this.logger.error('Error detallado al crear donante:', errorDetails);
      
      let errorMessage = 'No se pudo crear el donante. ';
      if (error.response?.status === 400) {
        errorMessage = 'Error de validación en los datos enviados.';
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage = 'Error de autenticación. Verifica las credenciales.';
      } else if (error.response?.data?.message) {
        errorMessage += `Error del servidor: ${error.response.data.message}`;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'No se pudo conectar al servidor. Verifica que el servicio esté en ejecución.';
      }
      
      throw new Error(errorMessage);
    }
  }

  async eliminarDonante(id: number): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/${id}`;
      this.logger.log(`Eliminando donante con ID: ${id}`);
      
      const headers = this.getAuthHeaders();
      
      this.logger.debug('Enviando petición DELETE a la API:', {
        url,
        method: 'DELETE',
        headers: {
          ...headers,
          Authorization: 'Basic [REDACTED]' // Mask the actual token in logs
        }
      });
      
      const response = await firstValueFrom(
        this.httpService.delete(
          url,
          { 
            headers,
            validateStatus: (status) => status < 500
          }
        )
      );

      if (response.status === 200 || response.status === 204) {
        this.logger.log(`Donante con ID ${id} eliminado exitosamente`);
        return true;
      }
      
      throw new Error(`Error inesperado al eliminar el donante: ${response.status} ${response.statusText}`);
      
    } catch (error) {
      const errorDetails = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: {
            ...error.config?.headers,
            Authorization: error.config?.headers?.Authorization ? 'Basic [REDACTED]' : undefined
          }
        }
      };
      
      this.logger.error('Error detallado al eliminar donante:', errorDetails);
      
      let errorMessage = 'No se pudo eliminar el donante. ';
      if (error.response?.status === 404) {
        errorMessage = 'El donante no fue encontrado.';
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage = 'No autorizado para eliminar este donante.';
      } else if (error.response?.data?.message) {
        errorMessage += `Error del servidor: ${error.response.data.message}`;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'No se pudo conectar al servidor. Verifica que el servicio esté en ejecución.';
      }
      
      throw new Error(errorMessage);
    }
  }
}

@Injectable()
export class ReceptoresService {
  private readonly baseUrl = 'http://localhost:8080/api/receptores';
  private readonly logger = new Logger(ReceptoresService.name);
  
  // Mismas credenciales que en DonantesService
  private readonly username = 'Nathalia';
  private readonly password = 'aracely123321';

  constructor(private readonly httpService: HttpService) {}

  private getAuthHeaders() {
    const token = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    const authHeader = `Basic ${token}`;
    
    this.logger.debug('Generando encabezados de autenticación (Receptores):', {
      username: this.username,
      tokenLength: token.length,
      authType: 'Basic Auth'
    });
    
    return {
      'Authorization': authHeader,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async obtenerTodos(): Promise<ReceptorType[]> {
    try {
      this.logger.log(`Haciendo petición a: ${this.baseUrl}`);
      const response = await firstValueFrom(
        this.httpService.get<ReceptorType[]>(
          this.baseUrl,
          { headers: this.getAuthHeaders() }
        )
      );
      
      // Log the complete response to understand the structure
      this.logger.debug('Respuesta completa de la API:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });

      // Log the first item's structure if available
      if (response.data && response.data.length > 0) {
        this.logger.debug('Estructura del primer receptor:', {
          keys: Object.keys(response.data[0]),
          values: response.data[0]
        });
      }

      return Array.isArray(response.data) ? response.data : [response.data];
      
    } catch (error) {
      this.logger.error('Error en obtenerTodos los receptores:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        errorDetails: error.response ? {
          headers: error.response.headers,
          statusText: error.response.statusText,
          data: error.response.data
        } : undefined
      });
      throw new Error('No se pudieron obtener los receptores. Verifica la autenticación.');
    }
  }

  async obtenerPorId(id: number): Promise<ReceptorType | null> {
    try {
      const url = `${this.baseUrl}/${id}`;
      this.logger.log(`Haciendo petición a: ${url}`);
      
      const response = await firstValueFrom(
        this.httpService.get<ReceptorType>(
          url,
          { headers: this.getAuthHeaders() }
        )
      );

      return response.data;
      
    } catch (error) {
      this.logger.error(`Error al obtener receptor con ID ${id}:`, {
        message: error.message,
        status: error.response?.status,
      });
      return null;
    }
  }

  async crearReceptor(receptorInput: ReceptorInputType): Promise<ReceptorType> {
    try {
      this.logger.log('Creando nuevo receptor', { receptorInput });
      
      // Mapear los campos del input a los que espera el backend
      const requestBody = {
        nombre: receptorInput.nombre,
        email: receptorInput.email,
        tipo: receptorInput.tipo || 'persona', // Valor por defecto 'persona' si no se especifica
        ubicacion: receptorInput.direccion, // Mapear dirección a ubicación si es necesario
        direccion: receptorInput.direccion,
        telefono: receptorInput.telefono,
        contacto: receptorInput.contacto || null
        // Nota: Se eliminaron campos que no existen en el backend
      };
      
      const headers = {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json'
      };
      
      this.logger.debug('Enviando petición a la API:', {
        url: this.baseUrl,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: headers.Authorization ? 'Basic [REDACTED]' : undefined
        },
        data: requestBody
      });
      
      const response = await firstValueFrom(
        this.httpService.post<ReceptorType>(
          this.baseUrl,
          requestBody,
          { 
            headers,
            validateStatus: (status) => status < 500
          }
        )
      );

      this.logger.log('Receptor creado exitosamente', {
        id: response.data.id,
        status: response.status,
        data: response.data
      });

      return response.data;
      
    } catch (error) {
      const errorDetails = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: {
            ...error.config?.headers,
            Authorization: error.config?.headers?.Authorization ? 'Basic [REDACTED]' : undefined
          },
          data: error.config?.data
        }
      };
      
      this.logger.error('Error detallado al crear receptor:', errorDetails);
      
      // Mejorar el mensaje de error con más detalles
      let errorMessage = 'No se pudo crear el receptor. ';
      if (error.response?.status === 400) {
        errorMessage += 'Error de validación en los datos enviados.';
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage += 'Error de autenticación. Verifica las credenciales.';
      } else if (error.response?.data?.message) {
        errorMessage += `Error del servidor: ${error.response.data.message}`;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'No se pudo conectar al servidor. Verifica que el servicio esté en ejecución.';
      }
      
      throw new Error(errorMessage);
    }
  }

  async eliminarReceptor(id: number): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/${id}`;
      this.logger.log(`Eliminando receptor con ID: ${id}`);
      
      const headers = this.getAuthHeaders();
      
      this.logger.debug('Enviando petición DELETE a la API:', {
        url,
        method: 'DELETE',
        headers: {
          ...headers,
          Authorization: 'Basic [REDACTED]' // Mask the actual token in logs
        }
      });
      
      const response = await firstValueFrom(
        this.httpService.delete(
          url,
          { 
            headers,
            validateStatus: (status) => status < 500
          }
        )
      );

      if (response.status === 200 || response.status === 204) {
        this.logger.log(`Receptor con ID ${id} eliminado exitosamente`);
        return true;
      }
      
      throw new Error(`Error inesperado al eliminar el receptor: ${response.status} ${response.statusText}`);
      
    } catch (error) {
      const errorDetails = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: {
            ...error.config?.headers,
            Authorization: error.config?.headers?.Authorization ? 'Basic [REDACTED]' : undefined
          }
        }
      };
      
      this.logger.error('Error detallado al eliminar receptor:', errorDetails);
      
      let errorMessage = 'No se pudo eliminar el receptor. ';
      if (error.response?.status === 404) {
        errorMessage = 'El receptor no fue encontrado.';
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage = 'No autorizado para eliminar este receptor.';
      } else if (error.response?.data?.message) {
        errorMessage += `Error del servidor: ${error.response.data.message}`;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'No se pudo conectar al servidor. Verifica que el servicio esté en ejecución.';
      }
      
      throw new Error(errorMessage);
    }
  }
}
