// All site content lives here. Edit these values to change what the page shows.
// Icons are simple line drawings on a 24x24 grid. No official brand logos are used.

// Your links. Every GitHub / email link on the page reads from here.
export const links = {
  github: 'https://github.com/neilaf04',
  email: 'neila.f04@gmail.com',
}

// Helper: turns a circle into SVG path data so every icon is just a list of paths.
const circle = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`
const ellipse = 'M2 12a10 4 0 1 0 20 0a10 4 0 1 0-20 0'

// icons: name -> list of paths. A path is a string, or { d, t } where t is an SVG transform.
export const icons = {
  ml: [circle(5, 6, 2), circle(5, 18, 2), circle(19, 12, 2), 'M7 6.8l10 4.4', 'M7 17.2l10-4.4', 'M5 8v8'],
  chart: ['M3 3v18h18', 'M7 15l4-5 3 3 5-6'],
  cloud: ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
  dashboard: ['M3 3h7v9H3z', 'M14 3h7v5h-7z', 'M14 12h7v9h-7z', 'M3 16h7v5H3z'],
  layers: ['M12 2 2 7l10 5 10-5-10-5Z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M11 18h2'],
  gamepad: [
    'M6 11h4', 'M8 9v4', 'M15 12h.01', 'M18 10h.01',
    'M17.3 5H6.7a4 4 0 0 0-3.98 3.6L2 16a3 3 0 0 0 5.4 1.8L9 16h6l1.6 1.8A3 3 0 0 0 22 16l-.72-7.4A4 4 0 0 0 17.3 5Z',
  ],
  brush: [
    'M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z',
    'M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7',
  ],
  terminal: ['m4 17 6-6-6-6', 'M12 19h8'],
  database: [
    'M3 5c0-1.66 4-3 9-3s9 1.34 9 3-4 3-9 3-9-1.34-9-3Z',
    'M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5',
    'M3 12c0 1.66 4 3 9 3s9-1.34 9-3',
  ],
  braces: [
    'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1',
    'M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1',
  ],
  atom: [circle(12, 12, 1), ellipse, { d: ellipse, t: 'rotate(60 12 12)' }, { d: ellipse, t: 'rotate(120 12 12)' }],
  cpu: ['M6 6h12v12H6z', 'M9.5 9.5h5v5h-5z', 'M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4'],
  layout: ['M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z', 'M3 9h18', 'M9 21V9'],
  github: [
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    'M9 18c-4.51 2-5-2-7-2',
  ],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'm22 6-10 7L2 6'],
  grad: ['M22 10 12 5 2 10l10 5 10-5Z', 'M6 12v5c3 3 9 3 12 0v-5'],
  target: [circle(12, 12, 10), circle(12, 12, 6), circle(12, 12, 2)],
  briefcase: [
    'M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z',
    'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
  ],
  compass: [circle(12, 12, 10), 'm16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z'],
  seal: [circle(12, 9, 6), 'm9.5 9 1.7 1.7L14.5 7.5', 'M8.5 14 7 22l5-3 5 3-1.5-8'],
  arrow: ['M5 12h14', 'm12 5 7 7-7 7'],
  external: ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  copy: ['M9 9h11v11H9z', 'M5 15H4V4h11v1'],
  check: ['M20 6 9 17l-5-5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M18 6 6 18', 'm6 6 12 12'],
}

// fields: the eight glass cards orbiting the N in the hero.
//   area – which project filter opens when the card is clicked (see `filters`)
export const fields = [
  { label: 'Machine Learning', icon: 'ml', area: 'data' },
  { label: 'Data Analytics', icon: 'chart', area: 'data' },
  { label: 'Cloud & AWS', icon: 'cloud', area: 'software' },
  { label: 'BI & Qlik', icon: 'dashboard', area: 'data' },
  { label: 'Software Architecture', icon: 'layers', area: 'software' },
  { label: 'Mobile App Development', icon: 'phone', area: 'software' },
  { label: 'Game Design & Unity', icon: 'gamepad', area: 'all' },
  { label: 'Digital Art & Character Design', icon: 'brush', area: 'all' },
]

// facts: the four small cards in the About section.
export const facts = [
  {
    title: 'Education',
    icon: 'grad',
    text: 'BSc Software & Data Engineering. Algorithms, databases, distributed systems and statistics.',
    meta: ['Singidunum University · 2023 –', 'Thomas More · 2025 – 2026'],
  },
  {
    title: 'Focus',
    icon: 'target',
    text: 'Reliable data pipelines, clear dashboards and models that make it out of the notebook.',
    meta: 'Data · ML · Cloud',
  },
  {
    title: 'Experience',
    icon: 'briefcase',
    text: 'Course projects, hackathons and freelance design across web, mobile and game development.',
    meta: 'Projects · Hackathons · Freelance',
  },
  {
    title: 'Goals',
    icon: 'compass',
    text: 'A data or software engineering internship, then a career building large-scale data platforms.',
    meta: 'Open to internships',
  },
]

// skillGroups: the four panels in Skills & Technologies.
//   detail – the specifics you would want a recruiter to see
export const skillGroups = [
  {
    title: 'Languages & Web',
    skills: [
      { name: 'Python', icon: 'terminal', detail: 'Pandas, NumPy, scikit-learn, scripting' },
      { name: 'SQL', icon: 'database', detail: 'Joins, window functions, data modelling' },
      { name: 'JavaScript', icon: 'braces', detail: 'Modern ES, async, the DOM' },
      { name: 'React', icon: 'atom', detail: 'Hooks, components, Vite' },
    ],
  },
  {
    title: 'Data & AI',
    skills: [
      { name: 'Machine Learning', icon: 'ml', detail: 'Classification, regression, model evaluation' },
      { name: 'Data Analytics', icon: 'chart', detail: 'EDA, statistics, visual storytelling' },
      { name: 'Qlik', icon: 'dashboard', detail: 'Qlik Sense apps, load scripts, set analysis' },
      { name: 'IBM Tools', icon: 'cpu', detail: 'Watson Studio, Cognos Analytics, Db2' },
    ],
  },
  {
    title: 'Cloud & Engineering',
    skills: [
      { name: 'AWS', icon: 'cloud', detail: 'Lambda, S3, EC2, Athena, IAM' },
      { name: 'Software Architecture', icon: 'layers', detail: 'Layered and event-driven design, UML' },
      { name: 'Mobile Development', icon: 'phone', detail: 'Flutter, React Native' },
    ],
  },
  {
    title: 'Creative Technology',
    skills: [
      { name: 'Unity', icon: 'gamepad', detail: 'C#, 2D gameplay, rapid prototyping' },
      { name: 'UI / UX', icon: 'layout', detail: 'Figma, wireframes, user flows' },
      { name: 'Digital Art', icon: 'brush', detail: 'Character design, Procreate' },
    ],
  },
]

// filters: the chips above the project grid. `id` matches a project's `area`.
export const filters = [
  { id: 'all', label: 'All work' },
  { id: 'data', label: 'Data & ML' },
  { id: 'software', label: 'Software & Cloud' },
]

// projects: the cards in Featured Projects.
//   thumb – key of the thumbnail drawing in Thumbs.jsx
//   link / github – replace '#' with real URLs
export const projects = [
  {
    title: 'F1 Team Manager',
    category: 'Full-Stack Web App',
    area: 'software',
    description: 'A full-stack app for managing Formula 1 teams and drivers. A React front end talks to an Express REST API over a relational SQLite schema where each team has many drivers. Built as the final project for the ITWS course.',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'SQLite'],
    thumb: 'teams',
    link: 'https://github.com/neilaf04/ITWS-F1-Team-Manager#readme',
    github: 'https://github.com/neilaf04/ITWS-F1-Team-Manager',
  },
  {
    title: 'ML Forecasting on AWS',
    category: 'Machine Learning',
    area: 'data',
    description: 'A team project with two regression models: one predicts house prices and the other forecasts electricity demand. We went from EDA and cleaning to tuned PyCaret and LightGBM models, then served both through a Dockerised FastAPI backend with a React front end.',
    tags: ['Python', 'PyCaret', 'LightGBM', 'FastAPI', 'Docker', 'AWS'],
    thumb: 'network',
    link: 'https://github.com/Jfgm299/Machine_Learning_AWS#readme',
    github: 'https://github.com/Jfgm299/Machine_Learning_AWS',
  },
  {
    title: 'Lights Out',
    category: 'Android App',
    area: 'software',
    description: 'An Android app for Formula 1 fans that shows live driver and constructor standings and the season calendar from the Jolpica F1 API. You can pin a favourite driver, team and Grand Prix to the home screen, and the app saves them on the device.',
    tags: ['Java', 'Android', 'Volley', 'Material Components'],
    thumb: 'phone',
    link: 'https://github.com/neilaf04/Lights-Out#readme',
    github: 'https://github.com/neilaf04/Lights-Out',
  },
]

// certs: the cards in Certifications.
//   mark  – short provider wordmark shown on the card
//   tone  – colour of that wordmark
export const certs = [
  { name: 'AWS Academy Graduate: Data Engineering', issuer: 'AWS Academy · 40 hours', mark: 'aws', tone: '#ff9f2e', year: 'Feb 2026', link: 'https://www.credly.com/go/NLBHZa6b' },
  { name: 'Games & Development', issuer: 'Unity', mark: 'unity', tone: '#e8e8f2', year: '2024', link: '#' },
  { name: 'Software Architecture', issuer: 'IBM', mark: 'IBM', tone: '#6ea4ff', year: '2025', link: '#' },
]
