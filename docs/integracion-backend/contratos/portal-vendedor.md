# Portal de catálogo del vendedor

[Índice](../README.md) · [Fulfillment del vendedor](ordenes-envios-fulfillment.md)

Fuente REST: `src/main/java/org/ricm/catalog/infrastructure/rest/SellerCatalogResource.java`. Política y comandos: `catalog/application/SellerCatalogUseCase.java`, que delega a los casos de producto e imagen descritos en [catálogo](catalogo-productos-imagenes.md).

## Autorización y contexto

Todas las rutas requieren SELLER. El listado inicial deriva el usuario del JWT; las demás verifican membresía activa para el sellerId de la ruta. No se toma sellerId del cuerpo de producto. ADMIN por sí solo no autoriza estas rutas: usa las rutas administrativas. Una cuenta ADMIN+SELLER sí puede entrar cuando tiene membresía.

Cambiar de tienda cambia el contexto de perfil, productos y órdenes. No reutilizar datos de otra tienda. Una tienda inactiva permite consultar perfil/productos/imágenes, pero bloquea sus mutaciones de catálogo con 409. La lista inicial filtra membresías activas, no necesariamente vendedores activos.

owner es informativo; los miembros activos comparten las capacidades de catálogo. No hay administración del equipo desde este portal.

## Modelos y ejemplos

### SellerTenant[]

```json
[{"sellerId":3,"legalName":"Comercio Ejemplo SAC","status":"ACTIVE","owner":true}]
```

sellerId:number; legalName,status:string; owner:boolean. Puede devolver `[]`; mostrar ausencia de tiendas autorizadas, sin inventar un sellerId.

### Seller y SellerProfileRequest

Seller coincide con el [modelo administrativo](administracion-catalogo-importacion.md):

```json
{"id":3,"legalName":"Comercio Ejemplo SAC","taxId":"20123456789","email":"tienda@example.test","status":"ACTIVE"}
```

Formulario PUT completo, sin status:

```json
{"legalName":"Comercio Ejemplo SAC","taxId":"20123456789","email":"tienda@example.test"}
```

Los tres campos son obligatorios, no blancos; trim; máximos 200, 50, 320. Email en minúsculas y formato válido. taxId único. No permite activar la tienda.

### ProductPageResponse

```json
{"items":[{"id":45,"sellerId":3,"brandId":1,"categoryId":1,"sku":"TEC-045","name":"Teclado","slug":"teclado-045","description":"Teclado mecánico","price":159.9,"currency":"PEN","status":"DRAFT","images":[]}],"page":0,"size":20,"totalElements":1,"totalPages":1}
```

items:ProductResponse[]; page,size,totalElements,totalPages:number. page base cero, default 0, >=0; size default 20, entre 1 y 100. Sin filtros adicionales soportados por este endpoint. Incluye productos propios DRAFT, ACTIVE, INACTIVE y ARCHIVED. TotalPages es 0 si no hay resultados.

ProductResponse, ProductImage e ImageRequest tienen los campos definidos en [catálogo](catalogo-productos-imagenes.md). La respuesta de detalle es un ProductResponse individual; imágenes retorna ProductImage[].

### SellerProductRequest

```json
{"brandId":1,"categoryId":1,"sku":"TEC-047","name":"Teclado del vendedor","slug":"teclado-047","description":"Nuevo producto","price":159.9,"currency":"PEN","images":[{"url":"https://cdn.example.test/teclado.jpg","altText":"Teclado","position":0,"primary":true}]}
```

Mismas reglas del CreateProductRequest administrativo, **sin sellerId**. categoryId es obligatorio; brandId opcional. El nuevo producto siempre nace DRAFT. SKU y slug son únicos globalmente, no solo dentro de la tienda. No crea stock ni permite editar los demás campos después.

Las categorías y marcas no se pueden listar con solo SELLER. El formulario usará referencias reales configuradas por el equipo; ver [decisiones](../decisiones-limitaciones.md). No llamar a /admin/catalog con permisos elevados de otra persona.

StatusRequest e ImageRequest:

```json
{"status":"ACTIVE"}
```

```json
{"url":"https://cdn.example.test/teclado-lateral.jpg","altText":"Vista lateral","position":1,"primary":false}
```

Lectura de producto de otra tienda produce 403 si existe; producto inexistente produce 404. No interpretar cualquiera de estos errores como sesión expirada.

## Operaciones

<a id="ven-01"></a>

### VEN-01 · Descubrir tiendas autorizadas

**Operación:** `GET /api/v1/seller/catalog`

