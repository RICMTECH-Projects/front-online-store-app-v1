# Administración de vendedores, marcas, categorías e importación

[Índice](../README.md)

Fuente: `src/main/java/org/ricm/catalog/infrastructure/rest/CatalogAdministrationResource.java`, `catalog/application/ManageSellersUseCase.java`, `ManageBrandsUseCase.java`, `ManageCategoriesUseCase.java`, `ImportProductsFromCsvUseCase.java`.

Todos los endpoints exigen `ADMIN`. Listados son arrays completos, sin page/size y pueden incluir registros inactivos. Los DELETE desactivan, devuelven el registro y conservan sus referencias. Desactivar maestros no despublica automáticamente sus productos.

## Modelos, formularios y ejemplos

### SellerRequest / Seller

```json
{"legalName":"Comercio Ejemplo SAC","taxId":"20123456789","email":"tienda@example.test","status":"ACTIVE"}
```

`legalName`, `taxId`, `email`: string obligatorios, no blancos; se recortan; máximos 200, 50 y 320. Email pasa a minúsculas y valida patrón de correo con dominio. `taxId` es único, sin regla exclusiva de RUC peruano. `status`: opcional; null/blanco → ACTIVE; normaliza mayúsculas y admite ACTIVE/INACTIVE.

`Seller` añade `id:number`; ejemplo:

```json
{"id":3,"legalName":"Comercio Ejemplo SAC","taxId":"20123456789","email":"tienda@example.test","status":"ACTIVE"}
```

### BrandRequest / Brand

```json
{"name":"Marca Ejemplo","slug":"marca-ejemplo","active":true}
```

`name` y `slug` obligatorios no blancos; recortados; máximos 120 y 140. Slug se normaliza a minúsculas y valida `[a-z0-9]+(?:-[a-z0-9]+)*`. Nombre y slug únicos. `active:boolean`: omitirlo equivale a false por ser primitivo Java; enviar siempre explícitamente.

Respuesta:

```json
{"id":1,"name":"Marca Ejemplo","slug":"marca-ejemplo","active":true}
```

### CategoryRequest / Category

```json
{"parentId":null,"name":"Accesorios","slug":"accesorios","active":true}
```

`name`, `slug`, `active`: mismas reglas de formato/límites que marca. Solo slug es único. `parentId:number|null`: opcional, debe existir si se informa; rechaza autoparentesco, ciclos y colocar una categoría debajo de su descendiente. PUT con parentId null la mueve a raíz.

Respuesta:

```json
{"id":1,"parentId":null,"name":"Accesorios","slug":"accesorios","active":true}
```

Los PUT sustituyen los campos del formulario completo. DELETE devuelve el mismo modelo con `active:false`, o `status:"INACTIVE"` para Seller.

### CSV e ImportResult

Enviar el contenido del archivo como texto, con coma separadora. Encabezados se recortan y normalizan a minúsculas; se admite BOM inicial. Obligatorios: sellerId, categoryId, sku, name, slug, price. Opcionales: brandId, description, currency, status. El orden de columnas es libre.

```csv
sellerId,categoryId,sku,name,slug,price,brandId,description,currency,status
3,1,TEC-CSV-001,Teclado CSV,teclado-csv-001,159.90,1,Producto de prueba,PEN,DRAFT
```

| Campo / límite | Validación del importador |
|---|---|
| Documento | Hasta 10 000 000 caracteres Java; el mensaje dice 10 MB, no es un conteo exacto de bytes |
| Filas | Máximo 10 000 filas de datos no vacías |
| sellerId, categoryId | Enteros positivos; referencias existentes |
| brandId | Opcional; entero positivo existente si se informa |
| sku, name, slug | Obligatorios; máximos 80, 250, 280 |
| slug | Minúsculas, números y guiones; patrón de slug |
| description | Opcional; máximo 65 535 |
| price | No negativo; máximo 4 decimales |
| currency | Blanco → PEN; normaliza mayúsculas; tres letras |
| status | Blanco → DRAFT; enum DRAFT/ACTIVE/INACTIVE/ARCHIVED |
| Unicidad | SKU/slug dentro del CSV y contra base de datos; sin upsert |
| Parser | Comillas escapadas, comas/saltos dentro de campos citados; comilla sin cerrar rechazada |

