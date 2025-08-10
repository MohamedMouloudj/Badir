import {
  InitiativeCategory,
  User,
  InitiativeStatus,
  OrganizerType,
  TargetAudience,
  UserType,
  InitiativeCard,
} from "@/types";
import { CarouselImage, Partner, TestimonialOpinion } from "@/types/Statics";

const heroCarouselItems: CarouselImage[] = [
  {
    id: 1,
    src: "/images/carousel/carousel-1.jpg",
    alt: "مساعدة النساء",
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

const educationCategory: InitiativeCategory = {
  id: 1,
  nameAr: "التعليم",
  isActive: true,
};

const healthCategory: InitiativeCategory = {
  id: 2,
  nameAr: "الصحة",
  isActive: true,
};

const mindCategory: InitiativeCategory = {
  id: 3,
  nameAr: "الفكر",
  isActive: true,
};

// Sample Users
const sampleUsers: User[] = [
  {
    id: 1,
    email: "ahmed.hassan@email.com",
    firstName: "أحمد",
    lastName: "حسن",
    phone: "+213555123456",
    dateOfBirth: "1995-03-15",
    userType: UserType.HELPER,
    city: "الجزائر",
    state: "الجزائر",
    country: "Algeria",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    email: "fatima.benali@email.com",
    firstName: "فاطمة",
    lastName: "بن علي",
    phone: "+213555987654",
    dateOfBirth: "1992-07-22",
    userType: UserType.HELPER,
    city: "وهران",
    state: "وهران",
    country: "Algeria",
    isActive: true,
    createdAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: 3,
    email: "admin@redcrescent.dz",
    firstName: "محمد",
    lastName: "الأمين",
    phone: "+213555456789",
    dateOfBirth: "1988-11-10",
    userType: UserType.HELPER,
    city: "قسنطينة",
    state: "قسنطينة",
    country: "Algeria",
    isActive: true,
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-10T09:00:00Z",
  },
];

// Sample Initiatives
const sampleInitiatives: InitiativeCard[] = [
  {
    id: 1,
    titleAr: "برنامج محو الأمية للكبار",
    titleEn: "Adult Literacy Program",
    shortDescriptionAr: "تعليم القراءة والكتابة للكبار",
    shortDescriptionEn: "Teaching reading and writing to adults",
    coverImage: "/images/initiatives/literacy-program.jpg",
    city: "الجزائر",
    startDate: "2024-03-01T09:00:00Z",
    endDate: "2024-05-30T17:00:00Z",
    maxParticipants: 50,
    currentParticipants: 25,
    targetAudience: TargetAudience.BOTH,
    status: InitiativeStatus.PUBLISHED,
    isFeatured: true,
    category: {
      nameAr: "التعليم",
      nameEn: "Education",
      icon: "📚",
      bgColor: "#E3F2FD",
      textColor: "#1976D2",
    },
    organizer: {
      type: OrganizerType.ORGANIZATION,
      name: "الهلال الأحمر الجزائري",
      image: "/images/organizations/red-crescent.png",
    },
    distance: 2.5,
  },
  {
    id: 2,
    titleAr: "حملة التبرع بالدم",
    titleEn: "Blood Donation Campaign",
    shortDescriptionAr: "تبرع بالدم وأنقذ حياة",
    shortDescriptionEn: "Donate blood and save lives",
    coverImage: "/images/initiatives/blood-donation.jpg",
    city: "الجزائر",
    startDate: "2024-02-15T08:00:00Z",
    endDate: "2024-02-15T16:00:00Z",
    maxParticipants: 100,
    currentParticipants: 67,
    targetAudience: TargetAudience.BOTH,
    status: InitiativeStatus.PUBLISHED,
    isFeatured: false,
    category: {
      nameAr: "الصحة",
      nameEn: "Health",
      icon: "🏥",
      bgColor: "#F3E5F5",
      textColor: "#7B1FA2",
    },
    organizer: {
      type: OrganizerType.USER,
      name: "أحمد حسن",
    },
    distance: 5.2,
  },
  {
    id: 3,
    titleAr: "ورشة الكتابة الإبداعية للشباب",
    titleEn: "Creative Writing Workshop for Youth",
    shortDescriptionAr: "تعلم الكتابة الإبداعية",
    shortDescriptionEn: "Learn creative writing",
    coverImage: "/images/initiatives/creative-writing.jpg",
    city: "وهران",
    startDate: "2024-03-10T14:00:00Z",
    endDate: "2024-03-12T17:00:00Z",
    maxParticipants: 30,
    currentParticipants: 18,
    targetAudience: TargetAudience.BOTH,
    status: InitiativeStatus.PUBLISHED,
    isFeatured: true,
    category: {
      nameAr: "الفكر",
      nameEn: "Mind",
      icon: "🧠",
      bgColor: "#E8F5E8",
      textColor: "#388E3C",
    },
    organizer: {
      type: OrganizerType.USER,
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
    imageSrc: "/images/fake-partner.png",
    name: "الجزائر الخضراء",
  },
  {
    imageSrc: "/images/fake-partner.png",
    name: "الجزائر الخضراء",
  },
  {
    imageSrc: "/images/fake-partner.png",
    name: "الجزائر الخضراء",
  },
  {
    imageSrc: "/images/fake-partner.png",
    name: "الجزائر الخضراء",
  },
  {
    imageSrc: "/images/fake-partner.png",
    name: "الجزائر الخضراء",
  },
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
};
