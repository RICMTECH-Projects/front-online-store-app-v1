# Verificación y pruebas de aceptación

[Índice](README.md) · [Matriz](matriz-integracion.md) · [Plan](plan-frontend.md)

## Qué se verificó en esta entrega

La entrega solo cambia Markdown. La validación documental comprueba el inventario contra los recursos Java del ZIP, los enlaces locales/fragmentos, las definiciones de IDs y la sintaxis de ejemplos JSON. No se ejecutó el backend, no se enviaron mutaciones HTTP y no se levantó infraestructura.

No se requiere build de aplicación para estos cambios documentales; los comandos y escenarios de frontend que siguen son **criterios para la implementación posterior**, no resultados ya obtenidos.

### Lista de comprobación documental

- [x] 70 operaciones método+ruta extraídas de 11 recursos Java.
- [x] 70 definiciones de contrato, con IDs únicos y fuente recurso/método.
- [x] 70 filas de matriz enlazadas con contratos, actor, pantalla, acción, dependencia, estado actual y fase.
- [x] Revisión estática de DTOs, modelos, validadores, defaults, errores traducidos y excepciones sin traducción.
- [x] Comparación con guías y Postman; diferencias registradas.
- [x] Hash de procedencia y distinción entre contrato backend y adaptación futura del BFF.
- [x] Decisiones del usuario conservadas: portal propio, almacén configurable y referencias reales configuradas.

Antes de cerrar cambios futuros: volver a contrastar el conjunto de rutas, resolver enlaces locales y fragmentos, parsear todos los bloques json y revisar `git diff --check`. Estas comprobaciones no prueban el comportamiento HTTP real.

### Resultado de la comprobación documental del 2026-10-16

| Comprobación ejecutada | Resultado |
|---|---|
| Archivos Markdown del paquete | 14 |
| Inventario Java contra contratos y matriz | 70/70 en ambos; sin faltantes ni duplicados |
| IDs de contrato y enlaces desde matriz | 70 únicos, correspondencia completa |
| Ejemplos JSON | 55 bloques válidos; los objetos de contratos coinciden en campos con records Java |
| Enlaces locales y fragmentos | 189 resueltos correctamente |
| Huella del ZIP | Coincide con la registrada en el índice |
| Formato | Fences equilibrados y sin espacios finales; git diff --check sin errores |
| Ejecución HTTP, build o pruebas de aplicación | No ejecutados; no se modificó código de aplicación |

## Preparación para las pruebas de integración

| Requisito | Preparación |
|---|---|
| Backend | Instancia del snapshot documentado, base y dependencias disponibles; configurar API_BASE_URL con /api/v1 |
| Sesiones | Cuentas CUSTOMER A/B, ADMIN y SELLER; también cuenta CUSTOMER+SELLER y usuario con solo rol personalizado |
| Tiendas | A/B con miembros distintos; un usuario con membresía en ambas; una membresía inactiva |
| Referencias | Categoría/marca reales activas y configuración por entorno coincidente |
| Productos | Al menos un ACTIVE con inventario, un DRAFT, un INACTIVE y un producto de cada tienda |
| Stock | Inventario previamente provisionado en el CHECKOUT_WAREHOUSE_ID; producto con una sola unidad y otro sin fila de inventario |
| Direcciones | Destinos propios de A/B: Lima, otra ciudad PE y extranjero; probar primera dirección |
| Cupones | Porcentaje/fijo, vigentes/vencidos, límites y segmentación controlados; fechas relativas a la ejecución |
| Datos | Entorno aislado; nuevos SKU/slug/códigos en cada corrida; evitar afectar datos comerciales |

Las APIs no preparan inventario ni crean todos estos fixtures. Usar un entorno de pruebas provisionado por el equipo responsable. No asumir que el seed local con almacén 1 incluye dos tiendas completas o todos los estados. Las reservas no tienen liberación expuesta; restaurar fixtures entre escenarios de stock para no contaminar resultados.

