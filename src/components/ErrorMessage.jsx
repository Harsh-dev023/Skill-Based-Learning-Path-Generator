/**
 * ErrorMessage Component
 * Displays error messages with retry option
 */
export default function ErrorMessage({ message, onRetry, onDismiss }) {
    return (
        <div
            className="card border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 animate-fade-in"
            role="alert"
            aria-live="assertive"
        >
            <div className="flex items-start gap-4">
                {/* Error icon */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                    <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error content */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
                        Oops! Something went wrong
                    </h3>
                    <p className="mt-1 text-red-600 dark:text-red-300">
                        {message || 'An unexpected error occurred. Please try again.'}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {onRetry && (
                            <button
                                onClick={onRetry}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                aria-label="Retry the failed action"
                            >
                                Try Again
                            </button>
                        )}
                        {onDismiss && (
                            <button
                                onClick={onDismiss}
                                className="px-4 py-2 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                aria-label="Dismiss error message"
                            >
                                Dismiss
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
