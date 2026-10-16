# Cupones y reglas de aplicación

[Índice](../README.md) · [Checkout](ordenes-envios-fulfillment.md)

Fuente REST: `src/main/java/org/ricm/promotion/infrastructure/rest/CouponAdminResource.java`. Casos: `promotion/application/CreateCouponUseCase.java`, `ListCouponsUseCase.java`, `ChangeCouponActiveUseCase.java`, `ApplyCouponsUseCase.java`; agregado `promotion/domain/Coupon.java`.

Solo ADMIN administra cupones. CUSTOMER los utiliza enviando códigos en checkout; no hay endpoint público de listado, validación o preview de descuento.

## CreateCouponRequest

| Campo | Tipo | Regla |
|---|---|---|
| code | string | Obligatorio no blanco; trim/mayúsculas; único |
| discountType | string enum | FIXED o PERCENTAGE; obligatorio |
| discountValue | number | Obligatorio >0; porcentaje <=100 |
| startsAt, endsAt | string fecha/hora con offset | Obligatorios; endsAt estrictamente posterior |
| minOrderAmount | number o null | Opcional, >=0 |
| maxDiscountAmount | number o null | Opcional, >=0 |
| usageLimit, perUserLimit | integer o null | Opcionales; si se informan, >0 |
| active | boolean o null | Omitido/null → true |
| productIds, categoryIds, userIds | number[] o null | Opcionales; null → conjuntos vacíos; sin duplicados efectivos |

```json
{"code":"BIENVENIDA10","discountType":"PERCENTAGE","discountValue":10,"minOrderAmount":100,"maxDiscountAmount":30,"startsAt":"2026-10-01T00:00:00-05:00","endsAt":"2026-12-31T23:59:59-05:00","usageLimit":1000,"perUserLimit":1,"active":true,"productIds":[],"categoryIds":[1],"userIds":[]}
```

Las fechas son ejemplos, no valores predeterminados: ajustarlas para las pruebas. FIXED expresa un importe; no existe campo currency en el cupón. El flujo comercial acordado usa PEN.

## Coupon

Devuelve los campos anteriores más `id:number`, `usageCount:number`. active es boolean y los conjuntos son arrays, sin orden garantizado.

```json
{"id":6,"code":"BIENVENIDA10","discountType":"PERCENTAGE","discountValue":10,"minOrderAmount":100,"maxDiscountAmount":30,"startsAt":"2026-10-01T00:00:00-05:00","endsAt":"2026-12-31T23:59:59-05:00","usageLimit":1000,"perUserLimit":1,"usageCount":0,"active":true,"productIds":[],"categoryIds":[1],"userIds":[]}
```

ActiveRequest:

```json
{"active":false}
```

El body es obligatorio; active es boolean primitivo y omitirlo equivale a false. Enviar siempre el campo. No existe edición de reglas ni eliminación de un cupón creado.

## Reglas reales durante checkout

- Acepta varios códigos; recorta y normaliza mayúsculas. Blancos y repetidos rechazan la operación.
- Exige cupón existente, activo, dentro de fechas, con capacidad total y por usuario, mínimo de compra y segmentación aplicables.
- productIds y categoryIds se combinan con OR para seleccionar líneas. userIds se aplica como condición adicional.
- Sin segmentación de catálogo, el descuento aplica al subtotal completo. Mínimo de compra se compara con el subtotal de mercancía anterior a descuentos.
- Cada cupón calcula su descuento sobre el subtotal elegible original; se aplica un tope por cupón y por saldo restante del subtotal. No es una cadena de porcentajes recalculados sobre el saldo.
- Los códigos se procesan en el orden recibido; si el saldo ya es cero y un siguiente cupón no produce descuento, se rechaza.
- El backend redondea descuentos a 4 decimales y limita el total al subtotal. El frontend no confirma cupones antes de crear la orden.
- Los usos se registran junto con la orden en la misma transacción. Un límite agotado concurrentemente puede producir 409 al registrar el uso.

No todos los errores de referencias de segmentación están traducidos a errores de negocio. Usar IDs reales; no prometer una validación por fila como en CSV.

## Operaciones

<a id="cup-01"></a>

### CUP-01 · Listar cupones

**Operación:** `GET /api/v1/admin/coupons`

- **Acceso:** ADMIN.
- **Entrada:** Sin cuerpo ni parámetros; no paginado.
- **Respuesta:** 200 · Coupon[].
- **Errores:** Sin errores de negocio traducidos para listado. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CouponAdminResource#list` → `ListCouponsUseCase#execute`.

<a id="cup-02"></a>

### CUP-02 · Crear cupón

**Operación:** `POST /api/v1/admin/coupons`

- **Acceso:** ADMIN.
- **Entrada:** JSON CreateCouponRequest.
- **Respuesta:** 201 · Coupon.
- **Errores:** 400 campos/reglas inválidos; 409 código duplicado; posible 500 de integridad no traducida. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CouponAdminResource#create` → `CreateCouponUseCase#execute`.

<a id="cup-03"></a>

### CUP-03 · Activar o desactivar cupón

**Operación:** `PATCH /api/v1/admin/coupons/{id}/active`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number; JSON ActiveRequest.
- **Respuesta:** 200 · Coupon.
- **Errores:** 400 cuerpo ausente o cupón inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CouponAdminResource#changeActive` → `ChangeCouponActiveUseCase#execute`.


