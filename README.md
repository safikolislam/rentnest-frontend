
🏠 RentNest

A modern, responsive rental property marketplace built with Next.js, designed to connect tenants with landlords through a simple and user-friendly experience.

RentNest allows tenants to browse and filter properties, submit rental requests, manage rentals and payments, while landlords can manage properties, availability, and rental requests from their dashboard.

🔗 Live Links

Frontend: Add your deployed Vercel URL here

Backend API: https://rentnest-backend-chi.vercel.app

Frontend Repository: https://github.com/safikolislam/rentnest-frontend

Backend Repository: https://github.com/safikolislam/rentnest-backend

✨ Features

👤 Authentication & Authorization

User registration and login

JWT-based authentication

Protected routes

Role-based access control

Tenant and landlord specific dashboards

Secure HTTP-only authentication cookie

🏡 Property Management

Browse available properties

Featured properties

Property details page

Category-based filtering

Advanced property filtering

Landlord property management

Property availability management

📋 Rental Management

Tenants can submit rental requests

Tenants can view their rental requests

Landlords can approve or reject rental requests

Rental status management

💳 Payment

Stripe payment integration

Secure checkout flow

Payment success page

Payment cancellation page

Payment status handling

🎨 UI/UX

Fully responsive design

Mobile-friendly interface

Modern dashboard UI

Loading states

Toast notifications

Custom 404 / Not Found page

User-friendly error handling

Shadcn UI components

🛠️ Tech Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

Shadcn UI

Lucide React

Sonner

Next.js App Router

Backend

Node.js

Express.js

TypeScript

PostgreSQL

Prisma ORM

JWT Authentication

Payment

Stripe

Deployment

Vercel

📁 Project Structure

rentnest-frontend/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── properties/
│   ├── payment/
│   ├── api/
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── service/
├── lib/
├── hooks/
├── types/
├── public/
└── README.md

🔐 Authentication

RentNest uses JWT-based authentication.

The access token is stored in an HTTP-only cookie and is used to authenticate protected requests.

Protected areas include:

Tenant Dashboard

Landlord Dashboard

Rental Management

Payment-related actions

User-specific resources

👥 User Roles

🧑 Tenant

Tenants can:

Browse properties

Search and filter properties

View property details

Submit rental requests

View rental requests

Manage rental-related actions

Make payments

🏠 Landlord

Landlords can:

Add properties

Update properties

Manage property availability

View rental requests

Approve rental requests

Reject rental requests

Manage their listed properties

🔌 API Integration

The frontend communicates with the RentNest backend API for authentication, properties, rentals, payments, and user-related operations.

A separate API_INTEGRATION.md file documents the frontend-to-backend endpoint mapping.

💰 Payment Flow

The payment flow works through Stripe:

Tenant
   ↓
Rental / Payment Page
   ↓
Create Payment Request
   ↓
Stripe Checkout
   ↓
Successful Payment
   ↓
Success Page

If payment is cancelled:

Stripe Checkout
   ↓
Cancel
   ↓
Payment Cancel Page

⚙️ Environment Variables

Create a .env.local file in the root directory:

NEXT_PUBLIC_API_URL=your_backend_api_url
API_URL=your_backend_api_url
NEXT_API_URL=your_backend_api_url

Add any additional Stripe or application-specific environment variables required by your deployment.

Never commit .env.local or secret keys to GitHub.

🚀 Getting Started

1. Clone the repository

git clone https://github.com/safikolislam/rentnest-frontend.git

2. Go to the project directory

cd rentnest-frontend

3. Install dependencies

npm install

4. Configure environment variables

Create .env.local and add the required API configuration.

5. Start the development server

npm run dev

Open:

http://localhost:3000

🏗️ Production Build

npm run build

Then:

npm start

🚀 Deployment

The frontend is designed for deployment on Vercel.

Recommended deployment steps:

Push the project to GitHub.

Import the repository into Vercel.

Add the required environment variables.

Deploy the project.

Verify authentication, property browsing, rental requests, and payment flow.

🛡️ Error Handling

RentNest provides user-friendly error handling through:

Toast notifications

Form validation

API error messages

Loading states

Error boundaries

Custom 404 page

Payment success/cancel pages

📱 Responsive Design

The application is built with a mobile-first approach and is designed to work across:

📱 Mobile

📲 Tablet

💻 Desktop

📸 Screenshots

Add project screenshots here to showcase:

Homepage

Property listing

Property details

Login/Register

Tenant dashboard

Landlord dashboard

Payment page

🔑 Admin Credentials

Admin credentials are required for assignment evaluation.

For security, the admin password is not published in this README.

Admin Email: ShakilMia22@gmail.com

The working admin password should be provided privately to the evaluator/reviewer rather than committed to a public GitHub repository.

🎥 Demo Video

Add the 7–10 minute project walkthrough video link here.

The demonstration should cover:

Project overview

Next.js architecture

Authentication

Tenant functionality

Landlord functionality

CRUD operations

Validation and error handling

Stripe payment flow

A technical challenge and its solution

📚 Assignment Requirements

This project follows the frontend assignment requirements, including:

API integration

API documentation

Responsive UI

Error handling

Authentication

Protected routes

Role-based UI

CRUD functionality

Payment integration

Loading and error states

Meaningful Git commits

👨‍💻 Developer

Safikol Islam

GitHub: https://github.com/safikolislam

⭐ If you find this project useful, consider giving the repository a star.