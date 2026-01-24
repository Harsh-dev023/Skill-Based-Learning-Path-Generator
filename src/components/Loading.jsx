/**
 * Loading Component
 * Displays an animated loading spinner with optional message
 */
export default function Loading({ message = 'Loading...' }) {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-[200px] animate-fade-in"
            role="status"
            aria-live="polite"
        >
            {/* Animated spinner */}
            <div className="relative">
                <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
                <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-accent-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>

            {/* Loading message */}
            <p className="mt-6 text-lg font-medium text-slate-600 dark:text-slate-300 animate-pulse">
                {message}
            </p>

            {/* Decorative dots */}
            <div className="flex gap-1 mt-3">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
        </div>
    );
}
