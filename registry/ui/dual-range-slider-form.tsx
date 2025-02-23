"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  range: z
    .array(z.number())
    .length(2, "Two numbers, Morty! Not one, not three. Two!")
    .refine((value) => value[0] < value[1], {
      message:
        "The first one's gotta be smaller, Morty. Basic stuff! Are you even trying?",
    })
    .refine((value) => value[0] >= 0 && value[1] <= 100, {
      message:
        "Between 0 and 100, Morty! We're not calibrating a portal gun here!",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function DualRangeSliderForm() {
  const [sliderValue, setSliderValue] = useState([25, 75]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      range: sliderValue,
    },
  });

  async function onSubmit(data: FormValues) {
    toast.success("Range submitted! Good job, Morty... for once.", {
      description: `Selected range: ${data.range[0]} - ${data.range[1]}. Now, let's go get some Szechuan sauce!`,
    });
  }

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    form.setValue("range", value, {
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-6"
      >
        <FormField
          control={form.control}
          name="range"
          render={() => (
            <FormItem>
              <div className="flex items-center justify-between gap-2">
                <FormLabel className="leading-6">
                  Dimensional Range Thingy
                </FormLabel>
                <output className="text-sm font-medium tabular-nums">
                  {sliderValue[0]} - {sliderValue[1]}
                </output>
              </div>
              <FormControl>
                <Slider
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </FormControl>
              <FormDescription>
                Pick a range, Morty. It's not rocket science... unless we're
                doing rocket science later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Submitting... (Hold on to your butts!)"
            : "Submit the Range, Morty!"}
        </Button>
      </form>
    </Form>
  );
}
