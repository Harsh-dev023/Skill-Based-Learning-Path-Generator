import { useState } from 'react';
import { defaultCareerPaths } from '../data/questions';

/**
 * CareerPaths Component
 * Displays career path options based on skill evaluation
 */
export default function CareerPaths({ evaluation, onSelect }) {
    const [selectedPath, setSelectedPath] = useState(null);
    const [customPath, setCustomPath] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);

    // Use AI-recommended paths if available, otherwise default
    const careerPaths = evaluation.recommendedCareerPaths?.length > 0
        ? evaluation.recommendedCareerPaths
        : defaultCareerPaths;

    const handlePathSelect = (path) => {
        setSelectedPath(path);
        setShowCustomInput(false);
    };

    const handleCustomSelect = () => {
        setSelectedPath(null);
        setShowCustomInput(true);
    };

    const handleConfirm = () => {
        if (showCustomInput && customPath.trim()) {
            onSelect({
                id: 'custom',
                title: customPath.trim(),
                description: 'Custom career path',
                icon: '✨'
            });
        } else if (selectedPath) {
            onSelect(selectedPath);
        }
    };

    const canConfirm = selectedPath || (showCustomInput && customPath.trim());

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">
                    Choose Your <span className="gradient-text">Career Path</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                    Based on your skill assessment, here are some career paths that might be a great fit for you.
                    Select one to get a personalized learning roadmap.
                </p>
            </div>

            {/* Career path cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {careerPaths.map((path) => (
                    <button
                        key={path.id}
                        onClick={() => handlePathSelect(path)}
                        className={`card-interactive text-left p-5 
              ${selectedPath?.id === path.id ? 'card-selected' : ''}
            `}
                        aria-pressed={selectedPath?.id === path.id}
                    >
                        {/* Icon */}
                        <div className="text-4xl mb-3">{path.icon}</div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                            {path.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {path.description}
                        </p>

                        {/* Selected indicator */}
                        {selectedPath?.id === path.id && (
                            <div className="absolute top-3 right-3">
                                <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}

                {/* Other/Custom option */}
                <button
                    onClick={handleCustomSelect}
                    className={`card-interactive text-left p-5 border-dashed
            ${showCustomInput ? 'card-selected' : ''}
          `}
                    aria-pressed={showCustomInput}
                >
                    <div className="text-4xl mb-3">🎯</div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                        Other Path
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Have a different career goal in mind? Enter your own path.
                    </p>
                </button>
            </div>

            {/* Custom input field */}
            {showCustomInput && (
                <div className="card mb-6 animate-slide-up">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Enter your desired career path:
                    </label>
                    <input
                        type="text"
                        value={customPath}
                        onChange={(e) => setCustomPath(e.target.value)}
                        placeholder="e.g., Machine Learning Engineer, Mobile Developer..."
                        className="input-field"
                        aria-label="Custom career path"
                    />
                </div>
            )}

            {/* Confirm button */}
            <div className="text-center">
                <button
                    onClick={handleConfirm}
                    disabled={!canConfirm}
                    className="btn-primary text-lg px-8 py-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Generate learning roadmap for selected career path"
                >
                    <span className="flex items-center gap-2">
                        Generate My Roadmap
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </button>

                {!canConfirm && (
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        Please select a career path to continue
                    </p>
                )}
            </div>
        </div>
    );
}
