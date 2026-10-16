# Catálogo público y productos administrados

[Índice](../README.md) · [Portal vendedor](portal-vendedor.md)

Fuente REST: `src/main/java/org/ricm/catalog/infrastructure/rest/ProductResource.java`. Casos en `catalog/application/`; modelos en `catalog/domain/`.

## ProductResponse

```json
{"id":45,"sellerId":3,"brandId":1,"categoryId":1,"sku":"TEC-045","name":"Teclado","slug":"teclado-045","description":"Teclado mecánico","price":159.9,"currency":"PEN","status":"ACTIVE","images":[{"id":70,"productId":45,"url":"https://cdn.example.test/teclado.jpg","altText":"Teclado","position":0,"primary":true}]}
```

`id, sellerId, categoryId`: number. `brandId`: number o null. `price`: número JSON (BigDecimal backend). `description`: string o null. `sku, name, slug, currency`: string. `status`: `DRAFT | ACTIVE | INACTIVE | ARCHIVED`. `images`: ProductImage[], puede estar vacío.

No devuelve nombres de vendedor/marca/categoría, cantidad disponible, almacén, variantes, tallas, precio anterior, fecha de alta, reseñas ni rating. No derivar esos datos como si fueran campos del backend.

## CreateProductRequest

| Campo | Regla del caso de uso |
|---|---|
| sellerId, categoryId | Obligatorios, no nulos; deben referenciar datos reales |
| brandId | Opcional, nullable |
| sku, name, slug | Obligatorios, no blancos |
| description | Opcional, nullable |
| price | Obligatorio, no negativo; cero está permitido |
| currency | Opcional; null/blanco → PEN; se recorta y pasa a mayúsculas; tres letras A–Z |
| images | Opcional; null → []; elementos con ImageRequest |

```json
{"sellerId":3,"brandId":1,"categoryId":1,"sku":"TEC-046","name":"Teclado nuevo","slug":"teclado-046","description":"Producto de ejemplo","price":159.9,"currency":"PEN","images":[{"url":"https://cdn.example.test/teclado.jpg","altText":"Teclado","position":0,"primary":true}]}
```

La creación devuelve ProductResponse con `status: "DRAFT"`. No acepta elegir estado inicial ni crea inventario. `CreateProductUseCase` valida menos que el importador CSV: no imponer como contrato del POST todas las validaciones del CSV. La base de datos añade unicidad global de SKU/slug y referencias; sus errores no tienen mapeo HTTP uniforme en este recurso.

## ImageRequest / ProductImage

```json
{"url":"https://cdn.example.test/teclado-lateral.jpg","altText":"Vista lateral","position":1,"primary":false}
```

`url` obligatorio, empieza exactamente con http:// o https://, hasta 1000 caracteres. `altText` opcional, hasta 250 caracteres (blanco → null). `position` entero >= 0, omisión → 0; `primary` boolean, omisión → false. ProductImage añade `id` y `productId` al ejemplo.

Se agregan metadatos; el archivo debe existir en almacenamiento externo. No hay upload, edición ni borrado de imágenes. No se garantiza una sola imagen principal; para visualizar, elegir la primera principal ordenada por posición/id, o la primera disponible, y usar un placeholder si no hay imágenes.

## Lectura pública y estados

- Lista/detalle/imágenes solo exponen productos ACTIVE; ni siquiera ADMIN obtiene borradores mediante estas lecturas.
- Lista devuelve ProductResponse[], no una página. Único filtro del servidor: `categoryId` opcional. Sin búsqueda textual ni filtros por marca, precio o vendedor.
- El producto solo informa estado comercial; ACTIVE no garantiza stock en el almacén configurado.
- Lecturas usan snapshots Redis con fallback MySQL transparente; el frontend no accede a Redis.
- Mutaciones invalidan caché tras commit. No hace falta llamar al endpoint de imágenes al listar o abrir el detalle si ya llegaron en `images`.
- Cambiar estado admite cualquier valor del enum; no hay una máquina restrictiva de transiciones de producto. Repetir el estado actual conserva el producto.
- No existen PUT de producto, DELETE de producto ni listado administrativo completo de todos los estados.

Cambio de estado:

```json
{"status":"ACTIVE"}
```

## Operaciones

<a id="cat-01"></a>

### CAT-01 · Listar catálogo activo

**Operación:** `GET /api/v1/products`

- **Acceso:** Público.
- **Entrada:** Query categoryId:number opcional; sin cuerpo; sin page/size.
- **Respuesta:** 200 · ProductResponse[]; [] si no hay resultados.
- **Errores:** Conversión de categoryId inválido depende del runtime JAX-RS; no hay validación/mapeo específico en el recurso. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ProductResource#list` → `QueryProductsUseCase#list`.

<a id="cat-02"></a>

### CAT-02 · Consultar producto público

**Operación:** `GET /api/v1/products/{id}`

- **Acceso:** Público.
- **Entrada:** Path id:number; sin cuerpo ni query.
- **Respuesta:** 200 · ProductResponse.
- **Errores:** 404 inexistente o no ACTIVE. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ProductResource#get` → `QueryProductsUseCase#get`.

<a id="cat-03"></a>

### CAT-03 · Consultar imágenes públicas

**Operación:** `GET /api/v1/products/{id}/images`

- **Acceso:** Público.
- **Entrada:** Path id:number; sin cuerpo ni query.
- **Respuesta:** 200 · ProductImage[].
- **Errores:** 404 inexistente o no público, aunque existan imágenes. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ProductResource#listImages` → `QueryProductsUseCase#get` (snapshot compartido).

<a id="cat-04"></a>

### CAT-04 · Crear producto como administrador

**Operación:** `POST /api/v1/products`

- **Acceso:** ADMIN.
- **Entrada:** JSON CreateProductRequest.
- **Respuesta:** 201 · ProductResponse DRAFT; cabecera Location con ruta del producto.
- **Errores:** 400 validación o imagen inválida; unicidad/referencias pueden producir 500 sin mapeo dedicado. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ProductResource#create` → `CreateProductUseCase#execute`, `AddProductImageUseCase#execute`.

<a id="cat-05"></a>

### CAT-05 · Cambiar estado de producto

**Operación:** `PATCH /api/v1/products/{id}/status`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; JSON con status obligatorio del enum.
- **Respuesta:** 200 · ProductResponse, incluso si no es público.
- **Errores:** 400 producto inexistente o status nulo/inválido; no confundir con 404 de consulta pública. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ProductResource#changeStatus` → `ChangeProductStatusUseCase#execute`.

<a id="cat-06"></a>

### CAT-06 · Agregar imagen a producto

**Operación:** `POST /api/v1/products/{id}/images`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; JSON ImageRequest.
- **Respuesta:** 201 · ProductImage.
- **Errores:** 400 producto inexistente o imagen inválida. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ProductResource#addImage` → `AddProductImageUseCase#execute`.


