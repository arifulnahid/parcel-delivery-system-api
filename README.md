# Parcel Delivery API

A comprehensive RESTful API for managing parcel deliveries with role-based authentication and real-time tracking capabilities.

## 📋 Project Overview

The Parcel Delivery API is a robust backend service that facilitates parcel management between users and administrators. The system implements JWT-based authentication with role-based access control, allowing users to create, track, and manage parcel deliveries while providing administrators with comprehensive system management capabilities.

## ✨ Features

### 🔐 Authentication & Authorization

- **JWT-based authentication** with secure token management
- **Password hashing** using bcrypt for enhanced security
- **Role-based access control** with two main user types:
  - `ADMIN` - Full system management capabilities
  - `USER` - Create and manage parcels, track deliveries

### 📦 Parcel Management

- **Complete parcel lifecycle tracking** from creation to delivery
- **Real-time status updates** with comprehensive logging
- **Cancellation capabilities** for non-dispatched parcels
- **Delivery confirmation** system for receivers
- **Public tracking** system for anyone with parcel ID
- **Comprehensive history tracking** for all operations

### 👥 User Management

- **User registration and profile management**
- **Admin-controlled user viewing and management**
- **Role-specific permissions and access control**

### 📊 Admin Features

- **System-wide parcel and user management**
- **Status management and updates**
- **View all users and their profiles**
- **Comprehensive parcel oversight**

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing
- **helmet** - Security middleware

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/parcel-delivery-api.git
   cd parcel-delivery-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   # Server Configuration
   PORT=5175
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/parcel-delivery

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=24h

   # bcrypt Configuration
   BCRYPT_ROUNDS=12
   ```

4. **Start the application**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## 📚 API Documentation

### Base URL

```
http://localhost:5175/api
```

## 🔐 Authentication Endpoints

### POST `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**

```json
{
  "email": "nahid@gmail.com",
  "password": "nahid"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "68ac9523a7be6a9393e2a575",
      "name": "Nahid",
      "email": "nahid@gmail.com",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST `/auth/logout`

Logout user and invalidate token.

**Headers:** `Authorization: {jwt_token}`

---

## 👥 User Management Endpoints

### POST `/user/register`

Register a new user account. **[Any User]**

**Request Body:**

```json
{
  "name": "ariful",
  "email": "nahid1@gmail.com",
  "phone": "01642791171",
  "password": "nahid",
  "dob": "10-11-2025"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "68adc87548a4fce7d7bb73a7",
      "name": "ariful",
      "email": "nahid1@gmail.com",
      "phone": "01642791171",
      "role": "USER"
    },
    "token": "jwt_token_here"
  }
}
```

### GET `/user/all-users`

Get all users in the system. **[Only Admin]**

**Headers:** `Authorization: {jwt_token}`

**Response:**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "68ac9523a7be6a9393e2a575",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "01642791171",
        "role": "USER",
        "dob": "10-11-2025",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1
  }
}
```

### GET `/user/profile/:userId`

Get specific user profile by ID. **[Auth User or Admin]**

