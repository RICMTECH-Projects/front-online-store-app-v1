# Plan de implementación del frontend basado en el backend

[Índice](README.md) · [Matriz de cobertura](matriz-integracion.md) · [Pruebas](pruebas-aceptacion.md)

**Estado:** F1–F5 implementadas en frontend. Pruebas automatizadas y validación contra backend activo quedan para la ronda posterior acordada; no se marcan como aceptación completa sin esa evidencia. Orden ejecutado: F1 → F2 → F3 → F4 → F5.

## Arquitectura y convenciones de trabajo

Conservar Next.js App Router, TypeScript, Axios, BFF, TanStack Query/Table, React Hook Form/Zod y Zustand. Mantener el lenguaje visual existente y adaptar sus acciones a los datos disponibles; no rehacer la aplicación.

- Dominios en módulos: componentes, interfaces, schemas, servicios y hooks; extender admin/public/auth y agregar seller.
- Servicios tipados reciben DTOs; adaptadores de vista generan etiquetas, moneda y estados sin alterar el contrato de origen. No usar los tipos de mocks como DTOs.
- Lecturas iniciales públicas pueden resolverse en Server Components con fetch servidor al backend y DTO serializable; no hacer fetch servidor a su propia ruta /api. Interacciones y administración usan TanStack Query + HttpProvider mediante el BFF.
- Los módulos que leen cookies o configuración privada son exclusivos del servidor. JWT no se almacena en Zustand/localStorage.
- Formularios con Zod alineados con validaciones reales; cuando se aplique una restricción adicional de UX, documentarla como decisión de frontend, no como regla del backend.
- Estado de consulta: carga, vacío, error y datos. Mutaciones: pendiente, éxito, rechazo y resultado de red incierto. Evitar datos simulados como fallback silencioso.
- Consultas de tienda incluyen userId, sellerId y page/size en su clave. Datos de administración y vendedor tienen claves separadas.
- Sin retry automático de mutaciones; en particular checkout y CSV. No bloquear navegación pública por no tener sesión.
- Sin cambios de backend, conectores externos ni conexión del navegador a MySQL/Redis/Service Bus.

<a id="interfaces-internas"></a>

## Interfaces internas que se introducirán o ajustarán

### Backend y BFF

El backend conserva exactamente sus contratos documentados. El BFF es la frontera que mantiene `BaseResponse<T> = {data:T,message:string,status:string}` para JSON exitoso; usa status SUCCESS y message vacío salvo un mensaje explícito. El consumidor sigue recibiendo T después de desenvolver data.

- Leer primero el JSON directo de login, persistir accessToken/expiresIn y devolver al navegador un éxito con data:null. No enviar el token dentro ni fuera de data.
- Para /auth/me desde servidor, leer CurrentUser directamente del backend. El navegador sí recibe la envoltura del BFF.
- Mantener 204 con body vacío y permitir `Promise<void>` en HttpProvider; no usar NextResponse.json para ese estado.
- Normalizar errores locales del BFF a `{data:null,message,status:"ERROR",details}`, preservando HTTP original y detalle original JSON/texto (incluido ImportResult en 422). No reemplazar errors[] de CSV por un toast sin informe.
- Preservar Content-Type, estado, X-Correlation-ID y Location relevantes. No tratar texto de error como archivo exitoso; manejar errores sin content-type JSON.
- Reenviar cuerpo CSV textual sin serializarlo como JSON ni multipart.
- Si el backend no responde, conservar 503 local y un mensaje de conexión; no convertir un error funcional conocido a 503.
- Al recibir 401 en operaciones autenticadas, limpiar sesión local y estado privado; 401 de login solo rechaza credenciales. Un 403 mantiene sesión y muestra falta de acceso.
- Generar UUID de correlación para mutaciones y reenviar la respuesta de correlación al cliente. No registrar contraseñas/JWT en mensajes o errores visibles.

### Checkout del navegador

```ts
type CheckoutInput = {
  shippingAddressId: number;
  lines: Array<{ productId: number; quantity: number }>;
  couponCodes: string[];
};
```

