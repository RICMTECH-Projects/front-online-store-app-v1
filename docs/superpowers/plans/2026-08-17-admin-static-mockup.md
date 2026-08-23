# Static Admin Mockup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, data-dense URBNVOID admin mockup with accordion navigation and reusable TanStack Table views, without changing auth, HTTP, or React Query.

**Architecture:** Shared chrome and generic table primitives live in `src/modules/admin/components`. Each visual domain owns only `components` and typed mock `data` in `src/modules/admin/modules/<domain>`. Route files in `src/app/admin` remain thin server components that render their domain view.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, shadcn `Table`, `@tanstack/react-table`, Lucide.

---

## File Structure

```text
src/modules/shared/components/ui/table.tsx
src/modules/admin/constants/admin-navigation.constants.ts
src/modules/admin/components/AdminShell.tsx
src/modules/admin/components/AdminHeader.tsx
src/modules/admin/components/AdminSidebar.tsx
src/modules/admin/components/table/AdminDataTable.tsx
src/modules/admin/components/table/AdminTableHeader.tsx
src/modules/admin/components/table/AdminTableBody.tsx
src/modules/admin/components/table/AdminTableFooter.tsx
src/modules/admin/components/table/AdminRowActions.tsx
src/modules/admin/modules/<domain>/components/<Domain>Page.tsx
src/modules/admin/modules/<domain>/data/<domain>.mock.ts
src/app/admin/<route>/page.tsx
```

`<domain>` is one of dashboard, products, brands, categories, sellers, users,
roles, coupons, fulfillments, or shipments. Existing `src/modules/auth`, HTTP,
and React Query files are explicitly out of scope.

### Task 1: Add the shadcn Table primitive

**Files:**
- Create: `src/modules/shared/components/ui/table.tsx`

- [ ] **Step 1: Verify the required dependency exists**

Run: `pnpm why @tanstack/react-table`

Expected: the dependency resolves from the workspace package manifest.

- [ ] **Step 2: Add the shadcn Table primitive at the shared UI alias**

Run: `pnpm dlx shadcn@latest add table`

Expected: the CLI creates `src/modules/shared/components/ui/table.tsx` using
the `ui` alias already configured in `components.json`.

Verify that `table.tsx` exports `Table`, `TableHeader`, `TableBody`,
`TableFooter`, `TableRow`, `TableHead`, `TableCell`, and `TableCaption`.

- [ ] **Step 3: Verify compilation**

Run: `npx tsc --noEmit`

Expected: exit code 0.

### Task 2: Create static navigation and admin chrome

**Files:**
- Create: `src/modules/admin/constants/admin-navigation.constants.ts`
- Create: `src/modules/admin/components/AdminShell.tsx`
- Create: `src/modules/admin/components/AdminHeader.tsx`
- Create: `src/modules/admin/components/AdminSidebar.tsx`
- Modify: `src/app/admin/layout.tsx`

- [ ] **Step 1: Define navigation groups**

Use this typed structure:

```ts
type AdminNavigationGroup = {
  icon: LucideIcon
  label: string
  items: { href: string; label: string }[]
}
```

Create direct `Resumen` and `Vendedores` links, with accordion groups for:
`Catalogo` (Productos, Marcas, Categorias), `Identidad` (Usuarios, Roles),
`Comercial` (Cupones), and `Operaciones` (Fulfillment, Envios).

- [ ] **Step 2: Implement responsive chrome**

`AdminShell` composes sidebar, header, and route children. `AdminSidebar` uses
native buttons with `aria-expanded`, highlights the active parent and child via
`usePathname`, and collapses to a horizontal scrolling navigation below `lg`.
`AdminHeader` renders profile, settings, notifications, and a visual logout
button with tooltips; none of these buttons invoke auth behavior.

- [ ] **Step 3: Verify keyboard semantics manually**

Use Playwright at `/admin/dashboard`. Tab to each accordion and activate it
with Enter. Confirm `aria-expanded` changes and child links become reachable.

### Task 3: Build the shared data-table composition

**Files:**
- Create: `src/modules/admin/components/table/AdminDataTable.tsx`
- Create: `src/modules/admin/components/table/AdminTableHeader.tsx`
- Create: `src/modules/admin/components/table/AdminTableBody.tsx`
- Create: `src/modules/admin/components/table/AdminTableFooter.tsx`
- Create: `src/modules/admin/components/table/AdminRowActions.tsx`

- [ ] **Step 1: Define the generic table API**

```ts
type AdminDataTableProps<TData> = {
  columns: ColumnDef<TData>[]
  data: TData[]
  emptyMessage: string
}
```

`AdminDataTable` owns pagination and sorting state through `useReactTable`,
`getCoreRowModel`, `getPaginationRowModel`, and `getSortedRowModel`. Use a
fixed initial `pageSize` of 8.

- [ ] **Step 2: Split rendering responsibilities**

`AdminTableHeader` receives `table.getHeaderGroups()` and renders sortable
headers. `AdminTableBody` receives `table.getRowModel().rows`, uses
`flexRender`, and renders the empty state with `colSpan={columns.length}`.
`AdminTableFooter` receives the TanStack table instance and exposes previous,
next, current range, and page-size select controls.

- [ ] **Step 3: Add visual-only row actions**

`AdminRowActions` renders icon buttons for view, edit, and delete. Buttons use
`aria-label` and tooltips and have no callback or mutation behavior.

- [ ] **Step 4: Verify interaction**

