---
title: "Atrio ERP"
tagline: "Núcleo ERP modular, multi-tenant y multi-moneda"
description: "Atrio es el núcleo de un ERP pensado para escalar globalmente: un motor de documentos y un motor de reglas desacoplados, de modo que facturación, inventario, ventas y contabilidad crezcan como módulos independientes sobre el mismo núcleo."
tags: ["TypeScript", "Node.js", "SaaS", "Arquitectura"]
repo: "https://github.com/LuiggiVal08/atrio-erp"
status: "in-development"
architecture:
  - "Cliente (Web / Móvil)"
  - "       ↓  API"
  - "Core (multi-tenant · multi-moneda)"
  - "       ↓"
  - "Motor de Documentos · Motor de Reglas"
  - "       ↓"
  - "Servicios"
  - "  Facturación · Inventario"
  - "  Ventas · Contabilidad"
  - "       ↓"
  - "Datos por tenant (aislamiento lógico)"
features:
  - "Multi-tenant y multi-moneda desde el núcleo"
  - "Motor de documentos desacoplado de los módulos"
  - "Motor de reglas (impuestos, flujos) configurable"
  - "Diseñado para escalar a nivel global"
milestones:
  - label: "v1 · Definición de arquitectura (en curso)"
    done: false
  - label: "v2 · Motor de documentos + core multi-tenant"
    done: false
  - label: "v3 · Módulos: facturación, inventario, ventas"
    done: false
---
