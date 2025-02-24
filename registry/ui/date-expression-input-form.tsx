"use client";

import * as z from "zod";
import * as React from "react";
import { toast } from "sonner";
import { parseDate } from "yeezy-dates";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface DateSuggestion {
  label: string;
  date: Date;
}

const formSchema = z.object({
  dateExpression: z.string().min(1, "Please enter a date expression"),
  dateValue: z.string().optional(),
});

export default function DateExpressionInputForm() {
  const [suggestions, setSuggestions] = React.useState<DateSuggestion[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<DateSuggestion | null>(
    null
  );
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const suggestionsRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateExpression: "",
      dateValue: "",
    },
  });

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      form.setValue("dateExpression", input);
      form.setValue("dateValue", "");
      setSelectedDate(null);
      setFocusedIndex(-1);
      if (input.trim()) {
        const results = parseDate(input);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    },
    [form]
  );

  const handleSuggestionClick = React.useCallback(
    (suggestion: DateSuggestion) => {
      form.setValue("dateExpression", suggestion.label);
      form.setValue("dateValue", suggestion.date.toISOString());
      setSelectedDate(suggestion);
      setSuggestions([]);
      setFocusedIndex(-1);
    },
    [form]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!suggestions.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
            handleSuggestionClick(suggestions[focusedIndex]);
          }
          break;
        case "Escape":
          setSuggestions([]);
          setFocusedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [suggestions, focusedIndex, handleSuggestionClick]
  );

  const onSubmit = React.useCallback(
    (data: z.infer<typeof formSchema>) => {
      if (selectedDate) {
        toast.success("Date selected", {
          description: `Expression: ${
            data.dateExpression
          }\nDate: ${selectedDate.date.toLocaleString()}`,
        });
      }
    },
    [selectedDate]
  );

  return (
    <div className="relative w-full space-y-2 md:w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="dateExpression"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    ref={inputRef}
                    placeholder="Enter date expression like: 5 days ago, tomorrow at 1am"
                    value={field.value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    role="combobox"
                    aria-expanded={suggestions.length > 0}
                    aria-controls="date-suggestions"
                    aria-activedescendant={
                      focusedIndex >= 0
                        ? `suggestion-${focusedIndex}`
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateValue"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {selectedDate && <Button type="submit">Submit</Button>}
        </form>
      </Form>

      {suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          id="date-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%-0.25rem)] z-50 overflow-hidden rounded-md border shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        >
          <div className="max-h-[300px] overflow-y-auto py-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                id={`suggestion-${index}`}
                role="option"
                aria-selected={focusedIndex === index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`flex w-full cursor-pointer justify-between px-4 py-2 text-left ${
                  focusedIndex === index ? "bg-accent" : "hover:bg-accent"
                }`}
              >
                <span className="text-sm">{suggestion.label}</span>
                <span className="text-sm text-muted-foreground">
                  {suggestion.date
                    .toLocaleString(undefined, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(",", "")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <p
        className="text-muted-foreground mt-2 text-xs"
        role="region"
        aria-live="polite"
      >
        Built with{" "}
        <a
          className="hover:text-foreground underline"
          href="https://yeezy-dates.vercel.app/"
          target="_blank"
          rel="noopener nofollow"
        >
          yeezy-dates
        </a>
      </p>
    </div>
  );
}
