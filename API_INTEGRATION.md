# 🔌 RentNest Frontend – API Integration Mapping

This document provides a clear mapping between the **RentNest Next.js Frontend** and the **Backend REST API**.

It shows which frontend pages/components communicate with which backend endpoints and describes the purpose of each API integration.

📚 **API Documentation:** [RentNest API Documentation](https://documenter.getpostman.com/view/45368212/2sBYAys8sr)

---

## 📌 API Integration Overview

The RentNest frontend is integrated with the backend API across the following major modules:

* 🔑 Authentication & Authorization
* 🏠 Public Property Marketplace
* 🛋️ Tenant Dashboard
* 🏘️ Landlord Dashboard
* 📊 Admin Dashboard
* 🛠️ Error Handling & Form Validation

---

# 🔑 1. Authentication & Authorization

Handles user registration, login, authentication, and protected routes based on user roles.

| Frontend Route / Component   | Method | Backend Endpoint     | Purpose                                                          |
| ---------------------------- | :----: | -------------------- | ---------------------------------------------------------------- |
| `app/auth/register/page.tsx` | `POST` | `/api/auth/register` | Register a new user as Tenant or Landlord                        |
| `app/auth/login/page.tsx`    | `POST` | `/api/auth/login`    | Authenticate user and retrieve JWT token                         |
| `middleware.ts`              |  `GET` | `/api/auth/me`       | Validate the authenticated session and protect role-based routes |

### Supported Roles

* 👤 Tenant
* 🏠 Landlord
* 🛡️ Admin

---

# 🏠 2. Public Property Marketplace

Provides public access to rental properties, property details, filtering, and rental requests.

| Frontend Route / Component     | Method | Backend Endpoint      | Purpose                                                |
| ------------------------------ | :----: | --------------------- | ------------------------------------------------------ |
| `app/page.tsx`                 |  `GET` | `/api/properties`     | Fetch featured rental properties for the homepage      |
| `app/properties/page.tsx`      |  `GET` | `/api/properties`     | Browse and filter available properties                 |
| `app/properties/[id]/page.tsx` |  `GET` | `/api/properties/:id` | Display detailed information about a specific property |
| `components/RequestModal.tsx`  | `POST` | `/api/rentals`        | Submit a rental request for a selected property        |

### 🔎 Property Filters

The property listing page supports filtering based on available query parameters such as:

* 📍 Location
* 💰 Price
* 🏠 Availability

---

# 🛋️ 3. Tenant Dashboard

Allows tenants to manage rental requests, make payments, and submit reviews.

| Frontend Route / Component                        | Method | Backend Endpoint       | Purpose                                                         |
| ------------------------------------------------- | :----: | ---------------------- | --------------------------------------------------------------- |
| `app/dashboard/tenant/page.tsx`                   |  `GET` | `/api/rentals`         | Retrieve the tenant's rental requests and their current status  |
| `app/dashboard/tenant/requests/[id]/pay/page.tsx` | `POST` | `/api/payments/create` | Create a payment session through the configured payment gateway |
| `app/payment/success/page.tsx`                    | `POST` | `/api/reviews`         | Submit a review after completing the rental/payment process     |

### 📋 Rental Request Status

Tenant requests can be displayed with status badges such as:

* 🟡 Pending
* 🟢 Approved
* 🔴 Rejected
* 💳 Paid

---

# 🏘️ 4. Landlord Dashboard

Allows landlords to manage their properties and handle incoming rental requests.

| Frontend Route / Component                       |  Method | Backend Endpoint             | Purpose                                            |
| ------------------------------------------------ | :-----: | ---------------------------- | -------------------------------------------------- |
| `app/dashboard/landlord/page.tsx`                |  `GET`  | `/api/landlord/properties`   | Fetch properties created by the logged-in landlord |
| `app/dashboard/landlord/properties/new/page.tsx` |  `POST` | `/api/landlord/properties`   | Create a new rental property listing               |
| `app/dashboard/landlord/requests/page.tsx`       |  `GET`  | `/api/landlord/requests`     | View rental requests submitted by tenants          |
| `components/ActionButtons.tsx`                   | `PATCH` | `/api/landlord/requests/:id` | Approve or reject a tenant's rental request        |

### 🏠 Landlord Capabilities

* Create rental listings
* Manage listed properties
* View tenant requests
* Approve rental requests
* Reject rental requests

---

# 📊 5. Admin Dashboard

Provides administrators with platform-wide management and monitoring functionality.

| Frontend Route / Component           |  Method | Backend Endpoint       | Purpose                                          |
| ------------------------------------ | :-----: | ---------------------- | ------------------------------------------------ |
| `app/dashboard/admin/page.tsx`       |  `GET`  | `/api/admin/stats`     | Display platform statistics and overall activity |
| `app/dashboard/admin/users/page.tsx` |  `GET`  | `/api/admin/users`     | Retrieve users with search and pagination        |
| `components/BanUserButton.tsx`       | `PATCH` | `/api/admin/users/:id` | Ban or unban users                               |

### 📈 Admin Statistics

The admin dashboard can display information such as:

* 👥 Total Users
* 🏠 Total Properties
* 💰 Revenue
* 📊 Platform Activity

---

# 🛠️ 6. Error Handling & UI Response

The frontend provides consistent feedback and error handling for API requests.

### 🔔 Toast Notifications

API responses are displayed using toast notifications through libraries such as:

* `sonner`
* `react-hot-toast`

Examples include:

* ✅ Successful API requests
* ❌ `400 Bad Request`
* 🔒 `401 Unauthorized`
* 🚫 `403 Forbidden`
* ❌ `404 Not Found`
* ⚠️ `500 Internal Server Error`

---

### 📝 Form Validation

Frontend forms use:

* **React Hook Form** – Form state and submission handling
* **Zod** – Client-side schema validation

Validation rules are designed to remain consistent with the backend validation requirements.

---

### ⏳ Loading & Error States

Next.js built-in route-level UI states are used to provide a better user experience:

* `loading.tsx` → Loading states and skeletons
* `error.tsx` → Error boundary and fallback UI

---

# 🔄 API Integration Flow

```text
User
  │
  ▼
Next.js Frontend
  │
  ├── Authentication
  │       └── /api/auth/*
  │
  ├── Properties
  │       └── /api/properties/*
  │
  ├── Rental Requests
  │       └── /api/rentals/*
  │
  ├── Payments
  │       └── /api/payments/*
  │
  ├── Landlord Management
  │       └── /api/landlord/*
  │
  └── Admin Management
          └── /api/admin/*
                │
                ▼
          RentNest Backend
                │
                ▼
             Database
```

---

# 🧩 Frontend–Backend Architecture

The RentNest application follows a **role-based API integration architecture**:

| Role            | Main Responsibilities                                                    |
| --------------- | ------------------------------------------------------------------------ |
| 👤 **Tenant**   | Browse properties, submit rental requests, make payments, submit reviews |
| 🏠 **Landlord** | Create/manage properties, view requests, approve/reject requests         |
| 🛡️ **Admin**   | Monitor platform statistics and manage users                             |

This structure keeps the frontend organized while maintaining clear separation between public APIs, authenticated user APIs, landlord APIs, and admin APIs.

---

## ✅ Integration Checklist

* [x] Authentication & Authorization
* [x] Property Listing & Details
* [x] Rental Request Management
* [x] Tenant Dashboard
* [x] Landlord Dashboard
* [x] Admin Dashboard
* [x] Payment Integration
* [x] Review Submission
* [x] Form Validation
* [x] Toast Notifications
* [x] Loading States
* [x] Error Boundaries

---

### 🚀 RentNest Frontend

**Next.js • TypeScript • React Hook Form • Zod • REST API • JWT • Stripe/Payment Gateway**

The frontend communicates with the RentNest backend through structured REST API endpoints while providing role-based dashboards and a responsive user experience.
