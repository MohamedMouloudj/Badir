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
              value={value as string}
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
              value={value as string}
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
                checked={value as boolean}
                onCheckedChange={onChange}
                disabled={disabled}
                className="data-[state=checked]:bg-secondary-500 data-[state=checked]:border-secondary-500"
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
                checked={value as boolean}
                onCheckedChange={onChange}
                disabled={disabled}
                className="data-[state=checked]:bg-secondary-500"
              />
            </div>
          );

        case "radio":
          return (
            <RadioGroup
              value={value as string}
              onValueChange={onChange}
              disabled={disabled}
              className="space-y-2"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`${name}-${option.value}`}
                    className="data-[state=checked]:bg-secondary-500 data-[state=checked]:border-secondary-500"
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="text-neutrals-600 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          );

        case "select":
          return (
            <Select
              value={value as string}
              onValueChange={onChange}
              disabled={disabled}
            >
              <SelectTrigger className={baseInputClasses}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case "combobox":
          const isMultiple = multiple;
          const currentValues = isMultiple
            ? (value as string[]) || []
            : (value as string);

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
              const valuesArray = currentValues as string[];
              const selected = options.filter((opt) =>
                valuesArray.includes(opt.value)
              );
              return selected.length > 0
                ? `${selected.length} عنصر محدد`
                : placeholder;
            }
            return value
              ? options.find((opt) => opt.value === value)?.label
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
                      {filteredOptions.map((option) => {
                        const isSelected = isMultiple
                          ? (currentValues as string[]).includes(option.value)
                          : value === option.value;

                        return (
                          <CommandItem
                            key={option.value}
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
