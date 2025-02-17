import type { Registry } from "@/registry/schema";

export const components: Registry = [
  {
    name: "input-form",
    type: "registry:component",
    registryDependencies: ["input", "button", "form", "sonner"],
    files: ["component/input/input-form.tsx"],
  },
  {
    name: "select-form",
    type: "registry:component",
    registryDependencies: ["select", "button", "form", "sonner"],
    files: ["component/select/select-form.tsx"],
  },
];
