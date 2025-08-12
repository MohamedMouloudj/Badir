import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
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
      },
    }),
    prisma.user.create({
      data: {
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
      },
    }),
  ]);

  console.log("Users created");

  // Create Organizations
  const organizations = await Promise.all([
    prisma.organization.create({
      data: {
        name: "جمعية الأمل الخيرية",
        description: "جمعية خيرية تهدف إلى خدمة المجتمع",
        city: "الجزائر العاصمة",
        country: "Algeria",
        isVerified: true,
      },
    }),
    prisma.organization.create({
      data: {
        name: "مشروع فسيلة",
        description: "مشروع يهتم بتنمية الشباب",
        city: "سطيف",
        country: "Algeria",
        isVerified: true,
      },
    }),
    prisma.organization.create({
      data: {
        name: "برنامج بنيان",
        description: "برنامج للدعم النفسي",
        city: "الجزائر العاصمة",
        country: "Algeria",
        isVerified: true,
      },
    }),
  ]);

  console.log("Organizations created");

  // Create Initiative Categories
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
      },
    }),
  ]);

  console.log("Categories created");

  // Create Organization Members
  await Promise.all([
    prisma.organizationMember.create({
      data: {
        organizationId: organizations[0].id,
        userId: users[0].id,
        role: "admin",
        status: "active",
      },
    }),
    prisma.organizationMember.create({
      data: {
        organizationId: organizations[1].id,
        userId: users[0].id,
        role: "manager",
        status: "active",
      },
    }),
  ]);

  console.log("Organization members created");

  // Create Initiatives - Bader Group
  const baderInitiatives = await Promise.all([
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[0].id,
        createdByUserId: users[0].id,
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
        startDate: new Date("2025-08-15"),
        endDate: new Date("2025-12-31"),
        status: "published",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[0].id,
        createdByUserId: users[0].id,
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
        startDate: new Date("2025-08-20"),
        endDate: new Date("2025-12-31"),
        status: "published",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[2].id,
        titleAr: "رأيك يهمنا",
        titleEn: "Your Opinion Matters",
        descriptionAr:
          "مساحة نسمع فيها لآراء وأفكار مستخدمي بادِر من متطوعين وزوار، لنطوّر المنصة معًا ونصنع أثرًا أكبر.",
        descriptionEn:
          "A space where we listen to the opinions and ideas of Bader's volunteers and visitors to improve the platform together and make a bigger impact.",
        shortDescriptionAr: "منصة لمشاركة الآراء",
        shortDescriptionEn: "Platform to share opinions",
        location: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        startDate: new Date("2025-08-25"),
        endDate: new Date("2025-12-31"),
        status: "published",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[2].id,
        titleAr: "شركاء في العطاء",
        titleEn: "Partners in Giving",
        descriptionAr:
          "نافذة للتعاون والشراكات مع منصة بادِر، لمدّ جسور الدعم وتوسيع أثر العمل التطوعي.",
        descriptionEn:
          "A window for cooperation and partnerships with Bader platform to extend support and expand the impact of volunteering.",
        shortDescriptionAr: "شراكات لدعم التطوع",
        shortDescriptionEn: "Partnerships to support volunteering",
        location: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-12-31"),
        status: "published",
      },
    }),
  ]);

  // Professional Development Initiatives (Group 3)
  const professionalInitiatives = await Promise.all([
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[1].id,
        createdByUserId: users[0].id,
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
        startDate: new Date("2025-09-15"),
        endDate: new Date("2025-09-20"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[1].id,
        createdByUserId: users[0].id,
        categoryId: categories[0].id,
        titleAr: "ابدأ مشروعك صح",
        titleEn: "Start Your Project Right",
        descriptionAr:
          "ورشات شبابية لتأسيس المشاريع التجارية أو التطوعية بخطوات مدروسة وانطلاقة قوية.",
        descriptionEn:
          "Youth workshops for establishing commercial or volunteer projects with studied steps and strong start.",
        shortDescriptionAr: "ورشات تأسيس المشاريع",
        shortDescriptionEn: "Project foundation workshops",
        location: "الجزائر",
        city: "وهران",
        country: "Algeria",
        startDate: new Date("2025-09-22"),
        endDate: new Date("2025-09-25"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[1].id,
        createdByUserId: users[0].id,
        categoryId: categories[0].id,
        titleAr: "فرص تربص ميدانية",
        titleEn: "Field Internship Opportunities",
        descriptionAr:
          "برنامج يتيح للشباب خوض تجربة العمل الميداني بالتعاون مع شركات محلية، لاكتساب الخبرة والمهارات.",
        descriptionEn:
          "Program that allows youth to experience field work in cooperation with local companies to gain experience and skills.",
        shortDescriptionAr: "برنامج التربص الميداني",
        shortDescriptionEn: "Field internship program",
        location: "الجزائر",
        city: "قسنطينة",
        country: "Algeria",
        startDate: new Date("2025-09-28"),
        endDate: new Date("2025-10-05"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[1].id,
        createdByUserId: users[0].id,
        categoryId: categories[0].id,
        titleAr: "لنتعلم مهارة",
        titleEn: "Let's Learn a Skill",
        descriptionAr:
          "ورشات في المهارات الشخصية والتقنية تجهّز الشباب للحياة العملية وسوق العمل.",
        descriptionEn:
          "Workshops in personal and technical skills preparing youth for work life and job market.",
        shortDescriptionAr: "ورشات المهارات",
        shortDescriptionEn: "Skills workshops",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-10-10"),
        endDate: new Date("2025-10-15"),
        status: "draft",
      },
    }),
  ]);

  // Mental Health and Identity Initiatives (Group 4)
  const mentalHealthInitiatives = await Promise.all([
    prisma.initiative.create({
      data: {
        organizerType: "organization",
        organizerOrgId: organizations[2].id,
        createdByUserId: users[0].id,
        categoryId: categories[3].id,
        titleAr: "احكي نسمعك",
        titleEn: "Speak, We Listen",
        descriptionAr:
          "فضاء آمن يمنح المراهقين الدعم النفسي، ويشجعهم على التعبير ومواجهة تحدياتهم بثقة.",
        descriptionEn:
          "A safe space that provides psychological support to teenagers and encourages them to express themselves and face their challenges with confidence.",
        shortDescriptionAr: "دعم نفسي للمراهقين",
        shortDescriptionEn: "Psychological support for teenagers",
        location: "الجزائر",
        city: "الجزائر العاصمة",
        country: "Algeria",
        startDate: new Date("2025-10-20"),
        endDate: new Date("2025-10-25"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[3].id,
        titleAr: "سراطانات فكرية",
        titleEn: "Intellectual Cancers",
        descriptionAr:
          "مواجهة التغريب والإلحاد الناعم وأفكار التفكيك عبر محتوى واعٍ وحوارات بنّاءة.",
        descriptionEn:
          "Confronting westernization and soft atheism and deconstructive ideas through conscious content and constructive dialogues.",
        shortDescriptionAr: "مواجهة الأفكار المدمرة",
        shortDescriptionEn: "Confronting destructive ideas",
        location: "الجزائر",
        city: "وهران",
        country: "Algeria",
        startDate: new Date("2025-10-28"),
        endDate: new Date("2025-11-02"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[3].id,
        titleAr: "هويتي",
        titleEn: "My Identity",
        descriptionAr:
          "معالجة قضايا الانتماء للدين والهوية الإسلامية بطريقة واقعية وقريبة من لغة الشباب.",
        descriptionEn:
          "Addressing issues of religious belonging and Islamic identity in a realistic way close to youth language.",
        shortDescriptionAr: "بناء الهوية الإسلامية",
        shortDescriptionEn: "Building Islamic identity",
        location: "الجزائر",
        city: "قسنطينة",
        country: "Algeria",
        startDate: new Date("2025-11-05"),
        endDate: new Date("2025-11-10"),
        status: "draft",
      },
    }),
  ]);

  // Volunteer Training Initiative (Group 5)
  const volunteerTraining = await prisma.initiative.create({
    data: {
      organizerType: "organization",
      organizerOrgId: organizations[1].id,
      createdByUserId: users[0].id,
      categoryId: categories[2].id,
      titleAr: "عدة",
      titleEn: "Equipment",
      descriptionAr:
        "مبادرة تُعنى بتأهيل المتطوعين وتزويدهم بالمهارات والوعي اللازم، ليكونوا طاقات فاعلة تصنع الأثر بوعي ومسؤولية.",
      descriptionEn:
        "Initiative concerned with qualifying volunteers and providing them with necessary skills and awareness to be effective energies that make impact with consciousness and responsibility.",
      shortDescriptionAr: "تأهيل المتطوعين",
      shortDescriptionEn: "Volunteer qualification",
      location: "الجزائر",
      city: "سطيف",
      country: "Algeria",
      startDate: new Date("2025-11-15"),
      endDate: new Date("2025-11-20"),
      status: "draft",
    },
  });

  // Family and Social Initiatives (Group 6)
  const familyInitiatives = await Promise.all([
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[4].id,
        titleAr: "امرأة سويّة، رجل سويّ",
        titleEn: "Balanced Woman, Balanced Man",
        descriptionAr:
          "مبادرة لتصحيح وضبط المفاهيم بين الجنسين، كالقوامة والمساواة، بما يحقق التوازن والاحترام المتبادل.",
        descriptionEn:
          "Initiative to correct and adjust concepts between genders, such as guardianship and equality, achieving balance and mutual respect.",
        shortDescriptionAr: "توازن العلاقات بين الجنسين",
        shortDescriptionEn: "Balance in gender relations",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-05"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[4].id,
        titleAr: "ربّ أبناءك صح",
        titleEn: "Raise Your Children Right",
        descriptionAr:
          "مبادرة لتوعية الوالدين بأسس التربية السليمة، لغرس القيم وبناء جيل واعٍ، سويّ، ومتوازن.",
        descriptionEn:
          "Initiative to educate parents about proper upbringing foundations to instill values and build a conscious, healthy, and balanced generation.",
        shortDescriptionAr: "تربية الأطفال",
        shortDescriptionEn: "Child upbringing",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-12-10"),
        endDate: new Date("2025-12-15"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[4].id,
        titleAr: "اختر شريكك صح",
        titleEn: "Choose Your Partner Right",
        descriptionAr:
          "مبادرة لتوعية الشباب بأسس اختيار شريك الحياة، لبناء أسر مستقرة وواعية.",
        descriptionEn:
          "Initiative to educate youth about the foundations of choosing a life partner to build stable and conscious families.",
        shortDescriptionAr: "اختيار شريك الحياة",
        shortDescriptionEn: "Choosing life partner",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-12-20"),
        endDate: new Date("2025-12-25"),
        status: "draft",
      },
    }),
  ]);

  // Educational Initiatives (Group 7)
  const educationalInitiatives = await Promise.all([
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[0].id,
        titleAr: "زدني علما",
        titleEn: "Increase My Knowledge",
        descriptionAr:
          "دروس دعم مجانية للأطفال في المناطق النائية، تجمع بين التعليم الأكاديمي وغرس القيم التربوية والإيمانية.",
        descriptionEn:
          "Free support lessons for children in remote areas, combining academic education with instilling educational and faith values.",
        shortDescriptionAr: "دروس دعم مجانية",
        shortDescriptionEn: "Free support lessons",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-15"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[0].id,
        titleAr: "التعلم الذاتي والبحث العلمي",
        titleEn: "Self-Learning and Scientific Research",
        descriptionAr:
          "مبادرة لتمكين الشباب من مهارات التعلم المستقل وأساليب البحث، وتنمية روح الاكتشاف والإبداع العلمي.",
        descriptionEn:
          "Initiative to empower youth with independent learning skills and research methods, developing the spirit of discovery and scientific creativity.",
        shortDescriptionAr: "مهارات التعلم المستقل",
        shortDescriptionEn: "Independent learning skills",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-12-20"),
        endDate: new Date("2025-12-30"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[0].id,
        titleAr: "نفهم معاك",
        titleEn: "We Understand With You",
        descriptionAr:
          "دروس وشروحات مبسطة بلغة الإشارة أو لغة ميسّرة، لتمكين ذوي الإعاقات السمعية أو الذهنية من التعلم والفهم.",
        descriptionEn:
          "Simplified lessons and explanations in sign language or facilitated language to enable people with hearing or mental disabilities to learn and understand.",
        shortDescriptionAr: "تعليم ذوي الإعاقة",
        shortDescriptionEn: "Education for people with disabilities",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2026-01-05"),
        endDate: new Date("2026-01-15"),
        status: "draft",
      },
    }),
  ]);

  // Health and Environmental Initiatives (Group 8)
  const healthInitiatives = await Promise.all([
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[1].id,
        titleAr: "قاوم إدمانك",
        titleEn: "Fight Your Addiction",
        descriptionAr:
          "مبادرة لدعم الأفراد في مواجهة الإدمان والتعافي منه، عبر التوعية والمرافقة النفسية والاجتماعية.",
        descriptionEn:
          "Initiative to support individuals in facing addiction and recovering from it through awareness and psychological and social accompaniment.",
        shortDescriptionAr: "مكافحة الإدمان",
        shortDescriptionEn: "Fighting addiction",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-11-01"),
        endDate: new Date("2025-11-15"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[1].id,
        titleAr: "الوعي البيئي",
        titleEn: "Environmental Awareness",
        descriptionAr:
          "مبادرة للتشجير وحملات النظافة والتوعية، لغرس حب البيئة والحفاظ على مواردها.",
        descriptionEn:
          "Initiative for afforestation, cleanliness and awareness campaigns to instill love for the environment and preserve its resources.",
        shortDescriptionAr: "حماية البيئة",
        shortDescriptionEn: "Environmental protection",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-11-20"),
        endDate: new Date("2025-11-30"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[1].id,
        titleAr: "التبرع بالدم والأدوية",
        titleEn: "Blood and Medicine Donation",
        descriptionAr:
          "مبادرة لإنقاذ الأرواح عبر تنظيم حملات للتبرع بالدم وجمع الأدوية للمحتاجين.",
        descriptionEn:
          "Initiative to save lives by organizing blood donation campaigns and collecting medicines for those in need.",
        shortDescriptionAr: "التبرع بالدم",
        shortDescriptionEn: "Blood donation",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-12-05"),
        endDate: new Date("2025-12-10"),
        status: "draft",
      },
    }),
    prisma.initiative.create({
      data: {
        organizerType: "user",
        organizerUserId: users[0].id,
        createdByUserId: users[0].id,
        categoryId: categories[1].id,
        titleAr: "مسعف",
        titleEn: "Paramedic",
        descriptionAr:
          "مبادرة لتدريب الشباب على مهارات الإسعافات الأولية، لتمكينهم من إنقاذ الأرواح في المواقف الطارئة.",
        descriptionEn:
          "Initiative to train youth in first aid skills to enable them to save lives in emergency situations.",
        shortDescriptionAr: "تدريب الإسعافات الأولية",
        shortDescriptionEn: "First aid training",
        location: "الجزائر",
        city: "سطيف",
        country: "Algeria",
        startDate: new Date("2025-12-15"),
        endDate: new Date("2025-12-25"),
        status: "draft",
      },
    }),
  ]);

  console.log("Initiatives created");

  // Create some sample posts for published initiatives
  const posts = await Promise.all([
    prisma.initiativePost.create({
      data: {
        initiativeId: baderInitiatives[0].id,
        authorId: users[0].id,
        title: "مرحباً بكم في منصة بادر",
        content: "نرحب بجميع المتطوعين في منصة بادر للعمل التطوعي",
        postType: "announcement",
        isPinned: true,
      },
    }),
    prisma.initiativePost.create({
      data: {
        initiativeId: baderInitiatives[1].id,
        authorId: users[0].id,
        title: "دليل المبادرات الجديد",
        content: "تم إطلاق الدليل الجديد للمبادرات التطوعية",
        postType: "update",
      },
    }),
  ]);

  console.log("Posts created");

  // Create some sample participants
  const participants = await Promise.all([
    prisma.initiativeParticipant.create({
      data: {
        initiativeId: baderInitiatives[0].id,
        userId: users[1].id,
        participationType: "direct",
        participantRole: "helper",
        status: "approved",
      },
    }),
    prisma.initiativeParticipant.create({
      data: {
        initiativeId: baderInitiatives[1].id,
        userId: users[1].id,
        participationType: "direct",
        participantRole: "participant",
        status: "registered",
      },
    }),
  ]);

  console.log("Participants created");

  // Create some sample support requests
  const supportRequests = await Promise.all([
    prisma.supportRequest.create({
      data: {
        initiativeId: baderInitiatives[0].id,
        requesterId: users[0].id,
        supportType: "technical",
        title: "دعم تقني للموقع",
        description: "نحتاج دعم تقني لتطوير الموقع الإلكتروني",
        urgency: "medium",
        status: "pending",
      },
    }),
    prisma.supportRequest.create({
      data: {
        initiativeId: baderInitiatives[1].id,
        requesterId: users[0].id,
        supportType: "media",
        title: "تصميم مواد إعلامية",
        description: "نحتاج تصميم مواد إعلامية للمبادرة",
        urgency: "high",
        status: "in_review",
      },
    }),
  ]);

  console.log("Support requests created");

  // Create some sample ratings
  const ratings = await Promise.all([
    prisma.userInitiativeRating.create({
      data: {
        userId: users[1].id,
        initiativeId: baderInitiatives[0].id,
        rating: 5,
        comment: "مبادرة رائعة ومفيدة جداً",
      },
    }),
    prisma.userInitiativeRating.create({
      data: {
        userId: users[1].id,
        initiativeId: baderInitiatives[1].id,
        rating: 4,
        comment: "مبادرة جيدة تحتاج لبعض التحسينات",
      },
    }),
  ]);

  console.log("Ratings created");

  // Create some user qualifications
  const qualifications = await Promise.all([
    prisma.userQualification.create({
      data: {
        userId: users[0].id,
        specification: "هندسة البرمجيات",
        educationalLevel: "ماجستير",
        currentJob: "مطور برمجيات",
      },
    }),
    prisma.userQualification.create({
      data: {
        userId: users[1].id,
        specification: "إدارة الأعمال",
        educationalLevel: "بكالوريوس",
        currentJob: "مدير مشروع",
      },
    }),
  ]);

  console.log("User qualifications created");

  console.log("Seed completed successfully!");

  // Print summary
  console.log("\n=== Seed Summary ===");
  console.log(`Created ${users.length} users`);
  console.log(`Created ${organizations.length} organizations`);
  console.log(`Created ${categories.length} categories`);

  const totalInitiatives =
    baderInitiatives.length +
    professionalInitiatives.length +
    mentalHealthInitiatives.length +
    1 + // volunteerTraining
    familyInitiatives.length +
    educationalInitiatives.length +
    healthInitiatives.length;

  console.log(`Created ${totalInitiatives} initiatives`);
  console.log(`Created ${posts.length} posts`);
  console.log(`Created ${participants.length} participants`);
  console.log(`Created ${supportRequests.length} support requests`);
  console.log(`Created ${ratings.length} ratings`);
  console.log(`Created ${qualifications.length} user qualifications`);
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
