---
title: "toon-memory"
tagline: "La capa de continuidad para agentes de IA"
description: "Un servidor MCP que da a los agentes de IA memoria persistente y offline: decisiones, patrones y bugs recordados entre sesiones con 68,5 % menos tokens que releer el contexto. Sin LLM, sin servidor — funciona con 22+ agentes y está publicado en npm y en el MCP Registry."
tags: ["TypeScript", "MCP", "Node.js", "Open Source"]
repo: "https://github.com/LuiggiVal08/toon-memory"
demo: "https://luiggival08.github.io/toon-memory/"
stars: 10
status: "published"
metrics:
  - value: "22"
    label: "agentes soportados"
  - value: "11.6k"
    label: "líneas de código"
  - value: "23"
    label: "archivos de test"
  - value: "-68.5%"
    label: "tokens al recordar"
architecture:
  - "Agente (OpenCode, Claude Code, Cursor…)"
  - "       ↓  MCP (stdio)"
  - "toon-memory server"
  - "       ↓"
  - ".toon-memory/ (por proyecto)"
  - "  grafo de conocimiento + BM25"
  - "  calidad + TTL + cifrado AES-256-GCM"
  - "       ↓"
  - "recall compacto → contexto del agente"
features:
  - "Memoria offline: sin LLM, sin servidor, ~1 MB"
  - "Recall por grafo + BM25 + calidad (sin embeddings)"
  - "22+ agentes soportados con instalador interactivo"
  - "Cifrado AES-256-GCM para datos sensibles"
  - "Sync entre proyectos vía GitHub Gist"
  - "Docs en línea + README en 8 idiomas"
milestones:
  - label: "Publicado en npm"
    done: true
  - label: "Listado en el MCP Registry"
    done: true
  - label: "Docs en línea (luiggival08.github.io)"
    done: true
  - label: "Núcleo de memoria global y multi-sesión"
    done: true
---
