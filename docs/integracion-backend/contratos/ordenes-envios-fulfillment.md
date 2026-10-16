# Checkout, órdenes, cotización, envíos y fulfillment

[Índice](../README.md) · [Flujo de negocio](../flujo-backend.md)

Fuentes REST bajo `src/main/java/org/ricm/`: `order/infrastructure/rest/OrderResource.java`, `shipping/infrastructure/rest/ShippingQuoteResource.java`, `ShipmentResource.java`, `fulfillment/infrastructure/rest/SellerFulfillmentResource.java`.
Casos en `order/application/`, `shipping/application/`, `fulfillment/application/`; política en `shipping/infrastructure/rates/LocalShippingRatePolicy.java`.

## QuoteRequest / ShippingQuote

```json
{"shippingAddressId":11,"merchandiseSubtotal":159.9,"currency":"PEN"}
```

shippingAddressId:number obligatorio de una dirección propia; merchandiseSubtotal:number obligatorio >=0; currency:string de tres letras, requerido por ShippingQuote, normaliza mayúsculas. No se envía customerId: se deriva del JWT. Cotizar no consulta líneas de producto ni reserva stock; el subtotal indicado es una estimación del frontend.

```json
{"carrier":"LOCAL_DELIVERY","serviceLevel":"STANDARD","total":9.9,"currency":"PEN"}
```

Todos obligatorios en ShippingQuote: carrier,serviceLevel,currency:string; total:number.

| Condición en el orden evaluado | Importe | Carrier |
|---|---:|---|
| Subtotal de mercancía >=250 | 0 | LOCAL_DELIVERY |
| Subtotal menor y país distinto de PE | 29.90 | INTERNATIONAL_DELIVERY |
| Subtotal menor, PE, city Lima o Callao | 9.90 | LOCAL_DELIVERY |
| Subtotal menor, resto de PE | 14.90 | NATIONAL_DELIVERY |

serviceLevel siempre STANDARD. El umbral usa subtotal anterior a cupones. No hay conversión monetaria; checkout recalcula en PEN.

## CheckoutCommand / Order

Contrato **directo del backend**, distinto de la entrada interna que adaptará el BFF:

```json
{"userId":20,"lines":[{"productId":45,"warehouseId":1,"quantity":1}],"couponCodes":[],"shippingAddressId":11}
```

| Campo | Regla |
|---|---|
| userId | number obligatorio; su texto debe coincidir con sub JWT |
| lines | Lista obligatoria no vacía; cada elemento no nulo |
| lines[].productId | number obligatorio; producto existente ACTIVE |
| lines[].warehouseId | number obligatorio; debe existir inventario del producto en ese almacén |
| lines[].quantity | integer >0 |
| couponCodes | string[] opcional; null/[] sin cupones; reglas en [cupones](cupones.md) |
| shippingAddressId | number requerido en la ejecución con ShippingQuote configurado; dirección propia |

El precio no lo envía el cliente: se obtiene de MySQL. Solo la disponibilidad comercial se deriva de ACTIVE; el stock se valida al reservar. Todo se ejecuta en una transacción: validaciones, reservas, orden, usos de cupón, envío, fulfillments y Outbox.

Respuesta Order:

```json
{"id":81,"userId":20,"orderNumber":"ORD-AB12CD34","status":"PENDING","subtotal":159.9,"shippingTotal":9.9,"discountTotal":0,"grandTotal":169.8,"currency":"PEN","shippingAddressId":11}
```

id,userId,shippingAddressId:number; orderNumber,status,currency:string; importes:number. El record HTTP **no incluye líneas, cupones aplicados ni taxTotal**, aunque existan en tablas internas. Confirmación puede acompañar los importes oficiales con el resumen local enviado, identificado como tal.

OrderStatus admite PENDING, CONFIRMED, PAID, FULFILLED, CANCELLED, REFUNDED, pero la API actual solo crea PENDING y permite completar PENDING/PAID a FULFILLED. No hay acciones para pagar, confirmar, cancelar o reembolsar. Completar de nuevo FULFILLED devuelve la orden sin repetir eventos/efectos. Completar no exige entrega de los fulfillments ni del shipment.

El checkout fija currency PEN y no valida coherencia de moneda entre productos. La UI de compra debe habilitar solo productos PEN. No hay clave de idempotencia para crear orden: X-Correlation-ID es trazabilidad. Bloquear doble submit y no reintentar automáticamente un POST tras resultado de red incierto.

## Shipment y actualización global

```json
{"id":12,"orderId":81,"carrier":"LOCAL_DELIVERY","serviceLevel":"STANDARD","trackingNumber":null,"status":"PENDING","shippedAt":null,"deliveredAt":null}
```

id,orderId:number; status enum; carrier,serviceLevel,trackingNumber:string|null; shippedAt,deliveredAt:string fecha/hora con offset|null.

