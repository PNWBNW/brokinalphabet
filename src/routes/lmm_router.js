const express = require('express');
const router = express.Router();

const { getPromptTemplate } = require('../utils/prompt_templates');
const { call_openai } = require('../llm/openai');
const { call_claude } = require('../llm/anthropic');
const { logRoleOutput, logError } = require('../utils/logger');
const { gateCheck } = require('../token/gate_check');  // << NFT gating middleware

// === Role-to-model assignments ===
const roleModelMap = {
  creator: 'openai',
  engineer: 'claude',
  critic: 'openai'
};

// === Model function registry ===
const modelRegistry = {
  openai: call_openai,
  claude: call_claude,
  // mistral: call_mistral,
  // groq: call_groq,
  // together: call_together,
  // gemini: call_gemini
};

// === NFT-Gated LLM Loop ===
router.post('/run-loop', gateCheck, async (req, res) => {
  const { prompt, iterations } = req.body;

  if (!prompt || !iterations || iterations < 1) {
    return res.status(400).json({ error: 'Invalid input: prompt and iteration count are required.' });
  }

  try {
    let current = prompt;

    for (let cycle = 0; cycle < iterations; cycle++) {
      for (const role of ['creator', 'engineer', 'critic']) {
        const modelKey = roleModelMap[role];
        const modelCaller = modelRegistry[modelKey];

        if (!modelCaller) {
          throw new Error(`No model implementation found for: ${modelKey}`);
        }

        const rolePrompt = getPromptTemplate(role, current);
        const roleResponse = await modelCaller(rolePrompt);

        logRoleOutput(role, modelKey, rolePrompt, roleResponse, cycle + 1);
        current = roleResponse;
      }
    }

    res.json({
      output: current,
      wallet: req.verifiedWallet  // include verified wallet in response
    });

  } catch (err) {
    logError('run-loop', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
