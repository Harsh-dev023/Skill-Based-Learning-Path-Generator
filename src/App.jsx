import { useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import Home from './components/Home';
import Quiz from './components/Quiz';
import ScoreDisplay from './components/ScoreDisplay';
import CareerPaths from './components/CareerPaths';
import Roadmap from './components/Roadmap';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { evaluateSkills, generateRoadmap } from './services/api';
import { questions } from './data/questions';

/**
 * App Screens/States
 */
const SCREENS = {
    HOME: 'home',
    QUIZ: 'quiz',
    EVALUATING: 'evaluating',
    SCORE: 'score',
    CAREER: 'career',
    GENERATING: 'generating',
    ROADMAP: 'roadmap'
};

/**
 * Main App Component
 * Manages application state and screen navigation
 */
export default function App() {
    // Current screen/view
    const [screen, setScreen] = useState(SCREENS.HOME);

    // Quiz answers
    const [answers, setAnswers] = useState([]);

    // Skill evaluation result
    const [evaluation, setEvaluation] = useState(null);

    // Selected career path
    const [careerPath, setCareerPath] = useState(null);

    // Generated roadmap
    const [roadmap, setRoadmap] = useState(null);

    // Error state
    const [error, setError] = useState(null);

    // Loading message
    const [loadingMessage, setLoadingMessage] = useState('');

    /**
     * Start the quiz
     */
    const handleStartQuiz = () => {
        setScreen(SCREENS.QUIZ);
        setError(null);
    };

    /**
     * Handle quiz completion and evaluate skills
     */
    const handleQuizComplete = async (quizAnswers) => {
        setAnswers(quizAnswers);
        setScreen(SCREENS.EVALUATING);
        setLoadingMessage('Analyzing your skills with AI...');
        setError(null);

        try {
            const result = await evaluateSkills(quizAnswers, questions);
            setEvaluation(result);
            setScreen(SCREENS.SCORE);
        } catch (err) {
            console.error('Evaluation error:', err);
            setError(err.message || 'Failed to evaluate skills. Please try again.');
            setScreen(SCREENS.QUIZ);
        }
    };

    /**
     * Continue to career path selection
     */
    const handleContinueToCareer = () => {
        setScreen(SCREENS.CAREER);
        setError(null);
    };

    /**
     * Handle career path selection and generate roadmap
     */
    const handleCareerSelect = async (selectedPath) => {
        setCareerPath(selectedPath);
        setScreen(SCREENS.GENERATING);
        setLoadingMessage('Generating your personalized roadmap...');
        setError(null);

        try {
            const result = await generateRoadmap({
                score: evaluation.score,
                level: evaluation.level,
                strengths: evaluation.strengths || [],
                weaknesses: evaluation.weaknesses || [],
                careerPath: selectedPath
            });
            setRoadmap(result);
            setScreen(SCREENS.ROADMAP);
        } catch (err) {
            console.error('Roadmap generation error:', err);
            setError(err.message || 'Failed to generate roadmap. Please try again.');
            setScreen(SCREENS.CAREER);
        }
    };

    /**
     * Regenerate roadmap with same career path
     */
    const handleRegenerateRoadmap = async () => {
        if (!careerPath) return;
        await handleCareerSelect(careerPath);
    };

    /**
     * Go back to career selection
     */
    const handleBackToCareer = () => {
        setScreen(SCREENS.CAREER);
        setRoadmap(null);
        setError(null);
    };

    /**
     * Restart the entire process
     */
    const handleRestart = () => {
        setScreen(SCREENS.HOME);
        setAnswers([]);
        setEvaluation(null);
        setCareerPath(null);
        setRoadmap(null);
        setError(null);
    };

    /**
     * Dismiss error
     */
    const handleDismissError = () => {
        setError(null);
    };

    /**
     * Retry after error
     */
    const handleRetry = () => {
        if (screen === SCREENS.QUIZ && answers.length > 0) {
            handleQuizComplete(answers);
        } else if (screen === SCREENS.CAREER && careerPath) {
            handleCareerSelect(careerPath);
        } else {
            handleDismissError();
        }
    };

    /**
     * Render current screen
     */
    const renderScreen = () => {
        switch (screen) {
            case SCREENS.HOME:
                return <Home onStart={handleStartQuiz} />;

            case SCREENS.QUIZ:
                return <Quiz onComplete={handleQuizComplete} />;

            case SCREENS.EVALUATING:
            case SCREENS.GENERATING:
                return <Loading message={loadingMessage} />;

            case SCREENS.SCORE:
                return (
                    <ScoreDisplay
                        evaluation={evaluation}
                        onContinue={handleContinueToCareer}
                    />
                );

            case SCREENS.CAREER:
                return (
                    <CareerPaths
                        evaluation={evaluation}
                        onSelect={handleCareerSelect}
                    />
                );

            case SCREENS.ROADMAP:
                return (
                    <Roadmap
                        roadmap={roadmap}
                        careerPath={careerPath}
                        onRegenerate={handleRegenerateRoadmap}
                        onBack={handleBackToCareer}
                        onRestart={handleRestart}
                    />
                );

            default:
                return <Home onStart={handleStartQuiz} />;
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            {/* Dark mode toggle */}
            <DarkModeToggle />

            {/* Header/Restart button (shown after home screen) */}
            {screen !== SCREENS.HOME && (
                <header className="fixed top-4 left-4 z-50">
                    <button
                        onClick={handleRestart}
                        className="p-3 rounded-full glass hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        aria-label="Restart assessment"
                        title="Start over"
                    >
                        <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </button>
                </header>
            )}

            {/* Main content */}
            <main className="container mx-auto px-4 py-8 pt-16 md:pt-8">
                {/* Error message */}
                {error && (
                    <div className="max-w-3xl mx-auto mb-6">
                        <ErrorMessage
                            message={error}
                            onRetry={handleRetry}
                            onDismiss={handleDismissError}
                        />
                    </div>
                )}

                {/* Current screen */}
                {renderScreen()}
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>
                    Powered by AI • Built with React & Tailwind CSS
                </p>
            </footer>
        </div>
    );
}
