# BroKinAlphaBet  
**A Cross-LLM Creative Intelligence Engine**

BroKinAlphaBet is a modular AI orchestration platform where multiple large language models (LLMs) collaborate in creative loops—refining, mutating, and challenging each other across distinct cognitive roles.

This project enables a new class of recursive AI tools powered by wallet-gated access, encrypted key storage, and zero-knowledge (ZK) commitment logic.

---

## ✨ Features

- **Multi-Model LLM Chaining**: Claude, GPT-4o, Gemini, Mistral, Groq, and more  
- **Role-Based Thinking**: Creator → Engineer → Critic loops  
- **ZK-Bound API Key Storage** (planned)  
- **Token-Gated Access Control** (planned)  
- **Web3 Wallet Login** (planned)  
- **Secure Backend API** with `.env`-protected model calls  
- **Frontend Loop Interface** via `index.html`

---

## 🧠 Philosophy

> Let models hallucinate, reason, and revise—together.

BroKinAlphaBet isn’t just a toolchain. It’s an experimental framework for collaborative, cross-AI thinking—looped and logged until emergence occurs.

---

## 🔧 Project Structure

```
bro_kin_alpha_bet/
├── public/               # Frontend UI
├── src/
│   ├── llm/              # Model wrappers (openai.js, anthropic.js, etc.)
│   ├── routes/           # API routes (llm_router.js)
│   ├── utils/            # Prompt templates, logger, etc.
│   └── server.js         # Express app
├── .env                  # (Git-ignored) API keys + settings
├── .gitignore
├── package.json
├── LICENSE
└── README.md
```

---

## ✅ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourname/brokinalphabet.git
cd brokinalphabet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Your `.env`
```bash
cp .env.example .env
```
Fill in keys for:
- OpenAI  
- Claude (Anthropic)  
- Gemini  
- Mistral, Together, Groq, etc.

### 4. Run the App
```bash
npm run dev
```

Then visit `http://localhost:3000`.

---

## 🛠 Planned Additions

- [ ] ZK hashed API key registration via Aleo/Noir  
- [ ] NFT/tiered access gating  
- [ ] On-chain audit trail of prompt mutation  
- [ ] Visual prompt chain graphing  
- [ ] Persistent memory modules per wallet

---

## ⚖ License

This project is licensed under **Apache 2.0** with an additional hybrid usage layer.  
See [`LICENSE`](./LICENSE)

---

## 🧬 Attribution

Created by [Proven National Workers]
Inspired by the question:  
**What happens when AIs start thinking together—on purpose?**

---

## Contributions Welcome

Fork it. Hack it. Add your own LLMs and roles.  
Let’s break the alphabet—and rebuild it collaboratively.
