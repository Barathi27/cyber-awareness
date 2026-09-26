const AppData = {
  // =========================
  // STUDENT DATA
  // =========================
  student: {
    name: "Priya Sharma",
    email: "priya@example.com",
    college: "MVGR College of Engineering",
    department: "Information Technology",
    year: "3rd Year",
    awarenessScore: 25,
    modulesCompleted: 2,
    quizzesCompleted: 6,
    certificates: 1,
    streak: 0,
    securityLevel: "Developing",
    avatar: "PS",

    completedModules: ["fake-news", "phishing"],
    aiChecks: 0,
    verifiedReports: 0,
    extensionInstalled: false,
    bestQuizScore: 80,
  },

  // =========================
  // NOTIFICATIONS
  // =========================
  notifications: [
    {
      id: 1,
      title: "Welcome to CyberAware",
      message: "Start learning about online safety.",
      time: "Today",
    },
    {
      id: 2,
      title: "New Learning Module",
      message: "Fake News Detection module is available.",
      time: "Today",
    },
    {
      id: 3,
      title: "Security Tip",
      message: "Never share your OTP with anyone.",
      time: "Yesterday",
    },
  ],

  // =========================
  // RECENT ACTIVITIES
  // =========================
  activities: [
    {
      id: 1,
      title: "Completed Fake News module",
      type: "learning",
      time: "Today",
    },
    {
      id: 2,
      title: "Completed Phishing quiz",
      type: "quiz",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Checked a suspicious message",
      type: "ai",
      time: "2 days ago",
    },
  ],

  // =========================
  // LEARNING MODULES
  // =========================
  learningModules: [
    {
      id: "fake-news",
      title: "Fake News",
      description: "Learn how to identify false and misleading information.",
      icon: "📰",
      category: "Information Awareness",
      duration: "10 min",
    },
    {
      id: "phishing",
      title: "Phishing",
      description:
        "Learn how attackers use fake messages and links to steal information.",
      icon: "🎣",
      category: "Cyber Security",
      duration: "10 min",
    },
    {
      id: "internship",
      title: "Fake Internship Offers",
      description: "Identify fake internship and job offers.",
      icon: "💼",
      category: "Career Safety",
      duration: "10 min",
    },
    {
      id: "scholarship",
      title: "Fake Scholarship Links",
      description: "Learn how to identify scholarship scams.",
      icon: "🎓",
      category: "Student Safety",
      duration: "10 min",
    },
    {
      id: "websites",
      title: "Fake Websites",
      description: "Learn how to identify suspicious and fake websites.",
      icon: "🌐",
      category: "Web Safety",
      duration: "10 min",
    },
    {
      id: "deepfake",
      title: "Deepfake Awareness",
      description: "Understand AI-generated and manipulated media.",
      icon: "🎭",
      category: "AI Awareness",
      duration: "10 min",
    },
    {
      id: "social",
      title: "Social Media Scams",
      description: "Learn how to stay safe from social media scams.",
      icon: "📱",
      category: "Social Safety",
      duration: "10 min",
    },
    {
      id: "browsing",
      title: "Safe Browsing Tips",
      description: "Learn safe and responsible internet browsing habits.",
      icon: "🛡️",
      category: "Online Safety",
      duration: "10 min",
    },
  ],

  // =========================
  // SURVEY QUESTIONS
  // =========================
  surveyQuestions: [
    {
      id: 1,
      question: "How confident are you in identifying fake news?",
      options: [
        "Not confident",
        "Slightly confident",
        "Moderately confident",
        "Very confident",
      ],
      area: "fake-news",
    },
    {
      id: 2,
      question: "Can you identify a suspicious email?",
      options: ["Never", "Sometimes", "Usually", "Always"],
      area: "phishing",
    },
    {
      id: 3,
      question: "How often do you verify internship offers?",
      options: ["Never", "Rarely", "Sometimes", "Always"],
      area: "internship",
    },
    {
      id: 4,
      question: "Do you verify scholarship websites before applying?",
      options: ["Never", "Rarely", "Sometimes", "Always"],
      area: "scholarship",
    },
    {
      id: 5,
      question: "Can you identify a fake website?",
      options: ["Not at all", "A little", "Mostly", "Yes"],
      area: "websites",
    },
    {
      id: 6,
      question: "Have you heard about deepfakes?",
      options: [
        "Never",
        "Heard about them",
        "Know the basics",
        "Know them well",
      ],
      area: "deepfake",
    },
    {
      id: 7,
      question: "How often do you check suspicious social media accounts?",
      options: ["Never", "Rarely", "Sometimes", "Always"],
      area: "social",
    },
    {
      id: 8,
      question: "Do you verify links before clicking?",
      options: ["Never", "Rarely", "Sometimes", "Always"],
      area: "browsing",
    },
    {
      id: 9,
      question: "How often do you share information without verifying it?",
      options: ["Very often", "Often", "Sometimes", "Never"],
      area: "fake-news",
    },
    {
      id: 10,
      question: "How confident are you about your online safety?",
      options: [
        "Not confident",
        "Slightly confident",
        "Moderately confident",
        "Very confident",
      ],
      area: "browsing",
    },
  ],

  // ==========================================================
  // TOPIC-WISE QUIZZES
  // ==========================================================
  quizzes: {
    // =========================
    // 1. FAKE NEWS
    // =========================
    "fake-news": {
      id: "fake-news",
      title: "Fake News Detection",
      icon: "📰",
      badgeId: "news",
      certificateTitle: "Fake News Awareness Certificate",
      passingScore: 80,

      questions: [
        {
          q: "Which is the best way to verify a suspicious news article?",
          options: [
            "Share it immediately",
            "Check multiple reliable sources",
            "Trust the headline",
            "Believe social media comments",
          ],
          answer: 1,
        },
        {
          q: "A fake news article often uses:",
          options: [
            "Verified sources",
            "Official reports",
            "Sensational headlines",
            "Government documents",
          ],
          answer: 2,
        },
        {
          q: "What should you check before trusting an online news story?",
          options: [
            "Only the picture",
            "Only the number of likes",
            "Source, date and supporting evidence",
            "Comments only",
          ],
          answer: 2,
        },
        {
          q: "If a news story has no reliable source, you should:",
          options: [
            "Forward it",
            "Verify it before sharing",
            "Post it everywhere",
            "Trust it automatically",
          ],
          answer: 1,
        },
        {
          q: "Which source is generally more reliable for official information?",
          options: [
            "Random WhatsApp message",
            "Anonymous social media account",
            "Official government website",
            "Unknown blog",
          ],
          answer: 2,
        },
      ],
    },

    // =========================
    // 2. PHISHING
    // =========================
    phishing: {
      id: "phishing",
      title: "Phishing Awareness",
      icon: "🎣",
      badgeId: "phish",
      certificateTitle: "Phishing Awareness Certificate",
      passingScore: 90,

      questions: [
        {
          q: "You receive an SBI SMS containing a bit.ly link asking you to update your account. What should you do?",
          options: [
            "Click the link",
            "Forward it to friends",
            "Avoid the link and verify through the official SBI website",
            "Reply with your OTP",
          ],
          answer: 2,
        },
        {
          q: "Which information should you never share through an unknown link?",
          options: [
            "Your favorite color",
            "OTP and banking credentials",
            "Your hobby",
            "Your favorite food",
          ],
          answer: 1,
        },
        {
          q: "A phishing website usually tries to:",
          options: [
            "Teach programming",
            "Steal sensitive information",
            "Provide free education",
            "Improve internet speed",
          ],
          answer: 1,
        },
        {
          q: "Which URL should make you suspicious?",
          options: [
            "https://www.google.com",
            "https://www.microsoft.com",
            "http://secure-bank-login-example.com",
            "https://www.gov.in",
          ],
          answer: 2,
        },
        {
          q: "If an email urgently asks for your password, you should:",
          options: [
            "Send the password",
            "Verify the sender independently",
            "Reply immediately",
            "Share the email with everyone",
          ],
          answer: 1,
        },
      ],
    },

    // =========================
    // 3. INTERNSHIP
    // =========================
    internship: {
      id: "internship",
      title: "Fake Internship Detection",
      icon: "💼",
      badgeId: "internship",
      certificateTitle: "Internship Safety Certificate",
      passingScore: 80,

      questions: [
        {
          q: "A company asks you to pay ₹2,499 before starting an internship. What should you do?",
          options: [
            "Pay immediately",
            "Ask your friends to pay",
            "Verify the company and offer before paying",
            "Share your bank PIN",
          ],
          answer: 2,
        },
        {
          q: "A genuine internship offer should normally provide:",
          options: [
            "Clear company and role information",
            "Only a WhatsApp message",
            "A request for OTP",
            "A request for ATM PIN",
          ],
          answer: 0,
        },
        {
          q: "Which is a warning sign of a fake internship?",
          options: [
            "Official company email",
            "Clear job description",
            "Large payment demanded for selection",
            "Interview process",
          ],
          answer: 2,
        },
        {
          q: "Before accepting an internship, you should verify:",
          options: [
            "Company details and official website",
            "Only the logo",
            "Only the profile picture",
            "Only the number of followers",
          ],
          answer: 0,
        },
        {
          q: "An unknown recruiter asks for your banking password. What should you do?",
          options: [
            "Send it",
            "Share OTP also",
            "Do not share it",
            "Post it publicly",
          ],
          answer: 2,
        },
      ],
    },

    // =========================
    // 4. SCHOLARSHIP
    // =========================
    scholarship: {
      id: "scholarship",
      title: "Fake Scholarship Detection",
      icon: "🎓",
      badgeId: "scholarship",
      certificateTitle: "Scholarship Safety Certificate",
      passingScore: 80,

      questions: [
        {
          q: "A scholarship website asks for your bank PIN. What should you do?",
          options: [
            "Provide it",
            "Do not provide it",
            "Share it with friends",
            "Upload it publicly",
          ],
          answer: 1,
        },
        {
          q: "Which scholarship link is suspicious?",
          options: [
            "Official government portal",
            "College official website",
            "Random shortened URL asking for payment",
            "University website",
          ],
          answer: 2,
        },
        {
          q: "Before applying for a scholarship, you should:",
          options: [
            "Verify the official source",
            "Pay immediately",
            "Share OTP",
            "Trust forwarded messages",
          ],
          answer: 0,
        },
        {
          q: "A scholarship scam may ask students for:",
          options: [
            "Unnecessary payment",
            "Verification through official portal",
            "Application details on official website",
            "Academic documents through official process",
          ],
          answer: 0,
        },
        {
          q: "What is a safer way to find scholarships?",
          options: [
            "Random WhatsApp forwards",
            "Official education or government websites",
            "Unknown Telegram groups",
            "Anonymous social media pages",
          ],
          answer: 1,
        },
      ],
    },

    // =========================
    // 5. FAKE WEBSITES
    // =========================
    websites: {
      id: "websites",
      title: "Fake Website Detection",
      icon: "🌐",
      badgeId: "website",
      certificateTitle: "Website Safety Certificate",
      passingScore: 80,

      questions: [
        {
          q: "A fake website may try to:",
          options: [
            "Steal personal information",
            "Improve your device",
            "Increase internet speed",
            "Teach coding",
          ],
          answer: 0,
        },
        {
          q: "Before entering sensitive information, you should check:",
          options: [
            "Website URL",
            "Number of advertisements only",
            "Page color",
            "Font size",
          ],
          answer: 0,
        },
        {
          q: "A suspicious domain name can be a sign of:",
          options: [
            "A possible fake website",
            "Faster internet",
            "Free storage",
            "Better security",
          ],
          answer: 0,
        },
        {
          q: "You should download software from:",
          options: [
            "Unknown pop-ups",
            "Random websites",
            "Official sources",
            "Unknown links",
          ],
          answer: 2,
        },
        {
          q: "What should you do if a website looks suspicious?",
          options: [
            "Enter your password",
            "Download files",
            "Leave the website and verify the source",
            "Share your OTP",
          ],
          answer: 2,
        },
      ],
    },

    // =========================
    // 6. DEEPFAKE
    // =========================
    deepfake: {
      id: "deepfake",
      title: "Deepfake Awareness",
      icon: "🎭",
      badgeId: "deepfake",
      certificateTitle: "Deepfake Awareness Certificate",
      passingScore: 80,

      questions: [
        {
          q: "A deepfake is:",
          options: [
            "A type of computer hardware",
            "AI-generated or manipulated media",
            "A web browser",
            "A database",
          ],
          answer: 1,
        },
        {
          q: "A suspicious video should be:",
          options: [
            "Shared immediately",
            "Verified using reliable sources",
            "Trusted automatically",
            "Downloaded and forwarded",
          ],
          answer: 1,
        },
        {
          q: "Deepfake technology can manipulate:",
          options: [
            "Only text",
            "Images, audio and videos",
            "Only databases",
            "Only documents",
          ],
          answer: 1,
        },
        {
          q: "Which can be a warning sign in a manipulated video?",
          options: [
            "Unnatural facial movements",
            "Official source verification",
            "Clear original recording",
            "Trusted news coverage",
          ],
          answer: 0,
        },
        {
          q: "Before believing a viral video, you should:",
          options: [
            "Check reliable sources",
            "Forward it",
            "Trust the views",
            "Trust the comments",
          ],
          answer: 0,
        },
      ],
    },

    // =========================
    // 7. SOCIAL MEDIA
    // =========================
    social: {
      id: "social",
      title: "Social Media Scams",
      icon: "📱",
      badgeId: "community",
      certificateTitle: "Social Media Safety Certificate",
      passingScore: 80,

      questions: [
        {
          q: "An unknown social media account promises easy money and asks for payment. This may be:",
          options: [
            "A scam",
            "A scholarship",
            "A normal update",
            "A software update",
          ],
          answer: 0,
        },
        {
          q: "You receive a suspicious giveaway message asking for OTP. What should you do?",
          options: [
            "Share OTP",
            "Ignore and report it",
            "Forward it",
            "Reply with bank details",
          ],
          answer: 1,
        },
        {
          q: "Which is safer on social media?",
          options: [
            "Sharing passwords",
            "Sharing OTPs",
            "Using privacy settings",
            "Accepting every unknown request",
          ],
          answer: 2,
        },
        {
          q: "A fake social media profile may be created to:",
          options: [
            "Steal information or money",
            "Improve your account",
            "Increase battery life",
            "Fix your browser",
          ],
          answer: 0,
        },
        {
          q: "If you identify a suspicious account, you should:",
          options: [
            "Send money",
            "Report and block it",
            "Share your password",
            "Give your OTP",
          ],
          answer: 1,
        },
      ],
    },

    // =========================
    // 8. SAFE BROWSING
    // =========================
    browsing: {
      id: "browsing",
      title: "Safe Browsing",
      icon: "🛡️",
      badgeId: "browser",
      certificateTitle: "Safe Browsing Certificate",
      passingScore: 80,

      questions: [
        {
          q: "A strong password should:",
          options: [
            "Be easy to guess",
            "Use a combination of characters",
            "Be your name",
            "Be '123456'",
          ],
          answer: 1,
        },
        {
          q: "Two-factor authentication provides:",
          options: [
            "An additional security layer",
            "Free internet",
            "More storage",
            "Faster browsing",
          ],
          answer: 0,
        },
        {
          q: "You should update your browser because updates can:",
          options: [
            "Improve security",
            "Remove all passwords",
            "Disable the internet",
            "Delete your account",
          ],
          answer: 0,
        },
        {
          q: "When using public Wi-Fi, you should be careful when:",
          options: [
            "Accessing sensitive accounts",
            "Reading public information",
            "Viewing general news",
            "Checking weather",
          ],
          answer: 0,
        },
        {
          q: "Which is a safe browsing habit?",
          options: [
            "Click every pop-up",
            "Download files from unknown sources",
            "Verify links before clicking",
            "Share passwords online",
          ],
          answer: 2,
        },
      ],
    },
  },

  // =========================
  // BADGES
  // =========================
  badges: [
    {
      id: "news",
      name: "Fact Checker",
      desc: "Score 80% or higher in the Fake News quiz",
      icon: "📰",
      requiredScore: 80,
      quizId: "fake-news",
      certificateTitle: "Fake News Awareness Certificate",
    },

    {
      id: "phish",
      name: "Phishing Sentinel",
      desc: "Score 90% or higher in the Phishing quiz",
      icon: "🎣",
      requiredScore: 90,
      quizId: "phishing",
      certificateTitle: "Phishing Awareness Certificate",
    },

    {
      id: "internship",
      name: "Internship Guardian",
      desc: "Score 80% or higher in the Internship Safety quiz",
      icon: "💼",
      requiredScore: 80,
      quizId: "internship",
      certificateTitle: "Internship Safety Certificate",
    },

    {
      id: "scholarship",
      name: "Scholarship Guardian",
      desc: "Score 80% or higher in the Scholarship Safety quiz",
      icon: "🎓",
      requiredScore: 80,
      quizId: "scholarship",
      certificateTitle: "Scholarship Safety Certificate",
    },

    {
      id: "website",
      name: "Website Safety Guardian",
      desc: "Score 80% or higher in the Fake Website Detection quiz",
      icon: "🌐",
      requiredScore: 80,
      quizId: "websites",
      certificateTitle: "Website Safety Certificate",
    },

    {
      id: "deepfake",
      name: "Deepfake Detector",
      desc: "Score 80% or higher in the Deepfake Awareness quiz",
      icon: "🎭",
      requiredScore: 80,
      quizId: "deepfake",
      certificateTitle: "Deepfake Awareness Certificate",
    },

    {
      id: "community",
      name: "Social Safety Hero",
      desc: "Score 80% or higher in the Social Media Safety quiz",
      icon: "📱",
      requiredScore: 80,
      quizId: "social",
      certificateTitle: "Social Media Safety Certificate",
    },

    {
      id: "browser",
      name: "Safe Browser Champion",
      desc: "Score 80% or higher in the Safe Browsing quiz",
      icon: "🛡️",
      requiredScore: 80,
      quizId: "browsing",
      certificateTitle: "Safe Browsing Certificate",
    },
  ],

  // =========================
  // LEADERBOARD
  // =========================
  leaderboard: [
    {
      rank: 1,
      name: "Rahul Kumar",
      awarenessScore: 95,
      bestQuizScore: 100,
      certificates: 5,
      quizzesCompleted: 12,
    },
    {
      rank: 2,
      name: "Ananya Rao",
      awarenessScore: 91,
      bestQuizScore: 95,
      certificates: 4,
      quizzesCompleted: 10,
    },
    {
      rank: 3,
      name: "Kiran Teja",
      awarenessScore: 87,
      bestQuizScore: 90,
      certificates: 4,
      quizzesCompleted: 9,
    },
    {
      rank: 4,
      name: "Priya Sharma",
      awarenessScore: 80,
      bestQuizScore: 80,
      certificates: 1,
      quizzesCompleted: 6,
    },
    {
      rank: 5,
      name: "Sandeep Reddy",
      awarenessScore: 76,
      bestQuizScore: 75,
      certificates: 2,
      quizzesCompleted: 7,
    },
    {
      rank: 6,
      name: "Divya Sri",
      awarenessScore: 72,
      bestQuizScore: 70,
      certificates: 1,
      quizzesCompleted: 5,
    },
    {
      rank: 7,
      name: "Manoj Kumar",
      awarenessScore: 68,
      bestQuizScore: 65,
      certificates: 1,
      quizzesCompleted: 4,
    },
    {
      rank: 8,
      name: "Keerthi",
      awarenessScore: 60,
      bestQuizScore: 60,
      certificates: 0,
      quizzesCompleted: 3,
    },
  ],

  // =========================
  // COMMUNITY POSTS
  // =========================
  communityPosts: [
    {
      id: 1,
      title: "Suspicious Internship Offer Asking for Registration Fee",
      body: "Received a suspicious internship offer asking for registration fee.",
      category: "Internship",
      risk: "High",
      author: "Rahul Kumar",
      college: "MVGR College of Engineering",
      time: "2 hours ago",
      likes: 24,
      comments: 5,
      verified: true,
      trending: true,
    },

    {
      id: 2,
      title: "Fake Scholarship Website Using Government Logo",
      body: "Found a fake scholarship website using a copied government logo.",
      category: "Scholarship",
      risk: "High",
      author: "Ananya Rao",
      college: "MVGR College of Engineering",
      time: "5 hours ago",
      likes: 18,
      comments: 3,
      verified: true,
      trending: true,
    },

    {
      id: 3,
      title: "Suspicious Phishing SMS Asking for Bank Verification",
      body: "Suspicious phishing SMS asking for bank verification.",
      category: "Phishing",
      risk: "Critical",
      author: "Kiran Teja",
      college: "MVGR College of Engineering",
      time: "Yesterday",
      likes: 31,
      comments: 7,
      verified: false,
      trending: false,
    },
  ],

  // =========================
  // AI ANALYSIS HISTORY
  // =========================
  aiHistory: [
    {
      id: 1,
      text: "Congratulations! You won a scholarship. Click this link.",
      result: "Suspicious",
      confidence: 94,
      time: "Today",
    },
    {
      id: 2,
      text: "Your bank account will be blocked. Verify immediately.",
      result: "Phishing",
      confidence: 97,
      time: "Yesterday",
    },
    {
      id: 3,
      text: "You have been selected for an internship. Pay registration fee.",
      result: "Scam",
      confidence: 91,
      time: "2 days ago",
    },
    {
      id: 4,
      text: "Government announces new education scholarship.",
      result: "Likely Genuine",
      confidence: 82,
      time: "3 days ago",
    },
  ],

  // =========================
  // SAFETY TIPS
  // =========================
  tips: [
    "Never share your OTP with anyone.",
    "Verify news through multiple reliable sources.",
    "Do not pay money for suspicious internship offers.",
    "Check the official website before applying for scholarships.",
    "Do not enter passwords on suspicious websites.",
    "Be careful with AI-generated images, videos and audio.",
    "Use privacy settings on social media.",
    "Enable two-factor authentication whenever possible.",
    "Keep your browser and operating system updated.",
    "Do not click unknown links.",
  ],

  // =========================
  // ADMIN STUDENTS
  // =========================
  adminStudents: [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya@example.com",
      awarenessScore: 80,
      modulesCompleted: 2,
      quizzesCompleted: 6,
      certificates: 1,
      securityLevel: "Developing",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      awarenessScore: 95,
      modulesCompleted: 8,
      quizzesCompleted: 12,
      certificates: 5,
      securityLevel: "Advanced",
    },
    {
      id: 3,
      name: "Ananya Rao",
      email: "ananya@example.com",
      awarenessScore: 91,
      modulesCompleted: 7,
      quizzesCompleted: 10,
      certificates: 4,
      securityLevel: "Advanced",
    },
  ],

  // =========================
  // ANALYTICS
  // =========================
  analytics: {
    totalStudents: 1250,
    activeStudents: 842,
    averageAwareness: 74,
    totalQuizzes: 5230,
    totalCertificates: 2180,
    scamReports: 634,

    moduleCompletion: {
      fakeNews: 78,
      phishing: 82,
      internship: 65,
      scholarship: 61,
      websites: 70,
      deepfake: 54,
      social: 69,
      browsing: 85,
    },
  },

  // =========================
  // API PLACEHOLDERS
  // =========================
  apiEndpoints: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    profile: "/api/student/profile",
    survey: "/api/survey",
    quiz: "/api/quiz",
    aiCheck: "/api/ai/check",
    leaderboard: "/api/leaderboard",
    community: "/api/community",
    analytics: "/api/admin/analytics",
  },
};