Para recuperación de contraseña, el backend actual solo usa logging. Obtener tokens mediante el canal de desarrollo autorizado; no afirmar entrega de correo ni copiar tokens a reportes.

## Escenarios por fase

### F1 · BFF, sesión y autorización

| Caso | Acción y resultado esperado |
|---|---|
| SES-01 Registro/login | Registro 201 sin token; login correcto fija cookie HttpOnly; respuesta al navegador no contiene accessToken |
| SES-02 Hidratación | Recargar una ruta privada recupera CurrentUser directo del backend y mantiene roles |
| SES-03 Credenciales | Password incorrecto/cuenta inactiva → 401; formulario conserva error sin sesión autenticada |
| SES-04 Expiración | JWT inválido/expirado → 401 en operación privada; limpiar estado/cookie y solicitar login |
| SES-05 Permisos | CUSTOMER no administra; SELLER puro no abre /marcas, /categorias o /envios; 403 no borra sesión válida |
| SES-06 Roles combinados | CUSTOMER+SELLER accede a cuenta/checkout y a sus tiendas; ADMIN+SELLER conserva separación de APIs |
| SES-07 Roles personalizados | Usuario con solo rol personalizado no obtiene permisos funcionales ni bucle de redirecciones |
| SES-08 Recuperación | Solicitud para correo conocido/desconocido produce mismo 202; token válido un uso, vencido/consumido 400 |
| SES-09 Cambio | CUSTOMER/ADMIN con clave actual correcta reciben 204; SELLER puro 403 |
| SES-10 Transporte | JSON directo envuelto una vez; 204 sin parseo; texto de error conserva mensaje; 422 conserva informe CSV |
| SES-11 Correlación | UUID de mutación llega al backend y vuelve al navegador; no cambia la semántica de retry |
| SES-12 Logout | Ruta local elimina cookie/datos privados; no afirma revocación del JWT remoto |

### F2 · Administración

| Caso | Acción y resultado esperado |
|---|---|
| ADM-T01 Maestros | Crear, consultar y actualizar cada maestro; DELETE devuelve 200 con desactivación, no borra referencias |
| ADM-T02 Validación | Slug/taxId duplicados o datos inválidos muestran error; verificar en ejecución los posibles 500 no traducidos |
| ADM-T03 Jerarquía | Categoría padre válida acepta; autoparentesco/ciclo/descendiente rechaza, sin prometer 400 uniforme |
| ADM-T04 Usuarios | Alta con roles reales; edición no cambia email y mantiene status enviado; lista y detalle coherentes |
| ADM-T05 Roles | PUT reemplaza conjunto; rol inexistente 409; eliminar rol de sistema/asignado 409; rol personalizado libre 204 |
| ADM-T06 Membresías | Asignar añade SELLER; nuevo JWT necesario; deactivar membresía conserva historial y bloquea acceso de tienda |
| ADM-T07 Propietario | Transferir ownership deja un owner activo y al anterior como miembro; no concede APIs de equipo al seller |
| ADM-T08 Productos | POST devuelve DRAFT e imágenes; publicar lo hace visible; ficha pública del DRAFT devuelve 404 |
| ADM-T09 Acciones disponibles | No aparece edición general, borrar producto, subir archivo de imagen ni lista total ficticia de borradores |
| ADM-T10 Imágenes | URL HTTP(S) válida y posición >=0; altText demasiado largo/URL inválida rechaza; no hay edición/borrado |
| ADM-T11 CSV correcto | Body text/csv con referencias y claves nuevas → 201, importedCount correcto; sin inventario/imágenes nuevos |
| ADM-T12 CSV rechazado | Referencia ausente, duplicado interno/existente, precio inválido, comilla sin cerrar o límite excedido → 422 e informe; cero filas importadas por validación |
| ADM-T13 Formato CSV | Columnas reordenadas, BOM, campos entre comillas y líneas vacías; reporte usa numeración filtrada |
| ADM-T14 Cupones | Alta válida; duplicado 409; porcentaje >100 o fechas inválidas 400; activar/desactivar sin edición de reglas |

