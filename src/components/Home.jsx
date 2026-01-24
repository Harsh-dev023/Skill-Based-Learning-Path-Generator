/**
 * Home Component
 * Welcome screen with animated hero section and CTA
 */
export default function Home({ onStart }) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/20 dark:bg-accent-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                {/* Logo/Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-primary-500/30 animate-bounce-slow">
                            <svg
                                className="w-12 h-12 md:w-16 md:h-16 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>
                        </div>
                        {/* Floating particles */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-400 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="gradient-text">Skill-Based</span>
                    <br />
                    <span className="text-slate-800 dark:text-white">Learning Path Generator</span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    Welcome! Let's assess your tech skills and build a{' '}
                    <span className="font-semibold text-primary-600 dark:text-primary-400">personalized roadmap</span>{' '}
                    to advance your career in technology.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <div className="card p-4 text-center">
                        <div className="text-2xl mb-2">📝</div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Quick Assessment</p>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-2xl mb-2">📊</div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Skill Score</p>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Custom Roadmap</p>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={onStart}
                    className="btn-primary text-lg px-8 py-4 group"
                    aria-label="Begin Skill Assessment"
                >
                    <span className="flex items-center gap-2">
                        Begin Skill Assessment
                        <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </button>

                {/* Subtle info */}
                <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                    Takes about 5-10 minutes • AI-powered analysis
                </p>
            </div>
        </div>
    );
}
