# Skill-Based Learning Path Generator

A React single-page application that helps users assess their tech skills, get a score out of 100, and receive a personalized learning roadmap powered by AI.

## Features

- 📝 **Skill Assessment Quiz**: 15 questions covering programming languages, frameworks, databases, DevOps, and more
- 📊 **AI-Powered Scoring**: Get a skill score out of 100 with detailed strengths and weaknesses breakdown
- 🎯 **Career Path Suggestions**: Receive personalized career path recommendations based on your skills
- 🗺️ **Custom Roadmaps**: Generate step-by-step learning roadmaps with resources, projects, and timelines
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Mobile Responsive**: Fully responsive design optimized for all screen sizes

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **Axios** for API calls
- **OpenRouter API** (Claude 3.5 Sonnet) for AI features

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai))

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment to Netlify

1. **Push to GitHub**:
   Commit and push your code to a GitHub repository.

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "New site from Git"
   - Select your repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   (These are already configured in `netlify.toml`)

4. **Add environment variable**:
   - Go to Site settings > Environment variables
   - Add `VITE_OPENROUTER_API_KEY` with your OpenRouter API key

5. **Deploy**:
   Netlify will automatically build and deploy your site.

## Project Structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CareerPaths.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Home.jsx
│   │   ├── Loading.jsx
│   │   ├── Quiz.jsx
│   │   ├── Roadmap.jsx
│   │   └── ScoreDisplay.jsx
│   ├── data/
│   │   └── questions.js
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENROUTER_API_KEY` | Your OpenRouter API key for AI features |

## License

MIT License - feel free to use this project for your own purposes.
