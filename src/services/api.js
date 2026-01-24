import axios from 'axios';

/**
 * OpenRouter API configuration
 * Uses VITE_ prefix for client-side environment variables
 */
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-3.1-8b-instruct:free';

/**
 * Get API key from environment variables
 * In Vite, client-side env vars must be prefixed with VITE_
 */
const getApiKey = () => {
    return import.meta.env.VITE_OPENROUTER_API_KEY || '';
};

/**
 * Make a request to OpenRouter API
 * @param {string} prompt - The prompt to send to the AI
 * @returns {Promise<string>} - The AI response content
 */
const makeAIRequest = async (prompt) => {
    const apiKey = getApiKey();

    if (!apiKey) {
        throw new Error('API key not configured. Please set VITE_OPENROUTER_API_KEY environment variable.');
    }

    try {
        const response = await axios.post(
            API_URL,
            {
                model: MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Skill-Based Learning Path Generator'
                }
            }
        );

        if (response.data?.choices?.[0]?.message?.content) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error('Invalid response format from API');
        }
    } catch (error) {
        if (error.response) {
            // API returned an error response
            const status = error.response.status;
            const message = error.response.data?.error?.message || 'Unknown API error';

            if (status === 401) {
                throw new Error('Invalid API key. Please check your OpenRouter API key.');
            } else if (status === 429) {
                throw new Error('Rate limit exceeded. Please wait a moment and try again.');
            } else if (status === 500) {
                throw new Error('API server error. Please try again later.');
            } else {
                throw new Error(`API Error (${status}): ${message}`);
            }
        } else if (error.request) {
            // Network error
            throw new Error('Network error. Please check your internet connection and try again.');
        } else {
            // Other errors
            throw error;
        }
    }
};

/**
 * Evaluate user's tech skills based on quiz answers
 * @param {Array} answers - Array of user answers from the quiz
 * @param {Array} questions - Array of quiz questions
 * @returns {Promise<Object>} - Evaluation result with score, strengths, weaknesses
 */
export const evaluateSkills = async (answers, questions) => {
    // Format answers for the prompt
    const formattedAnswers = questions.map((q, index) => {
        const answer = answers[index];
        let answerText = '';

        if (answer === null || answer === undefined || answer === '' ||
            (Array.isArray(answer) && answer.length === 0)) {
            answerText = "I don't know / Not answered";
        } else if (Array.isArray(answer)) {
            answerText = answer.join(', ');
        } else if (typeof answer === 'boolean') {
            answerText = answer ? 'Yes' : 'No';
        } else {
            answerText = String(answer);
        }

        return `Q${index + 1}: ${q.question}\nA: ${answerText}`;
    }).join('\n\n');

    const prompt = `You are a tech skill evaluator. Based on the following user answers to tech questions, assess their skills in various areas of technology.

QUIZ ANSWERS:
${formattedAnswers}

Please provide your evaluation in the following JSON format (respond ONLY with valid JSON, no markdown):
{
  "score": <number from 0-100>,
  "level": "<Beginner|Intermediate|Advanced|Expert>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "weaknesses": ["<weakness 1>", "<weakness 2>", ...],
  "summary": "<2-3 sentence summary of their skill level>",
  "recommendedCareerPaths": [
    {
      "id": "<path_id>",
      "title": "<Career Title>",
      "description": "<Why this fits them>",
      "icon": "<emoji>"
    }
  ]
}

Consider:
- "I don't know" answers indicate gaps in knowledge
- Multiple technologies in an area indicate strength
- Project experience is valuable
- Balance theoretical knowledge with practical experience
- Be encouraging but honest`;

    const response = await makeAIRequest(prompt);

    try {
        // Try to parse JSON from the response
        // Handle potential markdown code blocks
        let jsonStr = response;
        const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1];
        }

        const evaluation = JSON.parse(jsonStr.trim());
        return evaluation;
    } catch (parseError) {
        console.error('Failed to parse evaluation response:', response);
        throw new Error('Failed to parse skill evaluation. Please try again.');
    }
};

/**
 * Generate a personalized learning roadmap
 * @param {Object} params - Parameters for roadmap generation
 * @returns {Promise<Object>} - Generated roadmap
 */
export const generateRoadmap = async ({ score, level, strengths, weaknesses, careerPath }) => {
    const prompt = `You are a tech career advisor and learning path designer. Create a personalized, actionable learning roadmap based on the following:

USER PROFILE:
- Skill Score: ${score}/100
- Current Level: ${level}
- Strengths: ${strengths.join(', ')}
- Areas to Improve: ${weaknesses.join(', ')}
- Desired Career Path: ${careerPath.title}

Generate a comprehensive learning roadmap in the following JSON format (respond ONLY with valid JSON, no markdown):
{
  "title": "<Roadmap Title>",
  "estimatedDuration": "<e.g., 6-12 months>",
  "overview": "<1-2 paragraph overview of the learning journey>",
  "phases": [
    {
      "phaseNumber": 1,
      "title": "<Phase Title>",
      "duration": "<e.g., 1-2 months>",
      "objectives": ["<objective 1>", "<objective 2>"],
      "topics": [
        {
          "name": "<Topic Name>",
          "description": "<Brief description>",
          "resources": [
            {
              "title": "<Resource Title>",
              "type": "<course|book|tutorial|documentation|project>",
              "url": "<URL if applicable>",
              "platform": "<Platform name>",
              "isFree": true
            }
          ]
        }
      ],
      "milestones": ["<milestone 1>", "<milestone 2>"],
      "projects": [
        {
          "title": "<Project Title>",
          "description": "<What to build>",
          "skills": ["<skill 1>", "<skill 2>"]
        }
      ]
    }
  ],
  "tips": ["<tip 1>", "<tip 2>"],
  "nextSteps": "<What to do after completing this roadmap>"
}

Guidelines:
- Create 4-6 phases that build upon each other
- Include a mix of free resources (prioritize free options)
- Add practical projects for each phase
- Consider the user's current level - ${level === 'Beginner' ? 'start with fundamentals' : 'focus on advanced topics'}
- Make milestones specific and measurable
- Include real, working URLs for popular learning platforms`;

    const response = await makeAIRequest(prompt);

    try {
        // Try to parse JSON from the response
        let jsonStr = response;
        const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1];
        }

        const roadmap = JSON.parse(jsonStr.trim());
        return roadmap;
    } catch (parseError) {
        console.error('Failed to parse roadmap response:', response);
        throw new Error('Failed to generate roadmap. Please try again.');
    }
};
