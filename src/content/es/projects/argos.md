---
title: "ARGOS"
tagline: "Plataforma cuantitativa de trading adaptativa multi-modelo"
description: "ARGOS 2.0 evolucionó de un bot de una sola red neuronal LSTM a una plataforma cuantitativa modular, orientada a eventos y desacoplada por dominios: hexágonos limpios, inferencia separada de entrenamiento y ejecución, y riesgo gestionado de forma adaptativa."
tags: ["NestJS", "FastAPI", "Redis", "Python", "TypeScript", "WebSockets"]
repo: "https://github.com/LuiggiVal08/argos-ats"
status: "in-development"
metrics:
  - value: "33.7k"
    label: "líneas de código"
  - value: "266"
    label: "archivos fuente"
  - value: "56"
    label: "archivos de test"
  - value: "<2ms"
    label: "SLA de ticks p99"
architecture:
  - "Exchange (Binance)"
  - "       ↓  WebSockets"
  - "Data Engine (NestJS)"
  - "       ↓  Event Bus (Redis/RESP)"
  - "Feature · Historical · Replay"
  - "       ↓"
  - "Analytics Engine (FastAPI)"
  - "  LSTM · XGBoost · MetaModel"
  - "  Confidence Filter · Señal"
  - "       ↓"
  - "Risk Engine  (1% / trade · drawdown 5%)"
  - "       ↓"
  - "Portfolio Manager"
  - "       ↓"
  - "Execution · Notification"
  - ""
  - "Training Engine (offline)"
  - "  Walk Forward · Model Registry"
  - "  Feature Importance · Promoción"
features:
  - "Event Driven Architecture + hexagonal"
  - "Multi-modelo: LSTM, XGBoost y MetaModel"
  - "Invariantes de riesgo duras (1 % por trade, circuit-breaker de drawdown)"
  - "Replay, backtesting y paper trading"
  - "Promoción automática de modelos (walk-forward)"
  - "Especificación por 5 epics y user stories"
  - "Despliegue Docker Compose o bare-metal"
milestones:
  - label: "v1 · Pipeline de ticks <2 ms p99 (en curso)"
    done: false
  - label: "v2 · Analytics Engine con señales"
    done: false
  - label: "v3 · Risk + ejecución + modo LIVE"
    done: false
---
