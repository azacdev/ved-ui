import type { MDXComponents } from "mdx/types";
import defaultComponents from "fumadocs-ui/mdx";
import type { Page } from "fumadocs-core/source";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Heading } from "fumadocs-ui/components/heading";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { createTypeTable } from "fumadocs-typescript/ui";

import { cn } from "@/lib/utils";
import { ComponentSource } from "@/components/component-source";
import { ComponentTabs } from "@/components/component-tabs";
import { CSSVariablesTable } from "@/components/css-variables-table";
import { DataAttributesTable } from "@/components/data-attributes-table";
import { Kbd } from "@/components/kbd";
import { KeyboardShortcutsTable } from "@/components/keyboard-shortcuts-table";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import BlurImage from "./blur-image";

const { AutoTypeTable } = createTypeTable();

export function useMdxComponents(
  components: Partial<MDXComponents>
): MDXComponents {
  const headings = Object.fromEntries(
    ["h1", "h2", "h3", "h4", "h5", "h6"].map((level) => [
      level,
      (props: React.ComponentProps<typeof Heading>) => (
        <Heading
          as={level as React.ComponentProps<typeof Heading>["as"]}
          {...props}
        />
      ),
    ])
  );

  return {
    ...defaultComponents,
    ...components,
    ...headings,
    Quote: (props: {
      author: string;
      authorSrc: string;
      title: string;
      company: string;
      companySrc: string;
      text: string;
    }) => (
      <div className="not-prose mt-4 flex flex-col items-center justify-center space-y-4 rounded-md border border-border bg-card p-10">
        <div className="w-fit rounded-full bg-gradient-to-r from-blue-100 to-green-100 p-1.5 dark:from-blue-900 dark:to-green-900">
          <BlurImage
            className="h-20 w-20 rounded-full border-2 border-background"
            src={props.authorSrc}
            alt={props.author}
            width={80}
            height={80}
          />
        </div>
        <p className="text-center text-lg text-muted-foreground [text-wrap:balance]">
          &quot;{props.text}&quot;
        </p>
        <div className="flex items-center justify-center space-x-2">
          <BlurImage
            className="h-12 w-12 rounded-md border-2 border-background"
            src={props.companySrc}
            alt={props.company}
            width={48}
            height={48}
          />
          <div className="flex flex-col">
            <p className="font-semibold text-foreground">{props.author}</p>
            <p className="text-sm text-muted-foreground">{props.title}</p>
          </div>
        </div>
      </div>
    ),
    table: ({ className, ...props }) => (
      <Table className={cn(className)} mdx {...props} />
    ),
    tr: TableRow,
    th: TableHead,
    td: TableCell,
    Tabs: ({ className, ...props }) => (
      <Tabs className={cn("rounded-md", className)} {...props} />
    ),
    Tab,
    pre: ({ children, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{children}</Pre>
      </CodeBlock>
    ),
    kbd: (props) => <Kbd variant="outline" {...props} />,
    ComponentTabs,
    ComponentSource,
    Steps,
    Step,
    AutoTypeTable: (props) => (
      <div className="auto-type-table">
        <AutoTypeTable {...props} />
      </div>
    ),
    CSSVariablesTable,
    DataAttributesTable,
    KeyboardShortcutsTable,
  };
}

interface MdxProps {
  page: Page & {
    data: { body: React.ComponentType<{ components: MDXComponents }> };
  };
  components?: Partial<MDXComponents>;
}

export function Mdx({ page, components = {} }: MdxProps) {
  const Comp = page.data.body;
  const mdxComponents = useMdxComponents(components);

  return <Comp components={mdxComponents} />;
}
