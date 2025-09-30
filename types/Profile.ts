export const ORGANIZATION_TYPES = {
  charity: "جمعية خيرية",
  youth: "منظمة شبابية",
  educational: "مؤسسة تعليمية",
  cultural: "مؤسسة ثقافية / إعلامية",
  health: "مؤسسة صحية",
  religious: "مؤسسة دينية",
  other: "أخرى",
} as const;

export const organizationTypeOptions = Object.entries(ORGANIZATION_TYPES).map(
  ([value, label]) => ({ value, label })
);

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
