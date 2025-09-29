# Parcel Delivery System API

A comprehensive RESTful API for managing parcel delivery operations, built with Node.js, Express, TypeScript, and MongoDB. This system handles user management, parcel tracking, payment processing, and role-based access control for a complete delivery management solution.

## 📋 Project Overview

The Parcel Delivery System API provides a robust backend solution for managing the entire lifecycle of parcel deliveries. It supports multiple user roles (Super Admin, Admin, Agent, Rider, and User), real-time parcel tracking, payment integration, and comprehensive status management throughout the delivery process.

## ✨ Features

### User Management

- Role-based access control (Super Admin, Admin, Agent, Rider, User)
- User registration and profile management
- Account status management (Active, Inactive, Blocked)
- Soft delete functionality

### Authentication & Authorization

- JWT-based authentication with access and refresh tokens
- Passport.js integration (Local & JWT strategies)
- Secure password hashing with bcryptjs
- Role-based route protection
- Password change functionality

### Parcel Management

- Create and track parcels with unique tracking IDs
- Comprehensive status tracking (Pending, Accepted, Dispatched, On Transit, Delivered, etc.)
- Detailed parcel information (size, weight, fees)
- Sender and receiver management
- Rider and agent assignment
- Activity logs for status changes
- Query parcels by sender, receiver, agent, or rider

### Payment Processing

- Multiple payment methods (Cash on Delivery, MFS, Bkash, Nagad, SSLCommerz)
- Payment status tracking
- Payment-parcel linkage
- Payment update and management

### Tracking System

- Public parcel tracking via tracking ID
- Detailed delivery logs and history

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js (Local & JWT strategies)
- **Validation:** Zod
- **Security:** bcryptjs, jsonwebtoken, cookie-parser, cors
- **Session Management:** express-session
- **Development:** nodemon, ts-node

## 📁 API Endpoints

### Authentication Routes

**Base URL:** `/api/auth`

| Method | Endpoint               | Description                              | Authentication | Authorization      |
| ------ | ---------------------- | ---------------------------------------- | -------------- | ------------------ |
| POST   | `/login`               | User login with email/phone and password | None           | Public             |
| POST   | `/logout`              | User logout                              | None           | Public             |
| PATCH  | `/change-password`     | Change user password                     | JWT Required   | Authenticated User |
| GET    | `/access-token`        | Refresh access token using refresh token | None           | Public             |
| PATCH  | `/change-role/:userId` | Change user role                         | JWT Required   | Admin, Super Admin |

### User Routes

**Base URL:** `/api/users`

| Method | Endpoint               | Description                        | Authentication | Authorization             |
| ------ | ---------------------- | ---------------------------------- | -------------- | ------------------------- |
| POST   | `/create`              | Create new user account            | None           | Public                    |
| GET    | `/users`               | Get all users                      | JWT Required   | Admin, Super Admin        |
| GET    | `/:userId`             | Get user by ID                     | JWT Required   | Admin, Super Admin, Owner |
| PATCH  | `/update/:userId`      | Update user information            | JWT Required   | Admin, Super Admin, Owner |
| DELETE | `/delete/:userId`      | Permanently delete user            | JWT Required   | Admin, Super Admin, Owner |
| PATCH  | `/soft-delete/:userId` | Soft delete user (mark as deleted) | JWT Required   | Admin, Super Admin, Owner |

### Parcel Routes

**Base URL:** `/api/parcels`

| Method | Endpoint                   | Description                   | Authentication | Authorization                    |
| ------ | -------------------------- | ----------------------------- | -------------- | -------------------------------- |
| POST   | `/create`                  | Create new parcel             | None           | Public                           |
| GET    | `/`                        | Get all parcels               | JWT Required   | Super Admin, Admin               |
| GET    | `/:parcelId`               | Get parcel by ID              | JWT Required   | Super Admin, Admin, Rider, Agent |
| POST   | `/update/:parcelId`        | Update parcel information     | JWT Required   | Super Admin, Admin, Agent        |
| POST   | `/update-status/:parcelId` | Update parcel delivery status | JWT Required   | Super Admin, Admin, Agent        |
| DELETE | `/delete/:parcelId`        | Delete parcel                 | JWT Required   | Super Admin, Admin, Agent        |
| GET    | `/track/:trackingId`       | Track parcel by tracking ID   | None           | Public                           |
| GET    | `/sender/:userId`          | Get parcels by sender         | JWT Required   | Super Admin, Admin, Agent, Owner |
| GET    | `/receiver/:userId`        | Get parcels by receiver       | JWT Required   | Super Admin, Admin, Agent, Owner |
| GET    | `/agent/:agentId`          | Get parcels assigned to agent | JWT Required   | Super Admin, Admin, Agent        |
| GET    | `/rider/:riderId`          | Get parcels assigned to rider | JWT Required   | Super Admin, Admin, Agent, Rider |

