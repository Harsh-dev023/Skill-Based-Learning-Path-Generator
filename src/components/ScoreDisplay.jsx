import { useEffect, useState } from 'react';

/**
 * ScoreDisplay Component
 * Shows skill evaluation results with animated score reveal
 */
export default function ScoreDisplay({ evaluation, onContinue }) {
    const [displayScore, setDisplayScore] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    // Animate score counting up
    useEffect(() => {
        const target = evaluation.score;
        const duration = 1500; // 1.5 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setDisplayScore(target);
                clearInterval(timer);
                // Show details after score animation
                setTimeout(() => setShowDetails(true), 300);
            } else {
                setDisplayScore(Math.round(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [evaluation.score]);

    // Get score color based on level
    const getScoreColor = () => {
        if (evaluation.score >= 80) return 'text-green-500';
        if (evaluation.score >= 60) return 'text-primary-500';
        if (evaluation.score >= 40) return 'text-yellow-500';
        return 'text-orange-500';
    };

    // Get level badge color
    const getLevelBadge = () => {
        const colors = {
            'Expert': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
            'Advanced': 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
            'Intermediate': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
            'Beginner': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
        };
        return colors[evaluation.level] || colors['Beginner'];
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-6 animate-fade-in">
            {/* Score circle */}
            <div className="text-center mb-8">
                <div className="relative inline-block">
                    {/* Background ring */}
                    <svg className="w-48 h-48 md:w-56 md:h-56 transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-slate-200 dark:text-slate-700"
                        />
                        <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(displayScore / 100) * 283} 283`}
                            className="transition-all duration-300"
                        />
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0ea5e9" />
                                <stop offset="100%" stopColor="#d946ef" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Score number */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-5xl md:text-6xl font-bold ${getScoreColor()}`}>
                            {displayScore}
                        </span>
                        <span className="text-xl text-slate-500 dark:text-slate-400">/100</span>
                    </div>
                </div>

                {/* Level badge */}
                <div className="mt-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getLevelBadge()}`}>
                        {evaluation.level} Level
                    </span>
                </div>

                {/* Summary */}
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                    {evaluation.summary}
                </p>
            </div>

            {/* Details section - animated reveal */}
            <div className={`transition-all duration-500 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {/* Strengths and Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Strengths */}
                    <div className="card border-l-4 border-green-500">
                        <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Your Strengths
                        </h3>
                        <ul className="space-y-2">
                            {evaluation.strengths?.map((strength, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                    <span className="text-green-500 mt-1">•</span>
                                    {strength}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="card border-l-4 border-orange-500">
                        <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Areas to Improve
                        </h3>
                        <ul className="space-y-2">
                            {evaluation.weaknesses?.map((weakness, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                    <span className="text-orange-500 mt-1">•</span>
                                    {weakness}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Continue button */}
                <div className="text-center">
                    <button
                        onClick={onContinue}
                        className="btn-primary text-lg px-8 py-4 group"
                        aria-label="Continue to career path selection"
                    >
                        <span className="flex items-center gap-2">
                            Choose Your Career Path
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
