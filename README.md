# RESAVO — Every Resource. A Better Next Use.

> **Public-Benefit Resource Preservation & Redistribution Network**

RESAVO is a digital network that connects resource offers, real-world buyer needs, and feasibility intelligence to ensure resources reach their best practical next use.

---

## 🌟 Core Principle

**A match does NOT automatically mean a transfer should happen.**

The system evaluates real-world practical feasibility before initiating a transfer.
For example:
- A family offers 3 kg milk 1 km away.
- A bakery needs 3 kg milk.
- A verified milk shop is 300 m from the bakery.
- **RESAVO Decision**: *"Do not transfer from the family. The nearby shop is a more practical source."*

---

## 🏗️ Architecture & Project Layout

```text
RESAVO/
├── apps/
│   ├── mobile_flutter/       # Complete Flutter Dart Mobile App (Seller/Buyer Portals)
│   └── admin_web/            # Next.js 14+ Enterprise Admin & Impact Web Console
├── backend/                  # FastAPI Python Backend + SQLAlchemy 2.0 ORM + Match Engine
├── docs/                     # Product Spec, API Contract & Safety Rules
└── infra/                    # Docker Compose & PostgreSQL/PostGIS scripts
```

---

## 🚀 Quick Start Guide

### 1. Backend API & Seed Database

```bash
cd backend
python -m pip install -r requirements.txt
python seed.py
python main.py  # or uvicorn app.main:app --reload --port 8000
```

- **OpenAPI Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: `GET http://localhost:8000/health`

### 2. Run Backend Unit & Integration Tests

```bash
cd backend
python -m pytest
```

### 3. Run Admin & Impact Web Console

```bash
cd apps/admin_web
npm install
npm run dev
```

- **Admin Console**: [http://localhost:3000](http://localhost:3000)

### 4. Docker Deployment

```bash
cd infra
docker-compose up --build
```

---

## 🔒 Verification & Safety Policy
- **Food Safety**: No image-only safety certification. Perishable expiry windows and storage context enforced.
- **Verified Impact**: Strict separation between **Estimated** vs **Verified** impact ledgers.
- **Privacy**: Household pickup locations fuzzed publicly until match acceptance.
