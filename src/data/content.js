export const content = {
  profile: {
    fullName:      'Keisya Rizkyka',
    nickname:      'Caca',
    heroGreeting:  "Hellow, I'm Caca!",
    role:          'Information Systems Student',
    year:          '2026',
    tagline:       'Growing through experiences, learning with people.',
    location:      'Palembang, Indonesia',
    bio: [
      "Hi! I'm Caca, a university student who enjoys learning, exploring new things, and growing through different experiences.",
      "I may be a little quiet at first, but I enjoy connecting with people and making them feel comfortable. I value meaningful conversations, teamwork, and the little things that make every experience memorable.",
      "From academic projects to being involved in AIESEC, each experience has taught me something new about responsibility, communication, leadership, and personal growth. Growth doesn't always come from having everything figured out. Sometimes it starts with trying something new, making mistakes, and learning to trust yourself along the way.",
    ],
    avatar: '/assets/avatar-placeholder.svg',
    quickFacts: {
      basedIn:      'Indonesia',
      interestedIn: 'Technology, Leadership & People Development',
      exploring:    'Personal Growth & New Experiences',
    },
  },

  education: [
    {
      type:        'university',
      institution: 'Universitas Sriwijaya',
      faculty:     'Faculty of Computer Science',
      degree:      'Information Systems',
      period:      '2025 – Present',
      gpa:         'GPA 3.90 / 4.00',
    },
    {
      type:        'high-school',
      institution: 'SMA Negeri 01 Palembang',
      major:       'Science',
      period:      '2022 – 2025',
    },
  ],

  experienceIntro: 'Every experience has a story behind it. From being a delegate to becoming a coach, and from learning new things to taking on challenges outside my comfort zone, each step has shaped the way I see myself and the people around me.',

  experience: [
    {
      year:         '2026',
      title:        'Master of Ceremony, AFL Capacity Building',
      organization: 'Event Experience',
      type:         'event',
      description:  'An opportunity to step outside my comfort zone and take a more active role in an event. As an MC, I guided the event flow, introduced sessions, and kept participants engaged, which strengthened my public speaking, confidence, and communication skills.',
    },
    {
      year:         '2026',
      title:        "Coach (Group 4), AFL WP'26",
      organization: 'AIESEC',
      type:         'organization',
      description:  'Stepping into a coaching role gave me a different perspective on personal development. I guided and supported delegates through coaching sessions, progress tracking, goal-setting, and reflection, and learned to listen, ask meaningful questions, and give constructive feedback.',
    },
    {
      year:         '2025',
      title:        'Delegate & Most Active Staff, AFL WP2025',
      organization: 'AIESEC',
      type:         'organization',
      description:  'One of my most meaningful organizational experiences. I learned, took part actively in different activities, and connected with people who shared an interest in personal development. I was also recognized as one of the Most Active Staff.',
    },
  ],

  softSkills: [
    'Communication & Collaboration',
    'Public Speaking & Confidence',
    'Leadership & Coaching',
    'Time Management',
    'Problem Solving',
    'Adaptability & Continuous Learning',
  ],

  techSkills: [
    { name: 'HTML5',          color: '#E34F26', rating: 4 },
    { name: 'CSS & Tailwind', color: '#38BDF8', rating: 4 },
    { name: 'JavaScript',     color: '#F7DF1E', rating: 3 },
    { name: 'Java',           color: '#ED8B00', rating: 3 },
    { name: 'SQL / MySQL',    color: '#4479A1', rating: 3 },
    { name: 'Git & GitHub',   color: '#F05032', rating: 3 },
  ],

  projectCategories: [
    { id: 'web',      label: 'Web & Software' },
    { id: 'database', label: 'Database & System Analysis' },
    { id: 'business', label: 'Business & Strategy' },
    { id: 'docs',     label: 'Event Documentation' },
    { id: 'certs',    label: 'Certificates' },
  ],

  projects: {
    web: [
      {
        title:       'Personal Portfolio',
        description: '[PLACEHOLDER] My personal portfolio website — the site you are looking at right now. Built with Vite, Tailwind CSS v4, and GSAP.',
        tech:        ['Vite', 'Tailwind CSS', 'GSAP', 'Vanilla JS'],
        demo:        '',
        repo:        '',
        image:       '/assets/project-portfolio.svg',
      },
      {
        title:       'SIPUSTAKA',
        description: '[PLACEHOLDER] A Java-based library management system developed as a group project, featuring book management, member registration, and borrowing records.',
        tech:        ['Java', 'NetBeans', 'MySQL'],
        demo:        '',
        repo:        '',
        image:       '/assets/project-sipustaka.svg',
      },
    ],
    database: [
      {
        title:       'Vehicle Rental Database',
        description: '[PLACEHOLDER] Entity-Relationship Diagram and relational model for a vehicle rental business, including normalization and query design.',
        tech:        ['MySQL', 'ERD', 'Relational Model'],
        demo:        '',
        repo:        '',
        image:       '/assets/project-db.svg',
      },
      {
        title:       'SIMPUSDA SUMSEL — Requirements Specification',
        description: '[PLACEHOLDER] A software requirements specification document for the South Sumatra regional archive management system.',
        tech:        ['Requirements Engineering', 'SRS Document'],
        demo:        '',
        repo:        '',
        image:       '/assets/project-simpusda.svg',
      },
    ],
    business: [
      {
        title:       'MODELicious — Business Model Canvas',
        description: '[PLACEHOLDER] A technology-based entrepreneurship project: a smart wardrobe and outfit recommendation platform, presented using the Business Model Canvas framework.',
        tech:        ['Business Canvas', 'Entrepreneurship'],
        demo:        '',
        repo:        '',
        image:       '/assets/project-bmc.svg',
      },
    ],
    docs: [
      {
        image:   '/assets/doc-placeholder.svg',
        caption: "AFL WP'26 — Coaching Session",
        alt:     'Group coaching session at AFL WP 2026',
      },
      {
        image:   '/assets/doc-placeholder.svg',
        caption: 'AFL WP\'26 — Capacity Building MC',
        alt:     'MC moment at AFL Capacity Building 2026',
      },
      {
        image:   '/assets/doc-placeholder.svg',
        caption: 'AFL WP2025 — Delegate Activities',
        alt:     'Delegate activities at AFL WP 2025',
      },
    ],
    certs: [
      {
        image:  '/assets/cert-placeholder.svg',
        title:  '[PLACEHOLDER] Certificate 1',
        issuer: 'Issuer Name',
        year:   '2025',
        alt:    'Certificate placeholder 1',
      },
      {
        image:  '/assets/cert-placeholder.svg',
        title:  '[PLACEHOLDER] Certificate 2',
        issuer: 'Issuer Name',
        year:   '2025',
        alt:    'Certificate placeholder 2',
      },
    ],
  },

  socialLinks: [
    { label: 'Instagram', url: 'https://www.instagram.com/keisyarzkaa',       icon: 'instagram' },
    { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/keisya-rizkyka',   icon: 'linkedin' },
    { label: 'GitHub',    url: 'https://github.com/sharkei04',                 icon: 'github' },
    { label: 'Email',     url: 'mailto:keisyarizkyka04@gmail.com',             icon: 'mail' },
  ],
};