- **Acceso:** SELLER.
- **Entrada:** Sin cuerpo ni parámetros.
- **Respuesta:** 200 · SellerTenant[].
- **Errores:** 400 identidad inválida; 403 sub JWT no numérico. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#availableSellers` → `SellerCatalogUseCase#availableSellers`.

<a id="ven-02"></a>

### VEN-02 · Consultar perfil comercial

**Operación:** `GET /api/v1/seller/catalog/{sellerId}`

- **Acceso:** SELLER y membresía activa.
- **Entrada:** Path sellerId:number positivo; sin cuerpo.
- **Respuesta:** 200 · Seller.
- **Errores:** 400 sellerId inválido; 403 sin membresía; 404 tienda inexistente tras autorización. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#profile` → `SellerCatalogUseCase#profile`.

<a id="ven-03"></a>

### VEN-03 · Actualizar perfil comercial

**Operación:** `PUT /api/v1/seller/catalog/{sellerId}`

- **Acceso:** SELLER, membresía y tienda activa.
- **Entrada:** Path sellerId; JSON SellerProfileRequest.
- **Respuesta:** 200 · Seller.
- **Errores:** 400 validación o taxId duplicado; 403 membresía; 404 tienda; 409 tienda inactiva. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#updateProfile` → `SellerCatalogUseCase#updateProfile`.

<a id="ven-04"></a>

### VEN-04 · Listar productos propios paginados

**Operación:** `GET /api/v1/seller/catalog/{sellerId}/products`

- **Acceso:** SELLER y membresía activa.
- **Entrada:** Path sellerId; query page=0 y size=20 opcionales; sin cuerpo.
- **Respuesta:** 200 · ProductPageResponse.
- **Errores:** 400 page/size inválidos; 403 membresía; 404 tienda. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#listProducts` → `SellerCatalogUseCase#listProducts`, `pageImages`.

<a id="ven-05"></a>

### VEN-05 · Consultar producto propio

**Operación:** `GET /api/v1/seller/catalog/{sellerId}/products/{productId}`

- **Acceso:** SELLER y membresía activa.
- **Entrada:** Path sellerId y productId; sin cuerpo.
- **Respuesta:** 200 · ProductResponse.
- **Errores:** 400 contexto inválido; 403 sin membresía o producto ajeno; 404 producto/tienda inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#getProduct` → `SellerCatalogUseCase#getProduct`.

<a id="ven-06"></a>

### VEN-06 · Crear producto propio

**Operación:** `POST /api/v1/seller/catalog/{sellerId}/products`

- **Acceso:** SELLER, membresía y tienda activa.
- **Entrada:** Path sellerId; JSON SellerProductRequest sin sellerId.
- **Respuesta:** 201 · ProductResponse DRAFT.
- **Errores:** 400 validación; 403 membresía; 404 tienda; 409 tienda inactiva; restricciones SQL pueden generar 500. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#createProduct` → `SellerCatalogUseCase#createProduct`, `addProductImage`.

<a id="ven-07"></a>

### VEN-07 · Cambiar estado de producto propio

**Operación:** `PATCH /api/v1/seller/catalog/{sellerId}/products/{productId}/status`

- **Acceso:** SELLER, membresía y tienda activa.
- **Entrada:** Path sellerId/productId; JSON StatusRequest.
- **Respuesta:** 200 · ProductResponse.
- **Errores:** 400 status inválido; 403 membresía/producto ajeno; 404 producto/tienda; 409 tienda inactiva. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#changeProductStatus` → `SellerCatalogUseCase#changeProductStatus`.

<a id="ven-08"></a>

### VEN-08 · Listar imágenes propias

**Operación:** `GET /api/v1/seller/catalog/{sellerId}/products/{productId}/images`

- **Acceso:** SELLER y membresía activa.
- **Entrada:** Path sellerId/productId; sin cuerpo.
- **Respuesta:** 200 · ProductImage[].
- **Errores:** 400 contexto inválido; 403 membresía/producto ajeno; 404 producto/tienda. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#listProductImages` → `SellerCatalogUseCase#listProductImages`.

<a id="ven-09"></a>

### VEN-09 · Agregar imagen propia

**Operación:** `POST /api/v1/seller/catalog/{sellerId}/products/{productId}/images`

- **Acceso:** SELLER, membresía y tienda activa.
- **Entrada:** Path sellerId/productId; JSON ImageRequest.
- **Respuesta:** 201 · ProductImage.
- **Errores:** 400 imagen inválida; 403 membresía/producto ajeno; 404 producto/tienda; 409 tienda inactiva. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerCatalogResource#addProductImage` → `SellerCatalogUseCase#addProductImage`.


