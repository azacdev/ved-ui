import type { Registry } from "@/registry/schema";

export const components: Registry = [
  {
    name: "input-form",
    type: "registry:forms",
    registryDependencies: ["input", "button", "form", "sonner"],
    files: ["forms/input/input-form.tsx"],
  },
  {
    name: "select-form",
    type: "registry:forms",
    registryDependencies: ["select", "button", "form", "sonner"],
    files: ["forms/select/select-form.tsx"],
  },
];
