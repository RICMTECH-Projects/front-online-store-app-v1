# Admin Static Mockup Design

## Objective

Replace the current data-connected administration area with a static, visual-only
admin panel. The admin modules must not include API services, data hooks, or
runtime access to the Swagger backend.

## Scope

The admin is an operational, data-dense interface using the existing URBNVOID
visual language: neutral backgrounds, compact spacing, subtle borders, Lucide
icons, and clear table hierarchy.

Routes are static and cover these domains from the API documentation:

- Dashboard
- Catalog: products, brands, categories
- Sellers
- Identity: users, roles
- Commercial: coupons
- Operations: fulfillment and shipments

## Navigation

The `AdminSidebar` is a reusable shared component. It has a direct dashboard
link and accordion groups:

- Catalog: products, brands, categories
- Identity: users, roles
- Commercial: coupons
- Operations: fulfillment, shipments

The active child and its parent accordion are visually identifiable. The header
contains profile and settings icon buttons. Logout remains a visual control in
the mockup and does not trigger authentication behavior.

## Architecture

`src/modules/admin` contains only shared UI and navigation:

```text
components/
  AdminShell.tsx
  AdminHeader.tsx
  AdminSidebar.tsx
  table/
constants/
```

Each domain owns its visual state and mock data:

```text
modules/<domain>/
  components/
  data/
```

No admin module contains data hooks, services, request/response contracts, or
API logic. Existing auth, HTTP, and React Query modules remain untouched.

## Tables

Tables use `@tanstack/react-table` plus the shadcn `Table` primitive. Shared
table components are:

- `AdminDataTable`: owns TanStack table state and composition.
- `AdminTableHeader`: renders column headers and sort affordances.
- `AdminTableBody`: renders flexible rows and cells.
- `AdminTableFooter`: renders static pagination controls.
- `AdminRowActions`: renders view, edit, and delete icon actions.

Each module supplies static typed rows and its own column definitions. Actions
are visual only and do not mutate state or call APIs.

## Preservation

Keep `src/modules/auth`, `src/app/(auth)`, the HTTP provider, React Query
provider, their dependencies, and existing application layout references. The
static admin mockup must not import or invoke them.

## Verification

- TypeScript compilation and focused ESLint pass.
- Playwright verifies every admin route, accordion navigation, profile button,
  responsive sidebar behavior, and table pagination controls.
- No browser console errors on the static mockup routes.
