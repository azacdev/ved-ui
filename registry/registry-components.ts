import type { Registry } from "@/registry/schema";

export const components: Registry = [
  {
    name: "input-form",
    type: "registry:block",
    registryDependencies: ["input", "button", "form", "sonner"],
    files: ["block/input/input-form.tsx"],
  },
  {
    name: "select-form",
    type: "registry:block",
    registryDependencies: ["select", "button", "form", "sonner"],
    files: ["block/select/select-form.tsx"],
  },
];
