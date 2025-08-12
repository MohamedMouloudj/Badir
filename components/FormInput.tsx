"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";

export interface Option {
  value: string;
  label: string;
}

export interface FormInputProps {
  type:
    | "text"
    | "email"
    | "password"
    | "checkbox"
    | "switch"
    | "textarea"
    | "radio"
    | "select"
    | "combobox";
  label: string;
  name: string;
  placeholder?: string;
  isOptional?: boolean;
  optionalText?: string;
  value?: string | boolean | string[];
  onChange?: (value: string | boolean | string[]) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  options?: Option[]; // For radio, select, combobox
  rows?: number; // For textarea
  rtl?: boolean; // Right-to-left support
  multiple?: boolean; // For multi-select combobox
}

/**
 * A versatile form input component that supports multiple input types with consistent styling and error handling.
 *
 * @component
 * @example
 * ```tsx
 * // Text input example
 * <FormInput
 *   type="text"
 *   label="Name"
 *   name="name"
 *   placeholder="Enter your name"
 *   value={name}
 *   onChange={(value) => setName(value as string)}
 * />
 *
 * // Select example
 * <FormInput
 *   type="select"
 *   label="Country"
 *   name="country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "ca", label: "Canada" }
 *   ]}
 *   value={selectedCountry}
 *   onChange={(value) => setSelectedCountry(value as string)}
 * />
 *
 * // Multi-select combobox example
 * <FormInput
 *   type="combobox"
 *   label="Skills"
 *   name="skills"
 *   multiple={true}
 *   options={skillOptions}
 *   value={selectedSkills}
 *   onChange={(value) => setSelectedSkills(value as string[])}
 * />
 * ```
 *
 * @param {FormInputProps} props - The props for the form input component
 * @param {("text" | "email" | "password" | "checkbox" | "switch" | "textarea" | "radio" | "select" | "combobox")} props.type - The type of input field to render
 * @param {string} props.label - The label text displayed for the input field
 * @param {string} props.name - The name attribute for the input field, used for form handling and accessibility
 * @param {string} [props.placeholder] - Placeholder text shown when the input is empty
 * @param {boolean} [props.isOptional=false] - Whether the field is optional (affects required indicator display)
 * @param {string} [props.optionalText="اختياري"] - Text displayed for optional fields (defaults to Arabic "optional")
 * @param {(string | boolean | string[])} [props.value] - The current value of the input field
 * @param {(value: string | boolean | string[]) => void} [props.onChange] - Callback function called when the input value changes
 * @param {() => void} [props.onBlur] - Callback function called when the input loses focus
 * @param {string} [props.error] - Error message to display below the input field
 * @param {boolean} [props.disabled=false] - Whether the input field is disabled
 * @param {string} [props.className] - Additional CSS classes to apply to the root container
 * @param {Option[]} [props.options=[]] - Array of options for radio, select, and combobox input types
 * @param {number} [props.rows=4] - Number of rows for textarea input type
 * @param {boolean} [props.rtl=true] - Whether to apply right-to-left text direction
 * @param {boolean} [props.multiple=false] - Whether to allow multiple selections (for combobox type)
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the underlying input element
 *
 * @returns {React.ForwardRefExoticComponent} A forwardRef component that renders the appropriate input type with consistent styling
 *
 * @see {@link Option} for the structure of option objects used in select and combobox types
 * @see {@link FormInputProps} for complete props interface definition
 *
 * @author Mohamed Mouloudj
 */
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      type,
      label,
      name,
      placeholder,
      isOptional = false,
      optionalText = "اختياري",
      value,
      onChange,
      onBlur,
      error,
      disabled = false,
      className,
      options = [],
      rows = 4,
      rtl = true,
      multiple = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const isSwitch = type === "switch";

    const baseInputClasses = cn(
      "w-full border border-neutrals-300 rounded-full px-3 py-2",
      "placeholder:text-neutrals-300 text-neutrals-700",
      "focus:border-secondary-600 focus:ring-1 focus:ring-secondary-600 focus:outline-none",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      error &&
        "border-state-error focus:border-state-error focus:ring-state-error"
    );

    const renderLabel = () => (
      <div className="flex-center gap-2 mb-2 text-label">
        <label htmlFor={name} className="text-neutrals-600 font-medium">
          {label}
          {!isOptional && <span className="text-state-error ml-1">*</span>}
        </label>
        {isOptional && (
          <span className="text-neutrals-300 text-sm">({optionalText})</span>
        )}
      </div>
    );

    const renderError = () => {
      if (error) {
        return <p className="text-state-error text-sm mt-1">{error}</p>;
      }
      return null;
    };

    const renderInput = () => {
      switch (type) {
        case "text":
        case "email":
        case "password":
          return (
            <Input
              ref={ref}
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={(value as string) || ""}
              onChange={(e) => onChange?.(e.target.value)}
              onBlur={onBlur}
              disabled={disabled}
              className={baseInputClasses}
              {...props}
            />
          );

        case "textarea":
          return (
            <Textarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={(value as string) || ""}
              onChange={(e) => onChange?.(e.target.value)}
              onBlur={onBlur}
              disabled={disabled}
              rows={rows}
              className={baseInputClasses}
              {...props}
            />
          );

        case "checkbox":
          return (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={name}
                name={name}
                checked={(value as boolean) || false}
                onCheckedChange={onChange}
                disabled={disabled}
                className="data-[state=checked]:bg-secondary-500 data-[state=checked]:border-secondary-500 border-neutrals-500"
              />
              <label
                htmlFor={name}
                className="text-neutrals-600 cursor-pointer"
              >
                {placeholder || label}
              </label>
            </div>
          );

        case "switch":
          return (
            <div className="flex items-center justify-between">
              <label htmlFor={name} className="text-neutrals-600">
                {placeholder || label}
              </label>
              <Switch
                id={name}
                checked={(value as boolean) || false}
                onCheckedChange={onChange}
                disabled={disabled}
                className="data-[state=checked]:bg-secondary-500"
              />
            </div>
          );

        case "radio":
          return (
            <RadioGroup
              value={(value as string) || ""}
              onValueChange={onChange}
              disabled={disabled}
              className="flex-center gap-4 justify-center w-full flex-wrap"
            >
              {options.map((option, index) => (
                <div
                  key={option.value + "-" + index}
                  className="flex items-center gap-2 space-x-4 space-x-reverse"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`${name}-${option.value}`}
                    className="border-2 border-neutrals-300 bg-transparent data-[state=checked]:border-secondary-500 data-[state=focus]:ring-2 data-[state=focus]:ring-secondary-600 data-[state=focus]:ring-offset-2 data-[state=focus]:bg-transparent"
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="text-neutrals-600 cursor-pointer whitespace-nowrap"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          );

        // In FormInput.tsx, update the select case:
        case "select":
          return (
            <Select
              value={(value as string) || ""}
              onValueChange={(selectedValue) => onChange?.(selectedValue)}
              disabled={disabled}
            >
              <SelectTrigger
                className={cn(
                  "w-full border border-neutrals-300 rounded-full px-3 py-2 placeholder:text-neutrals-300 text-neutrals-700 focus:border-secondary-600 focus:ring-1 focus:ring-secondary-600 focus:outline-none bg-neutrals-100",
                  error &&
                    "border-state-error focus:border-state-error focus:ring-state-error",
                  disabled && "bg-neutrals-200 cursor-not-allowed",
                  className
                )}
              >
                <SelectValue placeholder={placeholder || `اختر ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, index) => {
                  // Handle option objects with key, value, and label
                  if (
                    option &&
                    typeof option === "object" &&
                    "value" in option &&
                    "label" in option
                  ) {
                    const optionKey =
                      index || `${option.value}-${Math.random()}`;
                    return (
                      <SelectItem key={optionKey} value={option.value}>
                        {option.label}
                      </SelectItem>
                    );
                  }
                  // Handle simple string arrays (fallback)
                  else if (typeof option === "string") {
                    return (
                      <SelectItem
                        key={`${option}-${Math.random()}`}
                        value={option}
                      >
                        {option}
                      </SelectItem>
                    );
                  }
                  return null;
                })}
              </SelectContent>
            </Select>
          );

        case "combobox":
          const isMultiple = multiple;
          const currentValues = isMultiple
            ? (value as string[]) || []
            : (value as string) || "";

          const filteredOptions = options.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
          );

          const handleSelect = (selectedValue: string) => {
            if (isMultiple) {
              const valuesArray = currentValues as string[];
              const newValues = valuesArray.includes(selectedValue)
                ? valuesArray.filter((v: string) => v !== selectedValue)
                : [...valuesArray, selectedValue];
              onChange?.(newValues);
            } else {
              onChange?.(selectedValue === value ? "" : selectedValue);
              setOpen(false);
            }
            setSearchValue("");
          };

          const getDisplayValue = () => {
            if (isMultiple) {
              const valuesArray = (currentValues as string[]) || [];
              const selected = options.filter((opt) =>
                valuesArray.includes(opt.value)
              );
              return selected.length > 0
                ? `${selected.length} عنصر محدد`
                : placeholder;
            }
            const currentValue = (currentValues as string) || "";
            return currentValue
              ? options.find((opt) => opt.value === currentValue)?.label
              : placeholder;
          };

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(baseInputClasses, "justify-between")}
                  disabled={disabled}
                >
                  {getDisplayValue()}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="البحث..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandEmpty>لا توجد نتائج</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {filteredOptions.map((option, index) => {
                        const isSelected = isMultiple
                          ? (currentValues as string[]).includes(option.value)
                          : value === option.value;

                        return (
                          <CommandItem
                            key={option.value + "-" + index}
                            value={option.value}
                            onSelect={() => handleSelect(option.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                isSelected ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        );
                      })}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          );

        default:
          return null;
      }
    };

    return (
      <div
        className={cn("space-y-1", className)}
        dir={isSwitch ? "ltr" : rtl ? "rtl" : "ltr"}
      >
        {type !== "checkbox" && type !== "switch" && renderLabel()}
        {renderInput()}
        {renderError()}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
