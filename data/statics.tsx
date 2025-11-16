import { InitiativeCard } from "@/types/Initiatives";
import {
  AboutInfo,
  CarouselImage,
  Partner,
  TestimonialOpinion,
} from "@/types/Statics";
import {
  InitiativeCategory,
  InitiativeStatus,
  OrganizerType,
  ParticipantRole,
  Sex,
  TargetAudience,
  User,
  UserType,
} from "@prisma/client";

const heroCarouselItems: CarouselImage[] = [
  {
    id: 1,
    src: "/images/carousel/carousel-1.jpg",
    alt: "مساعدة المحتاجين",
  },
  {
    id: 2,
    src: "/images/carousel/carousel-2.jpg",
    alt: "مساعدة المتعلمين",
  },
  {
    id: 3,
    src: "/images/carousel/carousel-3.jpg",
    alt: "مساعدة الطبيعة",
  },
];

const aboutInfo: AboutInfo[] = [
  {
    title: "من نحن؟",
    description: `أول منصة رقمية تطوعية جزائرية متكاملة، تجمع بين المتطوّع، والمحتاج، والجهات الخيرية في منظومة واحدة منسّقة تُسهِّل العطاء وتُفعّل الأثر.
يُشرف عليها مشروع بُنيان التطوعي، الذي يضمّ نخبة من الشباب من مختلف البلدان، يجمعهم هدفٌ واحد: أن يكونوا لبنة في بناء الأمة.`,
  },
  {
    title: "رؤيتنـا",
    description:
      "نسعى لأن نكون همزة وصل بين الرغبة الصّادقة في العطاء، والحاجة الملحّة في الميدان.",
  },
  {
    title: "غايتنا",
    description:
      "إحياء روح البذل في قلوب الشّباب، وتيسّير سُبل العطاء المنظّم، بما يُثمر ويفيد المحتاجين.",
  },
  {
    title: "رسالتنا",
    description:
      "تنظيم العمل التطوعي، وتفعيله عبر مبادرات نوعية تُخرج طاقات الشباب للتأثير والبناء.",
  },
  {
    title: "الفئة المستهدفة",
    description: (
      <ul className="list-inside list-disc space-y-2">
        <li>الشباب المسلم المؤمن برسالته.</li>
        <li>الجهات والمبادرات المجتمعية التي تحمل همّ الإصلاح والبذل.</li>
        <li>كلّ فئةٍ محتاجة تنتظر يدًا تمتدّ بالعون.</li>
      </ul>
    ),
  },
  {
    title: "دليل المنصة",
    description:
      "دليلك لتنظيم العمل التطوعي، من التسجيل واختيار المبادرات، إلى المشاركة وصناعة الأثر بطرق سهلة ومنظّمة.",
  },
];

const educationCategory: InitiativeCategory = {
  id: "1",
  nameAr: "التعليم",
  isActive: true,
  nameEn: null,
  descriptionAr: null,
  descriptionEn: null,
  icon: null,
  bgColor: null,
  textColor: null,
  createdAt: new Date(),
};

const healthCategory: InitiativeCategory = {
  id: "2",
  nameAr: "الصحة",
  isActive: true,
  nameEn: null,
  descriptionAr: null,
  descriptionEn: null,
  icon: null,
  bgColor: null,
  textColor: null,
  createdAt: new Date(),
};

const mindCategory: InitiativeCategory = {
  id: "3",
  nameAr: "الفكر",
  isActive: true,
  nameEn: null,
  descriptionAr: null,
  descriptionEn: null,
  icon: null,
  bgColor: null,
  textColor: null,
  createdAt: new Date(),
};

// Sample Users
const sampleUsers: User[] = [
  {
    id: "1",
    email: "ahmed.hassan@email.com",
    firstName: "أحمد",
    lastName: "حسن",
    phone: "+213555123456",
    dateOfBirth: new Date("1995-03-15"),
    userType: UserType.helper,
    city: "الجزائر",
    state: "الجزائر",
    country: "Algeria",
    isActive: true,
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-15T10:00:00Z"),
    name: "",
    image: null,
    emailVerified: false,
    sex: Sex.male,
    bio: null,
    latitude: null,
    longitude: null,
    profileCompleted: false,
  },
  {
    id: "2",
    email: "fatima.benali@email.com",
    firstName: "فاطمة",
    lastName: "بن علي",
    phone: "+213555987654",
    dateOfBirth: new Date("1992-07-22"),
    userType: UserType.helper,
    city: "وهران",
    state: "وهران",
    country: "Algeria",
    isActive: true,
    createdAt: new Date("2024-01-20T14:30:00Z"),
    updatedAt: new Date("2024-01-20T14:30:00Z"),
    name: "",
    image: null,
    emailVerified: false,
    sex: Sex.female,
    bio: null,
    latitude: null,
    longitude: null,
    profileCompleted: false,
  },
  {
    id: "3",
    email: "admin@redcrescent.dz",
    firstName: "محمد",
    lastName: "الأمين",
    phone: "+213555456789",
    dateOfBirth: new Date("1988-11-10"),
    userType: UserType.helper,
    city: "قسنطينة",
    state: "قسنطينة",
    country: "Algeria",
    isActive: true,
    createdAt: new Date("2024-01-10T09:00:00Z"),
    updatedAt: new Date("2024-01-10T09:00:00Z"),
    name: "",
    image: null,
    emailVerified: false,
    sex: Sex.male,
    bio: null,
    latitude: null,
    longitude: null,
    profileCompleted: false,
  },
];

