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
    name: "calendar-form",
    type: "registry:ui",
    registryDependencies: ["calendar", "button", "form", "sonner"],
    files: ["ui/calendar-form.tsx"],
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
];
