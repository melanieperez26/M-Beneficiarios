import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

export interface NuevoUsuarioEvent {
  event: 'nuevo_usuario';
  data: {
    id: string;
    nombre: string;
    email: string;
    tipo: string;
    fecha_creacion: string;
  };
  timestamp: string;
}

@Injectable()
export class WebSocketClientService implements OnModuleInit, OnModuleDestroy {
  private socket: Socket;
  private readonly logger = new Logger(WebSocketClientService.name);
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000; // 5 segundos

  public nuevoVoluntario$ = new Subject<any>();


  constructor() {
    this.initializeSocket();
  }

  private initializeSocket() {
    this.socket = io('http://localhost:4005', {
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectInterval,
      autoConnect: true
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {

    
    this.socket.on('connect', () => {
      this.reconnectAttempts = 0;
      this.logger.log('Conectado al servidor de WebSocket');
      
      // Suscribirse a eventos
      this.socket.emit('message', {
        event: 'join',
        data: { room: 'admin' }
      });
    });

    this.socket.on('disconnect', (reason: string) => {
      this.logger.warn(`Desconectado del servidor: ${reason}`);
      this.attemptReconnect();
    });

    this.socket.on('connect_error', (error: Error) => {
      this.logger.error(`Error de conexión: ${error.message}`);
      this.attemptReconnect();
    });

    // Escuchar el evento 'notificacion' que viene del servidor
    this.socket.on('notificacion', (data: any) => {
        this.logger.log('📩 Notificación recibida:', JSON.stringify(data, null, 2));

         // Verificar si es un evento de nuevo voluntario
      if (data.event === 'nuevo_voluntario') {
        this.logger.log('🎉 Nuevo voluntario detectado:', data.data);
        // Emitir el evento a través del Subject
        this.nuevoVoluntario$.next(data.data);
      }
    });

    // Para depuración: escuchar todos los eventos
    this.socket.onAny((event, ...args) => {
        this.logger.debug(`🔍 Evento [${event}]:`, ...args);
      });

    
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.logger.log(`Intentando reconectar (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.socket.connect();
      }, this.reconnectInterval);
    } else {
      this.logger.error('Número máximo de intentos de reconexión alcanzado');
    }
  }

  emitirEvento(evento: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit('message', {
        event: evento,
        data: data,
        timestamp: new Date().toISOString()
      });
      this.logger.log(`Evento emitido: ${evento}`, JSON.stringify(data, null, 2));
    } else {
      this.logger.warn('No conectado. Evento no enviado.');
    }
  }

  onModuleInit() {
    // La conexión se maneja en el constructor
  }

  onModuleDestroy() {
    if (this.socket) {
      this.socket.off('notificacion');
      this.socket.off('connection');
      this.socket.disconnect();
    }
  }
}
