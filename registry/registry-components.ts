import type { Registry } from "@/registry/schema";

export const components: Registry = [
  {
    name: "input-form",
    type: "registry:ui",
    registryDependencies: ["input", "button", "form", "sonner"],
    files: ["ui/input/input-form.tsx"],
  },
  {
    name: "select-form",
    type: "registry:ui",
    registryDependencies: ["select", "button", "form", "sonner"],
    files: ["ui/select/select-form.tsx"],
  },
];