El mismo POST /api/orders existente del proxy se especializará para agregar userId desde /auth/me validado con la cookie y warehouseId desde CHECKOUT_WAREHOUSE_ID a cada línea. Sobrescribir/ignorar esos campos si alguien los agrega al body del navegador. El upstream continúa recibiendo CheckoutCommand completo del contrato OPE-02.

Configuración servidor: API_BASE_URL con /api/v1; CHECKOUT_WAREHOUSE_ID entero positivo. Ausencia/configuración inválida impide el checkout con error local de configuración, sin enviar una compra incompleta. No usar 1 como fallback en producción; ejemplo local explícito: CHECKOUT_WAREHOUSE_ID=1.

### Datos y paginación

Mantener separados ProductPageResponse (`items,page,size,totalElements,totalPages`) y SellerOrderPage (`items,page,size,total`). Los listados simples siguen siendo arrays. Los tipos de Product, Address, Coupon, CurrentUser, SellerMembership, Order, Shipment y SellerFulfillment reproducen los campos documentados; los modelos de presentación se componen aparte.

Archivo de referencias versionado: `{environment,updatedAt,categories:[{id,name,active}],brands:[{id,name,active}]}`. Los IDs vienen de consultas administrativas reales; no se insertan fixtures en producción.

## Rutas previstas

| Área | Rutas y propósito |
|---|---|
| Pública | / y /catalogo existentes; /catalogo/[id] para ficha; /carrito para bolsa local |
| Acceso | /login, /registro, /recuperar-contrasena y /recuperar-contrasena/[token] existentes |
| Cliente | /mi-cuenta; /mi-cuenta/direcciones; /mi-cuenta/seguridad; /checkout; /checkout/confirmacion/[orderId]; /mi-cuenta/seguimiento/[orderId] |
| Administración | Conservar /dashboard, /productos, /marcas, /categorias, /vendedores, /usuarios, /roles, /cupones, /fulfillment, /envios y /perfil; detalles/altas como subrutas de cada dominio |
| Vendedor | /vendedor selector; /vendedor/[sellerId]/perfil; /vendedor/[sellerId]/productos; /vendedor/[sellerId]/productos/nuevo; /vendedor/[sellerId]/productos/[productId]; /vendedor/[sellerId]/ordenes; /vendedor/[sellerId]/ordenes/[orderId] |

Guardas: administración solo ADMIN; vendedor SELLER y comprobación de membresía por API; checkout/cuenta CUSTOMER aunque tenga otros roles. Destino tras login: ADMIN→/dashboard; si no, SELLER→/vendedor; si no, CUSTOMER→/. Si solo tiene roles personalizados, / sin conceder acciones privadas. Ofrecer enlaces para cambiar de área cuando acumule roles.

## F1 · Base de comunicación, autenticación y permisos

**Dependencia:** contratos AUTH y configuración de backend; no necesita maestros comerciales.

1. Aplicar las adaptaciones BFF/HttpProvider y lectura de sesión descritas arriba.
2. Revisar servicios existentes de registro/login/me/recuperación y confirmar los flujos 201/202/204 con el backend directo.
3. Añadir cambio de contraseña solo para cuentas CUSTOMER o ADMIN.
4. Actualizar guardas, navegación y páginas de cuenta para roles combinados; sacar SELLER de rutas administrativas.
5. Mantener logout local; limpiar consultas privadas, tienda seleccionada y recibos de sesión. No afirmar revocación remota.
6. Retirar botones de Google OAuth de los formularios integrados. Mostrar recuperación como solicitud aceptada, explicando la limitación del adaptador en la documentación operativa.
7. Incorporar pruebas automatizadas del BFF con Vitest y base de E2E con Playwright durante implementación; ninguna dependencia se instala en esta entrega documental.

**Aceptación:** login fija cookie HttpOnly sin exponer JWT, recarga hidrata sesión, 204 no falla, roles correctos, 401/403 diferenciados y CSV/texto/correlación atraviesan el proxy. AUTH-01 a AUTH-06 quedan consumidas.

