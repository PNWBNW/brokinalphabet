const axios = require('axios');
require('dotenv').config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-opus-20240229';

if (!ANTHROPIC_API_KEY) {
  throw new Error('Missing ANTHROPIC_API_KEY in environment variables');
}

async function call_claude(prompt) {
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: ANTHROPIC_MODEL,
        max_tokens: 1024,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.content[0].text.trim();

  } catch (err) {
    console.error('[Claude error]', err.response?.data || err.message);
    throw new Error('Anthropic request failed');
  }
}

module.exports = { call_claude };
