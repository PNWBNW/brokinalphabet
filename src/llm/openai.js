const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o'; // fallback to GPT-4o

if (!OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY in environment variables');
}

async function call_openai(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: OPENAI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content.trim();
    return content;

  } catch (err) {
    console.error('[OpenAI error]', err.response?.data || err.message);
    throw new Error('OpenAI request failed');
  }
}

module.exports = { call_openai };
