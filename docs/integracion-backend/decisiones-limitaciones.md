# Decisiones, diferencias y límites de esta integración

[Índice](README.md) · [Plan](plan-frontend.md)

## Decisiones confirmadas con el usuario

| Decisión | Aplicación |
|---|---|
| Integrar todo lo expuesto actualmente | Documentar 70 operaciones; no diseñar APIs futuras ni modificar el backend |
| Cliente, administrador y vendedor en esta aplicación | Portal vendedor propio bajo /vendedor; administración mantiene rutas actuales |
| Un almacén configurable por entorno | El BFF incorporará warehouseId por línea desde CHECKOUT_WAREHOUSE_ID; nunca pedirlo al comprador |
| Referencias configuradas para vendedor | Categorías y marcas reales con ID/nombre, mantenidas manualmente por el equipo |
| Entrega actual | Markdown con contratos, contexto y plan; la programación de pantallas se ejecuta después por fases |

Se aplican como defaults técnicos: conservar la base visual y modular, checkout PEN porque así lo fija el backend, carrito local y actualización explícita tras mutaciones. No se instaló la skill “grill me”, ausente del entorno; se aclararon los puntos de negocio mediante preguntas directas.

## Registro de diferencias encontradas

| Fuente | Diferencia con la implementación | Regla de esta documentación |
|---|---|---|
| Frontend HttpProvider, auth-bff.server y auth-session-request.server | Leen payload.data; backend devuelve records/arrays directos | Adaptación explícita en BFF y lectura servidor del objeto directo |
| docs/API.md y colección Postman | No incluyen GET /auth/me que sí existe en AuthResource | Incluir AUTH-03; no sustituirlo con /customers/me para todas las cuentas |
| NEGOCIO-FUNCIONAL.md, matriz de actores | Atribuye cambio de contraseña al vendedor | AuthResource limita /password/change a CUSTOMER/ADMIN; SELLER puro usa recuperación pública |
| Guías de errores del ZIP | Sugieren un comportamiento uniforme de 400/404/409 | CatalogAdministrationResource no traduce varias excepciones de mutaciones; documentar posible 500 |
| Guía comercial de catálogo | Puede sugerir información descriptiva de vendedor/marca/categoría | ProductResponse solo tiene sus IDs; no devuelve esos nombres |
| Descripción “10 MB” de importación | Código cuenta hasta 10 000 000 caracteres Java | Documentar unidad real; límites HTTP/servidor podrían añadir restricciones |
| Modelos SQL frente a Order HTTP | Tablas contienen líneas, tax_total y pagos | El record Order no contiene líneas ni taxTotal y no hay API de pagos |
| Especificación anterior de maqueta admin | Exige panel estático de una etapa anterior | Antecedente en el historial Git; este plan describe la futura integración |
| Frontend, permisos compartidos | SELLER puede abrir marcas/categorías/envíos administrativos | Portal separado y permisos acordes a la API; no elevar permisos del BFF |
| Frontend, cuenta personal | Excluye CUSTOMER si también tiene ADMIN o SELLER | Capacidades por conjunto de roles, con acceso de cliente cuando tenga CUSTOMER |
| NEGOCIO-FUNCIONAL.md, imágenes | Menciona ordenar/definir principal | Solo puede indicar posición/primary al agregar; no existen edición, borrado ni reordenación de imágenes ya existentes |

Las diferencias se infieren del código inspeccionado; no se afirman códigos/cuerpos de error observados en ejecución.

## Operación de referencias configuradas

1. El equipo administrador consulta las listas autorizadas de categorías y marcas en el entorno correcto.
2. Mantiene las referencias compartidas en `src/modules/shared/config/catalog-references.ts`: entorno, fecha de actualización, categorías `{id,name,active}` y marcas `{id,name,active}`. Son datos reales de referencia, no fixtures comerciales.
3. Incluye solo opciones activas para nuevas altas; brandId puede quedar null. Al cambiar un maestro, actualiza la configuración y publica la versión de frontend correspondiente.
4. El formulario vendedor usa selectores de nombres y envía IDs. Si no hay categorías configuradas, bloquea crear y explica la falta de opciones. No inventa IDs ni usa un token de administrador.
5. En lectura, un ID no presente se considera referencia no resuelta; no atribuirle el nombre de otra marca/categoría.
6. Las listas públicas de filtros pueden usar estas referencias; las pantallas administrativas consultan sus APIs directamente y siguen siendo autoritativas.

No existe sincronización automática desde las modificaciones del administrador a este archivo. Si se exige sincronización inmediata, el backend actual no la ofrece al vendedor.

