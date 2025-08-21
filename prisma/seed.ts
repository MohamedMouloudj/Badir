// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting to seed the database...");

  // Create Users
  console.log("👤 Creating users...");
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "mohamed@example.com" },
      update: {},
      create: {
        id: "user_mohamed",
        name: "Mohamed Mouloudj",
        email: "mohamed@example.com",
        emailVerified: true,
        firstName: "Mohamed",
        lastName: "Mouloudj",
        userType: "both",
        profileCompleted: true,
        city: "الجزائر العاصمة",
        country: "Algeria",
        sex: "male",
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        id: "user_admin",
        name: "Admin User",
        email: "admin@example.com",
        emailVerified: true,
        firstName: "Admin",
        lastName: "User",
        userType: "helper",
        profileCompleted: true,
        city: "الجزائر العاصمة",
        country: "Algeria",
        sex: "male",
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "sara@example.com" },
      update: {},
      create: {
        id: "user_sara",
        name: "Sara Ahmed",
        email: "sara@example.com",
        emailVerified: true,
        firstName: "Sara",
        lastName: "Ahmed",
        userType: "participant",
        profileCompleted: true,
        city: "وهران",
        country: "Algeria",
        sex: "female",
        isActive: true,
      },
    }),
  ]);

  // Create User Qualifications
  console.log("🎓 Creating user qualifications...");
  await Promise.all([
    prisma.userQualification.create({
      data: {
        userId: "user_mohamed",
        specification: "هندسة البرمجيات",
        educationalLevel: "ماجستير",
        currentJob: "مطور برمجيات",
      },
    }),
    prisma.userQualification.create({
      data: {
        userId: "user_admin",
        specification: "إدارة الأعمال",
        educationalLevel: "بكالوريوس",
        currentJob: "مدير مشروع",
      },
    }),
    prisma.userQualification.create({
      data: {
        userId: "user_sara",
        specification: "علم النفس",
        educationalLevel: "ماجستير",
        currentJob: "أخصائية نفسية",
      },
    }),
  ]);

  // Create Organizations
  console.log("🏢 Creating organizations...");
  const organizations = await Promise.all([
    prisma.organization.create({
      data: {
        userId: "user_mohamed",
        name: "جمعية الأمل الخيرية",
        shortName: "الأمل",
        description: "جمعية خيرية تهدف إلى خدمة المجتمع",
        contactEmail: "info@amal.org",
        state: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        organizationType: "charity",
        workAreas: ["education", "health", "humanitarian"],
        userRole: "manager",
        isVerified: true,
      },
    }),
    prisma.organization.create({
      data: {
        userId: "user_admin",
        name: "مشروع فسيلة",
        shortName: "فسيلة",
        description: "مشروع يهتم بتنمية الشباب",
        contactEmail: "info@faseela.org",
        state: "سطيف",
        city: "سطيف",
        country: "Algeria",
        organizationType: "youth",
        workAreas: ["education", "culture"],
        userRole: "manager",
        isVerified: true,
      },
    }),
    prisma.organization.create({
      data: {
        userId: "user_sara",
        name: "برنامج بنيان",
        shortName: "بنيان",
        description: "برنامج للدعم النفسي",
        contactEmail: "contact@bunyan.org",
        state: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        organizationType: "health",
        workAreas: ["health", "education", "humanRights"],
        userRole: "manager",
        isVerified: true,
      },
    }),
  ]);

  // Create Initiative Categories
  console.log("📂 Creating initiative categories...");
  const categories = await Promise.all([
    prisma.initiativeCategory.create({
      data: {
        nameAr: "التعليم والتدريب",
        nameEn: "Education and Training",
        descriptionAr: "مبادرات تعليمية وتدريبية",
        descriptionEn: "Educational and training initiatives",
        icon: "book",
        bgColor: "#3B82F6",
        textColor: "#FFFFFF",
        isActive: true,
      },
    }),
    prisma.initiativeCategory.create({
      data: {
        nameAr: "الصحة والبيئة",
        nameEn: "Health and Environment",
        descriptionAr: "مبادرات صحية وبيئية",
        descriptionEn: "Health and environmental initiatives",
        icon: "heart",
        bgColor: "#10B981",
        textColor: "#FFFFFF",
        isActive: true,
      },
    }),
    prisma.initiativeCategory.create({
      data: {
        nameAr: "التطوع وخدمة المجتمع",
        nameEn: "Volunteering and Community Service",
        descriptionAr: "مبادرات تطوعية وخدمة المجتمع",
        descriptionEn: "Volunteering and community service initiatives",
        icon: "users",
        bgColor: "#F59E0B",
        textColor: "#FFFFFF",
        isActive: true,
      },
    }),
    prisma.initiativeCategory.create({
      data: {
        nameAr: "التوعية والتثقيف",
        nameEn: "Awareness and Education",
        descriptionAr: "مبادرات توعوية وتثقيفية",
        descriptionEn: "Awareness and educational initiatives",
        icon: "lightbulb",
        bgColor: "#8B5CF6",
        textColor: "#FFFFFF",
        isActive: true,
      },
    }),
    prisma.initiativeCategory.create({
      data: {
        nameAr: "الأسرة والمجتمع",
        nameEn: "Family and Society",
        descriptionAr: "مبادرات أسرية ومجتمعية",
        descriptionEn: "Family and social initiatives",
        icon: "home",
        bgColor: "#EF4444",
        textColor: "#FFFFFF",
        isActive: true,
      },
    }),
    prisma.initiativeCategory.create({
      data: {
        nameAr: "التكنولوجيا والابتكار",
        nameEn: "Technology and Innovation",
        descriptionAr: "مبادرات تقنية وابتكارية",
        descriptionEn: "Technology and innovation initiatives",
        icon: "cpu",
        bgColor: "#6366F1",
        textColor: "#FFFFFF",
        isActive: true,
      },
    }),
    prisma.initiativeCategory.create({
      data: {
        nameAr: "الرياضة والترفيه",
        nameEn: "Sports and Recreation",
        descriptionAr: "مبادرات رياضية وترفيهية",
        descriptionEn: "Sports and recreational initiatives",
        icon: "trophy",
        bgColor: "#F97316",
        textColor: "#FFFFFF",
        isActive: true,
      },
    }),
  ]);

  // Create Initiatives
  console.log("🚀 Creating initiatives...");
  const initiatives = await Promise.all([
    // Bader Platform Initiatives
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[0].id,
        categoryId: categories[2].id,
        titleAr: "وين نعاون؟",
        titleEn: "Where Can I Help?",
        descriptionAr:
          "أداة ذكية تربطك بالفرص التطوعية الأقرب إليك، لتخدم مجتمعك بسهولة وفي المكان الذي تحتاجه.",
        descriptionEn:
          "A smart tool that connects you to the nearest volunteering opportunities to serve your community easily where it is needed.",
        shortDescriptionAr: "أداة للبحث عن فرص التطوع الأقرب",
        shortDescriptionEn: "Tool to find nearest volunteering opportunities",
        location: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        startDate: new Date("2025-08-15T00:00:00.000Z"),
        endDate: new Date("2025-12-31T00:00:00.000Z"),
        status: "published",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[0].id,
        categoryId: categories[2].id,
        titleAr: "دليل المبادرات",
        titleEn: "Initiatives Directory",
        descriptionAr:
          "بوابتك لاستكشاف الفرص التطوعية، والاطلاع على تفاصيلها والانضمام إليها بسهولة لصناعة الأثر.",
        descriptionEn:
          "Your gateway to explore volunteering opportunities, view their details, and join them easily to make an impact.",
        shortDescriptionAr: "دليل للفرص التطوعية",
        shortDescriptionEn: "Directory for volunteering opportunities",
        location: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        startDate: new Date("2025-08-20T00:00:00.000Z"),
        endDate: new Date("2025-12-31T00:00:00.000Z"),
        status: "published",
      },
    }),
    // Education Initiatives
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[1].id,
        categoryId: categories[0].id,
        titleAr: "كواليس المهنة",
        titleEn: "Behind the Scenes of Professions",
        descriptionAr:
          "لقاءات دورية تجمع المهنيين بالطلبة، لنقل خبرات الميدان في مجالات مثل الطب، الإعلام، والبرمجة.",
        descriptionEn:
          "Regular meetings bringing professionals and students together to share field experience in areas like medicine, media, and programming.",
        shortDescriptionAr: "لقاءات مهنية مع المختصين",
        shortDescriptionEn: "Professional meetings with specialists",
        location: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        startDate: new Date("2025-09-15T00:00:00.000Z"),
        endDate: new Date("2025-09-20T00:00:00.000Z"),
        status: "published",
        maxParticipants: 50,
      },
    }),
    // Technology Initiative
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: "user_mohamed",
        categoryId: categories[5].id,
        titleAr: "هاكاثون الابتكار",
        titleEn: "Innovation Hackathon",
        descriptionAr:
          "مسابقة برمجية لحل المشاكل المجتمعية باستخدام التكنولوجيا",
        descriptionEn:
          "Programming competition to solve community problems using technology",
        shortDescriptionAr: "مسابقة برمجية",
        shortDescriptionEn: "Programming competition",
        location: "الجزائر",
        city: "وهران",
        country: "Algeria",
        startDate: new Date("2025-10-01T00:00:00.000Z"),
        endDate: new Date("2025-10-03T00:00:00.000Z"),
        status: "draft",
        maxParticipants: 100,
      },
    }),
    // Health Initiative
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[2].id,
        categoryId: categories[1].id,
        titleAr: "حملة التبرع بالدم",
        titleEn: "Blood Donation Campaign",
        descriptionAr: "حملة للتبرع بالدم لمساعدة المرضى المحتاجين",
        descriptionEn: "Blood donation campaign to help patients in need",
        shortDescriptionAr: "التبرع بالدم",
        shortDescriptionEn: "Blood donation",
        location: "الجزائر",
        city: "قسنطينة",
        country: "Algeria",
        startDate: new Date("2025-09-25T00:00:00.000Z"),
        endDate: new Date("2025-09-25T00:00:00.000Z"),
        status: "ongoing",
      },
    }),
    // Sports Initiative
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: "user_sara",
        categoryId: categories[6].id,
        titleAr: "ماراثون الجزائر",
        titleEn: "Algeria Marathon",
        descriptionAr: "ماراثون سنوي لتشجيع الرياضة والصحة",
        descriptionEn: "Annual marathon to promote sports and health",
        shortDescriptionAr: "ماراثون سنوي",
        shortDescriptionEn: "Annual marathon",
        location: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        startDate: new Date("2025-11-15T00:00:00.000Z"),
        endDate: new Date("2025-11-15T00:00:00.000Z"),
        status: "draft",
        maxParticipants: 500,
      },
    }),
  ]);

  // Create Initiative Posts
  console.log("📝 Creating initiative posts...");
  await Promise.all([
    prisma.initiativePost.create({
      data: {
        initiativeId: initiatives[0].id,
        authorId: "user_mohamed",
        title: "مرحباً بكم في منصة بادر",
        content: "نرحب بجميع المتطوعين في منصة بادر للعمل التطوعي",
        postType: "announcement",
        isPinned: true,
        status: "published",
      },
    }),
    prisma.initiativePost.create({
      data: {
        initiativeId: initiatives[1].id,
        authorId: "user_mohamed",
        title: "دليل المبادرات الجديد",
        content: "تم إطلاق الدليل الجديد للمبادرات التطوعية",
        postType: "update",
        isPinned: false,
        status: "published",
      },
    }),
    prisma.initiativePost.create({
      data: {
        initiativeId: initiatives[2].id,
        authorId: "user_admin",
        title: "شروط المشاركة",
        content: "للمشاركة في اللقاء، يرجى التسجيل مبكراً",
        postType: "instruction",
        isPinned: true,
        status: "published",
      },
    }),
  ]);

  // Create Initiative Participants
  console.log("👥 Creating initiative participants...");
  await Promise.all([
    prisma.initiativeParticipant.create({
      data: {
        initiativeId: initiatives[0].id,
        userId: "user_admin",
        participantRole: "helper",
        status: "approved",
      },
    }),
    prisma.initiativeParticipant.create({
      data: {
        initiativeId: initiatives[1].id,
        userId: "user_admin",
        participantRole: "participant",
        status: "registered",
      },
    }),
    prisma.initiativeParticipant.create({
      data: {
        initiativeId: initiatives[2].id,
        userId: "user_sara",
        participantRole: "participant",
        status: "approved",
        isCheckedIn: true,
        checkInTime: new Date(),
      },
    }),
    prisma.initiativeParticipant.create({
      data: {
        initiativeId: initiatives[3].id,
        userId: "user_admin",
        participantRole: "helper",
        status: "registered",
      },
    }),
  ]);

  // Create Support Requests
  console.log("🆘 Creating support requests...");
  await Promise.all([
    prisma.supportRequest.create({
      data: {
        organizationId: organizations[0].id,
        supportType: "technical",
        title: "دعم تقني للموقع",
        description: "نحتاج دعم تقني لتطوير الموقع الإلكتروني",
        urgency: "medium",
        status: "active",
      },
    }),
    prisma.supportRequest.create({
      data: {
        organizationId: organizations[1].id,
        supportType: "media",
        title: "تصميم مواد إعلامية",
        description: "نحتاج تصميم مواد إعلامية للمبادرة",
        urgency: "high",
        status: "active",
      },
    }),
    prisma.supportRequest.create({
      data: {
        organizationId: organizations[2].id,
        supportType: "financial",
        title: "دعم مالي للحملة",
        description: "نحتاج دعم مالي لتنظيم حملة التبرع بالدم",
        urgency: "urgent",
        status: "closed",
      },
    }),
  ]);

  // Create User Initiative Ratings
  console.log("⭐ Creating ratings...");
  await Promise.all([
    prisma.userInitiativeRating.create({
      data: {
        userId: "user_admin",
        initiativeId: initiatives[0].id,
        rating: 5,
        comment: "مبادرة رائعة ومفيدة جداً",
      },
    }),
    prisma.userInitiativeRating.create({
      data: {
        userId: "user_admin",
        initiativeId: initiatives[1].id,
        rating: 4,
        comment: "مبادرة جيدة تحتاج لبعض التحسينات",
      },
    }),
    prisma.userInitiativeRating.create({
      data: {
        userId: "user_sara",
        initiativeId: initiatives[2].id,
        rating: 5,
        comment: "لقاء مفيد جداً، تعلمت الكثير",
      },
    }),
  ]);

  // Platform Ratings section removed as requested

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect from the database
    await prisma.$disconnect();
    console.log("🔌 Disconnected from database");
  });
