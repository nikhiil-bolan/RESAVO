# RESAVO API Contract Specification

## Authentication Endpoints
- `POST /api/v1/auth/send-otp`: Request sign-in OTP for mobile number / email.
- `POST /api/v1/auth/verify-otp`: Validate OTP and issue JWT access token.
- `GET /api/v1/auth/me`: Get current user profile and role capabilities.
- `POST /api/v1/auth/role`: Switch active role mode (`SELLER`, `BUYER`, `ADMIN`).

## Offer Management
- `POST /api/v1/offers`: Create a new resource offer.
- `GET /api/v1/offers/me`: List active and past offers created by the user.
- `GET /api/v1/offers/{id}`: Fetch offer details with evidence and risk score.
- `POST /api/v1/offers/{id}/cancel`: Cancel an active offer.

## Need Management
- `POST /api/v1/needs`: Create a resource need request.
- `GET /api/v1/needs/me`: List needs created by the user.
- `GET /api/v1/needs/{id}`: Fetch need details.

## Match & Feasibility Engine
- `GET /api/v1/matches/suggestions`: Get explainable match recommendations for a need or offer.
- `POST /api/v1/matches/{id}/accept`: Accept a match proposal and generate a transfer task.
- `POST /api/v1/matches/{id}/reject`: Reject a match proposal with reason.

## Transfer Lifecycle & Verification
- `POST /api/v1/transfers`: Initiate transfer from accepted match.
- `POST /api/v1/transfers/{id}/pickup`: Record pickup confirmation with condition and timestamp.
- `POST /api/v1/transfers/{id}/receive`: Record receipt confirmation with verified quantity.
- `POST /api/v1/transfers/{id}/dispute`: File a dispute on damaged or unfulfilled transfer.

## Impact & Analytics
- `GET /api/v1/impact/me`: Get user's verified and estimated impact summary.
- `GET /api/v1/impact/summary`: Get public aggregate impact metrics.

## Admin Console
- `GET /api/v1/admin/metrics`: Fetch system-wide growth, health, and verified impact metrics.
- `GET /api/v1/admin/organizations`: List pending and verified recipient organizations.
- `POST /api/v1/admin/organizations/{id}/verify`: Approve/reject organization credentials.
- `GET /api/v1/admin/disputes`: List open transfer disputes.
- `POST /api/v1/admin/disputes/{id}/resolve`: Resolve dispute and issue resolution action.
- `POST /api/v1/admin/rules`: Update safety or feasibility rules.
