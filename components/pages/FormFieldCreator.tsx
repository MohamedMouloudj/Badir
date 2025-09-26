"use client";

import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { PlusCircle, X, Trash2 } from "lucide-react";
import { FormFieldType } from "@/schemas/newInitiativeSchema";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import parse from "html-react-parser";

interface FormFieldCreatorProps {
  fields: FormFieldType[];
  onChange: (fields: FormFieldType[]) => void;
}

export default function FormFieldCreator({
  fields,
  onChange,
}: FormFieldCreatorProps) {
  const [newField, setNewField] = useState<FormFieldType>({
    id: uuidv4(),
    question: "",
    type: "text",
    required: false,
    options: [],
  });
  const [newOption, setNewOption] = useState("");

  /**
   * Adds a new option to the current field (for radio and checkbox types).
   */
  const addOption = () => {
    if (!newOption.trim()) {
      toast.error("يجب إدخال نص الخيار");
      return;
    }

    if (newField.options?.includes(newOption.trim())) {
      toast.error("هذا الخيار موجود بالفعل");
      return;
    }

    // Sanitize the option text
    const sanitizedOption = parse(newOption) as string;

    setNewField({
      ...newField,
      options: [...(newField.options || []), sanitizedOption],
    });
    setNewOption("");
  };

  /**
   * Removes an option from the current field.
   */
  const removeOption = (index: number) => {
    setNewField({
      ...newField,
      options: newField.options?.filter((_, i) => i !== index),
    });
  };

  /**
   * Adds a new field to the list of fields.
   */
  const addField = () => {
    if (!newField.question.trim()) {
      toast.error("يجب إدخال نص السؤال");
      return;
    }

    // For radio and checkbox types, require at least one option
    if (
      (newField.type === "radio" || newField.type === "checkbox") &&
      (!newField.options || newField.options.length < 2)
    ) {
      toast.error("يجب إضافة خيارين على الأقل");
      return;
    }

    onChange([...fields, newField]);

    setNewField({
      id: uuidv4(),
      question: "",
      type: "text",
      required: false,
      options: [],
    });
  };

  /**
   * Removes a field from the list.
   * @param id ID of the field to remove
   */
  const removeField = (id: string) => {
    onChange(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
        <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
          إضافة سؤال جديد
        </h3>

        <div className="space-y-4">
          <FormInput
            type="text"
            label="السؤال"
            name="question"
            placeholder="مثال: ما هي خبرتك في هذا المجال؟"
            value={newField.question}
            onChange={(value) =>
              setNewField({ ...newField, question: value as string })
            }
            rtl={true}
          />

          <FormInput
            type="select"
            label="نوع الحقل"
            name="fieldType"
            value={newField.type}
            onChange={(value) =>
              setNewField({
                ...newField,
                type: value as "text" | "radio" | "checkbox",
              })
            }
            options={[
              { value: "text", label: "نص" },
              { value: "radio", label: "اختيار واحد" },
              { value: "checkbox", label: "اختيارات متعددة" },
            ]}
          />

          <FormInput
            type="checkbox"
            label="إجباري"
            name="required"
            placeholder="حقل إجباري"
            value={newField.required}
            onChange={(value) =>
              setNewField({ ...newField, required: value as boolean })
            }
          />

          {(newField.type === "radio" || newField.type === "checkbox") && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-neutrals-600">
                الخيارات
              </h4>

              <div className="flex gap-2">
                <FormInput
                  type="text"
                  label=""
                  name="newOption"
                  placeholder="أدخل خيار جديد"
                  value={newOption}
                  onChange={(value) => setNewOption(value as string)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addOption}
                  className="mt-1"
                  variant="outline"
                >
                  إضافة
                </Button>
              </div>

              {/* List of added options */}
              <div className="space-y-2">
                {newField.options?.map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-neutrals-100 p-2 rounded-md"
                  >
                    <span>{option}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(index)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            type="button"
            onClick={addField}
            className="mt-4 w-full"
            variant="outline"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            إضافة السؤال
          </Button>
        </div>
      </div>

      {/* Display existing fields */}
      {fields.length > 0 && (
        <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
          <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
            الأسئلة المضافة ({fields.length})
          </h3>

          <div className="space-y-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className={cn(
                  "bg-white p-4 rounded-lg border border-neutrals-200 relative flex-center justify-between items-start",
                  field.required && "border-r-4 border-r-secondary-500"
                )}
              >
                <div className="pr-4">
                  <h4 className="font-medium text-lg text-neutrals-700 mb-1 flex items-center">
                    {field.question}
                    {field.required && (
                      <span className="text-state-error mr-1 text-sm">*</span>
                    )}
                  </h4>

                  <div className="text-sm text-neutrals-500 mb-3">
                    نوع الحقل:{" "}
                    {field.type === "text"
                      ? "نص"
                      : field.type === "radio"
                      ? "اختيار واحد"
                      : "اختيارات متعددة"}
                  </div>

                  {(field.type === "radio" || field.type === "checkbox") &&
                    field.options && (
                      <div className="mt-2 space-y-2">
                        <div className="text-sm font-medium text-neutrals-600">
                          الخيارات:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {field.options.map((option, idx) => (
                            <div
                              key={idx}
                              className="bg-neutrals-100 px-3 py-1 rounded-full text-sm"
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeField(field.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
