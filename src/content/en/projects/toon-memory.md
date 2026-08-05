---
title: "toon-memory"
tagline: "The continuity layer for AI agents"
description: "An MCP server that gives AI agents persistent, offline memory: decisions, patterns and bugs recalled across sessions with 68.5% fewer tokens than re-reading context. No LLM, no server — works with 22+ agents and is published on npm and in the MCP Registry."
tags: ["TypeScript", "MCP", "Node.js", "Open Source"]
repo: "https://github.com/LuiggiVal08/toon-memory"
demo: "https://luiggival08.github.io/toon-memory/"
stars: 10
status: "published"
metrics:
  - value: "22"
    label: "agents supported"
  - value: "11.6k"
    label: "lines of code"
  - value: "23"
    label: "test files"
  - value: "-68.5%"
    label: "tokens when recalling"
architecture:
  - "Agent (OpenCode, Claude Code, Cursor…)"
  - "       ↓  MCP (stdio)"
  - "toon-memory server"
  - "       ↓"
  - ".toon-memory/ (per project)"
  - "  knowledge graph + BM25"
  - "  quality + TTL + AES-256-GCM"
  - "       ↓"
  - "compact recall → agent context"
features:
  - "Offline memory: no LLM, no server, ~1 MB"
  - "Graph + BM25 + quality recall (no embeddings)"
  - "22+ agents supported with interactive installer"
  - "AES-256-GCM encryption for sensitive data"
  - "Cross-project sync via GitHub Gist"
  - "Online docs + README in 8 languages"
milestones:
  - label: "Published on npm"
    done: true
  - label: "Listed in the MCP Registry"
    done: true
  - label: "Online docs (luiggival08.github.io)"
    done: true
  - label: "Global + multi-session memory core"
    done: true
---
