require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_MODEL = process.env.GOOGLE_MODEL || 'gemini-pro';

if (!GOOGLE_API_KEY) {
  throw new Error('Missing GOOGLE_API_KEY in environment variables');
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: GOOGLE_MODEL });

async function call_gemini(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error('[Gemini error]', err.response?.data || err.message);
    throw new Error('Gemini request failed');
  }
}

module.exports = { call_gemini };
