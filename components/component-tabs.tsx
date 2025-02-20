"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Index } from "@/__registry__";
import { useConfig } from "@/hooks/use-config";
import { styles } from "@/registry/registry-styles";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComponentTabsProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  children: React.ReactNode;
  preventPreviewFocus?: boolean;
  scalePreview?: boolean;
  fullPreview?: boolean;
}

export function ComponentTabs({
  name,
  children,
  scalePreview,
  fullPreview,
  className,
}: ComponentTabsProps) {
  const [config] = useConfig();
  const index = styles.findIndex((style) => style.name === config.style);

  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[index];

  const Preview = React.useMemo(() => {
    const Component = Index[config.style][name]?.component;

    if (!Component) {
      return (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Component{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {name}
            </code>{" "}
            not found in registry.
          </p>
        </div>
      );
    }

    return <Component />;
  }, [name, config.style]);

  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0 mb-3">
        <TabsTrigger
          value="preview"
          className="hover:cursor-pointer inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="hover:cursor-pointer inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Code
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <Card className="shadow-none">
          <CardContent
            className={cn(
              "flex min-h-[400px] items-center justify-center p-10",
              {
                "h-full p-0": fullPreview,
                "sm:p-10": scalePreview,
              },
              className
            )}
          >
            {Preview}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="code" className="component-block">
        {Code}
      </TabsContent>
    </Tabs>
  );
}