## Limitaciones y comportamiento previsto

| Limitación comprobada | Tratamiento en el frontend y en pruebas |
|---|---|
| No API de almacenes/inventario/reposición | Configurar ID real y stock externo; sin “gestionar stock” ni conteos inventados |
| Producto nuevo o CSV no crea inventario | No afirmar que publicar lo vuelve comprable; checkout maneja inventario ausente/stock insuficiente |
| No listado admin de todos los estados | /productos muestra activos; creación conserva su respuesta para publicar; otras acciones por ID conocido |
| GET público de borrador/inactivo es 404 incluso para ADMIN | No reabrir una ficha administrativa completa mediante esa lectura ni llamar a seller con ADMIN sin membresía |
| CSV no devuelve IDs importados | Mostrar informe de filas/importados, sin enlaces de detalle que no se pueden construir |
| No edición general ni borrado de producto | Formularios de alta, acciones de estado e imágenes; retirar editar/eliminar genéricos |
| No upload ni edición/borrado de imágenes | Capturar URL pública existente y metadatos al agregar; sin simulación de subida |
| No variantes/tallas/colecciones/precio previo | Retirar filtros y descuentos visuales de la maqueta que dependan de esos datos |
| No catálogo público de maestros ni nombres de tiendas | Referencias configuradas para categoría/marca; no mostrar nombres ficticios de vendedores |
| Catálogo público sin paginación | No enviar page/size ni simular un total remoto; ordenación local solo sobre datos descargados y etiquetada como local |
| Checkout siempre PEN, sin validación cruzada de moneda | Habilitar compra solo para productos PEN; la API de creación permite otros códigos pero no hay conversión |
| No preview de cupón | Enviar códigos al crear orden; mostrar validación del backend; no prometer ahorro previo confirmado |
| No carrito remoto | Persistir solo carrito del navegador; no prometer sincronización entre dispositivos |
| No listado/detalle de órdenes del cliente | Confirmación de respuesta y enlace de tracking; no presentar sessionStorage como historial remoto |
| No lista global de shipments ni creación manual | Consulta por orderId conocido y enlaces desde fulfillments; retirar “Nuevo envío” |
| No estadísticas comerciales expuestas | Dashboard de accesos/indicadores respaldados por consultas accesibles, sin ventas o ingresos ficticios |
| Recuperación solo notifica mediante logging | Probar token por canal de desarrollo autorizado; proveedor de correo pendiente fuera de este alcance |
| No Google OAuth | Retirar u ocultar botones de Google en los flujos integrados |
| No refresh token/revocación expuesta | Al expirar sesión, volver a login; logout elimina sesión local, no garantiza revocación del JWT |
| Roles en JWT y datos de /auth/me pueden diferir | Tras cambios de permisos, renovar sesión; 403 no implica borrar cookie automáticamente |
| Snapshot de dirección ausente | No prometer destino histórico inmutable; contemplar rechazo al eliminar dirección referenciada |
| Reserva no expira/libera mediante API y complete no descuenta stock físico | Aislar datos de pruebas y documentar operación de stock; cancelar logística no reembolsa ni libera |
| Correlación no es idempotencia | Sin retry automático de checkout/CSV; informar resultado incierto y conservar correlación |
| Sin notificaciones web/realtime | Invalidar consultas después de mutaciones y ofrecer actualización manual |

## Estados que no deben fusionarse

- Producto: DRAFT, ACTIVE, INACTIVE, ARCHIVED. Cambios de estado sin secuencia comercial restrictiva.
- Orden: enum amplio, pero solo creación PENDING y complete a FULFILLED expuestos.
- Fulfillment y shipment: secuencia logística con cancelación temprana y repetición del mismo estado.
- Desactivar tienda no despublica productos activos automáticamente. Bloquea escrituras del catálogo vendedor, pero fulfillment no comprueba estado de tienda.
- Cancelar un fulfillment o shipment no modifica automáticamente el resto de la compra.
- owner no crea un rol nuevo ni concede gestión de miembros al vendedor.

## Pendientes operativos, sin proponer contratos nuevos

Confirmar para cada entorno la URL real, warehouseId, aprovisionamiento de stock y referencias reales. Para probar compra multivendedor se requieren al menos dos vendedores con productos e inventario ya disponibles. La documentación no afirma que el seed estándar traiga todos esos escenarios.

La configuración de un servicio de correo o canal realtime, los cambios del backend y la administración directa de base de datos quedan fuera de esta entrega. Se registran porque condicionan expectativas y aceptación; no se ejecutan como parte de documentar.

