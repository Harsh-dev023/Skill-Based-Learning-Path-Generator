import { useState } from 'react';
import { questions } from '../data/questions';

/**
 * Quiz Component
 * Displays skill assessment questions with progress tracking
 */
export default function Quiz({ onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestion === questions.length - 1;

    // Handle answer change for different question types
    const handleAnswerChange = (value) => {
        const newAnswers = [...answers];

        if (question.type === 'multiple-choice' && question.allowMultiple) {
            // Toggle selection for multiple choice
            const current = newAnswers[currentQuestion] || [];
            if (current.includes(value)) {
                newAnswers[currentQuestion] = current.filter(v => v !== value);
            } else {
                newAnswers[currentQuestion] = [...current, value];
            }
        } else {
            newAnswers[currentQuestion] = value;
        }

        setAnswers(newAnswers);
    };

    // Handle "I don't know" option
    const handleDontKnow = () => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = "I don't know";
        setAnswers(newAnswers);
    };

    // Navigate to next question
    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    // Navigate to previous question
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    // Submit quiz
    const handleSubmit = () => {
        onComplete(answers);
    };

    // Get current answer
    const currentAnswer = answers[currentQuestion];
    const isDontKnow = currentAnswer === "I don't know";

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-6 animate-fade-in">
            {/* Progress section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {Math.round(progress)}% Complete
                    </span>
                </div>
                <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Question card */}
            <div className="card mb-6">
                {/* Question type badge */}
                <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
            ${question.type === 'open-ended'
                            ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300'
                            : question.type === 'yes-no'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        }`}>
                        {question.type === 'open-ended' ? 'Open-ended' :
                            question.type === 'yes-no' ? 'Yes/No' :
                                question.allowMultiple ? 'Select all that apply' : 'Single choice'}
                    </span>
                </div>

                {/* Question text */}
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white mb-6">
                    {question.question}
                </h2>

                {/* Answer options based on question type */}
                <div className="space-y-3">
                    {question.type === 'multiple-choice' && (
                        <>
                            {question.options.map((option, idx) => {
                                const isSelected = question.allowMultiple
                                    ? (currentAnswer || []).includes(option)
                                    : currentAnswer === option;

                                return (
                                    <label
                                        key={idx}
                                        className={`radio-label ${isSelected ? 'selected' : ''} ${isDontKnow ? 'opacity-50' : ''}`}
                                    >
                                        <input
                                            type={question.allowMultiple ? 'checkbox' : 'radio'}
                                            name={`question-${question.id}`}
                                            value={option}
                                            checked={isSelected}
                                            onChange={() => handleAnswerChange(option)}
                                            disabled={isDontKnow}
                                            className="w-5 h-5 text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                                        />
                                        <span className="text-slate-700 dark:text-slate-200">{option}</span>
                                    </label>
                                );
                            })}
                        </>
                    )}

                    {question.type === 'yes-no' && (
                        <div className="flex gap-4 flex-wrap">
                            {['Yes', 'No'].map((option) => {
                                const isSelected = currentAnswer === (option === 'Yes');
                                return (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswerChange(option === 'Yes')}
                                        disabled={isDontKnow}
                                        className={`flex-1 min-w-[120px] py-4 px-6 rounded-xl font-medium transition-all
                      ${isSelected
                                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                                                : 'bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700'
                                            }
                      ${isDontKnow ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                                        aria-pressed={isSelected}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {question.type === 'open-ended' && (
                        <textarea
                            value={isDontKnow ? '' : (currentAnswer || '')}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            placeholder={question.placeholder || 'Type your answer here...'}
                            disabled={isDontKnow}
                            className={`textarea-field ${isDontKnow ? 'opacity-50' : ''}`}
                            rows={4}
                            aria-label="Your answer"
                        />
                    )}
                </div>

                {/* "I don't know" option */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <label className={`radio-label ${isDontKnow ? 'selected' : ''}`}>
                        <input
                            type="checkbox"
                            checked={isDontKnow}
                            onChange={() => {
                                if (isDontKnow) {
                                    // Uncheck - clear answer
                                    const newAnswers = [...answers];
                                    newAnswers[currentQuestion] = null;
                                    setAnswers(newAnswers);
                                } else {
                                    handleDontKnow();
                                }
                            }}
                            className="w-5 h-5 text-slate-500 focus:ring-slate-400 border-slate-300 dark:border-slate-600 rounded"
                        />
                        <span className="text-slate-600 dark:text-slate-400 italic">I don't know / Skip this question</span>
                    </label>
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="btn-outline order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Go to previous question"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Previous
                    </span>
                </button>

                {isLastQuestion ? (
                    <button
                        onClick={handleSubmit}
                        className="btn-secondary order-1 sm:order-2"
                        aria-label="Submit quiz for evaluation"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Submit Quiz
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="btn-primary order-1 sm:order-2"
                        aria-label="Go to next question"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Next
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>
                )}
            </div>

            {/* Question navigation dots */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
                {questions.map((_, idx) => {
                    const hasAnswer = answers[idx] !== null && answers[idx] !== '' &&
                        (Array.isArray(answers[idx]) ? answers[idx].length > 0 : true);
                    return (
                        <button
                            key={idx}
                            onClick={() => setCurrentQuestion(idx)}
                            className={`w-3 h-3 rounded-full transition-all
                ${idx === currentQuestion
                                    ? 'bg-primary-500 scale-125'
                                    : hasAnswer
                                        ? 'bg-primary-300 dark:bg-primary-600'
                                        : 'bg-slate-300 dark:bg-slate-600'
                                }
              `}
                            aria-label={`Go to question ${idx + 1}`}
                            aria-current={idx === currentQuestion ? 'true' : 'false'}
                        />
                    );
                })}
            </div>
        </div>
    );
}
