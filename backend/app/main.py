from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base
from app.api.v1 import auth, offers, needs, matches, transfers, impact, admin, sync

# Initialize database schema
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="RESAVO Backend API — Every Resource. A Better Next Use."
)

# Enable CORS for Next.js Admin & Flutter Web/Mobile connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])
app.include_router(offers.router, prefix=f"{settings.API_V1_STR}/offers", tags=["Offers"])
app.include_router(needs.router, prefix=f"{settings.API_V1_STR}/needs", tags=["Needs"])
app.include_router(matches.router, prefix=f"{settings.API_V1_STR}/matches", tags=["Matches"])
app.include_router(transfers.router, prefix=f"{settings.API_V1_STR}/transfers", tags=["Transfers"])
app.include_router(impact.router, prefix=f"{settings.API_V1_STR}/impact", tags=["Impact"])
app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["Admin Console"])
app.include_router(sync.router, prefix=f"{settings.API_V1_STR}/sync", tags=["Offline Sync"])

@app.get("/")
def root():
    return {
        "name": "RESAVO Backend API",
        "status": "RUNNING",
        "version": "1.0.0",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "HEALTHY", "database": "CONNECTED"}
