# BroKinAlphaBet:  
**A Cross-LLM Recursive Orchestration Framework for Emergent Intelligence**

---

## Abstract

BroKinAlphaBet is a decentralized orchestration framework designed to enable recursive, role-based collaboration between multiple large language models (LLMs). It facilitates multi-agent creativity, logic refinement, and critical analysis by guiding LLMs through modular thinking loops, all bound by Web3 wallet authentication, optional NFT access control, and encrypted API key privacy. Inspired by both emergent cognition and secure computation, BroKinAlphaBet is positioned as a flexible starter for next-gen synthetic intelligence experiments and applied creative reasoning systems.

---

## Problem

Today’s LLMs operate in isolated silos, with limited memory, single-model constraints, and predefined safety tuning that often stifles creativity. There is no system for allowing multiple AIs to co-create, cross-verify, and evolve ideas recursively—especially not in an open, privacy-respecting, user-owned context.

Most tooling lacks:
- Cross-model role delegation
- Recursive reasoning loops
- Web3 identity and privacy enforcement
- Permissionless access layered with token gating
- Model-to-model conversational memory

---

## Solution

BroKinAlphaBet introduces a flexible orchestration layer that:
- Connects multiple LLMs via a secure backend API
- Assigns role-based behavior (e.g. Creator → Engineer → Critic)
- Executes multi-pass creative loops
- Validates user access through wallet login + optional NFT gating
- Stores API keys securely using ZK-bound architecture (planned)

Each LLM contributes based on its strengths—some hallucinate, some evaluate, others optimize or restrict. Together, they generate refined output across iterative cycles.

---

## Architecture Overview

**Frontend**
- Wallet login via MetaMask or Puzzle
- Prompt + loop controls via static HTML/JS
- Injects `x-wallet-address` and signed message headers

**Backend**
- Express.js server
- `.env` gated API keys per model
- NFT token gating via on-chain contract reads
- Role assignment system: Creator → Engineer → Critic

**ZK Layer (planned)**
- API key hash stored in record using ChaCha salt + BHP256
- Signature verification via Leo circuit (`verify_sig.leo`)
- On-chain audit trails per session ID (future)

---

## Role Design

| Role     | Purpose                                | Default Model |
|----------|----------------------------------------|----------------|
| Creator  | Hallucinates new ideas                 | OpenAI GPT-4o  |
| Engineer | Converts ideas to plausible logic      | Claude Opus    |
| Critic   | Identifies flaws or ethical problems   | GPT-4o         |

Loop execution can be configured via `.env` and adjusted per session.

---

## NFT Gating (Optional)

BroKinAlphaBet supports ERC-721 and ERC-1155-based gating using:
- `x-wallet-address` header from frontend
- RPC + ABI-based balance check via Infura/Alchemy
- Custom logic in `gate_check.js` and `nft_config.js`

This enables token-based access tiers and project-specific unlocks.

---

## Signature Verification

Aleo users may log in via Puzzle Wallet and sign a standard message.  
Verification is stubbed in `verify_signature.js` and enforced in Leo with:
```leo
function verify_signature(msg_hash: field, sig: [field; 2], pub_key: group) -> bool
```

---

## Features Roadmap

- [x] Modular LLM loop engine
- [x] Multi-model support (OpenAI, Claude, Gemini, etc.)
- [x] Prompt templating engine
- [x] Token gating via ERC-721
- [x] Logging with role-color visualization
- [ ] ZK API key binding (Leo)
- [ ] Persistent memory per wallet (IPFS or zkStore)
- [ ] Prompt chain visualizer UI
- [ ] DAO-based AI role voting

---

## Licensing

BroKinAlphaBet is released under **Apache 2.0** with an additional usage layer.  
Commercial deployment or resale of gated orchestration features requires attribution and coordination.  
See [`LICENSE`](./LICENSE) and [`BROKIN_USAGE.md`](./BROKIN_USAGE.md) for full details.

---

## Conclusion

BroKinAlphaBet lays the foundation for emergent, creative machine thinking—where LLMs collaborate as cognitive agents, not isolated APIs. By combining open architecture, recursive logic, and wallet-based identity, this project creates a framework for the next generation of user-controlled, AI-augmented workflows.

Let models think together—and watch new alphabets emerge.
