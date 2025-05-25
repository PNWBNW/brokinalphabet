const express = require('express');
const router = express.Router();
const { callOpenAI, callClaude } = require('../llm/openai'); // or use separate files
const { getPromptTemplate } = require('../utils/promptTemplates');

router.post('/run-loop', async (req, res) => {
  const { prompt, iterations } = req.body;

  if (!prompt || !iterations || iterations < 1) {
    return res.status(400).json({ error: 'Invalid input: prompt and iteration count are required.' });
  }

  try {
    let current = prompt;

    for (let i = 0; i < iterations; i++) {
      // Step 1: Creator
      const creatorPrompt = getPromptTemplate('creator', current);
      const creatorResponse = await callOpenAI(creatorPrompt);

      // Step 2: Engineer
      const engineerPrompt = getPromptTemplate('engineer', creatorResponse);
      const engineerResponse = await callClaude(engineerPrompt);

      // Step 3: Critic
      const criticPrompt = getPromptTemplate('critic', engineerResponse);
      const criticResponse = await callOpenAI(criticPrompt);

      current = criticResponse;
    }

    res.json({ output: current });

  } catch (err) {
    console.error('[run-loop error]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
