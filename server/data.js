const initialInstitutionsData = [
    {
    name: 'University of Cambridge',
    location: 'Cambridge, UK',
    imageUrl: 'https://images.unsplash.com/photo-1586792325319-3306d86016a3?q=80&w=400&h=300&fit=crop',
    description: 'A prestigious institution known for its rigorous academic programs and historic legacy.',
    region: 'Europe',
    applicationFee: 15000,
    details: {
      history: 'Founded in 1209, the University of Cambridge is a collegiate public research university in Cambridge, England. It is one of the world\'s oldest and most prestigious universities.',
      notableAlumni: ['Isaac Newton', 'Charles Darwin', 'Stephen Hawking', 'Alan Turing'],
      campusFacilities: ['Cambridge University Library', 'Fitzwilliam Museum', 'State-of-the-art science labs', 'Numerous sports grounds and boat houses'],
    },
    programs: [
      { 
        name: 'Masters in Business Administration', 
        type: 'Masters', 
        duration: '1 Year', 
        prerequisites: 'Bachelors Degree, GMAT/GRE', 
        applicationDeadline: 'March 15, 2025', 
        cost: { tuition: '£65,000 / year', livingExpenses: '£18,000 / year' },
        tags: ['Business', 'Management'],
        scholarships: [
          { name: 'Cambridge Trust Scholarship', amount: 'Full tuition coverage', description: 'For academically outstanding students with financial need.', eligibility: 'All international students are eligible to apply.', applicationDeadline: 'March 1, 2025', applicationFee: 5000 }
        ]
      },
      { name: 'Bachelors in Mathematics', type: 'Bachelors', duration: '3 Years', prerequisites: 'A-Levels in Mathematics and Further Mathematics', applicationDeadline: 'October 15, 2024', cost: { tuition: '£25,734 / year', livingExpenses: '£12,000 / year' }, tags: ['STEM', 'Mathematics'] },
      { name: 'Masters in Electrical Engineering', type: 'Masters', duration: '2 Years', prerequisites: 'Relevant Bachelors Degree', applicationDeadline: 'April 30, 2025', cost: { tuition: '£39,000 / year', livingExpenses: '£15,000 / year' }, tags: ['STEM', 'Engineering'] },
    ],
  },
  {
    name: 'Sorbonne University',
    location: 'Paris, France',
    imageUrl: 'https://images.unsplash.com/photo-1591544522864-8884399b3b27?q=80&w=400&h=300&fit=crop',
    description: 'A world-renowned university in the heart of Paris, offering a wide range of arts and humanities degrees.',
    region: 'Europe',
    applicationFee: 10000,
     details: {
      history: 'Established in 2018 by the merger of Paris-Sorbonne University and Pierre and Marie Curie University, its legacy dates back to the College de Sorbonne in 1257.',
      notableAlumni: ['Marie Curie', 'Pierre Curie', 'Simone de Beauvoir', 'Victor Hugo'],
      campusFacilities: ['Historic campus in the Latin Quarter', 'Jussieu campus science facilities', 'Extensive library network', 'Research institutes'],
    },
    programs: [
      { name: 'Bachelors in Art History', type: 'Bachelors', duration: '3 Years', prerequisites: 'High School Diploma, French Proficiency (B2)', applicationDeadline: 'January 17, 2025', cost: { tuition: '€170 / year (EU)', livingExpenses: '€15,000 / year' }, tags: ['Arts', 'Humanities'] },
      { 
        name: 'Masters in International Relations', 
        type: 'Masters', 
        duration: '2 Years', 
        prerequisites: 'Bachelors Degree in a related field', 
        applicationDeadline: 'February 28, 2025', 
        cost: { tuition: '€243 / year (EU)', livingExpenses: '€15,000 / year' }, 
        tags: ['Politics', 'Social Science'],
        scholarships: [
          { name: 'Eiffel Excellence Scholarship', amount: '€1,181 monthly stipend', description: 'For outstanding international students.', eligibility: 'Non-French nationals under 30.', applicationDeadline: 'January 10, 2025' }
        ] 
      },
      { name: 'Advanced Course in French Literature', type: 'Course', duration: '6 Months', prerequisites: 'Advanced French proficiency', applicationDeadline: 'Rolling admissions', cost: { tuition: '€3,500 / course', livingExpenses: '€7,000 / 6 months' }, tags: ['Language', 'Literature', 'Arts'] },
    ],
  },
    {
    name: 'University of Toronto',
    location: 'Toronto, Canada',
    imageUrl: 'https://images.unsplash.com/photo-1598471325983-50479383815b?q=80&w=400&h=300&fit=crop',
    description: 'Canada\'s leading institution of learning, discovery and knowledge creation.',
    region: 'North America',
    applicationFee: 18000,
    details: {
      history: 'Founded in 1827, the University of Toronto has evolved into a multicultural community of students and faculty from around the globe.',
      notableAlumni: ['Lester B. Pearson', 'Margaret Atwood', 'Frederick Banting'],
      campusFacilities: ['Robarts Library', 'Hart House', 'State-of-the-art athletic facilities', 'Medical Sciences Building'],
    },
    programs: [
      { name: 'Bachelors in Computer Science', type: 'Bachelors', duration: '4 Years', prerequisites: 'High School Diploma, Calculus', applicationDeadline: 'January 15, 2025', cost: { tuition: 'PKR 12,000,000 / year', livingExpenses: 'PKR 3,500,000 / year' }, tags: ['STEM', 'Technology', 'Coding'] },
      { name: 'Masters in Public Health', type: 'Masters', duration: '2 Years', prerequisites: 'Bachelors Degree', applicationDeadline: 'December 1, 2024', cost: { tuition: 'PKR 9,000,000 / year', livingExpenses: 'PKR 4,000,000 / year' }, tags: ['Health', 'Social Science'] },
    ],
  },
  {
    name: 'Stanford University',
    location: 'Stanford, USA',
    imageUrl: 'https://images.unsplash.com/photo-1542295286-905a3064d8a2?q=80&w=400&h=300&fit=crop',
    description: 'A place for learning, discovery, innovation, expression and discourse.',
    region: 'North America',
    applicationFee: 25000,
    details: {
      history: 'Opened in 1891, Stanford University was founded by Leland and Jane Stanford in memory of their only child, Leland Stanford Jr.',
      notableAlumni: ['Larry Page', 'Sergey Brin', 'Reese Witherspoon', 'Tiger Woods'],
      campusFacilities: ['Hoover Tower', 'Cantor Arts Center', 'SLAC National Accelerator Laboratory', 'Vast campus with extensive sports facilities'],
    },
    programs: [
      { name: 'MS in Computer Science', type: 'Masters', duration: '2 Years', prerequisites: 'Bachelors Degree in CS or related field, GRE', applicationDeadline: 'December 5, 2024', cost: { tuition: 'PKR 17,000,000 / year', livingExpenses: 'PKR 7,000,000 / year' }, tags: ['STEM', 'Technology', 'AI'],
        scholarships: [
          { name: 'Knight-Hennessy Scholarship', amount: 'Full funding', description: 'Multidisciplinary community of scholars.', eligibility: 'Bachelors degree within the last 7 years.' }
        ]
      },
      { name: 'MBA', type: 'Masters', duration: '2 Years', prerequisites: 'Bachelors Degree, GMAT/GRE, Work experience', applicationDeadline: 'April 8, 2025', cost: { tuition: 'PKR 21,000,000 / year', livingExpenses: 'PKR 8,000,000 / year' }, tags: ['Business', 'Management'] },
    ],
  },
  {
    name: 'University of Melbourne',
    location: 'Melbourne, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1616895066373-324503b879a9?q=80&w=400&h=300&fit=crop',
    description: 'A public-spirited institution that makes distinctive contributions to society in research, learning and teaching and engagement.',
    region: 'Australia',
    applicationFee: 16000,
    details: {
      history: 'Established in 1853, it is Australia\'s second oldest university and the oldest in Victoria.',
      notableAlumni: ['Julia Gillard', 'Cate Blanchett', 'Germaine Greer'],
      campusFacilities: ['Baillieu Library', 'Ian Potter Museum of Art', 'Melbourne Theatre Company', 'Advanced research institutes'],
    },
    programs: [
      { name: 'Juris Doctor (Law)', type: 'Masters', duration: '3 Years', prerequisites: 'Bachelors Degree, LSAT', applicationDeadline: 'September 30, 2024', cost: { tuition: 'PKR 7,500,000 / year', livingExpenses: 'PKR 4,000,000 / year' }, tags: ['Law', 'Humanities'] },
      { name: 'Bachelor of Fine Arts', type: 'Bachelors', duration: '3 Years', prerequisites: 'Portfolio, Interview', applicationDeadline: 'October 31, 2024', cost: { tuition: 'PKR 5,500,000 / year', livingExpenses: 'PKR 4,000,000 / year' }, tags: ['Arts', 'Creative'] },
    ],
  },
  {
    name: 'LUMS',
    location: 'Lahore, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1627546513723-52906806a55b?q=80&w=400&h=300&fit=crop',
    description: 'Lahore University of Management Sciences is a premier institution for business and liberal arts.',
    region: 'Asia',
    applicationFee: 8000,
    details: {
      history: 'Founded in 1984 through a partnership between the private sector and the Government of Pakistan. It has since become one of South Asia\'s leading universities.',
      notableAlumni: ['Hina Rabbani Khar', 'Haroon Sheikh', 'Umar Saif'],
      campusFacilities: ['Modern 100-acre campus', 'State-of-the-art library', 'On-campus housing for students and faculty', 'Comprehensive sports complex'],
    },
    programs: [
      { name: 'BSc (Honours) in Economics', type: 'Bachelors', duration: '4 Years', prerequisites: 'Intermediate/A-Levels, Admission Test', applicationDeadline: 'February 5, 2025', cost: { tuition: 'PKR 1,200,000 / year', livingExpenses: 'PKR 400,000 / year' }, tags: ['Business', 'Economics'] },
      { 
        name: 'MBA', 
        type: 'Masters', 
        duration: '2 Years', 
        prerequisites: 'Bachelors Degree, Work Experience, GMAT/GRE', 
        applicationDeadline: 'April 10, 2025', 
        cost: { tuition: 'PKR 1,500,000 / year', livingExpenses: 'PKR 500,000 / year' }, 
        tags: ['Business', 'Management'],
        scholarships: [
          { name: 'MCB Bank Scholarship', amount: '50% tuition waiver', description: 'Merit-based scholarship for MBA students.', eligibility: 'Top 10% of admitted students.', applicationFee: 2000 }
        ] 
      },
      { name: 'PhD Management', type: 'Masters', duration: '4-5 Years', prerequisites: 'Masters Degree in a relevant field', applicationDeadline: 'March 20, 2025', cost: { tuition: 'PKR 800,000 / year', livingExpenses: 'PKR 400,000 / year' }, tags: ['Business', 'Research'] },
    ],
  },
  {
    name: 'IBA Karachi',
    location: 'Karachi, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-5207e3abb328?q=80&w=400&h=300&fit=crop',
    description: 'The Institute of Business Administration is one of the oldest and most respected business schools in Pakistan.',
    region: 'Asia',
    applicationFee: 6000,
    details: {
      history: 'Established in 1955 as a business school with help from the Wharton School of the University of Pennsylvania. It is the oldest graduate business school in Pakistan.',
      notableAlumni: ['Mamnoon Hussain (Former President of Pakistan)', 'Shaukat Aziz (Former Prime Minister of Pakistan)', 'Asad Umar'],
      campusFacilities: ['Two modern campuses (Main and City)', 'Extensive digital and physical library resources', 'Auditoriums and event spaces', 'Student centers'],
    },
    programs: [
      { 
        name: 'BBA', 
        type: 'Bachelors', 
        duration: '4 Years', 
        prerequisites: 'Intermediate/A-Levels, Aptitude Test', 
        applicationDeadline: 'January 30, 2025', 
        cost: { tuition: 'PKR 950,000 / year', livingExpenses: 'PKR 350,000 / year' }, 
        tags: ['Business', 'Management'],
        scholarships: [
          { name: 'IBA National Talent Hunt Program', amount: 'Full tuition waiver + stipend', description: 'For talented students from less privileged areas of Pakistan.', eligibility: 'Based on merit and demonstrated financial need.' }
        ]
      },
      { name: 'MSc Computer Science', type: 'Masters', duration: '2 Years', prerequisites: 'Bachelors in CS or related field', applicationDeadline: 'June 1, 2025', cost: { tuition: 'PKR 1,100,000 / year', livingExpenses: 'PKR 350,000 / year' }, tags: ['STEM', 'Technology', 'Coding'] },
      { name: 'Bachelors in Accounting & Finance', type: 'Bachelors', duration: '4 Years', prerequisites: 'Intermediate/A-Levels, Aptitude Test', applicationDeadline: 'January 30, 2025', cost: { tuition: 'PKR 950,000 / year', livingExpenses: 'PKR 350,000 / year' }, tags: ['Business', 'Finance'] },
    ],
  },
  {
    name: 'NUST',
    location: 'Islamabad, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&h=300&fit=crop',
    description: 'The National University of Sciences and Technology is a leading public research university.',
    region: 'Asia',
    applicationFee: 5000,
    details: {
      history: 'Established in March 1991, NUST was granted Charter in 1993. It has since developed into a leading comprehensive university, recognized for the quality of its teaching and research.',
      notableAlumni: ['Dr. Samar Mubarakmand', 'Arfa Karim (Youngest Microsoft Certified Professional)', 'Various leaders in military and technology sectors'],
      campusFacilities: ['Purpose-built main campus in Islamabad (H-12)', 'Advanced engineering and IT laboratories', 'A large central library', 'On-campus accommodation and sports facilities'],
    },
    programs: [
      { 
        name: 'Bachelors in Mechanical Engineering', 
        type: 'Bachelors', 
        duration: '4 Years', 
        prerequisites: 'FSc (Pre-Engineering)/A-Levels, NET exam', 
        applicationDeadline: 'July 15, 2025', 
        cost: { tuition: 'PKR 450,000 / year', livingExpenses: 'PKR 250,000 / year' },
        tags: ['STEM', 'Engineering'],
        scholarships: [
          { name: 'Dawood Foundation Scholarship', amount: '50% tuition waiver', description: 'Merit-based scholarship for engineering students.', eligibility: 'Top 5% of students in the engineering faculty are eligible.', applicationDeadline: 'June 30, 2025', applicationFee: 1500 },
          { name: 'NUST Need-Based Scholarship', amount: 'Varies', description: 'Financial assistance for students who cannot afford the full tuition fees.', eligibility: 'Based on demonstrated financial need.' }
        ] 
      },
      { name: 'Masters in Information Technology', type: 'Masters', duration: '2 Years', prerequisites: 'Relevant Bachelors Degree, GAT exam', applicationDeadline: 'June 30, 2025', cost: { tuition: 'PKR 500,000 / year', livingExpenses: 'PKR 250,000 / year' }, tags: ['STEM', 'Technology'] },
      { name: 'Bachelors in Software Engineering', type: 'Bachelors', duration: '4 Years', prerequisites: 'FSc (Pre-Engineering)/A-Levels, NET exam', applicationDeadline: 'July 15, 2025', cost: { tuition: 'PKR 450,000 / year', livingExpenses: 'PKR 250,000 / year' }, tags: ['STEM', 'Technology', 'Coding'] },
    ],
  },
  {
    name: 'Purse Education Institute',
    location: 'Global Online',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&h=300&fit=crop',
    description: 'Specializing in language and elite sports certification programs for a global audience.',
    region: 'Online',
    applicationFee: 2000,
    details: {
      history: 'A modern online institution founded in 2015 to provide flexible, high-quality certification programs to students and professionals worldwide.',
      notableAlumni: ['Focuses on professional certification; alumni network includes certified professionals across many industries.'],
      campusFacilities: ['Global online learning platform', 'Virtual labs for interactive sessions', 'Digital resource library with 24/7 access', 'Personalized student support portals'],
    },
    programs: [
      { 
        name: 'Spanish Language Certification', 
        type: 'Course', 
        duration: '3 Months', 
        prerequisites: 'None', 
        applicationDeadline: 'Rolling admissions', 
        cost: { tuition: '$1,200 / course', livingExpenses: 'N/A (Online)' }, 
        tags: ['Language'],
        scholarships: [
          { name: 'Early Bird Discount', amount: '20% off tuition', description: 'For students who enroll 30 days before the course start date.', eligibility: 'All students are eligible.' }
        ] 
      },
      { name: 'Football Certification Program', type: 'Course', duration: '6 Months', prerequisites: 'Basic physical fitness', applicationDeadline: 'August 1, 2025', cost: { tuition: '$5,000 / program', livingExpenses: 'Varies by location' }, tags: ['Sports', 'Football', 'Training'] },
      { name: 'Elite Football Training Certification', type: 'Course', duration: '6 Months', prerequisites: 'Requires basic athletic assessment', applicationDeadline: 'August 1, 2025', cost: { tuition: 'PKR 800,000 / program', livingExpenses: 'Varies by location' }, tags: ['Sports', 'Football', 'Training'] },
      { name: 'Cricket Development Program', type: 'Course', duration: '4 Months', prerequisites: 'Previous cricket experience recommended', applicationDeadline: 'September 1, 2025', cost: { tuition: '$4,500 / program', livingExpenses: 'Varies by location' }, tags: ['Sports', 'Cricket', 'Training'] },
    ],
  },
];

module.exports = { initialInstitutionsData };
