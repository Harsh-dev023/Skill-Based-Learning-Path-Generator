/**
 * Quiz questions for tech skill assessment
 * Mix of multiple-choice, yes/no, and open-ended questions
 */
export const questions = [
    {
        id: 1,
        type: 'multiple-choice',
        question: 'Which programming languages are you most comfortable with?',
        options: [
            'JavaScript / TypeScript',
            'Python',
            'Java / Kotlin',
            'C / C++',
            'Go / Rust',
            'None of the above'
        ],
        allowMultiple: true
    },
    {
        id: 2,
        type: 'multiple-choice',
        question: 'What tech stacks are you familiar with?',
        options: [
            'MERN (MongoDB, Express, React, Node)',
            'MEAN (MongoDB, Express, Angular, Node)',
            'LAMP (Linux, Apache, MySQL, PHP)',
            'Django / Flask (Python)',
            'Spring Boot (Java)',
            'None / Not sure'
        ],
        allowMultiple: true
    },
    {
        id: 3,
        type: 'yes-no',
        question: 'Do you understand what RESTful APIs are and how they work?'
    },
    {
        id: 4,
        type: 'open-ended',
        question: 'Briefly explain what a RESTful API is in your own words. (If unsure, type "I don\'t know")',
        placeholder: 'Explain RESTful APIs...'
    },
    {
        id: 5,
        type: 'multiple-choice',
        question: 'Which databases have you worked with?',
        options: [
            'MySQL / PostgreSQL',
            'MongoDB',
            'Redis',
            'Firebase / Firestore',
            'SQLite',
            'None'
        ],
        allowMultiple: true
    },
    {
        id: 6,
        type: 'yes-no',
        question: 'Are you familiar with version control systems like Git?'
    },
    {
        id: 7,
        type: 'multiple-choice',
        question: 'What is your experience level with Git?',
        options: [
            'Expert - branching, rebasing, conflict resolution',
            'Intermediate - commits, push, pull, basic branching',
            'Beginner - basic commits and push',
            'Never used it'
        ],
        allowMultiple: false
    },
    {
        id: 8,
        type: 'yes-no',
        question: 'Do you understand the concept of asynchronous programming (async/await, promises, callbacks)?'
    },
    {
        id: 9,
        type: 'open-ended',
        question: 'What frontend frameworks or libraries have you used? Describe your experience level.',
        placeholder: 'e.g., React (2 years), Vue (beginner)...'
    },
    {
        id: 10,
        type: 'multiple-choice',
        question: 'Which cloud platforms have you worked with?',
        options: [
            'AWS (Amazon Web Services)',
            'Google Cloud Platform (GCP)',
            'Microsoft Azure',
            'Heroku / Netlify / Vercel',
            'DigitalOcean',
            'None'
        ],
        allowMultiple: true
    },
    {
        id: 11,
        type: 'yes-no',
        question: 'Have you deployed a web application to production before?'
    },
    {
        id: 12,
        type: 'multiple-choice',
        question: 'What DevOps/CI-CD tools are you familiar with?',
        options: [
            'Docker',
            'Kubernetes',
            'GitHub Actions / GitLab CI',
            'Jenkins',
            'Terraform / Ansible',
            'None'
        ],
        allowMultiple: true
    },
    {
        id: 13,
        type: 'open-ended',
        question: 'Describe any personal or professional projects you\'ve built. What technologies did you use?',
        placeholder: 'Describe your projects...'
    },
    {
        id: 14,
        type: 'multiple-choice',
        question: 'How comfortable are you with data structures and algorithms?',
        options: [
            'Very comfortable - can solve complex problems',
            'Comfortable with basics - arrays, trees, sorting',
            'Learning - understand concepts but need practice',
            'Not familiar'
        ],
        allowMultiple: false
    },
    {
        id: 15,
        type: 'open-ended',
        question: 'What are your learning goals? What areas of tech would you like to improve or explore?',
        placeholder: 'Share your tech learning goals...'
    }
];

/**
 * Default career path suggestions based on skill assessment
 */
export const defaultCareerPaths = [
    {
        id: 'frontend',
        title: 'Frontend Developer',
        description: 'Build beautiful user interfaces with React, Vue, or Angular',
        icon: '🎨'
    },
    {
        id: 'backend',
        title: 'Backend Developer',
        description: 'Create robust APIs and server-side applications',
        icon: '⚙️'
    },
    {
        id: 'fullstack',
        title: 'Full-Stack Developer',
        description: 'Master both frontend and backend technologies',
        icon: '🚀'
    },
    {
        id: 'devops',
        title: 'DevOps Engineer',
        description: 'Automate deployments and manage cloud infrastructure',
        icon: '🔧'
    },
    {
        id: 'data',
        title: 'Data Engineer / Scientist',
        description: 'Work with data pipelines, ML models, and analytics',
        icon: '📊'
    }
];
