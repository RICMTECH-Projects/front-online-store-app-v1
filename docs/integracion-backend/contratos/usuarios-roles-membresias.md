# Usuarios, roles y membresías comerciales

[Índice](../README.md)

Fuente REST: `src/main/java/org/ricm/identity/infrastructure/rest/IdentityAdministrationResource.java`. Casos: `identity/application/AdministerUsersUseCase.java`, `ManageRolesUseCase.java`, `seller/application/ManageSellerMembershipsUseCase.java`. Modelos: `identity/domain/Role.java`, `seller/domain/SellerMembership.java`.

Todos los endpoints requieren ADMIN; un usuario con solo SELLER no administra su equipo, aunque sea propietario.

## Modelos y ejemplos

### UserResponse y formularios

```json
{"id":20,"email":"persona@example.test","firstName":"Ana","lastName":"Pérez","status":"ACTIVE","roles":["CUSTOMER","SELLER"]}
```

`id:number`; email, firstName, lastName, status:string; roles:string[] (set serializado, sin orden garantizado aquí). No se serializan hashes. Listar devuelve UserResponse[] sin paginación.

CreateUserRequest:

```json
{"email":"persona@example.test","password":"EjemploSeguro2026!","firstName":"Ana","lastName":"Pérez","status":"ACTIVE","roleCodes":["CUSTOMER"]}
```

| Campo | Regla |
|---|---|
| email | Obligatorio, no blanco, contiene @, máximo 320; trim/minúsculas |
| password | Obligatorio; 8–128 caracteres |
| firstName, lastName | Obligatorios no blancos; se recortan; create no impone el máximo 100 en su validador, aunque la base tiene límites |
| status | Opcional null → ACTIVE; mayúsculas; ACTIVE/INACTIVE; blanco no es válido |
| roleCodes | Set/lista no vacía, códigos no blancos; trim/mayúsculas; deben existir en catálogo |

UpdateUserRequest (PUT completo de estos tres campos; no cambia correo, contraseña ni roles):

```json
{"firstName":"Ana María","lastName":"Pérez","status":"ACTIVE"}
```

Ambos nombres obligatorios y máximo 100 caracteres después de trim; status con la regla anterior. Omitir status en este PUT lo normaliza a ACTIVE: el frontend debe enviar el estado actual para no reactivar por accidente.

RoleAssignmentsRequest reemplaza **todos** los roles, no agrega incrementalmente:

```json
{"roleCodes":["CUSTOMER","SELLER"]}
```

Se rechaza lista nula/vacía. Códigos inexistentes producen IllegalStateException del adaptador y se traducen a 409. El usuario afectado debe volver a iniciar sesión para obtener JWT con grupos nuevos. `GET /auth/me` no renueva el token.

### Role

```json
{"id":4,"code":"SUPPORT","name":"Soporte"}
```

CreateRoleRequest:

```json
{"code":"SUPPORT","name":"Soporte"}
```

`code` requerido, se recorta y normaliza a mayúsculas; patrón `[A-Z][A-Z0-9_]{1,49}`, 2–50 caracteres. `name` requerido no blanco, recortado, máximo 100. Código único.

RenameRoleRequest:

```json
{"name":"Soporte comercial"}
```

No modifica code. No se eliminan ADMIN/CUSTOMER/SELLER ni roles asignados. Crear un rol personalizado no le da acceso a endpoints que exigen roles de sistema.

### SellerMembership

```json
{"id":9,"userId":20,"sellerId":3,"owner":true,"active":true}
```

id, userId, sellerId:number; owner, active:boolean. Listados devuelven SellerMembership[] con membresías activas e históricas, sin paginación; no son listas de UserResponse.

SellerMembershipRequest:

```json
{"owner":true,"active":true}
```

Ambos opcionales nullable: owner → false; active → true. El caso de uso también acepta comando nulo con esos defaults; en la UI enviar JSON explícito. Asignar a vendedor inactivo una membresía activa falla con 409. Asignar garantiza que la cuenta tenga SELLER, incluso si la membresía enviada es inactiva.

Solo puede existir un owner activo por vendedor. Asignar owner:true y active:true transfiere la propiedad y conserva al dueño previo como miembro activo sin ownership. owner no concede permisos exclusivos de gestión.

DELETE desactiva preservando historial y owner; no elimina el rol SELLER del usuario. Se puede repetir si ya estaba inactiva. La revocación de membresía afecta las peticiones de tienda inmediatamente; disponer del rol en el JWT no basta.

## Operaciones

<a id="idn-01"></a>

### IDN-01 · Listar usuarios

**Operación:** `GET /api/v1/admin/users`

- **Acceso:** ADMIN.
- **Entrada:** Sin cuerpo ni parámetros.
- **Respuesta:** 200 · UserResponse[].
- **Errores:** Sin errores de negocio traducidos para listado. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#listUsers` → `AdministerUsersUseCase#list`.

<a id="idn-02"></a>

### IDN-02 · Consultar usuario

**Operación:** `GET /api/v1/admin/users/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number positivo; sin cuerpo.
- **Respuesta:** 200 · UserResponse.
- **Errores:** 400 id inválido; 404 usuario inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#getUser` → `AdministerUsersUseCase#get`.

<a id="idn-03"></a>

### IDN-03 · Crear usuario administrativamente

