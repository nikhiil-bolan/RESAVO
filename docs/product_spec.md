# RESAVO — System Specification & Architecture

## Overview
RESAVO is a people-first digital network that helps people and organizations offer useful resources, helps other people and organizations find what they genuinely need, and uses intelligence to decide whether a transfer is actually practical.

Its success is measured by verified resources preserved, reused, transferred or recovered — not by transaction count alone.

## Non-Negotiable Core Principles
1. **People First**: Built to help users save, access, reuse, share or transfer useful resources.
2. **Offer is NOT a Transaction**: An offer represents availability. It becomes a transaction only when a feasible need and workable fulfillment path are identified.
3. **Best Next Use, NOT Maximum Trading**: The algorithm can and will recommend `NO_TRANSFER` or `ALTERNATIVE` if a local supplier or existing route is more practical than creating a new transfer.
4. **Verification Before Impact**: Only verified outcomes enter the impact ledger. Estimates are strictly separated from verified values.
5. **Simple Outside, Intelligent Inside**: The UI displays one clear decision and action, with complex geospatial, feasibility, and risk logic running underneath.

## Tech Stack
- **Mobile**: Flutter + Dart
- **Admin Web**: Next.js + React + TypeScript + Tailwind CSS
- **Backend API**: FastAPI + Python 3.13 + Pydantic v2 + SQLAlchemy 2.0
- **Database**: PostgreSQL / PostGIS (with SQLite spatial math compatibility)
- **Cache & Queue**: Redis + Async Background Queue
