---
title: "Atrio ERP"
tagline: "Modular, multi-tenant, multi-currency ERP core"
description: "Atrio is the core of an ERP designed to scale globally: a decoupled document engine and rules engine, so invoicing, inventory, sales and accounting grow as independent modules on the same core."
tags: ["TypeScript", "Node.js", "SaaS", "Architecture"]
repo: "https://github.com/LuiggiVal08/atrio-erp"
status: "in-development"
architecture:
  - "Client (Web / Mobile)"
  - "       ↓  API"
  - "Core (multi-tenant · multi-currency)"
  - "       ↓"
  - "Document Engine · Rules Engine"
  - "       ↓"
  - "Services"
  - "  Invoicing · Inventory"
  - "  Sales · Accounting"
  - "       ↓"
  - "Per-tenant data (logical isolation)"
features:
  - "Multi-tenant and multi-currency from the core"
  - "Document engine decoupled from modules"
  - "Configurable rules engine (taxes, flows)"
  - "Designed to scale globally"
milestones:
  - label: "v1 · Architecture definition (in progress)"
    done: false
  - label: "v2 · Document engine + multi-tenant core"
    done: false
  - label: "v3 · Modules: invoicing, inventory, sales"
    done: false
---
