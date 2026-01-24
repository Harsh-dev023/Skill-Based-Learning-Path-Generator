/**
 * Roadmap Component
 * Displays the generated learning roadmap with phases, resources, and projects
 */
export default function Roadmap({ roadmap, careerPath, onRegenerate, onRestart, onBack }) {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 mb-4">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                        {careerPath.icon} {careerPath.title}
                    </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">
                    {roadmap.title}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Estimated Duration: <span className="font-medium text-primary-600 dark:text-primary-400">{roadmap.estimatedDuration}</span>
                </p>
            </div>

            {/* Overview */}
            <div className="card mb-8">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Overview
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {roadmap.overview}
                </p>
            </div>

            {/* Phases */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Learning Phases
                </h2>

                <div className="space-y-6">
                    {roadmap.phases?.map((phase, idx) => (
                        <div key={idx} className="roadmap-section">
                            <div className="roadmap-marker">{phase.phaseNumber || idx + 1}</div>

                            <div className="card">
                                {/* Phase header */}
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                                        {phase.title}
                                    </h3>
                                    <span className="text-sm px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                                        {phase.duration}
                                    </span>
                                </div>

                                {/* Objectives */}
                                {phase.objectives?.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Objectives</h4>
                                        <ul className="space-y-1">
                                            {phase.objectives.map((obj, objIdx) => (
                                                <li key={objIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-sm">
                                                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {obj}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Topics and Resources */}
                                {phase.topics?.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Topics & Resources</h4>
                                        <div className="space-y-4">
                                            {phase.topics.map((topic, topicIdx) => (
                                                <div key={topicIdx} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                                                    <h5 className="font-medium text-slate-800 dark:text-white mb-1">{topic.name}</h5>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{topic.description}</p>

                                                    {/* Resources */}
                                                    {topic.resources?.length > 0 && (
                                                        <div className="space-y-2">
                                                            {topic.resources.map((resource, resIdx) => (
                                                                <a
                                                                    key={resIdx}
                                                                    href={resource.url || '#'}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-slate-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group"
                                                                >
                                                                    {/* Resource type icon */}
                                                                    <span className="text-lg">
                                                                        {resource.type === 'course' ? '📚' :
                                                                            resource.type === 'book' ? '📖' :
                                                                                resource.type === 'tutorial' ? '🎓' :
                                                                                    resource.type === 'documentation' ? '📄' :
                                                                                        resource.type === 'project' ? '🛠️' : '🔗'}
                                                                    </span>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
                                                                            {resource.title}
                                                                        </p>
                                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                                            {resource.platform}
                                                                            {resource.isFree && (
                                                                                <span className="ml-2 text-green-600 dark:text-green-400">• Free</span>
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <svg className="w-4 h-4 text-slate-400 group-hover:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                    </svg>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Projects */}
                                {phase.projects?.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Hands-on Projects</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {phase.projects.map((project, projIdx) => (
                                                <div key={projIdx} className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-4 border border-accent-200/50 dark:border-accent-800/30">
                                                    <h5 className="font-medium text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                                                        <span>🚀</span> {project.title}
                                                    </h5>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{project.description}</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {project.skills?.map((skill, skillIdx) => (
                                                            <span key={skillIdx} className="text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Milestones */}
                                {phase.milestones?.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Milestones</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {phase.milestones.map((milestone, msIdx) => (
                                                <span key={msIdx} className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    {milestone}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips */}
            {roadmap.tips?.length > 0 && (
                <div className="card mb-8 border-l-4 border-accent-500">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        <span>💡</span> Pro Tips
                    </h2>
                    <ul className="space-y-2">
                        {roadmap.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                <span className="text-accent-500 mt-1">•</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Next Steps */}
            {roadmap.nextSteps && (
                <div className="card mb-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-0">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        <span>🎯</span> After Completing This Roadmap
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300">
                        {roadmap.nextSteps}
                    </p>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={onBack}
                    className="btn-outline"
                    aria-label="Go back to career path selection"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Change Career Path
                    </span>
                </button>

                <button
                    onClick={onRegenerate}
                    className="btn-secondary"
                    aria-label="Generate a new roadmap for the same career path"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Regenerate Roadmap
                    </span>
                </button>

                <button
                    onClick={onRestart}
                    className="btn-primary"
                    aria-label="Start over with a new assessment"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Start New Assessment
                    </span>
                </button>
            </div>
        </div>
    );
}
