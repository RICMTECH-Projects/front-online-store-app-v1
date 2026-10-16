# Auditoría de estándares JTN-*

**Fecha:** 2026-10-16  
**Alcance:** inspección estática de `src/app`, `src/modules`, configuración, dependencias, estado, HTTP, formularios, tablas y pruebas; añadí una suite unitaria fuera de `src`.  
**Resultado:** alineación sustancial, no cumplimiento total demostrado. Typecheck, lint y suite unitaria pasan. El build no puede terminar en este entorno porque Next no logra descargar fuentes Google.

## Revisión transversal posterior al refactor

Se revisaron `admin`, `auth`, `public`, `fulfillment`, `seller` y `shared`. La búsqueda estática no encontró llamadas directas a estado, efectos, formularios, consultas o navegación de React/Next en componentes de dominio; viven en hooks. Los hooks de datos antes agrupados en `use-fulfillment`, `use-seller-portal`, `use-customer-commerce` y `use-public-store` ahora tienen un archivo por hook y los archivos anteriores son puntos de exportación compatibles. No quedan archivos TypeScript/TSX de más de 500 líneas ni componentes de dominio con controles HTML nativos de formulario; las primitivas shadcn y los wrappers Controller siguen siendo excepciones deliberadas.

Los listados reactivos de administración, órdenes de vendedor y catálogo del vendedor usan `DataTable` compartida basada en TanStack Table, con columnas en cada dominio. Se eliminaron los archivos de mocks administrativos y las referencias a ellos. En público se quitó el formulario de contacto que simulaba éxito, los canales/dirección de ejemplo, la suscripción sin backend y los distintivos de pago sin integración; la página de contacto explica la disponibilidad real. Se mantuvieron las decisiones del backend documentadas: los estados comercial, fulfillment y envío se muestran y actualizan por separado.

Esta revisión demuestra estructura y chequeos estáticos. No demuestra que cada flujo complete una operación real ni reemplaza pruebas manuales de diseño, accesibilidad y permisos con el backend activo.

## Resumen de verificación

| Área JTN | Estado | Evidencia |
|---|---|---|
| App Router y límites servidor/cliente | Alineado | Rutas delgadas, peticiones interactivas vía BFF, sesión JWT en cookie HttpOnly. `src/app/api` contiene Route Handlers; la UI no recibe el token. |
| Módulos por dominio | Mejorado | Servicios centralizados; componentes no llaman Axios. Consumidores fuera de auth/cart ahora usan sus APIs públicas. |
| HTTP y estado remoto | Alineado con deuda menor | Axios centralizado, TanStack Query para datos remotos y normalización `HttpError`; Zustand no duplica respuestas de backend. |
| Estado cliente | Alineado | Zustand enfocado en sesión/carrito; carrito conserva solo `productId`/cantidad y separa invitado/usuario. No se encontró Redux. |
| Formularios | Alineado por inspección | Formularios usan React Hook Form y Zod; IDs, estados y entradas externas vuelven a validarse en BFF cuando aplica. |
| Tablas | Alineado | HTML semántico y TanStack Table donde corresponde; filtros/paginación de operaciones viven en URL. |
| Design system y accesibilidad | Parcial | shadcn/Radix y tokens CSS presentes. Hay muchas clases de paleta `zinc-*`; auditoría automatizada no sustituye revisión visual/teclado/lector de pantalla. |
| Pruebas | Suite unitaria inicial | Vitest en `__tests__/modules/**`, fuera de `src`, espejando los dominios. 5 archivos y 18 casos. RTL/MSW/E2E no se añadieron porque alcance pedido fue unit testing. |

## Cambios hechos durante la auditoría

- Añadí Vitest, `pnpm test`, `pnpm test:watch`, `vitest.config.mts` y estructura `__tests__/modules/...`.
- Añadí tests de autorización multirrol/rutas, schema de checkout, transiciones fulfillment, carrito por usuario/invitado y normalización de errores HTTP.
- Un test descubrió que `{ code: "UNKNOWN" }` se mostraba como mensaje. El extractor ahora solo busca claves reconocidas y errores de campo; payload opaco recibe mensaje seguro.
- Configuré Biome como linter/formateador; `pnpm lint` analiza `src`, `__tests__` y configuración Vitest sin reescribir archivos.
- Reduje timeout Axios por defecto de ~16 minutos a 30 segundos para limitar esperas colgadas. Una llamada específica puede configurar timeout propio mediante Axios config.
- Añadí APIs públicas del módulo auth y de la subárea `cart/store` para evitar imports externos a sus implementaciones internas.
- Reemplacé `images.domains` obsoleto por `images.remotePatterns`.

## Verificación ejecutada

| Comando | Resultado |
|---|---|
| `pnpm exec tsc --noEmit` | Pasa |
| `pnpm lint` | Pasa sin diagnósticos |
| `pnpm test` | Pasa: 5 archivos, 18 pruebas |
| `git diff --check` | Pasa; solo advertencias de normalización CRLF de Git |
| Matriz de APIs | 70/70 filas presentes |
| `pnpm build` | Bloqueado por red al descargar Google Fonts `Anton`, `Antonio` e `Inter`; no prueba un fallo de TypeScript ni confirma build exitoso |
| Backend activo / APIs | No ejecutado |

## Deuda que queda

1. Repetir `pnpm build` en un entorno con acceso a `fonts.googleapis.com` y registrar resultado.
2. Añadir MSW/RTL para formularios, estados HTTP 401/403/422 e invalidación de queries; Playwright para login, checkout y aislamiento vendedor.
3. Hacer revisión manual de accesibilidad con teclado y lector de pantalla, especialmente tablas/formularios del portal y checkout.
4. Evaluar migración gradual de utilidades `zinc-*` a tokens semánticos en cambios visuales futuros; no convertir esta auditoría en un rediseño transversal.
5. Ejecutar escenarios contra backend real y datos de prueba antes de aceptar contratos de permisos y logística.
