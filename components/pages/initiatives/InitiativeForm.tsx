"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  NewInitiativeFormData,
  FormFieldType,
  NewInitiativeSchema,
} from "@/schemas/newInitiativeSchema";
import FormInput from "@/components/FormInput";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormFieldCreator from "../FormFieldCreator";
import {
  createInitiativeAction,
  updateInitiativeAction,
} from "@/actions/initiatives";
import { toast } from "sonner";
import { InitiativeStatus, TargetAudience } from "@prisma/client";
import { Loader2, Save, Info, Check } from "lucide-react";
import AppButton from "@/components/AppButton";
import { targetAudienceOptions } from "@/data/statics";
import country from "country-list-js";
import { BUCKET_MIME_TYPES, BUCKET_SIZE_LIMITS } from "@/types/Statics";
import { handleFileUpload, mimeTypeToExtension } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { InitiativeService } from "@/services/initiatives";

type CategoryOption = {
  value: string;
  label: string;
};

interface InitiativeFormProps {
  categories: CategoryOption[];
  initialData?: Awaited<ReturnType<typeof InitiativeService.getById>>;
  isOrganization?: boolean;
}

function parseParticipationQstForm(input: unknown): FormFieldType[] {
  if (!input) return [];
  let arr: unknown = input;
  if (typeof input === "string") {
    try {
      arr = JSON.parse(input);
    } catch {
      return [];
    }
  }
  // If it's a single object, wrap in array
  if (arr && typeof arr === "object" && !Array.isArray(arr)) {
    arr = [arr];
  }
  if (!Array.isArray(arr)) return [];
  return arr
    .map((item) => {
      if (
        item &&
        typeof item === "object" &&
        "id" in item &&
        "question" in item &&
        "type" in item
      ) {
        return {
          id: String(item.id),
          question: String(item.question),
          type: item.type,
          required: Boolean(item.required),
          options: Array.isArray(item.options) ? item.options.map(String) : [],
        } as FormFieldType;
      }
      return undefined;
    })
    .filter(Boolean) as FormFieldType[];
}