**Avance F1 (2026-10-16):** implementadas envoltura BFF y saneamiento del login, cookie HttpOnly, lectura directa de `/auth/me`, propagación de correlación, manejo de 204/errores, protección de mutaciones cross-origin, hidratación/logout, autorización por roles combinados, rutas de seguridad, formulario de cambio de contraseña y estados honestos de recuperación. En una primera pasada `pnpm exec` falló por `EPERM` al crear un symlink; después se ejecutaron directamente `tsc --noEmit`, lint de `src` y `git diff --check`, todos correctos. No se validó contra un backend activo; las pruebas automatizadas de F1 siguen pendientes.

## F2 · Administración que prepara el marketplace

**Dependencia:** F1 y cuenta ADMIN.

1. Integrar listados y formularios de usuarios, roles, maestros y cupones con servicios y hooks propios.
2. Añadir consulta de usuario, reemplazo explícito de roles y gestión de membresías en detalle de usuario/vendedor. La UI de equipo combina membresías con usuarios autorizados, sin asumir que una membresía contiene nombre/email.
3. Confirmar las consecuencias antes de transferir propietario o desactivar, mostrando el recurso concreto. Renovar sesión del afectado si cambian grupos JWT.
4. Las tablas sin paginación remota pueden paginar/ordenar localmente el array completo. No enviar filtros de servidor inexistentes.
5. Productos admin: listado de **activos** vía catálogo público; alta con respuesta DRAFT visible inmediatamente en la confirmación, con acciones publicar/agregar imagen. Conservar ese registro en caché de la sesión, sin presentar un catálogo persistente completo de borradores.
6. Para otros productos no públicos, ofrecer acciones administrativas por ID conocido: estado e imagen. Advertir que no hay ficha completa consultable por esta API. No recuperar datos usando credenciales de vendedor distintas.
7. CSV: leer archivo como texto, enviar content-type correcto, mostrar receivedRows/importedCount/errors y fila/campo/mensaje; sin enlaces de detalle inventados cuando no hay IDs.
8. Aplicar PATCH de activación de cupones; no ofrecer edición/eliminación de reglas. Categorías editan jerarquía y envían active explícito; usuarios envían status actual en PUT.
9. Dashboard muestra accesos y, si hay consultas completas disponibles, conteos identificados por recurso. Retirar ingresos, ventas y tendencias simuladas.

**Aceptación:** operaciones ADM-01…16, IDN-01…14, CUP-01…03 y CAT-04…06 disponibles; CAT-01 alimenta productos activos. Formularios diferencian DELETE lógico con 200 y borrado de rol con 204; se respeta la cobertura limitada del catálogo admin.

**Avance F2 (2026-10-16):** módulos admin conectados a endpoints reales para vendedores/equipos, usuarios/roles/membresías, marcas/categorías, catálogo activo/creación/estado/imágenes/CSV, cupones y dashboard. Se quitaron mocks de estas pantallas. CSV muestra errores por fila/campo; productos importados no inventan IDs; productos no públicos solo admiten acciones por ID conocido. DELETE lógico tiene confirmación; `DELETE /roles/{id}` conserva respuesta 204; cambio de rol informa que la sesión afectada debe renovarse. `tsc --noEmit`, lint de `src` y `git diff --check` pasan; matriz actualizada para 37 operaciones F2. Build no completó porque Next.js no pudo descargar Anton, Antonio e Inter de Google Fonts en este entorno sin conexión. Pruebas automatizadas y backend activo se difieren a la etapa de pruebas solicitada.

## F3 · Portal vendedor con contexto de tienda

**Dependencia:** F1/F2; cuenta SELLER, membresía activa y referencias reales configuradas.

1. Crear módulo seller y shell propio, reutilizando componentes visuales compartidos.
2. /vendedor consulta VEN-01. Con una tienda la selecciona; con varias pide selección; con cero muestra ausencia de acceso. El sellerId se conserva en la URL y se valida contra las tiendas autorizadas.
3. Integrar perfil comercial y catálogo con paginación real, ficha, alta, estados e imágenes. No mostrar edición general de producto ni administración de miembros.
4. Resolver categoryId/brandId mediante selectores configurados; marca opcional. Si no hay categoría elegible, bloquear alta con explicación.
5. Desactivar escrituras de catálogo para tienda INACTIVE, manteniendo lecturas. No trasladar ese bloqueo automáticamente al fulfillment, cuya política es diferente.
6. Al cambiar de tienda, cancelar consultas pendientes y retirar datos del tenant previo antes de renderizar el nuevo. Al recibir 403 de membresía, invalidar selección y volver al selector; no borrar sesión salvo 401.
7. Nuevos productos nacen DRAFT; publicar con PATCH explícito. Imágenes mediante URL existente; usar next/image con tamaño/sizes y placeholder, unoptimized para URLs externas no cubiertas por configuración de optimización.

