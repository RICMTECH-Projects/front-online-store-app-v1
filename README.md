# FRONT ONLINE STORE APP V1

Frontend del marketplace. La integración con el backend se documenta por dominio y por fases.

- [Documentación de APIs e integración del backend](docs/integracion-backend/README.md)
- [Plan de implementación del frontend](docs/integracion-backend/plan-frontend.md)
- [Matriz de las 70 operaciones](docs/integracion-backend/matriz-integracion.md)
- [Auditoría JTN-* y pruebas unitarias](docs/auditoria-jtn.md)

Los contratos describen el backend recibido. Las fases F1–F5 están integradas en frontend; validación de build y pruebas de integración quedan pendientes según la auditoría.

## Desarrollo

- `pnpm lint`: Biome.
- `pnpm format`: formatea TypeScript/JavaScript de `src` y `__tests__` con Biome.
- El hook Husky `pre-commit` valida el proyecto y Biome formatea los archivos JavaScript/TypeScript staged antes del commit.
