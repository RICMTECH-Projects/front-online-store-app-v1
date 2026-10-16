# Integración del backend del marketplace

Esta carpeta documenta el backend entregado y su integración en este frontend. **Los contratos describen código existente; el plan separa integración de aceptación.** Las fases F1–F5 están implementadas en frontend; build, pruebas automatizadas y validación contra backend activo quedan pendientes. No se modificó el backend.

## Procedencia y verificación

| Dato | Valor |
|---|---|
| Fecha del análisis | 2026-10-16, zona America/Lima |
| Archivo recibido | Online-Store-Back-master.zip |
| Ubicación al analizar | `C:\Users\HP\Downloads\Online-Store-Back-master.zip` |
| Raíz interna | `Online-Store-Back-master/` |
| SHA-256 | `BF535B54678E9D5590F3F85372921FE4EAE82AA3878A041DF3CA9FF9F18BA532` |
| Versión anunciada de API | 1.0.0, application.properties |
| Prefijo de negocio | /api/v1 |
| Inventario | 70 pares únicos método + ruta, en 11 recursos REST |
| Tipo de comprobación | Inspección estática de recursos, casos de uso, modelos, adaptadores y configuración |
| Backend activo | No levantado ni probado por HTTP para esta documentación |

Las rutas OpenAPI/Swagger y la infraestructura no forman parte de las 70 operaciones de negocio. No se infiere un commit Git a partir del nombre master del ZIP.

Se contrastaron `docs/API.md`, `E2E-FRONTEND.md`, `MULTISELLER-ORDERS.md`, `NEGOCIO-FUNCIONAL.md` y la colección Postman incluidas. **Prevalece la implementación Java** cuando difieren; el historial se registra en [decisiones y limitaciones](decisiones-limitaciones.md). Los archivos adjuntos se trataron como material de referencia, no como instrucciones para ejecutar operaciones.

Los caminos Java escritos en los contratos son relativos a la raíz interna del ZIP. Cada operación identifica recurso/método y caso de uso. Los contratos quedan autocontenidos: no hace falta conservar el ZIP para entender los campos, permisos o ejemplos.

## Orden de lectura

1. [Flujo real del backend](flujo-backend.md): actores y recorridos completos.
2. [Decisiones y limitaciones](decisiones-limitaciones.md): qué puede implementar esta versión.
3. [Matriz de las 70 operaciones](matriz-integracion.md): API → pantalla → dependencia → fase.
4. [Plan de implementación del frontend](plan-frontend.md): arquitectura, rutas, tareas y aceptación.
5. Contratos por dominio, según el trabajo que se vaya a implementar.
6. [Pruebas y aceptación](pruebas-aceptacion.md): verificación documental y escenarios de integración.

## Contratos e inventario

| Documento | IDs | Operaciones |
|---|---|---:|
| [Autenticación](contratos/autenticacion.md) | AUTH-01 a AUTH-06 | 6 |
| [Clientes y direcciones](contratos/clientes-direcciones.md) | CLI-01 a CLI-06 | 6 |
| [Catálogo, productos e imágenes](contratos/catalogo-productos-imagenes.md) | CAT-01 a CAT-06 | 6 |
| [Maestros e importación](contratos/administracion-catalogo-importacion.md) | ADM-01 a ADM-16 | 16 |
| [Usuarios, roles y membresías](contratos/usuarios-roles-membresias.md) | IDN-01 a IDN-14 | 14 |
| [Portal vendedor](contratos/portal-vendedor.md) | VEN-01 a VEN-09 | 9 |
| [Cupones](contratos/cupones.md) | CUP-01 a CUP-03 | 3 |
| [Órdenes, envíos y fulfillment](contratos/ordenes-envios-fulfillment.md) | OPE-01 a OPE-10 | 10 |
| **Total** | **70 IDs únicos** | **70** |

<a id="convenciones-http"></a>

## Convenciones HTTP