**Operación:** `POST /api/v1/admin/users`

- **Acceso:** ADMIN.
- **Entrada:** JSON CreateUserRequest.
- **Respuesta:** 201 · UserResponse.
- **Errores:** 400 validación; 409 correo duplicado o rol requerido inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#createUser` → `AdministerUsersUseCase#create`.

<a id="idn-04"></a>

### IDN-04 · Actualizar usuario y estado

**Operación:** `PUT /api/v1/admin/users/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number positivo; JSON UpdateUserRequest.
- **Respuesta:** 200 · UserResponse.
- **Errores:** 400 validación; 404 inexistente; 409 conflicto de negocio si se produce. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#updateUser` → `AdministerUsersUseCase#update`.

<a id="idn-05"></a>

### IDN-05 · Reemplazar roles del usuario

**Operación:** `PUT /api/v1/admin/users/{id}/roles`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number positivo; JSON RoleAssignmentsRequest.
- **Respuesta:** 200 · UserResponse con roles resultantes.
- **Errores:** 400 lista vacía/código blanco; 404 usuario; 409 código de rol inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#replaceUserRoles` → `AdministerUsersUseCase#replaceRoles`.

<a id="idn-06"></a>

### IDN-06 · Listar tiendas asociadas al usuario

**Operación:** `GET /api/v1/admin/users/{id}/sellers`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number positivo de usuario; sin cuerpo.
- **Respuesta:** 200 · SellerMembership[].
- **Errores:** 400 id inválido; 404 usuario inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#listUserSellerMemberships` → `ManageSellerMembershipsUseCase#listForUser`.

<a id="idn-07"></a>

### IDN-07 · Asignar tienda o transferir propietario

**Operación:** `PUT /api/v1/admin/users/{id}/sellers/{sellerId}`

- **Acceso:** ADMIN.
- **Entrada:** Path id de usuario y sellerId positivos; JSON SellerMembershipRequest.
- **Respuesta:** 200 · SellerMembership tanto al crear como actualizar.
- **Errores:** 400 IDs inválidos; 404 usuario/vendedor; 409 membresía activa en vendedor inactivo. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#assignSellerToUser` → `ManageSellerMembershipsUseCase#assign`.

<a id="idn-08"></a>

### IDN-08 · Desactivar membresía

**Operación:** `DELETE /api/v1/admin/users/{id}/sellers/{sellerId}`

- **Acceso:** ADMIN.
- **Entrada:** Path id de usuario y sellerId positivos; sin cuerpo.
- **Respuesta:** 200 · SellerMembership active=false.
- **Errores:** 400 IDs inválidos; 404 membresía inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#deactivateSellerMembership` → `ManageSellerMembershipsUseCase#deactivate`.

<a id="idn-09"></a>

### IDN-09 · Listar miembros del vendedor

**Operación:** `GET /api/v1/admin/sellers/{sellerId}/users`

- **Acceso:** ADMIN.
- **Entrada:** Path sellerId:number positivo; sin cuerpo.
- **Respuesta:** 200 · SellerMembership[]; datos personales se resuelven aparte con usuarios autorizados.
- **Errores:** 400 id inválido; 404 vendedor inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#listSellerUsers` → `ManageSellerMembershipsUseCase#listForSeller`.

<a id="idn-10"></a>

### IDN-10 · Listar roles

**Operación:** `GET /api/v1/admin/roles`

- **Acceso:** ADMIN.
- **Entrada:** Sin cuerpo ni parámetros.
- **Respuesta:** 200 · Role[]; sin paginación.
- **Errores:** Sin errores de negocio traducidos para listado. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#listRoles` → `ManageRolesUseCase#list`.

<a id="idn-11"></a>

### IDN-11 · Consultar rol

**Operación:** `GET /api/v1/admin/roles/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id:number positivo; sin cuerpo.
- **Respuesta:** 200 · Role.
- **Errores:** 400 id inválido; 404 rol inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#getRole` → `ManageRolesUseCase#get`.

<a id="idn-12"></a>

### IDN-12 · Crear rol

**Operación:** `POST /api/v1/admin/roles`

- **Acceso:** ADMIN.
- **Entrada:** JSON CreateRoleRequest.
- **Respuesta:** 201 · Role.
- **Errores:** 400 validación; 409 código duplicado. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#createRole` → `ManageRolesUseCase#create`.

<a id="idn-13"></a>

### IDN-13 · Renombrar rol

**Operación:** `PUT /api/v1/admin/roles/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id positivo; JSON RenameRoleRequest.
- **Respuesta:** 200 · Role.
- **Errores:** 400 nombre/id inválidos; 404 inexistente. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#renameRole` → `ManageRolesUseCase#rename`.

<a id="idn-14"></a>

### IDN-14 · Eliminar rol permitido

**Operación:** `DELETE /api/v1/admin/roles/{id}`

- **Acceso:** ADMIN.
- **Entrada:** Path id positivo; sin cuerpo.
- **Respuesta:** 204 · sin cuerpo.
- **Errores:** 400 id inválido; 404 inexistente; 409 rol de sistema o asignado a usuarios. Aplican también las [convenciones HTTP](../README.md#convenciones-http).
- **Fuente:** `IdentityAdministrationResource#deleteRole` → `ManageRolesUseCase#delete`.


