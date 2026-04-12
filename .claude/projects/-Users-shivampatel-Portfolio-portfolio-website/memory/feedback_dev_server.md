---
name: Never start dev server
description: Only the user starts the dev server — never start it yourself
type: feedback
---

Never start the dev server (`npm run dev`) yourself. Only the user starts it. If you need to verify something, ask the user to check or use `npm run build` to verify compilation.

**Why:** User wants full control over running processes.
**How to apply:** Don't run `npm run dev`, `npm start`, or background server processes. Build checks (`npm run build`) are OK for verifying compilation.