### F3 · Catálogo vendedor y aislamiento

| Caso | Acción y resultado esperado |
|---|---|
| VEN-T01 Selector | Una/varias/cero tiendas: selección automática/selector/estado sin acceso; ningún ID por defecto inventado |
| VEN-T02 Tenant | Cambiar A→B no muestra datos de A ni respuestas tardías de la consulta cancelada |
| VEN-T03 Acceso ajeno | Cambiar sellerId sin membresía → 403; producto existente de otra tienda → 403; no mostrar datos filtrados |
| VEN-T04 Revocación | Desactivar membresía durante sesión provoca 403 en próxima petición y vuelve al selector |
| VEN-T05 Inactividad | Tienda INACTIVE conserva lectura; mutación de catálogo → 409; no asumir igual bloqueo de fulfillment |
| VEN-T06 Referencias | Selectores usan IDs reales del entorno; sin categorías se bloquea alta; marca opcional null |
| VEN-T07 Creación | Producto nace DRAFT con sellerId de ruta; no se puede escoger dueño en el body; publicar por PATCH |
| VEN-T08 Páginas | page=0/size=20 y límites; items/totalElements/totalPages; sin duplicar consultas de imágenes ya incluidas |
| VEN-T09 Ownership | Miembro activo no propietario conserva capacidades de catálogo; no crear permisos exclusivos inexistentes |

### F4 · Cliente, carrito y checkout

| Caso | Acción y resultado esperado |
|---|---|
| COM-01 Catálogo | Solo ACTIVE; filtro categoryId; detalle e imágenes 404 para producto no público |
| COM-02 Perfil | Actualizar nombres conserva roles y correo; límites reales; no enviar edición de credenciales por perfil |
| COM-03 Direcciones | Primera predeterminada; reemplazar, desmarcar y eliminar mantienen exactamente una si quedan direcciones |
| COM-04 Propiedad | Editar/borrar dirección ajena → 404; cotizar/checkout con ajena → 400 |
| COM-05 Carrito | Persistencia por contexto, fusión al login, cantidades enteras positivas; no contiene JWT/PII ni se anuncia sincronización remota |
| COM-06 Moneda | Producto no PEN no entra al checkout; precio visible respeta currency; no simular conversión |
| COM-07 Envío | Subtotal 249.99 y 250; Lima/Callao, otra ciudad PE y extranjero: comparar política de OPE-01 |
| COM-08 Compra simple | Producto con stock + destino propio → 201; UI muestra totales oficiales, orderId y “Pedido creado” |
| COM-09 Multivendedor | Dos productos de tiendas distintas → una Order y un shipment global; una porción por vendedor |
| COM-10 Identidad/almacén | BFF ignora userId/warehouseId inyectados desde navegador; usa sesión/configuración; backend directo con userId ajeno → 403 |
| COM-11 Stock | Inventario inexistente → 400; cantidad insuficiente → 409; dos compradores por última unidad, solo una reserva exitosa |
| COM-12 Cupones | Vacíos/repetidos/vencidos/agotados/no dirigidos rechazan; OR producto/categoría y condición adicional de usuario |
| COM-13 Descuento múltiple | Orden de códigos, tope y saldo cero; no confirmar descuento antes del POST; shipping usa subtotal bruto |
| COM-14 Atomicidad | Si falla línea, destino, cupón o stock, no queda compra/reserva parcial de esa transacción |
| COM-15 Doble envío | Submit pendiente bloqueado; timeout no dispara retry automático ni asegura que la compra falló |
| COM-16 Recibo | Recibo local conserva Order retornado; sin sessionStorage no inventa detalle; ofrece shipment por ID conocido |
| COM-17 Seguimiento | Dueño consulta; B recibe 403 para orden de A; ADMIN puede consultar; no existe historial por API |
| COM-18 Dirección usada | Edición no promete snapshot histórico; eliminación referenciada puede fallar por integridad y se comunica sin falso éxito |