**Headers:** `Authorization: {jwt_token}`

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "68ac9523a7be6a9393e2a575",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "01642791171",
      "role": "USER",
      "dob": "10-11-2025"
    }
  }
}
```

### GET `/user/profile`

Get current authenticated user profile. **[Auth User]**

**Headers:** `Authorization: {jwt_token}`

---

## 📦 Parcel Management Endpoints

### POST `/parcel/create`

Create a new parcel delivery request. **[Any Auth User]**

**Headers:** `Authorization: {jwt_token}`

**Request Body:**

```json
{
  "title": "Electronics Package",
  "weight": 1,
  "height": 3,
  "width": 2,
  "receiver": {
    "phone": "01642791171",
    "email": "mdnahid6530@gmail.com",
    "address": "Noakhali"
  },
  "sender": {
    "phone": "01642791171",
    "email": "mdnahid6530@gmail.com",
    "address": "Dhaka"
  },
  "senderId": "68ac9523a7be6a9393e2a575",
  "fees": 100
}
```

**Response:**

```json
{
  "success": true,
  "message": "Parcel created successfully",
  "data": {
    "parcel": {
      "id": "68aedc20f4859d105f14a1d1",
      "title": "Electronics Package",
      "trackingNumber": "PKG001234567",
      "status": "PENDING",
      "weight": 1,
      "dimensions": {
        "height": 3,
        "width": 2
      },
      "fees": 100,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### GET `/parcel`

Get all parcels in the system. **[Only Admin]**

**Headers:** `Authorization: {jwt_token}`

**Response:**

```json
{
  "success": true,
  "data": {
    "parcels": [
      {
        "id": "68aedc20f4859d105f14a1d1",
        "title": "Electronics Package",
        "trackingNumber": "PKG001234567",
        "status": "PENDING",
        "sender": {
          "phone": "01642791171",
          "email": "mdnahid6530@gmail.com",
          "address": "Dhaka"
        },
        "receiver": {
          "phone": "01642791171",
          "email": "mdnahid6530@gmail.com",
          "address": "Noakhali"
        },
        "fees": 100,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1
  }
}
```

### GET `/parcel/track/:parcelId`

Get parcel details for tracking. **[Any User - Public Access]**

**Response:**

```json
{
  "success": true,
  "data": {
    "parcel": {
      "id": "68aedc20f4859d105f14a1d1",
      "title": "Electronics Package",
      "trackingNumber": "PKG001234567",
      "status": "IN_TRANSIT",
      "sender": {
        "address": "Dhaka"
      },
      "receiver": {
        "address": "Noakhali"
      },
      "statusHistory": [
        {
          "status": "PENDING",
          "message": "Parcel created",
          "timestamp": "2024-01-15T10:30:00Z"
        },
        {
          "status": "IN_TRANSIT",
          "message": "On transit",
          "timestamp": "2024-01-15T14:30:00Z"
        }
      ]
    }
  }
}
```

### POST `/parcel/cancel/:parcelId`

Cancel a parcel if not dispatched. **[Only Sender]**

**Headers:** `Authorization: {jwt_token}`

**Request Body:**

```json
{
  "message": "Parcel Cancel",
  "description": "Customer requested cancellation"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Parcel cancelled successfully",
  "data": {
    "parcel": {
      "id": "68baef25b2c4792444cce7ba",
      "status": "CANCELLED",
      "updatedAt": "2024-01-15T16:30:00Z"
    }
  }
}
```

### POST `/parcel/status/:parcelId`

Update parcel status. **[Only Admin]**

**Headers:** `Authorization: {jwt_token}`

**Request Body:**

```json
{
  "message": "On transit",
  "description": "Package is being transported to destination"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Parcel status updated successfully",
  "data": {
    "parcel": {
      "id": "68aedc20f4859d105f14a1d1",
      "status": "IN_TRANSIT",
      "lastUpdate": "2024-01-15T14:30:00Z"
    }
  }
}
```

### POST `/parcel/delivered/:parcelId`

Mark parcel as delivered. **[Only Receiver]**

**Headers:** `Authorization: {jwt_token}`

**Request Body:**

```json
{
  "message": "Delivered",
  "description": "Package received in good condition"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Parcel marked as delivered",
  "data": {
    "parcel": {
      "id": "68baef25b2c4792444cce7ba",
      "status": "DELIVERED",
      "deliveredAt": "2024-01-15T18:30:00Z"
    }
  }
}
```

---

## 📊 Data Models

### User Schema

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed with bcrypt
  phone: string;
  role: "ADMIN" | "USER";
  dob: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Parcel Schema

```typescript
interface Parcel {
  id: string;
  title: string;
  trackingNumber: string; // auto-generated
  senderId: string;
  sender: {
    phone: string;
    email: string;
    address: string;
  };
  receiver: {
    phone: string;
    email: string;
    address: string;
  };
  weight: number;
  height: number;
  width: number;
  fees: number;
  status: ParcelStatus;
  statusHistory: StatusLog[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Status Log Schema

```typescript
interface StatusLog {
  status: ParcelStatus;
  message: string;
  description?: string;
  timestamp: Date;
  updatedBy?: string; // user ID
}
```

### Parcel Status Enum

```typescript
enum ParcelStatus {
  PENDING = "PENDING",
  DISPATCHED = "DISPATCHED",
  IN_TRANSIT = "IN_TRANSIT",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
```

---

## 🔒 Security Features

- **JWT token-based authentication**
- **Password hashing** using bcrypt
- **Role-based access control** for all protected endpoints
- **Input validation** and sanitization
- **CORS configuration** for cross-origin security
- **Helmet middleware** for security headers
- **Protected routes** based on user roles

---

## 🚦 API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data object
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

---

## 🚦 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `500` - Internal Server Error

---

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note:** Do not include "Bearer" prefix - just the token directly.

---

## 📝 Role-Based Access Control

### Public Access

- `GET /parcel/track/:parcelId` - Anyone can track parcels

### User Access (Authenticated)

- `POST /parcel/create` - Create new parcels
- `POST /parcel/cancel/:parcelId` - Cancel own parcels (if sender)
- `POST /parcel/delivered/:parcelId` - Mark as delivered (if receiver)
- `GET /user/profile` - View own profile
- `GET /user/profile/:userId` - View specific user profile

### Admin Access Only

- `GET /user/all-users` - View all users
- `GET /parcel` - View all parcels
- `POST /parcel/status/:parcelId` - Update parcel status

---

## 🧪 Testing with HTTP Client

You can test the API using the provided HTTP requests. Make sure to:

1. Register a user first
2. Login to get the JWT token
3. Use the token in subsequent requests
4. Replace placeholder IDs with actual IDs from your database

---

## 📝 Environment Variables

| Variable        | Description               | Default       | Required |
| --------------- | ------------------------- | ------------- | -------- |
| `PORT`          | Server port               | `5175`        | No       |
| `NODE_ENV`      | Environment               | `development` | No       |
| `MONGODB_URI`   | MongoDB connection string | -             | Yes      |
| `JWT_SECRET`    | JWT signing secret        | -             | Yes      |
| `JWT_EXPIRE`    | JWT expiration time       | `24h`         | No       |
| `BCRYPT_ROUNDS` | bcrypt hashing rounds     | `12`          | No       |

## 🗺️ Roadmap

- [ ] Real-time notifications
- [ ] Email notifications for status updates
- [ ] Mobile app integration
- [ ] Payment gateway integration
- [ ] Advanced search and filtering
- [ ] Delivery photo proof
- [ ] SMS notifications
- [ ] Bulk parcel operations