### Payment Routes

**Base URL:** `/api/payments`

| Method | Endpoint             | Description                | Authentication | Authorization |
| ------ | -------------------- | -------------------------- | -------------- | ------------- |
| POST   | `/make`              | Create payment for parcel  | None           | Public        |
| PATCH  | `/update`            | Update payment information | None           | Public        |
| GET    | `/:paymentId`        | Get payment by payment ID  | None           | Public        |
| GET    | `/parcel/:parcelId`  | Get payment by parcel ID   | None           | Public        |
| DELETE | `/delete/:paymentId` | Delete payment record      | None           | Public        |

## 👥 User Roles

- **USER:** Regular users who send or receive parcels
- **RIDER:** Delivery personnel responsible for parcel delivery
- **AGENT:** Staff who manage parcel operations and assignments
- **ADMIN:** System administrators with elevated privileges
- **SUPER_ADMIN:** Highest level of access with full system control

## 📦 Parcel Statuses

- **PENDING:** Parcel created, awaiting acceptance
- **ACCEPTED:** Parcel accepted by agent
- **DISPATCHED:** Parcel dispatched from sender location
- **ON_WAREHOUSE:** Parcel in warehouse/sorting facility
- **REJECTED:** Parcel rejected
- **ON_TRANSIT:** Parcel in transit to destination
- **RIDER_ASSIGNED:** Rider assigned for delivery
- **ON_DELIVERY:** Out for delivery
- **DELIVERED:** Successfully delivered
- **FAILED:** Delivery attempt failed
- **RETURNED:** Parcel returned to sender

## 💳 Payment Types

- **CASH_ON_DELIVERY:** Pay upon delivery
- **MFS:** Mobile Financial Services
- **BKASH:** bKash payment gateway
- **NAGAD:** Nagad payment gateway
- **SSLCOMMERZ:** SSLCommerz payment gateway

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd parcel-delivery-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   # SERVER
   PORT=5000
   NODE_ENV=development

   # DATABASE
   DB_URI=mongodb://localhost:27017/parcel-delivery

   # BCRYPT
   BCRYPT_SALT_ROUND=10

   # Express Session
   EXPRESS_SESSION_SECRET=your_session_secret_here

   # JWT
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_ACCESS_EXPIRES=15m
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_REFRESH_EXPIRES=7d
   ```

4. **Build the TypeScript code**

   ```bash
   npm run build
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **For production, start the server**
   ```bash
   npm start
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (to be configured)

## 🔐 Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Management

- **Access Token:** Short-lived token (default: 15 minutes) for API requests
- **Refresh Token:** Long-lived token (default: 7 days) stored in HTTP-only cookie
- Use `/api/auth/access-token` endpoint to refresh expired access tokens

## 📝 API Usage Examples

### User Registration

```bash
POST /api/users/create
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "dob": "1990-01-01",
  "password": "securePassword123"
}
```

### User Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Create Parcel

```bash
POST /api/parcels/create
Content-Type: application/json

{
  "title": "Electronics Package",
  "description": "Laptop and accessories",
  "fees": 150,
  "size": {
    "height": "30cm",
    "width": "40cm",
    "weight": "2kg"
  },
  "types": "Electronics",
  "senderId": "user_id_here",
  "receiverId": "receiver_id_here",
  "address": {
    "returnAddress": "123 Sender St, City",
    "receiverAddress": "456 Receiver Ave, City"
  }
}
```

### Track Parcel

```bash
GET /api/parcels/track/:trackingId
```

## 🔒 Security Features

- Password encryption using bcryptjs
- JWT-based stateless authentication
- HTTP-only cookies for refresh tokens
- CORS enabled for cross-origin requests
- Role-based access control (RBAC)
- Input validation using Zod schemas

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📧 Contact

For any queries or support, please contact the development team.

---

**Note:** All authenticated endpoints require a valid JWT token in the Authorization header. Routes with "Owner" authorization allow users to access their own resources, while role-specific authorization restricts access to specific user roles.
"# parcel-delivery-system-api" 
