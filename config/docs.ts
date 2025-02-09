export interface DocsConfig {
  sidebarNav: {
    title: string;
    items: {
      title: string;
      href: string;
      disabled?: boolean;
      isNew?: boolean;
      isPro?: boolean;
    }[];
  }[];
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Input",
          href: "/docs/components/input",
        },
      ],
    },
  ],
} as const;
