import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const sourceRoot = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
	resolve: {
		alias: { "@": sourceRoot },
	},
	test: {
		clearMocks: true,
		environment: "node",
		include: ["__tests__/**/*.test.ts"],
	},
});