// Sample Initiatives
const sampleInitiatives: InitiativeCard[] = [
  {
    id: "1",
    titleAr: "برنامج محو الأمية للكبار",
    titleEn: "Adult Literacy Program",
    shortDescriptionAr: "تعليم القراءة والكتابة للكبار",
    shortDescriptionEn: "Teaching reading and writing to adults",
    coverImage: "/images/initiatives/literacy-program.jpg",
    city: "الجزائر",
    startDate: new Date("2024-03-01T09:00:00Z"),
    endDate: new Date("2024-05-30T17:00:00Z"),
    maxParticipants: 50,
    currentParticipants: 25,
    targetAudience: TargetAudience.both,
    status: InitiativeStatus.published,
    category: {
      nameAr: "التعليم",
      nameEn: "Education",
      icon: "📚",
      bgColor: "#E3F2FD",
      textColor: "#1976D2",
    },
    organizer: {
      type: OrganizerType.organization,
      name: "الهلال الأحمر الجزائري",
      image: "/images/organizations/red-crescent.png",
    },
    distance: 2.5,
  },
  {
    id: "2",
    titleAr: "حملة التبرع بالدم",
    titleEn: "Blood Donation Campaign",
    shortDescriptionAr: "تبرع بالدم وأنقذ حياة",
    shortDescriptionEn: "Donate blood and save lives",
    coverImage: "/images/initiatives/blood-donation.jpg",
    city: "الجزائر",
    startDate: new Date("2024-02-15T08:00:00Z"),
    endDate: new Date("2024-02-15T16:00:00Z"),
    maxParticipants: 100,
    currentParticipants: 67,
    targetAudience: TargetAudience.both,
    status: InitiativeStatus.published,
    category: {
      nameAr: "الصحة",
      nameEn: "Health",
      icon: "🏥",
      bgColor: "#F3E5F5",
      textColor: "#7B1FA2",
    },
    organizer: {
      type: OrganizerType.user,
      name: "أحمد حسن",
    },
    distance: 5.2,
  },
  {
    id: "3",
    titleAr: "ورشة الكتابة الإبداعية للشباب",
    titleEn: "Creative Writing Workshop for Youth",
    shortDescriptionAr: "تعلم الكتابة الإبداعية",
    shortDescriptionEn: "Learn creative writing",
    coverImage: "/images/initiatives/creative-writing.jpg",
    city: "وهران",
    startDate: new Date("2024-03-10T14:00:00Z"),
    endDate: new Date("2024-03-12T17:00:00Z"),
    maxParticipants: 30,
    currentParticipants: 18,
    targetAudience: TargetAudience.both,
    status: InitiativeStatus.published,
    category: {
      nameAr: "الفكر",
      nameEn: "Mind",
      icon: "🧠",
      bgColor: "#E8F5E8",
      textColor: "#388E3C",
    },
    organizer: {
      type: OrganizerType.user,
      name: "فاطمة بن علي",
      image: "/images/users/fatima-profile.jpg",
    },
    distance: 1.8,
  },
];

// Sample Ratings
const sampleRatings: TestimonialOpinion[] = [
  {
    id: 1,
    userName: "أحمد",
    userJob: "مطور ويب",
    comment: "مبادرة رائعة! تنظيم ممتاز وأثر إيجابي كبير على المجتمع",
  },
  {
    id: 2,
    userName: "فاطمة",
    userJob: "مصممة جرافيك",
    comment: "مبادرة رائعة! تنظيم ممتاز وأثر إيجابي كبير على المجتمع",
  },
  {
    id: 3,
    userName: "علي",
    userJob: "طبيب",
    comment: "مبادرة رائعة! تنظيم ممتاز وأثر إيجابي كبير على المجتمع",
  },
];

const partners: Partner[] = [
  {
    imageSrc: "/images/bunian-logo-nbg.png",
    name: "بنيان",
  },
];

const targetAudienceOptions = [
  { value: "helpers", label: "متطوعون" },
  { value: "participants", label: "مستفيدون" },
  { value: "both", label: "كلاهما" },
];

const participationRoleOptions = [
  { value: ParticipantRole.manager, label: "منظم" },
  { value: ParticipantRole.helper, label: "مساعد" },
  { value: ParticipantRole.participant, label: "مشارك" },
];

const statusOptions = [
  { value: "all", label: "جميع الحالات" },
  { value: "published", label: "منشورة" },
  { value: "ongoing", label: "جارية" },
  { value: "completed", label: "مكتملة" },
];

const organizerTypeOptions = [
  { value: "all", label: "جميع المنظمين" },
  { value: "user", label: "أفراد" },
  { value: "organization", label: "منظمات" },
];

export {
  heroCarouselItems,
  educationCategory,
  healthCategory,
  mindCategory,
  sampleUsers,
  sampleRatings,
  sampleInitiatives,
  partners,
  aboutInfo,
  targetAudienceOptions,
  statusOptions,
  organizerTypeOptions,
  participationRoleOptions,
};