**Aceptación:** VEN-01…09 consumidas; no se filtra información entre tiendas; propietario y miembro activo reciben las mismas capacidades de catálogo. La selección de tienda no permite cambiar el sellerId del body para publicar a nombre de otra.

**Avance F3 (2026-10-16):** módulo y rutas `/vendedor` implementados con selección de tiendas autorizadas, redirección para una sola tienda, comprobación del `sellerId` contra VEN-02, cambio de contexto que cancela/retira caché de tenant, navegación aislada por tienda, perfil comercial, listado paginado, alta como DRAFT, ficha, imágenes URL y cambios explícitos de estado. Las claves incluyen `sellerId`; el cuerpo de alta no contiene `sellerId`; 403 vuelve al selector y 401 conserva el flujo global de sesión. Las escrituras se deshabilitan visualmente si la tienda está inactiva. La configuración de referencias reales está vacía (`src/modules/seller/constants/seller-catalog-references.ts`), por lo que el alta queda bloqueada hasta que el equipo registre categorías activas del entorno; no se inventaron IDs. Verificación estática: `tsc --noEmit` y lint de `src` correctos. Pruebas automatizadas y backend activo quedan pendientes.

## F4 · Catálogo, cuenta y compra del cliente

**Dependencia:** F1; maestros/productos/stock provisionados. F2/F3 habilitan su preparación operativa.

1. Sustituir productos simulados de inicio/catálogo por CAT-01…03. Mostrar moneda real y galería; quitar tallas, colecciones, descuentos anteriores y “novedades” cronológicas sin respaldo. Usar filtro categoryId configurado; ordenación de precio solo local sobre la lista descargada.
2. Integrar CLI-01…06 y mantener los roles de AuthUser al actualizar CustomerProfile. Refrescar libreta tras cada escritura por sus efectos de predeterminada.
3. Carrito Zustand persistido por contexto de usuario o invitado, guardando productId/cantidad, sin PII ni JWT. Al iniciar sesión, fusionar carrito invitado con el del usuario sumando cantidades por productId; al cerrar, retirar el contexto privado. No mezclar variantes inexistentes.
4. Refrescar productos antes de checkout; retirar no públicos y permitir revisar cantidades. No afirmar disponibilidad numérica que el catálogo no devuelve. Solo productos PEN son elegibles para compra.
5. Elegir/crear dirección propia, consultar OPE-01 y recibir códigos de cupón sin afirmar que ya se aplicaron. Crear una única orden multivendedor con OPE-02.
6. Deshabilitar submit mientras la petición esté pendiente. Ante validación o 409 conservar carrito y permitir corrección. Ante resultado de red incierto no repetir automáticamente; mostrar correlación y falta de confirmación.
7. Al éxito usar importes de Order, vaciar el carrito confirmado y guardar Order + resumen local enviado en sessionStorage con clave userId/orderId, sin guardar dirección completa. Mostrar “Pedido creado”.
8. /checkout/confirmacion/[orderId] usa ese recibo de sesión. Si no existe, no reconstruye datos de compra inexistentes: informa que el detalle local no está disponible y ofrece consultar el envío.
9. /mi-cuenta/seguimiento/[orderId] consulta OPE-04 con botón actualizar. No crear “Mis pedidos” ni búsqueda por orderNumber. El ID procede de confirmación/enlace guardado por el cliente.

**Aceptación:** compra real de productos con stock, dirección y cupones; totales oficiales; confirmación diferenciada de pago; recarga sin errores y seguimiento restringido al dueño. Una pestaña sin recibo local no presenta un historial inventado.