ShipmentUpdateRequest:

```json
{"status":"SHIPPED","carrier":"Courier Ejemplo","serviceLevel":"STANDARD","trackingNumber":"TRACK-81"}
```

status es obligatorio. carrier,serviceLevel,trackingNumber opcionales: null/blanco **conservan** lo anterior, no lo borran. SHIPPED/DELIVERED exigen carrier y tracking almacenados o enviados. Las fechas las genera el backend; no se envían.

## SellerFulfillment, SellerOrder y SellerOrderPage

```json
{"id":14,"orderId":81,"sellerId":3,"status":"PENDING","carrier":null,"trackingNumber":null,"shippedAt":null,"deliveredAt":null,"createdAt":"2026-10-16T12:00:00-05:00","updatedAt":"2026-10-16T12:00:00-05:00"}
```

id,orderId,sellerId:number; status enum; carrier,trackingNumber:string|null; fechas:string con offset (hitos pueden ser null). No tiene serviceLevel.

SellerOrderPage para vendedor y administrador:

```json
{"items":[{"orderId":81,"orderNumber":"ORD-AB12CD34","orderStatus":"PENDING","currency":"PEN","fulfillment":{"id":14,"orderId":81,"sellerId":3,"status":"PENDING","carrier":null,"trackingNumber":null,"shippedAt":null,"deliveredAt":null,"createdAt":"2026-10-16T12:00:00-05:00","updatedAt":"2026-10-16T12:00:00-05:00"},"lines":[{"id":201,"productId":45,"sku":"TEC-045","productName":"Teclado","quantity":1,"unitPrice":159.9,"discountTotal":0,"lineTotal":159.9}]}],"page":0,"size":20,"total":1}
```

items:SellerOrder[]; page,size,total:number. SellerOrder contiene orderId:number, orderNumber/orderStatus/currency:string, fulfillment:SellerFulfillment y lines:SellerOrderLine[]. Cada línea tiene id/productId/quantity:number, sku/productName:string e importes unitPrice/discountTotal/lineTotal:number.

page base cero, default 0, >=0; size default 20, 1–100. Esta paginación usa **total**, no totalElements/totalPages del catálogo vendedor. En la consulta admin, la unidad es la porción por vendedor: una orden puede aparecer en varias filas; deduplicar orderId para enlaces de envío. No incluye datos completos del cliente, dirección ni totales globales de la compra.

FulfillmentUpdateRequest (vendedor y admin):

```json
{"status":"SHIPPED","carrier":"Courier Ejemplo","trackingNumber":"TRACK-81-3"}
```

status obligatorio. carrier/trackingNumber opcionales, null/blanco conservan datos. SHIPPED/DELIVERED requieren ambos disponibles. No se envían sellerId dentro del body ni fechas.

## Ciclos de vida separados

ShipmentStatus y SellerFulfillmentStatus comparten valores/transiciones:

```text
PENDING -> READY_TO_SHIP -> SHIPPED -> DELIVERED
PENDING -> CANCELLED
READY_TO_SHIP -> CANCELLED
```

Repetir el mismo estado es válido y permite actualizar metadatos; los hitos existentes no se reemplazan. No hay retrocesos desde SHIPPED, reapertura desde DELIVERED/CANCELLED ni salto directo PENDING→SHIPPED.

Cambiar fulfillment no actualiza shipment ni Order.status; completar orden no despacha el envío. CANCELLED de logística no cancela comercialmente la orden, no libera stock y no reembolsa.

Para fulfillment vendedor se valida rol SELLER y membresía activa. A diferencia del catálogo, este caso de uso **no comprueba estado ACTIVE del vendedor**: no describir un bloqueo global de fulfillment por desactivar la tienda.

No hay GET de listado/detalle completo de órdenes del cliente ni listado global de shipments. Usar el ID recibido en checkout y las porciones de orden accesibles al administrador. No hay consulta por orderNumber.

## Operaciones

<a id="ope-01"></a>

### OPE-01 · Cotizar envío

**Operación:** `POST /api/v1/shipping/quotes`

- **Acceso:** CUSTOMER.
- **Entrada:** JSON QuoteRequest; sin query/path adicionales.
- **Respuesta:** 200 · ShippingQuote.
- **Errores:** 400 destino ajeno/inexistente, subtotal/currency inválidos o cuerpo ausente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ShippingQuoteResource#quote` → `CalculateShippingQuoteUseCase#execute`, `LocalShippingRatePolicy#quote`.

<a id="ope-02"></a>

### OPE-02 · Crear orden y reservar stock

**Operación:** `POST /api/v1/orders`

