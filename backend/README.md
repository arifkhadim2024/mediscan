# MediScan AI Backend

This backend powers the MediScan AI prescription scanning experience with authentication, prescription upload, OCR extraction, AI analysis, price comparison, and prescription history.

## Features
- User authentication with JWT
- Prescription upload using Multer
- OCR text extraction from uploaded prescriptions
- AI-powered structured prescription analysis using OpenAI
- Medicine price comparison placeholder service
- Prescription history and deletion
- Validation, error handling, and rate limiting

## Installation
```bash
cd backend
npm install
cp .env.example .env
```

## Environment Variables
Update the .env file with your values:
- PORT
- MONGODB_URI
- JWT_SECRET
- OPENAI_API_KEY
- OCR_API_KEY
- CORS_ORIGIN
- BASE_URL

## Run
```bash
npm run dev
```

## API Endpoints
### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Prescriptions
- POST /api/prescription/upload
- POST /api/prescription/analyze
- GET /api/prescription/history
- DELETE /api/prescription/:id

### Medicine Prices
- GET /api/medicine/prices

## Folder Structure
- src/config - Database and environment config
- src/controllers - Request handlers
- src/middleware - Auth, validation, and error handling
- src/models - MongoDB schemas
- src/routes - API routes
- src/services - Business logic
- src/utils - Shared helpers
- src/uploads - Uploaded files

## Deployment
Deploy to services like Render, Railway, or Heroku. Ensure the environment variables are configured and MongoDB is reachable.