Use Playwright to change page size, move between pages, and click each sorting
header on `/admin/productos`. Confirm rows change only in memory and no network
request is sent.

### Task 4: Create static catalog and seller modules

**Files:**
- Create: `src/modules/admin/modules/products/data/products.mock.ts`
- Create: `src/modules/admin/modules/products/components/ProductsPage.tsx`
- Create: `src/modules/admin/modules/brands/data/brands.mock.ts`
- Create: `src/modules/admin/modules/brands/components/BrandsPage.tsx`
- Create: `src/modules/admin/modules/categories/data/categories.mock.ts`
- Create: `src/modules/admin/modules/categories/components/CategoriesPage.tsx`
- Create: `src/modules/admin/modules/sellers/data/sellers.mock.ts`
- Create: `src/modules/admin/modules/sellers/components/SellersPage.tsx`
- Modify: `src/app/admin/productos/page.tsx`
- Modify: `src/app/admin/marcas/page.tsx`
- Modify: `src/app/admin/categorias/page.tsx`
- Modify: `src/app/admin/vendedores/page.tsx`

- [ ] **Step 1: Add typed mock rows and per-module columns**

Products use SKU, name, brand, category, price, stock, and status. Brands use
name, slug, products, and status. Categories use name, parent, products, and
status. Sellers use store, legal name, products, orders, and status. Every
module ends with an actions column using `AdminRowActions`.

- [ ] **Step 2: Compose the module page surface**

Each page renders an eyebrow, title, description, static action button, search
input, filter button, and `AdminDataTable`. Mock rows contain at least 12
records so pagination is visible.

- [ ] **Step 3: Verify catalog routes**

Use Playwright to open each catalog and seller route, check its heading and
table headers, then verify no console errors.

### Task 5: Create identity and commercial modules

**Files:**
- Create: `src/modules/admin/modules/users/data/users.mock.ts`
- Create: `src/modules/admin/modules/users/components/UsersPage.tsx`
- Create: `src/modules/admin/modules/roles/data/roles.mock.ts`
- Create: `src/modules/admin/modules/roles/components/RolesPage.tsx`
- Create: `src/modules/admin/modules/coupons/data/coupons.mock.ts`
- Create: `src/modules/admin/modules/coupons/components/CouponsPage.tsx`
- Modify: `src/app/admin/usuarios/page.tsx`
- Create: `src/app/admin/roles/page.tsx`
- Modify: `src/app/admin/cupones/page.tsx`

- [ ] **Step 1: Define static column sets**

Users use name, email, role, status, and joined date. Roles use code, label,
assigned users, and status. Coupons use code, discount, expiry date, uses, and
status. Use visually distinct status pills without changing mock data.

- [ ] **Step 2: Render each module with shared table chrome**

Reuse the same page header and `AdminDataTable`; do not create service, hook,
or API files.

- [ ] **Step 3: Verify route isolation**

Use Playwright to visit users, roles, and coupons. Confirm each route displays
its own data and the active Identity or Commercial accordion is expanded.

### Task 6: Create operations modules and dashboard mockup

**Files:**
- Create: `src/modules/admin/modules/fulfillments/data/fulfillments.mock.ts`
- Create: `src/modules/admin/modules/fulfillments/components/FulfillmentsPage.tsx`
- Create: `src/modules/admin/modules/shipments/data/shipments.mock.ts`
- Create: `src/modules/admin/modules/shipments/components/ShipmentsPage.tsx`
- Create: `src/modules/admin/modules/dashboard/data/dashboard.mock.ts`
- Create: `src/modules/admin/modules/dashboard/components/AdminDashboard.tsx`
- Create: `src/app/admin/fulfillment/page.tsx`
- Create: `src/app/admin/envios/page.tsx`
- Modify: `src/app/admin/dashboard/page.tsx`

- [ ] **Step 1: Define operations tables**

Fulfillment rows use order number, seller, customer, state, and updated date.
Shipment rows use order number, carrier, tracking number, delivery state, and
updated date. Add the common visual actions column.

- [ ] **Step 2: Compose dashboard mock data**

Use static KPI cards for products, pending fulfillments, shipments in transit,
active coupons, and users. Add two compact tables: recent orders and stock
alerts. Do not import data from any other module or API.

- [ ] **Step 3: Verify operations navigation**

Use Playwright to navigate dashboard, fulfillment, and shipments, confirming
the Operations accordion and static pagination controls work.

### Task 7: Remove data logic from admin only

**Files:**
- Delete: `src/modules/admin/hooks/use-admin-session.ts`
- Delete: `src/modules/admin/modules/*/hooks/`
- Delete: `src/modules/admin/modules/*/services/`
- Delete: `src/modules/admin/modules/*/interfaces/`
- Modify: admin files that import these paths

- [ ] **Step 1: Remove only admin data-layer files**

Delete admin-owned hooks, services, interfaces, and HTTP imports. Preserve all
files under `src/modules/auth` and `src/modules/shared/providers`.

- [ ] **Step 2: Confirm no admin data imports remain**

Run: `rg -n "shared/providers|useQuery|httpClient|modules/auth" src/modules/admin`

Expected: no matches.

- [ ] **Step 3: Run final verification**

Run: `npx tsc --noEmit`

Expected: exit code 0.

Run: `npx eslint src/modules/admin src/app/admin`

Expected: exit code 0.

Use Playwright at 375px and 1440px to verify all ten admin routes, accordion
navigation, visible tables, pagination, and zero console errors.