### F5 · Operación y logística

| Caso | Acción y resultado esperado |
|---|---|
| OPE-T01 Cola seller | Lista/detalle solo con líneas históricas de su tienda, aunque se cambie dueño del producto después |
| OPE-T02 Vista admin | Filtros sellerId/orderId, page/size y total de porciones; orden con dos vendedores no cuenta como dos compras |
| OPE-T03 Transiciones | PENDING→READY_TO_SHIP→SHIPPED→DELIVERED; cancelación temprana; salto o retroceso → 409 |
| OPE-T04 Tracking | SHIPPED/DELIVERED sin carrier/tracking → 400; valores existentes satisfacen requisito; blank/null no los borran |
| OPE-T05 Repetición | Mismo estado actualiza metadatos sin reemplazar hitos ya existentes; no reabre terminales |
| OPE-T06 Operación admin | Actualiza fulfillment sin membresía; no necesita suplantar una cuenta SELLER |
| OPE-T07 Completar | PENDING/PAID→FULFILLED; repetir no emite efectos otra vez; estado no permitido →409; inexistente →400 |
| OPE-T08 Sincronía | Cambiar fulfillment no modifica shipment/Order.status; complete no marca entregado; UI no altera otras capas automáticamente |
| OPE-T09 Cancelación | Cancelar logística no muestra pago reembolsado, cancelación comercial ni liberación de inventario |
| OPE-T10 Disponibilidad | Completar orden con producto sin disponibilidad lo vuelve INACTIVE; catálogo se refresca y deja de exponerlo |
| OPE-T11 Envíos | Consulta/edición por orderId; no hay alta manual ni listado global inventado |
| OPE-T12 Refresco | Mutación actualiza su consulta; cambios de otra sesión se ven al actualizar sin requerir realtime inexistente |

## Automatización prevista y ejecución manual

Durante F1 se incorporarán Vitest para adaptadores/BFF y Playwright para recorridos. Cubrir especialmente raw JSON→envoltura, token oculto, 204, texto, CSV 422, correlación, configuración de checkout y selección/caché de tenant.

Las pruebas de frontend aisladas pueden simular respuestas para verificar interfaz, pero la aceptación de contratos debe incluir una corrida contra backend real con fixtures. Un mock que cumple el tipo TypeScript no prueba un código de error, serialización temporal ni una restricción de base de datos.

Después de implementar cada fase: typecheck, Biome sin reescritura, build y escenarios de la fase. `pnpm lint` ejecuta Biome; el hook Husky `pre-commit` formatea archivos JS/TS staged con `lint-staged`. Para formatear todo el código fuente usar `pnpm format`. Typecheck: `pnpm exec tsc --noEmit`; build: `pnpm build`. Requieren instalar dependencias y configurar entorno durante implementación, no se ejecutaron para estos Markdown.

El ZIP contiene tests de referencia como RbacEndpointPolicyTest, SellerCatalogUseCaseTest, ManageSellerMembershipsUseCaseTest, CheckoutSellerFulfillmentUseCaseTest, CheckoutShippingUseCaseTest, CalculateShippingQuoteUseCaseTest y UpdateShipmentUseCaseTest. Su presencia sirve de evidencia adicional de intención; no se presentan como pruebas ejecutadas en esta entrega.

## Evidencia de cierre de una fase

Registrar fase, fecha, versión backend/commit frontend, configuración de entorno sin secretos, escenarios ejecutados, resultado, request/correlation ID si aplica y limitaciones pendientes. Actualizar la matriz solo con esa evidencia. Capturar fallos reales y contrastarlos con los mapeos documentados antes de ajustar expectativas.

