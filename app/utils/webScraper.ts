import { generateMistralResponse } from './mistralInterface';

export async function simulateWebScrape(username: string) {
  const prompt = `Generate 10 social media posts for a user with the username "${username}". Include a mix of positive and negative content, as well as some posts that might contain personal information.`;

  const response = await generateMistralResponse(prompt);
  return response.split('\n').filter(post => post.trim() !== '');
}

export async function analyzeContent(posts: string[]) {
  const prompt = `Analyze the following social media posts for negative language, personal information, and overall sentiment. Provide a score out of 100, where 100 is perfectly safe and appropriate content. Also list issues and recommendations:

${posts.join('\n')}

Analysis:`;

  const analysis = await generateMistralResponse(prompt);

  // Extract score, issues, and recommendations from the analysis
  const score = parseInt(analysis.match(/Score: (\d+)/)?.[1] || '0');
  const issues = analysis.match(/Issues:([\s\S]*?)Recommendations:/)?.[1].trim().split('\n') || [];
  const recommendations = analysis.match(/Recommendations:([\s\S]*?)$/)?.[1].trim().split('\n') || [];

  return { score, issues, recommendations, flaggedPosts: posts };
}

