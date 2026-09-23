# REM Store

Aplicación de comercio electrónico para consultar productos, gestionar un carrito y realizar la administración básica de una tienda.

El proyecto incluye una tienda pública para clientes y un dashboard para usuarios con rol de negocio.

## Funcionalidades principales

- Catálogo de productos con categorías, filtros y ordenamiento.
- Vista de detalle de cada producto.
- Carrito de compras y resumen de compra.
- Registro, inicio y cierre de sesión.
- Cuenta de cliente con direccion y compras.
- Dashboard para gestionar productos.
- Carga de imágenes de productos.
- Diseño adaptable para dispositivos móviles y escritorio.

## Tecnologías

- Next.js 16 y React 19
- TypeScript
- Tailwind CSS
- Zustand para estado local
- TanStack Query para consultas
- Turborepo y pnpm para administrar el monorepo
- Zod para validación de datos

## Estructura

```text
apps/
  web/                 Aplicación principal de Next.js
packages/
  api-client/          Cliente HTTP, autenticación y JWT
  core/                Tipos, esquemas y utilidades compartidas
  ui/                  Componentes y estilos reutilizables
  eslint-config/       Configuración compartida de ESLint
  typescript-config/   Configuración compartida de TypeScript
```

## Requisitos

- Node.js 18 o superior
- pnpm 9
- Una API backend disponible para productos, usuarios, carrito y pedidos

## Instalación

```bash
pnpm install
```

Crea un archivo `.env.local` dentro de `apps/web`:

```env
API_URL=http://localhost:8080/api/v1
JWT_SECRET=tu_secreto_jwt
```

`API_URL` es opcional y usa esa dirección por defecto. `JWT_SECRET` debe coincidir con el secreto utilizado para firmar los tokens JWT del backend.

## Desarrollo

Para iniciar la aplicación web:

```bash
pnpm --filter web dev
```

Después abre [http://localhost:3000](http://localhost:3000).

También puedes iniciar las tareas del monorepo con:

```bash
pnpm dev
```

## Comandos útiles

```bash
pnpm build         # Compila las aplicaciones y paquetes
pnpm lint          # Ejecuta ESLint
pnpm check-types   # Comprueba los tipos de TypeScript
pnpm format        # Formatea archivos TypeScript y Markdown
```

## Producción

```bash
pnpm build
pnpm --filter web start
```

Antes de desplegar, configura `API_URL`, `JWT_SECRET` y las variables necesarias en el entorno de producción.