export default function InitiativeForm({
  categories,
  initialData,
  isOrganization,
}: InitiativeFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isPending, startTransition] = useTransition();
  const [participationFields, setParticipationFields] = useState<
    FormFieldType[]
  >(
    initialData?.participationQstForm
      ? parseParticipationQstForm(initialData?.participationQstForm)
      : []
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewInitiativeFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(NewInitiativeSchema) as any,
    defaultValues: {
      titleAr: initialData?.titleAr || "",
      titleEn: initialData?.titleEn || "",
      shortDescriptionAr: initialData?.shortDescriptionAr || "",
      shortDescriptionEn: initialData?.shortDescriptionEn || "",
      descriptionAr: initialData?.descriptionAr || "",
      descriptionEn: initialData?.descriptionEn || "",
      categoryId:
        initialData?.categoryId ||
        (categories.length > 0 ? categories[0].value : ""),
      location: initialData?.location || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      coverImage: null,
      endDate: initialData?.endDate || new Date(),
      startDate: initialData?.startDate || new Date(),
      registrationDeadline: initialData?.registrationDeadline || undefined,
      maxParticipants: initialData?.maxParticipants || undefined,
      participationQstForm: [],
      targetAudience: initialData?.targetAudience || TargetAudience.both,
      requiresForm: true,
      // allowedRoles: [ParticipantRole.participant],
      status: isOrganization ? initialData?.status : InitiativeStatus.draft,
      country: initialData?.country || "Algeria",
    },
    mode: "onBlur",
  });
  const requiresForm = watch("requiresForm");

  // submit as draft
  const saveAsDraft = () => {
    setValue("status", InitiativeStatus.draft);
  };

  // submit and publish
  const saveAndPublish = () => {
    setValue("status", InitiativeStatus.published);
  };

  useEffect(() => {
    setValue("participationQstForm", participationFields);
  }, [participationFields, setValue]);

  const onSubmit = async (data: NewInitiativeFormData) => {
    try {
      startTransition(async () => {
        let result;
        if (initialData) {
          result = await updateInitiativeAction(initialData.id, data);
        } else {
          result = await createInitiativeAction(data);
        }

        if (result.success) {
          toast.success(result.message || "تم إنشاء المبادرة بنجاح");
          router.push(`/initiatives/${result.data?.initiativeId}`);
        } else {
          toast.error(result.error || "حدث خطأ أثناء إنشاء المبادرة");
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ غير متوقع");
    }
  };

  const formSubmitHandler = handleSubmit(onSubmit, (errors) => {
    toast.error("يرجى تصحيح الأخطاء في النموذج");

    if (
      (activeTab === "form-settings" || activeTab === "participation") &&
      (errors.titleAr || errors.descriptionAr)
    ) {
      setActiveTab("basic-info");
    }
  });
  const COUNTRIES = useMemo(() => {
    const countries = country.names();
    return countries.sort().map((countryName) => ({
      value: countryName,
      label: countryName,
    }));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={formSubmitHandler} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="basic-info">المعلومات الأساسية</TabsTrigger>
            <TabsTrigger value="participation">المشاركة</TabsTrigger>
            <TabsTrigger value="form-settings" disabled={!requiresForm}>
              نموذج التسجيل
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info" className="space-y-6">
            {/* Basic Info Tab */}
            <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
                المعلومات الأساسية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Arabic Title */}
                <Controller
                  name="titleAr"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="text"
                      label="عنوان المبادرة (بالعربية)"
                      name="titleAr"
                      placeholder="أدخل عنوان المبادرة بالعربية"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.titleAr?.message}
                      rtl={true}
                    />
                  )}
                />

                {/* English Title */}
                <Controller
                  name="titleEn"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="text"
                      label="عنوان المبادرة (بالإنجليزية)"
                      name="titleEn"
                      placeholder="Enter initiative title in English"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.titleEn?.message}
                      isOptional
                      rtl={false}
                    />
                  )}
                />

                {/* Category */}
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="select"
                      label="تصنيف المبادرة"
                      name="categoryId"
                      placeholder="اختر تصنيف المبادرة"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.categoryId?.message}
                      options={categories}
                    />
                  )}
                />
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
                وصف المبادرة
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {/* Arabic Short Description */}
                <Controller
                  name="shortDescriptionAr"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="text"
                      label="وصف مختصر (بالعربية)"
                      name="shortDescriptionAr"
                      placeholder="أدخل وصفاً مختصراً للمبادرة بالعربية"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.shortDescriptionAr?.message}
                      isOptional
                      rtl={true}
                    />
                  )}
                />

                {/* English Short Description */}
                <Controller
                  name="shortDescriptionEn"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="text"
                      label="وصف مختصر (بالإنجليزية)"
                      name="shortDescriptionEn"
                      placeholder="Enter a short description in English"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.shortDescriptionEn?.message}
                      isOptional
                      rtl={false}
                    />
                  )}
                />

                {/* Arabic Full Description */}
                <Controller
                  name="descriptionAr"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="textarea"
                      label="الوصف التفصيلي (بالعربية)"
                      name="descriptionAr"
                      placeholder="أدخل وصفاً تفصيلياً للمبادرة بالعربية"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.descriptionAr?.message}
                      rtl={true}
                      rows={5}
                    />
                  )}
                />

                {/* English Full Description */}
                <Controller
                  name="descriptionEn"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="textarea"
                      label="الوصف التفصيلي (بالإنجليزية)"
                      name="descriptionEn"
                      placeholder="Enter a detailed description in English"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.descriptionEn?.message}
                      isOptional
                      rtl={false}
                      rows={5}
                    />
                  )}
                />
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
                موقع المبادرة
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location Address */}
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="text"
                      label="العنوان التفصيلي"
                      name="location"
                      placeholder="أدخل العنوان التفصيلي للمبادرة"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.location?.message}
                      rtl={true}
                    />
                  )}
                />

                {/* City */}
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="text"
                      label="المدينة"
                      name="city"
                      placeholder="أدخل المدينة"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.city?.message}
                      rtl={true}
                    />
                  )}
                />

                {/* State */}
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="text"
                      label="الولاية"
                      name="state"
                      placeholder="أدخل الولاية"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.state?.message}
                      isOptional
                      rtl={true}
                    />
                  )}
                />

                {/* Country */}
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <FormInput
                      type="select"
                      options={COUNTRIES}
                      name="country"
                      label="البلد"
                      placeholder="الجزائر"
                      value={value || "Algeria"}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors.country?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Date and Time Section */}
            <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
                التاريخ والوقت
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="date"
                      label="تاريخ البدء"
                      name="startDate"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(value) =>
                        field.onChange(value ? new Date(value as string) : null)
                      }
                      onBlur={field.onBlur}
                      error={errors.startDate?.message}
                    />
                  )}
                />

                {/* End Date */}
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="date"
                      label="تاريخ الانتهاء"
                      name="endDate"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(value) =>
                        field.onChange(value ? new Date(value as string) : null)
                      }
                      onBlur={field.onBlur}
                      error={errors.endDate?.message}
                    />
                  )}
                />

                {/* Registration Deadline */}
                <Controller
                  name="registrationDeadline"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="date"
                      label="الموعد النهائي للتسجيل"
                      name="registrationDeadline"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(value) =>
                        field.onChange(value ? new Date(value as string) : null)
                      }
                      onBlur={field.onBlur}
                      error={errors.registrationDeadline?.message}
                      isOptional
                    />
                  )}
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
                صورة الغلاف
              </h3>

              <Controller
                name="coverImage"
                control={control}
                render={({ field }) => (
                  <FormInput
                    type="file"
                    label="صورة الغلاف"
                    name="coverImage"
                    placeholder="اختر صورة الغلاف"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.coverImage?.message}
                    isOptional
                    rtl={true}
                    fileAccept={BUCKET_MIME_TYPES["post-images"].map(
                      mimeTypeToExtension
                    )}
                    fileMaxSize={
                      BUCKET_SIZE_LIMITS["post-images"] / 1024 / 1024
                    }
                    onFileChange={(file, onChange) =>
                      handleFileUpload(
                        file,
                        BUCKET_SIZE_LIMITS["post-images"],
                        (value) => onChange(JSON.stringify(value))
                      )
                    }
                  />
                )}
              />
            </div>

            <div className="flex justify-end">
              <AppButton
                type="primary"
                border="default"
                onClick={() => setActiveTab("participation")}
                size="sm"
              >
                التالي
              </AppButton>
            </div>
          </TabsContent>

          <TabsContent value="participation" className="space-y-6">
            {/* Target Audience and Participation Settings */}
            <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
                إعدادات المشاركة
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Target Audience */}
                <Controller
                  name="targetAudience"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="select"
                      label="الفئة المستهدفة"
                      name="targetAudience"
                      placeholder="اختر الفئة المستهدفة"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.targetAudience?.message}
                      options={targetAudienceOptions}
                    />
                  )}
                />

                {/* Max Participants */}
                <Controller
                  name="maxParticipants"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="number"
                      label="الحد الأقصى للمشاركين"
                      name="maxParticipants"
                      placeholder="اتركه فارغاً لعدد غير محدود"
                      value={field.value?.toString() || ""}
                      onChange={(value) =>
                        field.onChange(
                          value ? parseInt(value as string, 10) : undefined
                        )
                      }
                      onBlur={field.onBlur}
                      error={errors.maxParticipants?.message}
                      isOptional
                      min={1}
                    />
                  )}
                />

                {/* Allowed Roles */}
                {/* <Controller
                  name="allowedRoles"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      className="md:col-span-2"
                      type="checkbox-group"
                      label="الأدوار المسموح بها"
                      name="allowedRoles"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.allowedRoles?.message}
                      options={participationRoleOptions}
                    />
                  )}
                /> */}
              </div>
              <div>
                {/* Target Audience Information */}
                <div className="md:col-span-2 mt-3">
                  {watch("targetAudience") === TargetAudience.helpers && (
                    <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded-md flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      سيتمكن المساعدون فقط من الانضمام إلى هذه المبادرة.
                    </p>
                  )}
                  {watch("targetAudience") === TargetAudience.participants && (
                    <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded-md flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      سيتمكن المشاركون فقط من الانضمام إلى هذه المبادرة.
                    </p>
                  )}
                  {watch("targetAudience") === TargetAudience.both && (
                    <p className="text-sm text-green-600 bg-green-50 p-2 rounded-md flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      يمكن للمساعدين والمشاركين الانضمام إلى هذه المبادرة.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Participation Form Settings */}
            <div className="bg-neutrals-100 p-6 rounded-lg border border-neutrals-300">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
                نموذج التسجيل
              </h3>

              <div className="space-y-4">
                {/* Open Participation */}
                <Controller
                  name="requiresForm"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      type="switch"
                      label="مشاركة مغلقة (بموافقة مسبقة أو عبر نموذج تسجيل)"
                      name="requiresForm"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.requiresForm?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <AppButton
                type="outline"
                onClick={() => setActiveTab("basic-info")}
                size="sm"
                border="default"
              >
                السابق
              </AppButton>

              <div className="flex gap-2">
                {requiresForm && (
                  <AppButton
                    type="primary"
                    onClick={() => setActiveTab("form-settings")}
                    size="sm"
                    border="default"
                  >
                    إعداد نموذج التسجيل
                  </AppButton>
                )}

                {!requiresForm && (
                  <>
                    <AppButton
                      type="outline-submit"
                      onClick={saveAsDraft}
                      disabled={isPending}
                      icon={
                        isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="mr-2 h-4 w-4" />
                        )
                      }
                      size="sm"
                      border="default"
                    >
                      حفظ كمسودة
                    </AppButton>

                    <AppButton
                      type="submit"
                      onClick={saveAndPublish}
                      disabled={isPending}
                      icon={
                        isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )
                      }
                      size="sm"
                      border="default"
                    >
                      نشر المبادرة
                    </AppButton>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="form-settings" className="space-y-6">
            {/* Form Builder */}
            <FormFieldCreator
              fields={participationFields}
              onChange={setParticipationFields}
            />
            {errors.participationQstForm && (
              <p className="text-sm text-red-600">
                {errors.participationQstForm.message}
              </p>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <AppButton
                type="outline"
                onClick={() => setActiveTab("participation")}
                size="sm"
                border="default"
              >
                السابق
              </AppButton>

              <div className="flex gap-2">
                <AppButton
                  type="outline-submit"
                  onClick={saveAsDraft}
                  disabled={isPending}
                  border="default"
                  icon={
                    isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )
                  }
                  size="sm"
                >
                  حفظ كمسودة
                </AppButton>

                <AppButton
                  type="submit"
                  onClick={saveAndPublish}
                  disabled={isPending}
                  border="default"
                  size="sm"
                  icon={
                    isPending && <Loader2 className="h-4 w-4 animate-spin" />
                  }
                >
                  نشر المبادرة
                </AppButton>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
