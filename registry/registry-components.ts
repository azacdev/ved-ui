import type { Registry } from "@/registry/schema";

export const components: Registry = [
  {
    name: "input-form",
    type: "registry:ui",
    registryDependencies: ["input", "button", "form", "sonner"],
    files: ["ui/input-form.tsx"],
  },
  {
    name: "select-form",
    type: "registry:ui",
    registryDependencies: ["select", "button", "form", "sonner"],
    files: ["ui/select-form.tsx"],
  },
  {
    name: "date-picker-form",
    type: "registry:ui",
    registryDependencies: ["calendar", "button", "form", "sonner", "popover"],
    files: ["ui/date-picker-form.tsx"],
  },
  {
    name: "tag-input-form",
    type: "registry:ui",
    registryDependencies: ["input", "button", "form", "sonner", "badge"],
    files: ["ui/tag-input-form.tsx"],
  },
  {
    name: "multiselect-form",
    type: "registry:ui",
    registryDependencies: ["command", "button", "form", "sonner"],
    files: ["ui/multiselect-form.tsx", "ui/multiselect.tsx"],
  },
  {
    name: "phone-input-form",
    type: "registry:ui",
    dependencies: ["react-phone-number-input"],
    registryDependencies: ["button", "form", "sonner"],
    files: ["ui/phone-input-form.tsx"],
  },
  {
    name: "dual-range-slider-form",
    type: "registry:ui",
    registryDependencies: ["slider", "button", "form", "sonner"],
    files: ["ui/dual-range-slider-form.tsx"],
  },
  {
    name: "date-expression-input-form",
    type: "registry:ui",
    dependencies: ["yeezy-dates"],
    registryDependencies: ["input", "button", "form", "sonner"],
    files: ["ui/date-expression-input-form.tsx"],
  },
  {
    name: "date-range-picker-form",
    type: "registry:ui",
    registryDependencies: ["calendar", "button", "form", "sonner", "popover"],
    files: ["ui/date-range-picker-form.tsx"],
  },
];
