# Matriz de integración: 70 operaciones

[Índice](README.md) · [Plan por fases](plan-frontend.md)

Inventario completo de pares método+ruta del código Java. Cada ID enlaza a su contrato; la pantalla es el destino **planificado**. “Existente” describe código encontrado, no una prueba HTTP exitosa. F1–F5 se definen en el plan.

## autenticacion (6)

| ID y contrato | Método y ruta backend | Actor | Pantalla prevista | Acción | Dependencias | Estado actual del frontend | Fase |
|---|---|---|---|---|---|---|---|
| [AUTH-01](contratos/autenticacion.md#auth-01) | `POST /api/v1/auth/register` | Público | /registro | Crear cuenta | Ninguna | Servicio existente; adaptar BFF | F1 |
| [AUTH-02](contratos/autenticacion.md#auth-02) | `POST /api/v1/auth/login` | Público | /login | Abrir sesión | AUTH-03 después del login | Servicio existente; cookie espera payload.data | F1 |
| [AUTH-03](contratos/autenticacion.md#auth-03) | `GET /api/v1/auth/me` | JWT válido; cualquier rol o cuenta autenticada | Sesión global | Hidratar usuario y permisos | AUTH-02 | Servicio y guard existentes; esperan data | F1 |
| [AUTH-04](contratos/autenticacion.md#auth-04) | `POST /api/v1/auth/password-reset/request` | Público | /recuperar-contrasena | Solicitar recuperación | Adaptador de notificación limitado | Servicio existente; adaptar BFF | F1 |
| [AUTH-05](contratos/autenticacion.md#auth-05) | `POST /api/v1/auth/password-reset/confirm` | Público | /recuperar-contrasena/[token] | Establecer contraseña | AUTH-04; obtener token por canal operativo | Servicio existente; revisar 204 | F1 |
| [AUTH-06](contratos/autenticacion.md#auth-06) | `POST /api/v1/auth/password/change` | CUSTOMER o ADMIN | /mi-cuenta/seguridad y /perfil | Cambiar contraseña | AUTH-03 y rol permitido | Sin servicio ni pantalla | F1 |

## clientes direcciones (6)

| ID y contrato | Método y ruta backend | Actor | Pantalla prevista | Acción | Dependencias | Estado actual del frontend | Fase |
|---|---|---|---|---|---|---|---|
| [CLI-01](contratos/clientes-direcciones.md#cli-01) | `GET /api/v1/customers/me` | CUSTOMER | /mi-cuenta | Cargar perfil de cliente | AUTH-03 | Integrado en perfil de cliente; pruebas pendientes | F4 |
| [CLI-02](contratos/clientes-direcciones.md#cli-02) | `PUT /api/v1/customers/me` | CUSTOMER | /mi-cuenta | Guardar nombres | CLI-01 | Integrado; roles de sesión conservados; pruebas pendientes | F4 |
| [CLI-03](contratos/clientes-direcciones.md#cli-03) | `GET /api/v1/customers/me/addresses` | CUSTOMER | /mi-cuenta/direcciones y /checkout | Elegir dirección | AUTH-03 | Integrado en libreta y checkout; pruebas pendientes | F4 |
| [CLI-04](contratos/clientes-direcciones.md#cli-04) | `POST /api/v1/customers/me/addresses` | CUSTOMER | /mi-cuenta/direcciones | Añadir dirección | CLI-03; refrescar libreta | Integrado; pruebas pendientes | F4 |
| [CLI-05](contratos/clientes-direcciones.md#cli-05) | `PUT /api/v1/customers/me/addresses/{id}` | CUSTOMER | /mi-cuenta/direcciones | Editar dirección | CLI-03; refrescar libreta | Integrado; pruebas pendientes | F4 |
| [CLI-06](contratos/clientes-direcciones.md#cli-06) | `DELETE /api/v1/customers/me/addresses/{id}` | CUSTOMER | /mi-cuenta/direcciones | Eliminar dirección | CLI-03; refrescar predeterminada | Integrado; pruebas pendientes | F4 |

## catalogo productos imagenes (6)

| ID y contrato | Método y ruta backend | Actor | Pantalla prevista | Acción | Dependencias | Estado actual del frontend | Fase |
|---|---|---|---|---|---|---|---|
| [CAT-01](contratos/catalogo-productos-imagenes.md#cat-01) | `GET /api/v1/products` | Público | /catalogo, inicio y /productos | Listar productos activos | Referencias configuradas para etiquetas públicas | Integrado en catálogo público y listado admin; pruebas pendientes | F2/F4 |
| [CAT-02](contratos/catalogo-productos-imagenes.md#cat-02) | `GET /api/v1/products/{id}` | Público | /catalogo/[id] | Ver ficha pública | CAT-01 | Integrado en ficha de producto; pruebas pendientes | F4 |
| [CAT-03](contratos/catalogo-productos-imagenes.md#cat-03) | `GET /api/v1/products/{id}/images` | Público | /catalogo/[id] | Recargar galería cuando haga falta | CAT-02 | Integrado en galería; pruebas pendientes | F4 |
| [CAT-04](contratos/catalogo-productos-imagenes.md#cat-04) | `POST /api/v1/products` | ADMIN | /productos/nuevo | Crear producto | ADM maestros; stock externo para comprar | Integrado en F2; pruebas pendientes | F2 |
| [CAT-05](contratos/catalogo-productos-imagenes.md#cat-05) | `PATCH /api/v1/products/{id}/status` | ADMIN | /productos y acciones por ID | Publicar o desactivar | CAT-04 o ID conocido; refrescar catálogo | Integrado en F2; pruebas pendientes | F2 |
| [CAT-06](contratos/catalogo-productos-imagenes.md#cat-06) | `POST /api/v1/products/{id}/images` | ADMIN | /productos y alta de producto | Agregar URL de imagen | ID conocido; refrescar ficha/galería | Integrado en F2; pruebas pendientes | F2 |

## administracion catalogo importacion (16)

| ID y contrato | Método y ruta backend | Actor | Pantalla prevista | Acción | Dependencias | Estado actual del frontend | Fase |
|---|---|---|---|---|---|---|---|
| [ADM-01](contratos/administracion-catalogo-importacion.md#adm-01) | `GET /api/v1/admin/catalog/sellers` | ADMIN | /vendedores | Listar | Ninguna | Integrado en F2; pruebas pendientes | F2 |
| [ADM-02](contratos/administracion-catalogo-importacion.md#adm-02) | `GET /api/v1/admin/catalog/sellers/{id}` | ADMIN | /vendedores | Ver detalle | Listado de vendedores | Integrado en F2; pruebas pendientes | F2 |
| [ADM-03](contratos/administracion-catalogo-importacion.md#adm-03) | `POST /api/v1/admin/catalog/sellers` | ADMIN | /vendedores | Crear | Referencias de padre si corresponde | Integrado en F2; pruebas pendientes | F2 |
| [ADM-04](contratos/administracion-catalogo-importacion.md#adm-04) | `PUT /api/v1/admin/catalog/sellers/{id}` | ADMIN | /vendedores | Editar | ID de vendedor | Integrado en F2; pruebas pendientes | F2 |
| [ADM-05](contratos/administracion-catalogo-importacion.md#adm-05) | `DELETE /api/v1/admin/catalog/sellers/{id}` | ADMIN | /vendedores | Desactivar | ID de vendedor | Integrado en F2; pruebas pendientes | F2 |
| [ADM-06](contratos/administracion-catalogo-importacion.md#adm-06) | `GET /api/v1/admin/catalog/brands` | ADMIN | /marcas | Listar | Ninguna | Integrado en F2; pruebas pendientes | F2 |
| [ADM-07](contratos/administracion-catalogo-importacion.md#adm-07) | `GET /api/v1/admin/catalog/brands/{id}` | ADMIN | /marcas | Ver detalle | Listado de marcas | Integrado en F2; pruebas pendientes | F2 |
| [ADM-08](contratos/administracion-catalogo-importacion.md#adm-08) | `POST /api/v1/admin/catalog/brands` | ADMIN | /marcas | Crear | Referencias de padre si corresponde | Integrado en F2; pruebas pendientes | F2 |
| [ADM-09](contratos/administracion-catalogo-importacion.md#adm-09) | `PUT /api/v1/admin/catalog/brands/{id}` | ADMIN | /marcas | Editar | ID de marca | Integrado en F2; pruebas pendientes | F2 |
| [ADM-10](contratos/administracion-catalogo-importacion.md#adm-10) | `DELETE /api/v1/admin/catalog/brands/{id}` | ADMIN | /marcas | Desactivar | ID de marca | Integrado en F2; pruebas pendientes | F2 |
| [ADM-11](contratos/administracion-catalogo-importacion.md#adm-11) | `GET /api/v1/admin/catalog/categories` | ADMIN | /categorias | Listar | Ninguna | Integrado en F2; pruebas pendientes | F2 |
| [ADM-12](contratos/administracion-catalogo-importacion.md#adm-12) | `GET /api/v1/admin/catalog/categories/{id}` | ADMIN | /categorias | Ver detalle | Listado de categorías | Integrado en F2; pruebas pendientes | F2 |
| [ADM-13](contratos/administracion-catalogo-importacion.md#adm-13) | `POST /api/v1/admin/catalog/categories` | ADMIN | /categorias | Crear | Referencias de padre si corresponde | Integrado en F2; pruebas pendientes | F2 |
| [ADM-14](contratos/administracion-catalogo-importacion.md#adm-14) | `PUT /api/v1/admin/catalog/categories/{id}` | ADMIN | /categorias | Editar | ID de categoría | Integrado en F2; pruebas pendientes | F2 |
| [ADM-15](contratos/administracion-catalogo-importacion.md#adm-15) | `DELETE /api/v1/admin/catalog/categories/{id}` | ADMIN | /categorias | Desactivar | ID de categoría | Integrado en F2; pruebas pendientes | F2 |
| [ADM-16](contratos/administracion-catalogo-importacion.md#adm-16) | `POST /api/v1/admin/catalog/products/import/csv` | ADMIN | /productos/importar | Importar catálogo | Maestros reales; SKU/slug nuevos; inventario externo | Integrado en F2; pruebas pendientes | F2 |

## usuarios roles membresias (14)

| ID y contrato | Método y ruta backend | Actor | Pantalla prevista | Acción | Dependencias | Estado actual del frontend | Fase |
|---|---|---|---|---|---|---|---|
| [IDN-01](contratos/usuarios-roles-membresias.md#idn-01) | `GET /api/v1/admin/users` | ADMIN | /usuarios | Listar cuentas | AUTH-03 | Integrado en F2; pruebas pendientes | F2 |
| [IDN-02](contratos/usuarios-roles-membresias.md#idn-02) | `GET /api/v1/admin/users/{id}` | ADMIN | /usuarios/[id] | Ver cuenta | IDN-01 | Integrado en F2; pruebas pendientes | F2 |
| [IDN-03](contratos/usuarios-roles-membresias.md#idn-03) | `POST /api/v1/admin/users` | ADMIN | /usuarios/nuevo | Crear cuenta y roles | Catálogo de roles | Integrado en F2; pruebas pendientes | F2 |
| [IDN-04](contratos/usuarios-roles-membresias.md#idn-04) | `PUT /api/v1/admin/users/{id}` | ADMIN | /usuarios/[id] y /perfil | Editar nombres o estado | IDN-02 | Integrado en F2; pruebas pendientes | F2 |
| [IDN-05](contratos/usuarios-roles-membresias.md#idn-05) | `PUT /api/v1/admin/users/{id}/roles` | ADMIN | /usuarios/[id] | Guardar conjunto completo de roles | IDN-10; renovar sesión afectada | Integrado en F2; pruebas pendientes | F2 |
| [IDN-06](contratos/usuarios-roles-membresias.md#idn-06) | `GET /api/v1/admin/users/{id}/sellers` | ADMIN | /usuarios/[id] | Consultar membresías | IDN-02 | Integrado en F2; pruebas pendientes | F2 |
| [IDN-07](contratos/usuarios-roles-membresias.md#idn-07) | `PUT /api/v1/admin/users/{id}/sellers/{sellerId}` | ADMIN | /usuarios/[id] y /vendedores/[id] | Asignar acceso a tienda | Usuario y vendedor existentes; nuevo login si añade SELLER | Integrado en F2; pruebas pendientes | F2 |
| [IDN-08](contratos/usuarios-roles-membresias.md#idn-08) | `DELETE /api/v1/admin/users/{id}/sellers/{sellerId}` | ADMIN | /usuarios/[id] y /vendedores/[id] | Revocar acceso a tienda | Membresía existente | Integrado en F2; pruebas pendientes | F2 |
| [IDN-09](contratos/usuarios-roles-membresias.md#idn-09) | `GET /api/v1/admin/sellers/{sellerId}/users` | ADMIN | /vendedores/[id] | Ver equipo comercial | Vendedor existente; IDN-01 si se muestran nombres | Integrado en F2; pruebas pendientes | F2 |
| [IDN-10](contratos/usuarios-roles-membresias.md#idn-10) | `GET /api/v1/admin/roles` | ADMIN | /roles y formularios de usuario | Listar opciones de rol | AUTH-03 | Integrado en F2; pruebas pendientes | F2 |
| [IDN-11](contratos/usuarios-roles-membresias.md#idn-11) | `GET /api/v1/admin/roles/{id}` | ADMIN | /roles/[id] | Ver rol | IDN-10 | Integrado en F2; pruebas pendientes | F2 |
| [IDN-12](contratos/usuarios-roles-membresias.md#idn-12) | `POST /api/v1/admin/roles` | ADMIN | /roles | Crear rol personalizado | IDN-10 | Integrado en F2; pruebas pendientes | F2 |
| [IDN-13](contratos/usuarios-roles-membresias.md#idn-13) | `PUT /api/v1/admin/roles/{id}` | ADMIN | /roles | Cambiar nombre | IDN-11 | Integrado en F2; pruebas pendientes | F2 |
| [IDN-14](contratos/usuarios-roles-membresias.md#idn-14) | `DELETE /api/v1/admin/roles/{id}` | ADMIN | /roles | Eliminar rol personalizado sin uso | IDN-10 | Integrado en F2; pruebas pendientes | F2 |

## portal vendedor (9)

| ID y contrato | Método y ruta backend | Actor | Pantalla prevista | Acción | Dependencias | Estado actual del frontend | Fase |
|---|---|---|---|---|---|---|---|
| [VEN-01](contratos/portal-vendedor.md#ven-01) | `GET /api/v1/seller/catalog` | SELLER | /vendedor | Seleccionar tienda | AUTH-03; membresías administradas | Selector integrado; vacíos y una/múltiples tiendas | F3 |
| [VEN-02](contratos/portal-vendedor.md#ven-02) | `GET /api/v1/seller/catalog/{sellerId}` | SELLER y membresía activa | /vendedor/[sellerId]/perfil | Ver tienda | VEN-01 | Shell valida membresía y carga perfil | F3 |
| [VEN-03](contratos/portal-vendedor.md#ven-03) | `PUT /api/v1/seller/catalog/{sellerId}` | SELLER, membresía y tienda activa | /vendedor/[sellerId]/perfil | Guardar datos comerciales | VEN-02 | Formulario con Zod; requiere tienda activa | F3 |
| [VEN-04](contratos/portal-vendedor.md#ven-04) | `GET /api/v1/seller/catalog/{sellerId}/products` | SELLER y membresía activa | /vendedor/[sellerId]/productos | Listar todos los estados propios | VEN-01; cache por tienda/página | Integrado con paginación del backend | F3 |
| [VEN-05](contratos/portal-vendedor.md#ven-05) | `GET /api/v1/seller/catalog/{sellerId}/products/{productId}` | SELLER y membresía activa | /vendedor/[sellerId]/productos/[productId] | Ver ficha operativa | VEN-04 | Ficha integrada; edición general no disponible | F3 |
| [VEN-06](contratos/portal-vendedor.md#ven-06) | `POST /api/v1/seller/catalog/{sellerId}/products` | SELLER, membresía y tienda activa | /vendedor/[sellerId]/productos/nuevo | Crear borrador | Referencias configuradas; stock externo | Integrado; condicionado por categoría real configurada | F3 |
| [VEN-07](contratos/portal-vendedor.md#ven-07) | `PATCH /api/v1/seller/catalog/{sellerId}/products/{productId}/status` | SELLER, membresía y tienda activa | /vendedor/[sellerId]/productos/[productId] | Publicar/desactivar producto propio | VEN-05; refrescar listado público | Integrado con invalidación de caché | F3 |
| [VEN-08](contratos/portal-vendedor.md#ven-08) | `GET /api/v1/seller/catalog/{sellerId}/products/{productId}/images` | SELLER y membresía activa | /vendedor/[sellerId]/productos/[productId] | Consultar galería operativa | VEN-05 | Integrado con galería y fallback del detalle | F3 |
| [VEN-09](contratos/portal-vendedor.md#ven-09) | `POST /api/v1/seller/catalog/{sellerId}/products/{productId}/images` | SELLER, membresía y tienda activa | /vendedor/[sellerId]/productos/[productId] | Agregar URL de imagen | VEN-05; refrescar ficha y lista | Integrado; URL pública, sin carga de archivos | F3 |

## cupones (3)

| ID y contrato | Método y ruta backend | Actor | Pantalla prevista | Acción | Dependencias | Estado actual del frontend | Fase |
|---|---|---|---|---|---|---|---|
| [CUP-01](contratos/cupones.md#cup-01) | `GET /api/v1/admin/coupons` | ADMIN | /cupones | Consultar promociones y usos | AUTH-03 | Integrado en F2; pruebas pendientes | F2 |
| [CUP-02](contratos/cupones.md#cup-02) | `POST /api/v1/admin/coupons` | ADMIN | /cupones/nuevo | Crear promoción | Productos/categorías/usuarios reales si se segmenta | Integrado en F2; pruebas pendientes | F2 |
| [CUP-03](contratos/cupones.md#cup-03) | `PATCH /api/v1/admin/coupons/{id}/active` | ADMIN | /cupones | Cambiar activación | CUP-01 | Integrado en F2; pruebas pendientes | F2 |

## ordenes envios fulfillment (10)

| ID y contrato | Método y ruta backend | Actor | Pantalla prevista | Acción | Dependencias | Estado actual del frontend | Fase |
|---|---|---|---|---|---|---|---|
| [OPE-01](contratos/ordenes-envios-fulfillment.md#ope-01) | `POST /api/v1/shipping/quotes` | CUSTOMER | /checkout | Estimar envío | CLI-03; subtotal local | Integrado como estimación previa; pruebas pendientes | F4 |
| [OPE-02](contratos/ordenes-envios-fulfillment.md#ope-02) | `POST /api/v1/orders` | CUSTOMER | /checkout | Confirmar pedido | Productos PEN, dirección, almacén y stock reales | Integrado vía BFF; requiere almacén configurado y stock; pruebas pendientes | F4 |
| [OPE-03](contratos/ordenes-envios-fulfillment.md#ope-03) | `POST /api/v1/orders/{id}/complete` | ADMIN | /fulfillment y acciones por orden | Completar orden | ID de orden obtenido por flujo o búsqueda de fulfillments | Integrado con confirmación desde fila; verificación backend pendiente | F5 |
| [OPE-04](contratos/ordenes-envios-fulfillment.md#ope-04) | `GET /api/v1/orders/{orderId}/shipment` | CUSTOMER propietario o ADMIN | /mi-cuenta/seguimiento/[orderId] y /envios | Consultar tracking | ID de orden conocido; no hay historial API | Integrado en seguimiento cliente y consulta admin; pruebas pendientes | F4/F5 |
| [OPE-05](contratos/ordenes-envios-fulfillment.md#ope-05) | `PATCH /api/v1/admin/orders/{orderId}/shipment` | ADMIN | /envios | Cambiar tracking y estado global | OPE-04; secuencia de estados | Integrado por orderId; no existe alta manual; pruebas pendientes | F5 |
| [OPE-06](contratos/ordenes-envios-fulfillment.md#ope-06) | `GET /api/v1/seller/orders` | SELLER y membresía activa | /vendedor/[sellerId]/ordenes | Ver cola propia | VEN-01; orden existente | Integrado en portal vendedor; pruebas de aislamiento pendientes | F5 |
| [OPE-07](contratos/ordenes-envios-fulfillment.md#ope-07) | `GET /api/v1/seller/orders/{orderId}` | SELLER y membresía activa | /vendedor/[sellerId]/ordenes/[orderId] | Ver líneas propias y preparación | OPE-06 | Integrado en detalle por tienda; pruebas pendientes | F5 |
| [OPE-08](contratos/ordenes-envios-fulfillment.md#ope-08) | `PATCH /api/v1/seller/orders/{orderId}/fulfillment` | SELLER y membresía activa | /vendedor/[sellerId]/ordenes/[orderId] | Preparar y despachar porción propia | OPE-07; secuencia de estados | Integrado con transiciones y tracking; pruebas pendientes | F5 |
| [OPE-09](contratos/ordenes-envios-fulfillment.md#ope-09) | `GET /api/v1/admin/seller-fulfillments` | ADMIN | /fulfillment | Consultar operación por tienda/orden | AUTH-03; filtros y paginación | Integrado con filtros URL y paginación por porciones; pruebas pendientes | F5 |
| [OPE-10](contratos/ordenes-envios-fulfillment.md#ope-10) | `PATCH /api/v1/admin/orders/{orderId}/seller-fulfillments/{sellerId}` | ADMIN; no requiere membresía | /fulfillment | Intervenir preparación de vendedor | OPE-09; secuencia de estados | Integrado por porción sin membresía; pruebas pendientes | F5 |

## Criterio de cierre

La matriz contiene 70 filas con IDs únicos y 70 combinaciones método+ruta únicas. Algunas APIs alimentan más de una vista y algunos módulos no pueden ofrecer un CRUD completo con estos contratos. No contar logout del BFF, filtros locales ni lecturas de configuración como nuevas APIs del backend.

Una operación se dará por integrada solo cuando exista servicio/contrato tipado, UI autorizada que la consuma, manejo de su respuesta/error y evidencia del escenario de aceptación. Hasta entonces su estado sigue siendo el descrito aquí, aunque esté completamente documentada.