Se ignoran filas completamente vacías; la numeración del error se calcula sobre esas filas filtradas, con encabezado como fila 1. Documento inválido retorna errores asociados a fila 1. Se valida todo antes de persistir; un error de validación no importa ninguna fila.

Respuesta exitosa:

```json
{"receivedRows":1,"importedCount":1,"errors":[]}
```

Ejemplo de rechazo:

```json
{"receivedRows":1,"importedCount":0,"errors":[{"row":2,"field":"categoryId","message":"Category not found: 999"}]}
```

`ImportResult` tiene únicamente receivedRows:number, importedCount:number y errors:RowError[]. `RowError`: row:number, field:string, message:string. El método Java `accepted()` decide el HTTP, no es un campo del record; no exigirlo en el JSON.

No retorna los IDs de los productos importados. No importa imágenes ni inventario. No reintentar automáticamente después de un timeout: el archivo pudo persistirse y un segundo envío puede rechazar duplicados.

## Manejo de errores observado en el código

Este recurso no tiene la traducción uniforme 400/404/409 que sugieren las guías generales del ZIP. Solo las consultas individuales GET usan `found()` para convertir NoSuchElementException a 404; las mutaciones de maestros propagan excepciones. Mostrar un mensaje de respaldo y la correlación ante 500. Los códigos concretos deben comprobarse en un entorno activo.

## Operaciones

<a id="adm-01"></a>

### ADM-01 · Listar vendedores

**Operación:** `GET /api/v1/admin/catalog/sellers`

- **Acceso:** ADMIN.
- **Entrada:** Sin cuerpo ni parámetros.
- **Respuesta:** 200 · Seller[]; sin paginación.
- **Errores:** Sin errores de negocio traducidos en esta lectura. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#sellers` → `ManageSellersUseCase#list`.

<a id="adm-02"></a>

### ADM-02 · Consultar vendedor

**Operación:** `GET /api/v1/admin/catalog/sellers/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; sin cuerpo.
- **Respuesta:** 200 · Seller.
- **Errores:** 404 inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#seller` → `ManageSellersUseCase#get`.

<a id="adm-03"></a>

### ADM-03 · Crear vendedor

**Operación:** `POST /api/v1/admin/catalog/sellers`

- **Acceso:** ADMIN.
- **Entrada:** JSON SellerRequest.
- **Respuesta:** 201 · Seller.
- **Errores:** Validaciones/duplicados lanzan IllegalArgumentException sin traductor local: pueden terminar en 500; no se garantiza 400. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#createSeller` → `ManageSellersUseCase#create`.

<a id="adm-04"></a>

### ADM-04 · Actualizar vendedor

**Operación:** `PUT /api/v1/admin/catalog/sellers/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; JSON SellerRequest completo.
- **Respuesta:** 200 · Seller.
- **Errores:** Validación o recurso inexistente no se traducen localmente: posible 500; no prometer 400/404 uniformes. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#updateSeller` → `ManageSellersUseCase#update`.

<a id="adm-05"></a>

### ADM-05 · Desactivar vendedor

**Operación:** `DELETE /api/v1/admin/catalog/sellers/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; sin cuerpo.
- **Respuesta:** 200 · Seller desactivado; no 204.
- **Errores:** Recurso inexistente sin traductor local: posible 500. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#deactivateSeller` → `ManageSellersUseCase#deactivate`.

<a id="adm-06"></a>

### ADM-06 · Listar marcas

**Operación:** `GET /api/v1/admin/catalog/brands`

- **Acceso:** ADMIN.
- **Entrada:** Sin cuerpo ni parámetros.
- **Respuesta:** 200 · Brand[]; sin paginación.
- **Errores:** Sin errores de negocio traducidos en esta lectura. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#brands` → `ManageBrandsUseCase#list`.

<a id="adm-07"></a>

### ADM-07 · Consultar marca

