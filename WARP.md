# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Running the Application
```bash
# Start development server with auto-reload
npm run dev

# Start production server  
node server.js
```

### Environment Setup
Create a `.env` file with required variables:
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_TOKEN` - Secret for JWT signing

### Testing Database Connection
```bash
# Test database connectivity
curl http://localhost:3000/test-db
```

## Architecture Overview

### Core Framework
- **Fastify** web framework with plugin-based architecture
- **MongoDB** with Mongoose ODM for data persistence
- **JWT authentication** for API security
- **File upload support** via @fastify/multipart

### Project Structure
```
├── controllers/          # Business logic handlers
│   ├── authController.js     # User authentication & password reset
│   └── thumbnailController.js # Thumbnail CRUD operations
├── models/              # Mongoose data models
│   ├── user.js             # User schema with auth fields
│   └── thumbnail.js        # Thumbnail schema with user reference
├── plugins/             # Custom Fastify plugins
│   ├── mongodb.js          # Database connection decorator
│   └── jwt.js              # JWT authentication decorator
├── routes/              # API route definitions
│   ├── authRoute.js        # /api/auth/* endpoints
│   └── thumbnailRoute.js   # /api/thumbnail/* endpoints (protected)
├── uploads/             # Static file storage
└── server.js            # Main application entry point
```

### Authentication Flow
- Plugin-based JWT authentication via `plugins/jwt.js`
- `fastify.authenticate` prehandler protects routes
- Password reset tokens with 10-minute expiry
- Thumbnail routes require authentication globally

### API Endpoints
- **Auth**: `/api/auth/*` - registration, login, password reset
- **Thumbnails**: `/api/thumbnail/*` - CRUD operations (authenticated)
- **Static Files**: `/uploads/*` - served via @fastify/static

### Key Architectural Patterns
- **Plugin Registration**: MongoDB connection and JWT auth as reusable plugins
- **Environment Validation**: Schema-based env var validation with @fastify/env
- **MVC Pattern**: Separate controllers, models, and routes
- **User-Scoped Resources**: Thumbnails belong to authenticated users
- **File Upload Handling**: Multipart form data with filesystem storage

### Error Handling
- Controllers use try/catch with reply.send(err)
- Database connection failures exit the process
- File operations handle errors via fastify.log.error()

### Development Notes
- No testing framework currently configured
- File uploads stored in `/uploads/thumbnails/` directory
- Static files served with `/uploads/` prefix
- JWT secret read from environment (note: code references both JWT_TOKEN and JWT_SECRET)