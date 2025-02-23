"use client";

import * as z from "zod";
import { useId } from "react";
import type React from "react";
import { useForm } from "react-hook-form";
import flags from "react-phone-number-input/flags";
import * as RPNInput from "react-phone-number-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, PhoneIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(15, "Phone number is too long")
    .refine((val) => RPNInput.isValidPhoneNumber(val), {
      message: "Invalid phone number",
    })
    .refine(
      (val) => {
        // Remove all non-digit characters for length check
        const digits = val.replace(/\D/g, "");
        return digits.length >= 8 && digits.length <= 15;
      },
      {
        message: "Phone number must be between 8 and 15 digits",
      }
    ),
});

export default function PhoneInputForm() {
  const id = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Phone number submitted successfully!", {
      description: `Submitted: ${values.phoneNumber}`,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-sm"
      >
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={id}>Phone number</FormLabel>
              <FormControl>
                <RPNInput.default
                  className="flex rounded-md shadow-xs"
                  international
                  flagComponent={FlagComponent}
                  countrySelectComponent={CountrySelect}
                  inputComponent={PhoneInput}
                  id={id}
                  placeholder="Enter phone number"
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? "")}
                  limitMaxLength={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        <p
          className="text-muted-foreground mt-2 text-xs"
          role="region"
          aria-live="polite"
        >
          Enter a valid phone number (8-15 digits). Built with{" "}
          <a
            className="hover:text-foreground underline"
            href="https://gitlab.com/catamphetamine/react-phone-number-input"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            react-phone-number-input
          </a>{" "}
          and inspired by{" "}
          <a
            className="hover:text-foreground underline"
            href="https://originui.com/input"
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

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn(
        "-ms-px rounded-s-none shadow-none focus-visible:z-10",
        className
      )}
      {...props}
    />
  );
};

PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country);
  };

  return (
    <div className="border-input bg-background text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] outline-none focus-within:z-10 focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <FlagComponent country={value} countryName={value} aria-hidden="true" />
        <span className="text-muted-foreground/80">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label}{" "}
              {option.value &&
                `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <PhoneIcon size={16} aria-hidden="true" />
      )}
    </span>
  );
};
