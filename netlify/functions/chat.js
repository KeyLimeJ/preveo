// netlify/functions/chat.js
// Secure proxy between the Preveo frontend and the Anthropic API.
// The ANTHROPIC_API_KEY never leaves the server.

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: 'messages array is required' };
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':         'application/json',
        'x-api-key':            process.env.ANTHROPIC_API_KEY,
        'anthropic-version':    '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system:     `You are Preveo, a goal-driven lifestyle planning assistant. 
You help users plan and execute goals related to nutrition, training, recovery, and daily habits.
Be concise, specific, and actionable. When a user describes a goal, ask clarifying questions 
to understand their baseline before making recommendations.`,
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return { statusCode: response.status, body: 'API error' };
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? '';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };

  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: 'Internal server error' };
  }
}