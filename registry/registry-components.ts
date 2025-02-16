import type { Registry } from "@/registry/schema";

export const components: Registry = [
  {
    name: "form-input",
    type: "registry:block",
    registryDependencies: ["input", "button", "form", "sonner"],
    dependencies: ["zod", "react-hook-form", "@hookform/resolvers"],
    files: ["blocks/input/form-input.tsx"],
  },
];
