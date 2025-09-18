import { OrganizationProfile, RegistrationFormData } from "@/schemas";

export type ProfileState = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: Partial<Record<keyof RegistrationFormData, string[]>>;
};

export type OrganizationProfileState = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: Partial<Record<keyof OrganizationProfile, string[]>>;
};

export const organizationTypeOptions = [
  { value: "charity", label: "جمعية خيرية" },
  { value: "youth", label: "منظمة شبابية" },
  { value: "educational", label: "مؤسسة تعليمية" },
  { value: "cultural", label: "مؤسسة ثقافية / إعلامية" },
  { value: "health", label: "مؤسسة صحية" },
  { value: "religious", label: "مؤسسة دينية" },
  { value: "other", label: "أخرى" },
];

export const workAreaOptions = [
  { value: "education", label: "التعليم والتدريب" },
  { value: "health", label: "الصحة والعافية" },
  { value: "environment", label: "البيئة والتنمية المستدامة" },
  { value: "humanitarian", label: "الإغاثة والعمل الخيري" },
  { value: "culture", label: "الثقافة والتوعية" },
  { value: "technology", label: "التكنولوجيا والابتكار" },
  { value: "religion", label: "الدين" },
  { value: "humanRights", label: "حقوق الإنسان والمناصرة" },
  { value: "other", label: "أخرى" },
];
