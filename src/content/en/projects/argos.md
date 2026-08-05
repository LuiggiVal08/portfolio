---
title: "ARGOS"
tagline: "Adaptive multi-model quantitative trading platform"
description: "ARGOS 2.0 evolved from a single-LSTM trading bot into a modular, event-driven quantitative platform decoupled by domain: clean hexagons, inference separated from training and execution, and adaptively managed risk."
tags: ["NestJS", "FastAPI", "Redis", "Python", "TypeScript", "WebSockets"]
repo: "https://github.com/LuiggiVal08/argos-ats"
status: "in-development"
metrics:
  - value: "33.7k"
    label: "lines of code"
  - value: "266"
    label: "source files"
  - value: "56"
    label: "test files"
  - value: "<2ms"
    label: "p99 tick SLA"
architecture:
  - "Exchange (Binance)"
  - "       ↓  WebSockets"
  - "Data Engine (NestJS)"
  - "       ↓  Event Bus (Redis/RESP)"
  - "Feature · Historical · Replay"
  - "       ↓"
  - "Analytics Engine (FastAPI)"
  - "  LSTM · XGBoost · MetaModel"
  - "  Confidence Filter · Signal"
  - "       ↓"
  - "Risk Engine  (1% / trade · 5% drawdown)"
  - "       ↓"
  - "Portfolio Manager"
  - "       ↓"
  - "Execution · Notification"
  - ""
  - "Training Engine (offline)"
  - "  Walk Forward · Model Registry"
  - "  Feature Importance · Promotion"
features:
  - "Event-driven architecture + hexagonal"
  - "Multi-model: LSTM, XGBoost and MetaModel"
  - "Hard risk invariants (1% per trade, drawdown circuit-breaker)"
  - "Replay, backtesting and paper trading"
  - "Automatic model promotion (walk-forward)"
  - "Spec-driven: 5 epics and user stories"
  - "Docker Compose or bare-metal deployment"
milestones:
  - label: "v1 · Tick pipeline <2ms p99 (in progress)"
    done: false
  - label: "v2 · Analytics Engine with signals"
    done: false
  - label: "v3 · Risk + execution + LIVE mode"
    done: false
---