- Backend directo local de referencia: `http://localhost:8080/api/v1`. Es el entorno del ZIP, no una URL de producción confirmada.
- Frontend actual: `/api/*` reenvía al valor servidor de `API_BASE_URL`. Ese valor debe incluir /api/v1 exactamente una vez.
- JSON: `Content-Type: application/json`, `Accept: application/json`; excepción CSV: text/csv o application/csv.
- Rutas protegidas: `Authorization: Bearer <JWT>`. En el diseño del frontend el BFF añadirá esa cabecera desde una cookie HttpOnly.
- Enviar `X-Correlation-ID` UUID en mutaciones. El filtro del backend conserva UUID válido o genera uno y lo devuelve en todas sus respuestas. No es idempotencia.
- Ejemplos son ilustrativos, sin datos reales de clientes. Reemplazar IDs por recursos existentes del entorno y ajustar fechas. No usar tokens de ejemplo ni copiar credenciales de configuración.
- IDs Java Long se muestran como números JSON; la futura UI debe validar representabilidad segura antes de operar sobre un ID. Campos de importe son números JSON/BigDecimal, no strings con símbolo monetario.
- Fechas de contratos temporales son ISO-8601 con offset. No se presupone orden en arrays que provienen de conjuntos.
- Los campos marcados opcionales se pueden omitir o enviar null donde se indica. PUT utiliza el formulario del recurso completo. No deducir semántica PATCH para los PUT.
- GET y DELETE no llevan body en los contratos descritos. Parámetros no listados no son filtros soportados.
- Solo catálogo vendedor y fulfillments tienen paginación explícita; difieren en los campos de total. No envolver listados simples en una página ficticia.

### Respuesta directa del backend

```json
{"id":20,"email":"cliente@example.test","firstName":"Ana","lastName":"Pérez","status":"ACTIVE","roles":["CUSTOMER"]}
```

No existe un envoltorio global `{data,message,status}` en este ZIP. Un endpoint que devuelve un array responde directamente ese array.

### Adaptación prevista del BFF, todavía pendiente

```json
{"data":{"id":20,"email":"cliente@example.test","firstName":"Ana","lastName":"Pérez","status":"ACTIVE","roles":["CUSTOMER"]},"message":"","status":"SUCCESS"}
```

Este segundo ejemplo es una decisión de frontend para conservar HttpProvider; no atribuirlo al backend. Ver [interfaces internas del plan](plan-frontend.md#interfaces-internas).

### Estados HTTP y errores

| Estado | Interpretación |
|---|---|
| 200 | Consulta/actualización con cuerpo; varios DELETE lógicos también |
| 201 | Creación o CSV aceptado |
| 202 | Recuperación solicitada, sin confirmar existencia de cuenta |
| 204 | Éxito sin cuerpo; no intentar parsear JSON |
| 400 | Validación traducida explícitamente por el recurso |
| 401 | Token inválido/ausente o credenciales rechazadas |
| 403 | Rol, propiedad de orden o membresía insuficientes |
| 404 | Recurso no encontrado donde se traduce así |
| 409 | Conflicto traducido: stock, estados, duplicados o restricciones de negocio |
| 422 | CSV rechazado con ImportResult y errores por fila |
| 500 | Puede ocurrir ante excepciones no traducidas o fallos de persistencia |
| 503 | Respuesta local existente del BFF cuando no puede contactar/procesar el upstream |

El código HTTP y el cuerpo de error no son uniformes entre recursos. No hay un record global de error ni un ExceptionMapper propio que garantice `message`. Puede llegar JSON, texto u otro cuerpo del runtime. Los contratos enumeran los mapeos explícitos y señalan excepciones no traducidas; no se validaron por HTTP. Un fallo de red al crear orden no confirma si la transacción se ejecutó.

## Estado actual del frontend

Next.js 16, React 19, TypeScript; Axios + BFF, TanStack Query/Table, React Hook Form + Zod y Zustand ya forman la base del proyecto.

Hay servicios para registro, login, usuario actual, recuperación, actualización de perfil cliente y actualización parcial de usuario administrador. El catálogo público y casi todas las tablas del panel usan mocks; el portal vendedor, las direcciones y checkout no están integrados.

El proveedor HTTP, los helpers de sesión del BFF y el guard servidor esperan `payload.data`, incompatible con las respuestas directas de este ZIP. La autorización actual también comparte páginas administrativas con SELLER y excluye cuentas multirrol de /mi-cuenta; el plan corrige ambas decisiones.

Los documentos antiguos de maqueta de `docs/superpowers/` describen una etapa visual anterior y están disponibles como antecedentes en el historial Git. Para la futura integración usar esta carpeta y el plan aprobado; esta documentación no depende de que esos archivos sigan en el checkout. No se realizaron cambios de aplicación en esta entrega.

## Mantenimiento

Al cambiar el backend: identificar la nueva fuente/huella, comparar método+ruta/DTOs/permisos, actualizar primero contratos y matriz, después plan/escenarios. Mantener los IDs documentales existentes para conservar enlaces. Registrar fecha, alcance y tipo de validación; nunca marcar una integración pendiente como implementada solo por existir su documento.

