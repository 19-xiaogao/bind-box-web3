import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import type { Alias } from "vite";

function pathResolve(dir: string) {
    return resolve(__dirname, ".", dir);
}

function createAlias(alias: [string, string][]): Alias[] {
    return alias.map((item) => {
        const [alia, src] = item;
        return {
            find: new RegExp(alia),
            replacement: pathResolve(src) + "/",
        };
    });
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: createAlias([
            ["@/", "src"],
            ["@assets/", "src/assets"],
            ["@comp/", "src/components"],
            ["@api/", "src/api"],
            ["@utils/", "src/utils"],
            ["@types/", "src/types"],
        ]),
    },
});