- **Acceso:** CUSTOMER.
- **Entrada:** JSON CheckoutCommand.
- **Respuesta:** 201 · Order PENDING.
- **Errores:** 403 userId distinto del JWT; 400 líneas/producto/dirección/inventario/cupón inválidos; 409 stock insuficiente o conflicto concurrente de cupón; posible error de infraestructura no normalizado. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `OrderResource#create` → `CheckoutUseCase#execute`.

<a id="ope-03"></a>

### OPE-03 · Completar orden comercial

**Operación:** `POST /api/v1/orders/{id}/complete`

- **Acceso:** ADMIN.
- **Entrada:** Path id de orden; sin cuerpo.
- **Respuesta:** 200 · Order FULFILLED; idempotente si ya estaba FULFILLED.
- **Errores:** 400 orden inexistente; 409 estado comercial no completable. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `OrderResource#complete` → `CompleteOrderUseCase#execute`, `PanacheOrderRepository#complete`.

<a id="ope-04"></a>

### OPE-04 · Consultar envío global

**Operación:** `GET /api/v1/orders/{orderId}/shipment`

- **Acceso:** CUSTOMER propietario o ADMIN.
- **Entrada:** Path orderId:number; sin cuerpo.
- **Respuesta:** 200 · Shipment.
- **Errores:** 403 cliente ajeno; cliente con ID inexistente puede recibir 403 antes del lookup; 404 envío inexistente tras autorizar; 400 entrada inválida en caso de uso. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ShipmentResource#get` → `ShipmentResource#assertOrderAccess`, `GetShipmentUseCase#execute`.

<a id="ope-05"></a>

### OPE-05 · Actualizar envío global

**Operación:** `PATCH /api/v1/admin/orders/{orderId}/shipment`

- **Acceso:** ADMIN.
- **Entrada:** Path orderId:number; JSON ShipmentUpdateRequest.
- **Respuesta:** 200 · Shipment.
- **Errores:** 400 body/status/carrier/tracking inválidos; 404 envío; 409 transición no permitida. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `ShipmentResource#update` → `UpdateShipmentUseCase#execute`.

<a id="ope-06"></a>

### OPE-06 · Listar porciones de órdenes propias

**Operación:** `GET /api/v1/seller/orders`

- **Acceso:** SELLER y membresía activa.
- **Entrada:** Query sellerId obligatorio; page/size opcionales; sin cuerpo.
- **Respuesta:** 200 · SellerOrderPage.
- **Errores:** 400 sellerId ausente o page/size inválidos; 403 membresía/sub inválido. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerFulfillmentResource#listSellerOrders` → `GetSellerOrdersUseCase#forSeller`.

<a id="ope-07"></a>

### OPE-07 · Consultar porción propia de una orden

**Operación:** `GET /api/v1/seller/orders/{orderId}`

- **Acceso:** SELLER y membresía activa.
- **Entrada:** Path orderId; query sellerId obligatorio; sin cuerpo.
- **Respuesta:** 200 · SellerOrder.
- **Errores:** 400 contexto inválido; 403 membresía; 404 porción no encontrada. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerFulfillmentResource#getSellerOrder` → `GetSellerOrdersUseCase#oneForSeller`.

<a id="ope-08"></a>

### OPE-08 · Actualizar fulfillment propio

**Operación:** `PATCH /api/v1/seller/orders/{orderId}/fulfillment`

- **Acceso:** SELLER y membresía activa.
- **Entrada:** Path orderId; query sellerId obligatorio; JSON FulfillmentUpdateRequest.
- **Respuesta:** 200 · SellerFulfillment.
- **Errores:** 400 body/contexto/tracking inválido; 403 membresía; 404 porción; 409 transición. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerFulfillmentResource#updateSellerFulfillment` → `UpdateSellerFulfillmentUseCase#executeForSeller`.

<a id="ope-09"></a>

### OPE-09 · Listar porciones globales

**Operación:** `GET /api/v1/admin/seller-fulfillments`

- **Acceso:** ADMIN.
- **Entrada:** Query sellerId y orderId opcionales; page/size opcionales; sin cuerpo.
- **Respuesta:** 200 · SellerOrderPage.
- **Errores:** 400 page/size inválidos; filtros sin coincidencia devuelven lista vacía. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerFulfillmentResource#listAllSellerFulfillments` → `GetSellerOrdersUseCase#forAdmin`.

<a id="ope-10"></a>

### OPE-10 · Actualizar fulfillment como administrador

**Operación:** `PATCH /api/v1/admin/orders/{orderId}/seller-fulfillments/{sellerId}`

- **Acceso:** ADMIN; no requiere membresía.
- **Entrada:** Path orderId/sellerId; JSON FulfillmentUpdateRequest.
- **Respuesta:** 200 · SellerFulfillment.
- **Errores:** 400 body/contexto/tracking inválido; 404 porción; 409 transición. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `SellerFulfillmentResource#updateSellerFulfillmentAsAdmin` → `UpdateSellerFulfillmentUseCase#executeForAdmin`.


