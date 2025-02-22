"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
    value: "rick",
    label: "Rick Sanchez",
  },
  {
    value: "morty",
    label: "Morty Smith",
  },
  {
    value: "summer",
    label: "Summer Smith",
  },
  {
    value: "beth",
    label: "Beth Smith",
  },
  {
    value: "jerry",
    label: "Jerry Smith (Disabled)",
    disable: true,
  },
  {
    value: "mr-poopybutthole",
    label: "Mr. Poopybutthole",
  },
  {
    value: "pickle-rick",
    label: "Pickle Rick",
  },
  {
    value: "birdperson",
    label: "Birdperson",
  },
];

const FormSchema = z.object({
  frameworks: z.array(z.string()).min(1, {
    message: "Please select at least one character from the multiverse!",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function MultiSelectForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      frameworks: [],
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Selected characters:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="frameworks"
          render={({ field }) => (
            <FormItem className="w-[400px]">
              <FormControl>
                <MultipleSelector
                  value={characters.filter((character) =>
                    field.value.includes(character.value)
                  )}
                  options={characters}
                  placeholder="Select Rick and Morty characters"
                  commandProps={{
                    label: "Select characters",
                  }}
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-center text-sm">
                      Wubba Lubba Dub Dub! No results found!
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