**Operación:** `GET /api/v1/admin/catalog/brands/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; sin cuerpo.
- **Respuesta:** 200 · Brand.
- **Errores:** 404 inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#brand` → `ManageBrandsUseCase#get`.

<a id="adm-08"></a>

### ADM-08 · Crear marca

**Operación:** `POST /api/v1/admin/catalog/brands`

- **Acceso:** ADMIN.
- **Entrada:** JSON BrandRequest.
- **Respuesta:** 201 · Brand.
- **Errores:** Validaciones/duplicados lanzan IllegalArgumentException sin traductor local: pueden terminar en 500; no se garantiza 400. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#createBrand` → `ManageBrandsUseCase#create`.

<a id="adm-09"></a>

### ADM-09 · Actualizar marca

**Operación:** `PUT /api/v1/admin/catalog/brands/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; JSON BrandRequest completo.
- **Respuesta:** 200 · Brand.
- **Errores:** Validación o recurso inexistente no se traducen localmente: posible 500; no prometer 400/404 uniformes. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#updateBrand` → `ManageBrandsUseCase#update`.

<a id="adm-10"></a>

### ADM-10 · Desactivar marca

**Operación:** `DELETE /api/v1/admin/catalog/brands/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; sin cuerpo.
- **Respuesta:** 200 · Brand desactivado; no 204.
- **Errores:** Recurso inexistente sin traductor local: posible 500. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#deactivateBrand` → `ManageBrandsUseCase#deactivate`.

<a id="adm-11"></a>

### ADM-11 · Listar categorías

**Operación:** `GET /api/v1/admin/catalog/categories`

- **Acceso:** ADMIN.
- **Entrada:** Sin cuerpo ni parámetros.
- **Respuesta:** 200 · Category[]; sin paginación.
- **Errores:** Sin errores de negocio traducidos en esta lectura. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#categories` → `ManageCategoriesUseCase#list`.

<a id="adm-12"></a>

### ADM-12 · Consultar categoría

**Operación:** `GET /api/v1/admin/catalog/categories/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; sin cuerpo.
- **Respuesta:** 200 · Category.
- **Errores:** 404 inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#category` → `ManageCategoriesUseCase#get`.

<a id="adm-13"></a>

### ADM-13 · Crear categoría

**Operación:** `POST /api/v1/admin/catalog/categories`

- **Acceso:** ADMIN.
- **Entrada:** JSON CategoryRequest.
- **Respuesta:** 201 · Category.
- **Errores:** Validaciones/duplicados lanzan IllegalArgumentException sin traductor local: pueden terminar en 500; no se garantiza 400. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#createCategory` → `ManageCategoriesUseCase#create`.

<a id="adm-14"></a>

### ADM-14 · Actualizar categoría

**Operación:** `PUT /api/v1/admin/catalog/categories/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; JSON CategoryRequest completo.
- **Respuesta:** 200 · Category.
- **Errores:** Validación o recurso inexistente no se traducen localmente: posible 500; no prometer 400/404 uniformes. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#updateCategory` → `ManageCategoriesUseCase#update`.

<a id="adm-15"></a>

### ADM-15 · Desactivar categoría

**Operación:** `DELETE /api/v1/admin/catalog/categories/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; sin cuerpo.
- **Respuesta:** 200 · Category desactivado; no 204.
- **Errores:** Recurso inexistente sin traductor local: posible 500. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#deactivateCategory` → `ManageCategoriesUseCase#deactivate`.

<a id="adm-16"></a>

### ADM-16 · Importar productos CSV

**Operación:** `POST /api/v1/admin/catalog/products/import/csv`

- **Acceso:** ADMIN.
- **Entrada:** Body CSV textual; Content-Type text/csv o application/csv; sin multipart ni JSON.
- **Respuesta:** 201 · ImportResult si errors=[]; 422 · ImportResult si hay errores.
- **Errores:** 422 documento, referencias, duplicados o filas inválidas; errores no controlados de persistencia pueden producir 500. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CatalogAdministrationResource#importProducts` → `ImportProductsFromCsvUseCase#execute`.


