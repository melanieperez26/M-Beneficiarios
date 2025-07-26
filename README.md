# Proyecto Módulo Beneficiarios - Optimización de Rutas con IA (K-means)

## Descripción
Este proyecto es un backend desarrollado con **NestJS** y **TypeORM** para gestionar beneficiarios y organizaciones en Ecuador, incluyendo funcionalidades para optimizar rutas de distribución de alimentos utilizando un algoritmo de inteligencia artificial (IA) basado en **clustering K-means**.

---

## Tecnologías usadas

- **NestJS**: Framework Node.js para construir APIs escalables.
- **TypeORM**: ORM para conexión con base de datos PostgreSQL.
- **PostgreSQL**: Base de datos relacional.
- **kmeans-ts**: Librería para clustering K-means.
- **Postman**: Para pruebas de endpoints.

---

## Funcionalidades desarrolladas

### 1. Módulos principales

- **Organización**
  - Gestión CRUD de organizaciones con datos geográficos (latitud, longitud).
- **Distribución**
  - Gestión de distribuciones de alimentos.
  - Implementación de endpoint con IA para optimizar rutas agrupando organizaciones por proximidad geográfica.
- **Solicitud**
  - CRUD de solicitudes.
- **Ruta Óptima**
  - (Pendiente) Guardar rutas optimizadas generadas por el algoritmo de clustering.

### 2. Implementación de IA con clustering K-means

### 3. Gestión de Rutas Óptimas
- Sistema para almacenar y consultar rutas optimizadas generadas por el algoritmo de clustering.
- Entidades relacionadas:
  - `RutasOptima`: Almacena rutas optimizadas con su secuencia de organizaciones y distancia total.
  - `Distribucione`: Gestiona las distribuciones de alimentos y genera las rutas optimizadas.

### 4. Arquitectura de Entidades

Las entidades principales del sistema están relacionadas de la siguiente manera:

1. **Organización**
   - Contiene datos geográficos (latitud, longitud)
   - Es el punto de referencia para calcular distancias

2. **Distribucione**
   - Gestiona las distribuciones de alimentos
   - Utiliza el algoritmo K-means para agrupar organizaciones cercanas
   - Genera rutas optimizadas basadas en clusters

3. **RutasOptima**
   - Almacena las rutas generadas por el sistema de optimización
   - Contiene:
     - `secuencia`: JSON con el orden de visitas a organizaciones
     - `distancia`: Distancia total de la ruta
     - `distribucionId`: Referencia a la distribución asociada

- Se utiliza la librería `kmeans-ts` para agrupar organizaciones según sus coordenadas geográficas.
- El algoritmo agrupa las organizaciones en clusters (grupos) optimizados para mejorar la distribución.
- Endpoint disponible: `POST /api/distribution/optimize`
  - Parámetro opcional en body: `maxClusters` (número máximo de grupos/clusters).
  - Respuesta incluye los grupos con la secuencia de organizaciones y cantidad por grupo.

---

## Instrucciones para instalación y ejecución

1. Clonar repositorio y entrar en la carpeta:

   ```bash
   git clone https://github.com/melanieperez26/M-Beneficiarios.git
   cd modulo_beneficiarios


## Instalar dependencias

```bash
$ npm install
```

## Ejecutar aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Probar endpoint de optimización de rutas con IA usando Postman o similar:

Método: POST

URL: http://localhost:3000/api/distribution/optimize

Body JSON (opcional):

{
    "maxClusters": 3
}

## Ejecutar pruebas

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


# API Gateway

API Gateway para el sistema de gestión de voluntariado, construido con NestJS y GraphQL.

## Características

- Gestión de usuarios y perfiles
- Administración de organizaciones
- Control de inventario
- Manejo de voluntarios y sus habilidades
- Seguridad con JWT

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Servidor de base de datos PostgreSQL
- Servicios microservicios configurados

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/melanieperez26/M-Beneficiarios.git
cd api-gateway

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar el archivo .env con tus configuraciones

# Iniciar el servidor en modo desarrollo
npm run start:dev
```

## Uso

### Consultas Básicas

#### Obtener todos los usuarios
```graphql
query {
  usuarios {
    usuariosId
    nombre
    apellido
    correo
    telefono
    tipo
  }
}
```

#### Obtener un usuario por ID
```graphql
query {
  usuario(id: 1) {
    usuariosId
    nombre
    apellido
    correo
  }
}
```

#### Obtener todas las organizaciones
```graphql
query {
  organizaciones {
    id
    nombre
    direccion
    telefono
    correo
  }
}
```

### Mutaciones Comunes

#### Crear un nuevo usuario
```graphql
mutation {
  createUsuario(input: {
    nombre: "Nuevo",
    apellido: "Usuario",
    correo: "nuevo@ejemplo.com",
    telefono: 1234567890,
    tipo: "voluntario"
  }) {
    usuariosId
    nombre
    correo
  }
}
```

#### Actualizar una organización
```graphql
mutation {
  updateOrganizacion(id: 1, input: {
    nombre: "Nuevo Nombre",
    direccion: "Nueva Dirección",
    telefono: "987654321"
  }) {
    id
    nombre
    direccion
  }
}
```

## Estructura del Proyecto

```
src/
├── gateway/
│   ├── dto/                # Objetos de transferencia de datos
│   ├── types/              # Tipos GraphQL
│   ├── gateway.module.ts   # Módulo principal
│   └── gateway.resolver.ts # Resolvers GraphQL
├── main.ts                # Punto de entrada de la aplicación
└── app.module.ts          # Módulo raíz
```

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=tu_clave_secreta
GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```


## Resources - Documentación

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

