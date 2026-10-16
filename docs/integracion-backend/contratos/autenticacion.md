# Autenticación y sesión

[Índice](../README.md) · [Plan del frontend](../plan-frontend.md)

Fuente: `src/main/java/org/ricm/identity/infrastructure/rest/AuthResource.java`; casos de uso en `identity/application/`, modelos en `identity/domain/`, dentro del ZIP identificado en el índice. Los cuerpos y ejemplos de este documento corresponden al backend directo, sin envoltorio `data`.

## Modelos y ejemplos

### Registro

Todos los campos son obligatorios. `email` no vacío y contiene `@`; se recorta y pasa a minúsculas. `firstName` y `lastName` no vacíos, se recortan. Contraseña entre 8 y 128 caracteres. No hay regla de complejidad adicional ni confirmación de contraseña en la API.

```json
{"email":"cliente@example.test","password":"EjemploSeguro2026!","firstName":"Ana","lastName":"Pérez"}
```

Respuesta `RegisteredUser`:

```json
{"id":20,"email":"cliente@example.test","firstName":"Ana","lastName":"Pérez"}
```

Crea cuenta `ACTIVE`, rol `CUSTOMER`. No devuelve token ni inicia sesión automáticamente.

### Login

`email` y `password` obligatorios (no nulos); el correo se recorta y pasa a minúsculas. Se exige cuenta activa y contraseña válida.

```json
{"email":"cliente@example.test","password":"EjemploSeguro2026!"}
```

Respuesta `TokenResponse`:

```json
{"accessToken":"<JWT_SOLO_EN_BACKEND_Y_COOKIE>","tokenType":"Bearer","expiresIn":3600}
```

`expiresIn` es el valor anunciado por `AuthResource` (segundos); el emisor usa SmallRye JWT. No hay refresh token, endpoint de renovación ni logout en este backend. El logout existente del frontend es una ruta local del BFF.

### Usuario actual

`CurrentUser`: `id: number`, `email, firstName, lastName, status: string`, `roles: string[]`. No contiene hash ni contraseña. `roles` se ordena en esta respuesta y refleja la base de datos; los permisos del JWT emitido anteriormente no se renuevan por consultar este endpoint.

```json
{"id":20,"email":"cliente@example.test","firstName":"Ana","lastName":"Pérez","status":"ACTIVE","roles":["CUSTOMER"]}
```

### Recuperación y cambio

Solicitud (correo obligatorio, no vacío, contiene `@`):

```json
{"email":"cliente@example.test"}
```

Respuesta `ResetRequested`, igual para correo desconocido o cuenta inactiva:

```json
{"message":"If the account exists, password reset instructions have been sent"}
```

Confirmación: `token` obligatorio no vacío y `newPassword` de 8–128 caracteres.

```json
{"token":"token-de-un-solo-uso","newPassword":"OtraClaveSegura2026!"}
```

Cambio con sesión: `currentPassword` obligatorio no vacío y `newPassword` de 8–128 caracteres.

```json
{"currentPassword":"EjemploSeguro2026!","newPassword":"OtraClaveSegura2026!"}
```

El token de recuperación dura 15 minutos, es de un solo uso y una nueva solicitud invalida los tokens abiertos anteriores. `LoggingPasswordResetNotifier` solo registra la notificación; expone el token en logs únicamente si se configura esa opción. No hay proveedor de correo implementado.

Un usuario con solo `SELLER` **no** puede usar cambio de contraseña con sesión; sí puede solicitar recuperación pública. No asumir que cambiar/restablecer contraseña revoca todos los JWT ya emitidos.

## Operaciones

<a id="auth-01"></a>

### AUTH-01 · Registrar cliente

**Operación:** `POST /api/v1/auth/register`

- **Acceso:** Público.
- **Entrada:** JSON Registro; sin query/path.
- **Respuesta:** 201 · RegisteredUser.
- **Errores:** 400 validación; 409 correo duplicado. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `AuthResource#register` → `RegisterUserUseCase#execute`.

<a id="auth-02"></a>

### AUTH-02 · Iniciar sesión

**Operación:** `POST /api/v1/auth/login`

- **Acceso:** Público.
- **Entrada:** JSON Login; sin query/path.
- **Respuesta:** 200 · TokenResponse.
- **Errores:** 400 campos nulos; 401 credenciales inválidas o cuenta inactiva. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `AuthResource#login` → `LoginUseCase#execute`.

<a id="auth-03"></a>

### AUTH-03 · Consultar usuario autenticado

**Operación:** `GET /api/v1/auth/me`

- **Acceso:** JWT válido; cualquier rol o cuenta autenticada.
- **Entrada:** Sin cuerpo ni parámetros; identidad del sub del JWT.
- **Respuesta:** 200 · CurrentUser.
- **Errores:** 401 token ausente/inválido; 404 usuario inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `AuthResource#me` → `GetCurrentUserUseCase#execute`.

<a id="auth-04"></a>

### AUTH-04 · Solicitar recuperación

**Operación:** `POST /api/v1/auth/password-reset/request`

- **Acceso:** Público.
- **Entrada:** JSON Solicitud de recuperación.
- **Respuesta:** 202 · ResetRequested.
- **Errores:** 400 correo inválido; no revela si existe. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `AuthResource#requestPasswordReset` → `RequestPasswordResetUseCase#execute`.

<a id="auth-05"></a>

### AUTH-05 · Confirmar recuperación

**Operación:** `POST /api/v1/auth/password-reset/confirm`

- **Acceso:** Público.
- **Entrada:** JSON Confirmación; token va en body, no en path del backend.
- **Respuesta:** 204 · sin cuerpo.
- **Errores:** 400 token ausente, vencido, consumido o nueva contraseña inválida. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `AuthResource#confirmPasswordReset` → `ConfirmPasswordResetUseCase#execute`.

<a id="auth-06"></a>

### AUTH-06 · Cambiar contraseña con sesión

**Operación:** `POST /api/v1/auth/password/change`

- **Acceso:** CUSTOMER o ADMIN.
- **Entrada:** JSON Cambio; identidad del JWT.
- **Respuesta:** 204 · sin cuerpo.
- **Errores:** 400 contraseña actual incorrecta o nueva inválida; 403 SELLER sin otro rol permitido; usuario eliminado puede producir 500 porque NoSuchElementException no se traduce aquí. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `AuthResource#changePassword` → `ChangePasswordUseCase#execute`.


