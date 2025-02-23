"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector, { type Option } from "@/registry/ui/multiselect";

const characters: Option[] = [
  {
    value: "szechuan-sauce",
    label: "Szechuan Sauce",
  },
  {
    value: "portal-gun",
    label: "Portal Gun",
  },
  {
    value: "plumbus",
    label: "Plumbus",
  },
  {
    value: "meeseeks-box",
    label: "Meeseeks Box",
  },
  {
    value: "microverse-battery",
    label: "Microverse Battery (kinda unstable)",
  },
  {
    value: "butter-robot",
    label: "Butter Robot (What is my purpose?)",
  },
  {
    value: "fleeb-juice",
    label: "Fleeb Juice",
  },
  {
    value: "gromflomite-disguise",
    label: "Gromflomite Disguise",
  },
];

const FormSchema = z.object({
  items: z.array(z.string()).min(1, {
    message:
      "Gotta pick at least one, Morty! You can't just have *nothing* from the multiverse!",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function MultiSelectForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Selected items:", data);
    toast.success("Alright, Morty! We got the stuff! Now let's get schwifty!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem className="w-full md:w-[400px]">
              <FormControl>
                <MultipleSelector
                  value={characters.filter((character) =>
                    field.value.includes(character.value)
                  )}
                  options={characters}
                  placeholder="Select items from Rick's garage"
                  commandProps={{
                    label: "Select items",
                  }}
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-center text-sm">
                      No items found, Morty! Are you sure you're in the right
                      dimension?
                    </p>
                  }
                  onChange={(options) => {
                    field.onChange(options.map((option) => option.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Get Schwifty!</Button>

        <p
          className="text-muted-foreground mt-2 text-xs"
          role="region"
          aria-live="polite"
        >
          Built with{" "}
          <a
            className="hover:text-foreground underline"
            href="https://originui.com/select"
            target="_blank"
            rel="noopener nofollow"
          >
            origin/ui
          </a>
        </p>
      </form>
    </Form>
  );
}