**Avance F4 (2026-10-16):** integrado CAT-01…03 en inicio, catálogo y ficha; CLI-01…06 en perfil y libreta de direcciones; carrito Zustand por contexto de sesión; cotización OPE-01, checkout BFF OPE-02 con usuario y almacén derivados en servidor, confirmación local y seguimiento OPE-04. La compra conserva cantidades tras errores y evita reintentar si el resultado de red es incierto. Las referencias de categoría/marca reales siguen pendientes de configuración (`src/modules/shared/config/catalog-references.ts`); los productos sin stock provisionado no permiten validar una compra. Verificación estática completada: `tsc --noEmit`, lint de `src` y `git diff --check`. No se ejecutaron pruebas automatizadas ni llamadas a backend activo; quedan para la ronda posterior solicitada. Por tanto, F4 está implementada en código y pendiente de aceptación integrada con datos reales.

## F5 · Operación multivendedor y envío global

**Dependencia:** F1–F4; orden real o fixture preparado.

1. Portal vendedor: lista paginada OPE-06, detalle OPE-07 y actualización OPE-08 en `/vendedor/[sellerId]/ordenes`; API vuelve a autorizar membresía y sellerId en cada operación.
2. Administración: OPE-09 con filtros sellerId/orderId y paginación; actualización OPE-10 por porción. Tabla usa total de porciones, no órdenes únicas, y expone solo campos retornados por contrato.
3. `/envios` consulta orderId conocido (OPE-04) y permite edición global (OPE-05), sin presentar listado total inexistente.
4. Retirado alta manual de envío: checkout lo crea automáticamente. OPE-03 completa orden desde porción de fulfillment, separado del estado logístico.
5. Formularios ofrecen transiciones permitidas. Carrier/tracking requeridos al despachar o entregar si no existen; valores vacíos conservan datos del backend.
6. Cada acción distingue completar orden, preparar fulfillment de tienda o actualizar envío global. No propaga cambios entre capas.
7. Tras mutaciones se invalidan consultas afectadas; páginas ofrecen actualización manual para cambios de otras sesiones.

**Aceptación:** OPE-03 y OPE-05…10 operativas; un vendedor ve solo sus líneas, admin interviene sin membresía y el cliente ve solo shipment global. La cancelación logística no se comunica como reembolso.

**Avance F5 (2026-10-16):** implementados OPE-03…10: cola y detalle de órdenes segmentados por sellerId; consulta admin con filtros y paginación por porción; actualización seller/admin de fulfillment; consulta/edición de shipment por orderId, link desde fulfillment; finalización de orden con confirmación explícita. Eliminadas tablas mock. DTOs, servicios y query keys centralizados en `src/modules/fulfillment`; formularios RHF/Zod limitan estados y piden carrier/tracking para despacho/entrega. Verificación estática: `tsc --noEmit`, lint de `src` y `git diff --check` pasan; matriz mantiene 70/70 operaciones. Pruebas automatizadas, build y backend activo quedan pendientes para la ronda de pruebas acordada.

## Invalidación y salida por fases

| Mutación | Consultas a refrescar |
|---|---|
| Perfil personal | AuthUser y perfil del actor, sin perder roles |
| Direcciones | Libreta completa y cotización si cambia destino |
| Usuarios/roles/membresías | Listados/detalles de usuario, rol y equipo; avisar nueva sesión cuando aplique |
| Maestro | Listado/detalle admin; la lista configurada del vendedor requiere mantenimiento manual |
| Crear/estado/imagen de producto | Ficha/lista operativa del tenant si aplica y catálogo público |
| CSV | Catálogo público y vistas accesibles; informe no contiene IDs |
| Cupón | Listado de cupones admin |
| Crear orden | Recibo local; invalidar catálogo para volver a consultar sin afirmar stock cuantitativo |
| Completar orden | Catálogo público, detalle público y filas de operación con orderStatus |
| Fulfillment | Listado/detalle de su tenant y vista admin, sin cambiar shipment |
| Shipment | Seguimiento global y consulta admin del orderId |

Cada fase sustituye únicamente sus mocks y actualiza el estado de la matriz con evidencia. Una pantalla nueva no depende de mocks para parecer completa. Cerrar cada fase con pruebas de permisos, errores y recorrido feliz; no marcar una función bloqueada por el contrato como resuelta. Mantener los límites documentados aunque el resto del módulo quede integrado.

