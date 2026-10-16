# Clientes y direcciones

[Índice](../README.md)

Fuente REST: `src/main/java/org/ricm/customer/infrastructure/rest/CustomerResource.java`. Casos: `customer/application/*UseCase.java`; modelos: `customer/domain/CustomerProfile.java` y `Address.java`.

Todo el documento requiere JWT con `CUSTOMER`. El backend usa `sub` como `userId`; no se envía un cliente elegido en el cuerpo. Una cuenta multirrol con `CUSTOMER` también tiene estas capacidades.

## Modelos y ejemplos

### CustomerProfile

```json
{"id":20,"email":"cliente@example.test","firstName":"Ana","lastName":"Pérez","status":"ACTIVE"}
```

Campos: `id: number`, resto `string`. No incluye `roles`; no reemplazar con este objeto completo el usuario de autenticación perdiendo sus roles.

### ProfileRequest

`firstName` y `lastName`: string obligatorios, no blancos, máximo 100 caracteres después de recortar. Solo cambia nombres; correo y estado no se editan por esta API.

```json
{"firstName":"Ana María","lastName":"Pérez"}
```

### AddressRequest / Address

| Campo de entrada | Tipo | Requerido / regla |
|---|---|---|
| recipientName | string | Sí; no blanco; máximo 200 |
| line1 | string | Sí; no blanco; máximo 200 |
| city | string | Sí; no blanco; máximo 100 |
| countryCode | string | Sí; dos letras; normaliza a mayúsculas |
| label | string o null | Opcional; máximo 100 |
| phone | string o null | Opcional en el backend; máximo 30 |
| line2 | string o null | Opcional; máximo 200 |
| district, region | string o null | Opcionales; máximo 100 cada uno |
| postalCode | string o null | Opcional; máximo 20 |
| defaultAddress | boolean | Si se omite, false antes de aplicar la regla de primera dirección |

Los límites se verifican sobre texto recortado; textos opcionales blancos se convierten a null. La API no impone regex de teléfono ni ubigeo.

```json
{"label":"Casa","recipientName":"Ana Pérez","phone":"999111222","line1":"Av. Ejemplo 123","line2":null,"district":"Miraflores","city":"Lima","region":"Lima","countryCode":"PE","postalCode":null,"defaultAddress":true}
```

Respuesta `Address`: mismos campos más `id: number` y `userId: number`.

```json
{"id":11,"userId":20,"label":"Casa","recipientName":"Ana Pérez","phone":"999111222","line1":"Av. Ejemplo 123","line2":null,"district":"Miraflores","city":"Lima","region":"Lima","countryCode":"PE","postalCode":null,"defaultAddress":true}
```

Los listados devuelven un array de Address (vacío: `[]`), sin paginación. Las escrituras PUT reciben el formulario completo, no un parche parcial.

## Reglas de dirección predeterminada

- La primera dirección se vuelve predeterminada aunque se envíe false.
- Marcar otra como predeterminada desmarca las anteriores.
- Quitar esa marca a la dirección actual elige otra; la única dirección restante no puede perderla.
- Eliminar la predeterminada promueve otra si existe; refrescar toda la libreta después de cada mutación.
- Editar o borrar una dirección ajena responde 404, igual que una inexistente.
- La orden guarda la referencia a la dirección, sin snapshot inmutable. La eliminación de una dirección ya referenciada podría fallar por integridad de base de datos; no hay una respuesta de conflicto de negocio dedicada en este recurso.

## Operaciones

<a id="cli-01"></a>

### CLI-01 · Consultar perfil

**Operación:** `GET /api/v1/customers/me`

- **Acceso:** CUSTOMER.
- **Entrada:** Sin cuerpo, query ni path adicionales.
- **Respuesta:** 200 · CustomerProfile.
- **Errores:** 404 perfil inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CustomerResource#profile` → `GetCustomerProfileUseCase#execute`.

<a id="cli-02"></a>

### CLI-02 · Actualizar perfil

**Operación:** `PUT /api/v1/customers/me`

- **Acceso:** CUSTOMER.
- **Entrada:** JSON ProfileRequest.
- **Respuesta:** 200 · CustomerProfile con nombres actualizados.
- **Errores:** 400 formulario inválido; 404 perfil inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CustomerResource#updateProfile` → `UpdateCustomerProfileUseCase#execute`.

<a id="cli-03"></a>

### CLI-03 · Listar direcciones propias

**Operación:** `GET /api/v1/customers/me/addresses`

- **Acceso:** CUSTOMER.
- **Entrada:** Sin cuerpo ni parámetros.
- **Respuesta:** 200 · Address[].
- **Errores:** 400 identidad inválida en caso de uso; errores de infraestructura no normalizados. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CustomerResource#addresses` → `ListAddressesUseCase#execute`.

<a id="cli-04"></a>

### CLI-04 · Crear dirección

**Operación:** `POST /api/v1/customers/me/addresses`

- **Acceso:** CUSTOMER.
- **Entrada:** JSON AddressRequest.
- **Respuesta:** 201 · Address con id asignado.
- **Errores:** 400 campos inválidos o cuerpo ausente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CustomerResource#addAddress` → `CreateAddressUseCase#execute`.

<a id="cli-05"></a>

### CLI-05 · Actualizar dirección

**Operación:** `PUT /api/v1/customers/me/addresses/{id}`

- **Acceso:** CUSTOMER.
- **Entrada:** Path id de dirección; JSON AddressRequest completo.
- **Respuesta:** 200 · Address.
- **Errores:** 400 campos inválidos; 404 dirección ajena o inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CustomerResource#updateAddress` → `UpdateAddressUseCase#execute`.

<a id="cli-06"></a>

### CLI-06 · Eliminar dirección

**Operación:** `DELETE /api/v1/customers/me/addresses/{id}`

- **Acceso:** CUSTOMER.
- **Entrada:** Path id de dirección; sin cuerpo.
- **Respuesta:** 204 · sin cuerpo.
- **Errores:** 400 identificadores ausentes en caso de uso; 404 ajena o inexistente; posible fallo de integridad si está referenciada por una orden. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `CustomerResource#deleteAddress` → `DeleteAddressUseCase#execute`.


