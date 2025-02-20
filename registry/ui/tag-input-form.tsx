"use client";

import { z } from "zod";
import type React from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const FormSchema = z.object({
  tags: z.array(
    z.string().min(1, {
      message:
        "A tag, Morty! I need a tag! Don't just stand there with your mouth open!",
    })
  ),
});

type FormValues = z.infer<typeof FormSchema>;

const initialTags = [
  "Plumbus Care",
  "Interdimensional Cable",
  "Gazorpazorpfield",
];

export default function TagInputForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: initialTags,
    },
  });

  const { fields, append, remove } = useFieldArray<FormValues>({
    name: "tags" as never,
    control: form.control,
  });

  function onSubmit(data: FormValues) {
    console.log("Tags", data.tags);

    toast.success("You did it, Morty!", {
      description: `Submitted ${data.tags.length} tags to the Council of Ricks`,
    });
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();

      if (value) {
        append(value as never);
        input.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel>
                  Input with tags (for, like, important stuff, Morty!)
                </FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="Press Enter to add a tag, or don't. Whatever, I'm Rick."
                      onKeyDown={handleAddTag}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <Badge
                key={field.id}
                variant="outline"
                className="h-7 gap-1 px-2 text-xs font-medium"
              >
                {form.getValues(`tags.${index}`)}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent hover:cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove tag</span>
                </Button>
              </Badge>
            ))}
          </div>
          <Button type="submit">Submit Tags</Button>
        </form>
      </Form>
      <p
        className="text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://ui.shadcn.com"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          shadcn/ui
        </a>{" "}
        (because even *I* can't be bothered to write everything from scratch)
      </p>
    </div>
  );
}
