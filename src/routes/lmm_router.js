const express = require('express');
const router = express.Router();

const { getPromptTemplate } = require('../utils/prompt_templates');
const { call_openai } = require('../llm/openai');
const { call_claude } = require('../llm/anthropic'); // optional if already built
// Add more wrappers as needed...

// Role-to-model map (pulls from .env or define here)
const roleModelMap = {
  creator: 'openai',     // use GPT-4o for ideation
  engineer: 'claude',    // use Claude Opus for logic structuring
  critic: 'openai'       // use GPT-4o again for risk analysis
};

// Model function registry
const modelRegistry = {
  openai: call_openai,
  claude: call_claude,
  // mistral: call_mistral,
  // groq: call_groq,
  // together: call_together,
};

router.post('/run-loop', async (req, res) => {
  const { prompt, iterations } = req.body;

  if (!prompt || !iterations || iterations < 1) {
    return res.status(400).json({ error: 'Invalid input: prompt and iteration count are required.' });
  }

  try {
    let current = prompt;

    for (let i = 0; i < iterations; i++) {
      for (const role of ['creator', 'engineer', 'critic']) {
        const modelKey = roleModelMap[role];
        const modelCaller = modelRegistry[modelKey];

        if (!modelCaller) {
          throw new Error(`No model implementation for: ${modelKey}`);
        }

        const rolePrompt = getPromptTemplate(role, current);
        current = await modelCaller(rolePrompt); // role output becomes input for next
      }
    }

    res.json({ output: current });

  } catch (err) {
    console.error('[run-loop error]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
