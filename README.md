# 🚗 RentalPro - AI-Powered Car Rental Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748?style=for-the-badge&logo=prisma)

**A modern, full-stack car rental management platform built with cutting-edge technologies.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [API](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Authentication](#-authentication)
- [Features Explained](#-features-explained)
- [Design System](#-design-system)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Performance](#-performance-optimization)
- [Security](#-security)
- [FAQ](#-frequently-asked-questions)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**RentalPro** is a comprehensive, enterprise-grade car rental management system designed to streamline fleet operations, enhance customer experience, and provide actionable business insights through AI-powered analytics.

### What Makes RentalPro Special?

- **🎨 Modern UI/UX**: Vibrant gradient-based design system with smooth animations
- **🤖 AI Integration**: Intelligent chatbot and automated business insights
- **📊 Real-time Analytics**: Live dashboards with interactive charts and KPIs
- **🔐 Enterprise Security**: JWT authentication with email verification
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ High Performance**: Built with Next.js 16 for optimal speed and SEO
- **🎯 Type-Safe**: Full TypeScript support for reduced bugs
- **🔄 Real-time Updates**: Instant data synchronization across all modules

### Who Is This For?

- Car rental businesses looking to digitize operations
- Fleet management companies
- Vehicle sharing platforms
- Entrepreneurs building rental services
- Developers learning modern full-stack development

---

## ✨ Key Features

### 🚙 Vehicle Management
Complete fleet control with comprehensive vehicle tracking:

- **Add/Edit/Delete Vehicles**: Full CRUD operations with validation
- **Multi-Brand Support**: Manage 136+ vehicles across 39 different brands
- **Real-time Availability**: Automatic status updates based on rental schedules
- **Vehicle Details**: Track model, brand, daily pricing, and availability status
- **Search & Filter**: Quick vehicle lookup with advanced filtering
- **Bulk Operations**: Import/export vehicle data (CSV support)
- **Maintenance Tracking**: Schedule and track vehicle maintenance (upcoming feature)

### 👥 Customer Management
Streamlined customer relationship management:

- **Customer Profiles**: Complete contact information and rental history
- **Soft Delete**: Mark customers as deleted without losing historical data
- **Rental History**: Track all past and current rentals per customer
- **Contact Management**: Email, phone, and address tracking
- **Customer Analytics**: View customer lifetime value and rental patterns
- **Quick Actions**: One-click access to customer rentals and feedback
- **Export Data**: Generate customer reports in multiple formats

### 📝 Rental System
Efficient rental booking and management:

- **Smart Booking**: Create rentals with automatic availability checking
- **Date Validation**: Prevent overlapping bookings automatically
- **Cost Calculator**: Real-time rental cost estimation based on duration
- **Status Tracking**: Monitor rental lifecycle (active, completed, canceled)
- **Rental Timeline**: Visual representation of booking periods
- **Modification Support**: Update rental dates and status
- **Automatic Vehicle Updates**: Vehicle availability syncs with rental status
- **Rental Extensions**: Allow customers to extend rental periods

### 💬 Feedback System
Collect and analyze customer satisfaction:

- **Rating System**: 5-star rating with text comments
- **Feedback Analytics**: Aggregate satisfaction scores over time
- **Trend Analysis**: Identify patterns in customer feedback
- **Response Management**: Reply to customer feedback (upcoming)
- **Sentiment Analysis**: AI-powered feedback categorization (upcoming)
- **Export Reports**: Download feedback data for external analysis

### 📊 Analytics Dashboard
Comprehensive business intelligence:

#### Revenue Tracking
- **Daily Revenue Charts**: Animated bar charts showing revenue trends
- **Time Period Selection**: View data for 7, 30, or 90 days
- **Revenue Breakdown**: Total, average, and peak revenue metrics
- **Growth Indicators**: Visual representation of revenue growth
- **Forecasting**: Predictive analytics for future revenue (AI-powered)

#### Fleet Utilization
- **Utilization Percentage**: Real-time fleet usage statistics
- **Color-coded Indicators**:
  - 🟡 Yellow: <50% (Low utilization)
  - 🟢 Green: 50-79% (Good utilization)
  - 🔴 Red: ≥80% (High utilization)
- **Available Vehicles**: Live count of ready-to-rent vehicles
- **Usage Patterns**: Identify peak and off-peak periods
- **Optimization Suggestions**: AI recommendations for fleet management

#### Customer Satisfaction
- **Average Ratings**: Overall satisfaction score
- **Rating Distribution**: Breakdown by rating levels
- **Trend Analysis**: Track satisfaction over time
- **Review Count**: Total number of customer reviews
- **Status Indicators**: Excellent/Good/Needs Improvement badges

#### Key Performance Indicators (KPIs)
- **Total Revenue**: All-time rental revenue
- **Active Rentals**: Currently ongoing rentals
- **Total Customers**: Active customer accounts
- **Fleet Size**: Total vehicles in inventory
- **Fleet Utilization**: Current utilization percentage
- **Customer Satisfaction**: Average rating across all feedback

### 🤖 AI-Powered Chatbot
Intelligent virtual assistant for quick actions:

- **Starter Prompts**: Horizontal scrollable quick actions
  - "Show me today's revenue"
  - "How many vehicles are available?"
  - "What's our customer satisfaction score?"
  - "List active rentals"
  - "Show vehicle utilization"
- **Auto-fill Functionality**: Click to populate input field
- **Context-Aware Responses**: Understands business data
- **Natural Language Processing**: Ask questions in plain English
- **Action Execution**: Perform tasks through chat interface
- **Multi-language Support**: Coming soon

### 🔐 Authentication & Security

#### User Registration Flow
1. **Sign Up Form**: Email, name, phone, password
2. **Password Validation**:
   - Minimum 8 characters
   - Must contain uppercase, lowercase, number, special character
3. **Email Verification**: OTP sent to registered email
4. **6-digit OTP**: Secure one-time password
5. **Account Activation**: Auto-login after verification

#### Login System
- **JWT Token Generation**: Secure token-based authentication
- **Session Management**: LocalStorage persistence
- **Auto-refresh**: Token renewal before expiration
- **Remember Me**: Optional extended session
- **Password Reset**: Email-based recovery (upcoming)

#### Security Features
- **Bcrypt Hashing**: Password encryption with salt rounds
- **JWT Secrets**: Environment-based token signing
- **Protected Routes**: Route guards for authenticated pages
- **CORS Protection**: Cross-origin request security
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Protection**: Input sanitization
- **Rate Limiting**: API request throttling (upcoming)

### 🎨 Modern UI/UX Design

#### Gradient Design System
Each module has its own vibrant color scheme:

- **🔵 Vehicles**: Blue/Cyan gradients - Trust and reliability
- **🟣 Rentals**: Purple/Pink gradients - Luxury and premium
- **🟢 Customers**: Green/Emerald gradients - Growth and harmony
- **🟡 Feedback**: Yellow/Orange gradients - Energy and enthusiasm
- **🔷 Analytics**: Teal/Cyan gradients - Intelligence and clarity
- **🟣 Primary Actions**: Indigo/Purple gradients - Innovation

#### Animation Patterns
- **Entrance Animations**: Staggered fade-in with slide effects
- **Hover Effects**:
  - Icon rotation (360°)
  - Scale transformations (1.05x)
  - Glow effects with blur
- **Loading States**: Skeleton screens and spinners
- **Transitions**: Smooth 300ms cubic-bezier transitions
- **Micro-interactions**: Button press feedback, card lifts

#### Responsive Design
- **Mobile-First Approach**: Optimized for 320px+ screens
- **Breakpoints**:
  - Mobile: 320px - 640px
  - Tablet: 641px - 1024px
  - Desktop: 1025px+
- **Touch-Friendly**: Large tap targets (44px minimum)
- **Adaptive Layouts**: Grid systems adjust by screen size

---

## 📸 Screenshots

### Landing Page
> Vibrant hero section with animated stats and call-to-action buttons

### Dashboard Overview
> Real-time KPIs with gradient cards and statistics

### Vehicle Management
> Grid view of all vehicles with quick actions

### Analytics Dashboard
> Interactive charts showing revenue, utilization, and satisfaction

### AI Chatbot
> Intelligent assistant with starter prompts

*Note: Add actual screenshots to your repository's `/docs/screenshots/` directory*

---

## 🛠️ Tech Stack

### Frontend Technologies

#### Core Framework
- **Next.js 16.1.1**
  - App Router for file-based routing
  - Server Components for improved performance
  - API Routes for backend functionality
  - Built-in image optimization
  - Automatic code splitting

- **React 19.2.3**
  - Latest features and optimizations
  - Server Components support
  - Improved hydration
  - Concurrent rendering

- **TypeScript 5.0**
  - Full type safety
  - Enhanced IntelliSense
  - Compile-time error detection
  - Better refactoring support

#### Styling & UI
- **Tailwind CSS v4**
  - Utility-first CSS framework
  - JIT (Just-In-Time) compilation
  - Custom design system
  - Responsive utilities
  - Dark mode support

- **Framer Motion**
  - Declarative animations
  - Spring physics
  - Gesture animations
  - Layout animations
  - SVG animations

- **shadcn/ui**
  - Beautifully designed components
  - Accessible by default
  - Customizable and composable
  - TypeScript support

- **Lucide React**
  - 1000+ customizable icons
  - Tree-shakeable
  - TypeScript definitions
  - Consistent design language

#### Form Management
- **React Hook Form**
  - Performant form validation
  - Minimal re-renders
  - Easy integration with UI libraries
  - Built-in validation

- **Zod**
  - TypeScript-first schema validation
  - Type inference
  - Composable schemas
  - Detailed error messages

### Backend Technologies

#### Database
- **MySQL 8.0**
  - ACID compliance
  - High performance
  - Proven reliability
  - Wide hosting support

- **Prisma ORM**
  - Type-safe database client
  - Auto-generated types
  - Migration system
  - Database GUI (Prisma Studio)
  - Connection pooling

#### Authentication
- **JWT (jsonwebtoken)**
  - Stateless authentication
  - Secure token signing
  - Expiration management
  - Refresh token support

- **Bcrypt**
  - Password hashing
  - Salt generation
  - Secure comparison
  - Configurable rounds

#### Email Service
- **Nodemailer**
  - Email sending
  - SMTP support
  - HTML templates
  - Attachment support

### Development Tools

- **ESLint**: Code linting and quality
- **Prettier**: Code formatting (optional)
- **Git**: Version control
- **npm/yarn/pnpm**: Package management
- **VS Code**: Recommended IDE

### Deployment & Hosting

- **Vercel**: Recommended platform
- **PlanetScale**: MySQL hosting option
- **Cloudinary**: Image hosting (optional)
- **SendGrid**: Email service (alternative to SMTP)

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │     Auth     │  │   Dashboard  │      │
│  │     Page     │  │    Pages     │  │    Pages     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js API Routes                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │   Auth   │ │ Vehicles │ │ Customers│ │ Analytics│      │
│  │   API    │ │   API    │ │   API    │ │   API    │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Prisma Client
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      MySQL Database                          │
│  ┌──────┐ ┌──────────┐ ┌─────────┐ ┌─────────┐            │
│  │ User │ │ Customer │ │ Vehicle │ │ Rental  │            │
│  └──────┘ └──────────┘ └─────────┘ └─────────┘            │
│  ┌──────────┐                                               │
│  │ Feedback │                                               │
│  └──────────┘                                               │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow

1. **Client Request**: User interacts with UI
2. **Next.js Routing**: App Router handles navigation
3. **API Route**: Request processed by API endpoint
4. **Validation**: Zod schema validates input
5. **Authentication**: JWT token verified (if protected)
6. **Database Query**: Prisma executes type-safe query
7. **Response**: JSON data returned to client
8. **UI Update**: React re-renders with new data

### Data Flow

```
User Action → Component → API Call → Validation →
Authentication → Database → Response → State Update → UI Render
```

---

## 📋 Prerequisites

Before installing RentalPro, ensure your system meets these requirements:

### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`
   - NPM comes bundled with Node.js

2. **MySQL** (v8.0 or higher)
   - **Windows**: Download from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
   - **macOS**: Install via Homebrew: `brew install mysql`
   - **Linux**: `sudo apt-get install mysql-server`
   - Verify installation: `mysql --version`

3. **Git** (Latest version)
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

### Recommended Software

- **Visual Studio Code**: Recommended code editor
- **Postman**: API testing tool
- **MySQL Workbench**: Database management GUI
- **Chrome DevTools**: Browser debugging

### System Requirements

- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 500MB free space
- **OS**: Windows 10+, macOS 10.15+, or Ubuntu 20.04+
- **Internet**: Required for package installation

---

## 🚀 Installation

Follow these detailed steps to set up RentalPro on your local machine:

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/car-rental-management-sys.git

# OR using SSH
git clone git@github.com:yourusername/car-rental-management-sys.git

# Navigate to project directory
cd car-rental-management-sys/my-app
```

### Step 2: Install Dependencies

```bash
# Using npm (recommended)
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

**What gets installed:**
- Next.js and React core libraries
- Prisma ORM and client
- Authentication packages (JWT, bcrypt)
- UI components (Tailwind, Framer Motion, shadcn/ui)
- Validation libraries (Zod)
- Email service (Nodemailer)
- Development tools (TypeScript, ESLint)

This process typically takes 2-5 minutes depending on your internet speed.

### Step 3: Environment Configuration

Create a `.env` file in the root directory (`my-app/.env`):

```bash
# Copy the example file (if available)
cp .env.example .env

# OR create manually
touch .env
```

Add the following environment variables:

```env
# ==========================================
# DATABASE CONFIGURATION
# ==========================================
# Format: mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
# Example for local MySQL:
DATABASE_URL="mysql://root:yourpassword@localhost:3306/car_rental_db"

# For PlanetScale (production):
# DATABASE_URL="mysql://username:password@host.psdb.cloud/database?sslaccept=strict"

# ==========================================
# JWT AUTHENTICATION
# ==========================================
# Generate a secure random string for production
# You can use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-change-in-production"

# Token expiration (optional, defaults to 7d)
JWT_EXPIRES_IN="7d"

# ==========================================
# EMAIL CONFIGURATION
# ==========================================
# For Gmail:
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"

# Gmail App Password Setup:
# 1. Enable 2-Factor Authentication on your Google Account
# 2. Go to https://myaccount.google.com/apppasswords
# 3. Generate an app password for "Mail"
# 4. Use that 16-character password here

# SMTP Configuration (alternative):
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"

# Email Sender Info:
EMAIL_FROM="RentalPro <noreply@rentalpro.com>"

# ==========================================
# APPLICATION SETTINGS
# ==========================================
# Base URL for your application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# For production:
# NEXT_PUBLIC_APP_URL="https://your-domain.com"

# ==========================================
# OPTIONAL: AI & ANALYTICS
# ==========================================
# OpenAI API Key (for AI chatbot - optional)
# OPENAI_API_KEY="sk-your-openai-api-key"

# ==========================================
# OPTIONAL: FILE UPLOADS
# ==========================================
# Cloudinary (for image uploads - optional)
# CLOUDINARY_CLOUD_NAME="your-cloud-name"
# CLOUDINARY_API_KEY="your-api-key"
# CLOUDINARY_API_SECRET="your-api-secret"
```

### Step 4: Database Setup

#### Create Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE car_rental_db;

# Verify
SHOW DATABASES;

# Exit
exit;
```

#### Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# This creates type-safe database client based on your schema

# Run migrations to create tables
npx prisma migrate dev --name init

# This will:
# 1. Create all tables defined in schema.prisma
# 2. Set up relationships
# 3. Create indexes
# 4. Generate migration history
```

#### Seed Database (Optional)

Create seed data for development:

```bash
# Run seed script (if available)
npx prisma db seed

# OR manually add data using Prisma Studio
npx prisma studio
```

**Prisma Studio** opens at `http://localhost:5555` and provides a GUI to:
- View all tables
- Add/edit/delete records
- Explore relationships
- Test queries

### Step 5: Verify Installation

```bash
# Check if all dependencies are installed
npm list --depth=0

# Verify TypeScript compilation
npx tsc --noEmit

# Run database check
npx prisma validate
```

If all commands succeed, your installation is complete!

---

## ⚙️ Configuration

### Database Configuration

#### Local MySQL Setup

1. **Install MySQL Server** (if not already installed)
2. **Start MySQL Service**:
   ```bash
   # Windows (Command Prompt as Admin)
   net start MySQL80

   # macOS
   brew services start mysql

   # Linux
   sudo systemctl start mysql
   ```

3. **Secure MySQL Installation** (recommended):
   ```bash
   sudo mysql_secure_installation
   ```

4. **Create User** (if using non-root user):
   ```sql
   CREATE USER 'rentalpro'@'localhost' IDENTIFIED BY 'strongpassword';
   GRANT ALL PRIVILEGES ON car_rental_db.* TO 'rentalpro'@'localhost';
   FLUSH PRIVILEGES;
   ```

#### Connection String Format

```
mysql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?[PARAMETERS]

Examples:
- Local: mysql://root:password@localhost:3306/car_rental_db
- Remote: mysql://user:pass@db.example.com:3306/dbname
- PlanetScale: mysql://user:pass@aws.connect.psdb.cloud/dbname?sslaccept=strict
```

### Email Configuration

#### Gmail Setup

1. **Enable 2-Factor Authentication**:
   - Go to Google Account settings
   - Security → 2-Step Verification
   - Turn on 2FA

2. **Generate App Password**:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
   - Use in `.env` file

3. **Configure SMTP**:
   ```env
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  # App password
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   ```

#### Alternative Email Services

**SendGrid**:
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
```

**Mailgun**:
```env
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
EMAIL_USER="postmaster@your-domain.mailgun.org"
EMAIL_PASSWORD="your-mailgun-password"
```

### JWT Configuration

#### Generate Secure Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using online generator
# Visit: https://randomkeygen.com/
```

#### Token Settings

```env
JWT_SECRET="your-64-character-hex-string"
JWT_EXPIRES_IN="7d"  # Options: 1d, 7d, 30d, etc.
```

### Environment-Specific Configuration

#### Development (.env.development)
```env
DATABASE_URL="mysql://root:password@localhost:3306/car_rental_dev"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

#### Production (.env.production)
```env
DATABASE_URL="mysql://user:pass@production-db.com:3306/car_rental_prod"
NEXT_PUBLIC_APP_URL="https://rentalpro.com"
NODE_ENV="production"
```

---

## 🗄️ Database Setup

### Prisma Schema Overview

The database schema is defined in `prisma/schema.prisma`:

```prisma
// User Model - Authentication
model User {
  id              String    @id @default(uuid())
  email           String    @unique
  name            String
  phone           String
  password        String
  isVerified      Boolean   @default(false)
  verificationOTP String?
  otpExpiry       DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  customers       Customer[]
}

// Customer Model - Customer Management
model Customer {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  phone     String
  isDeleted Boolean   @default(false)
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  rentals   Rental[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

// Vehicle Model - Fleet Management
model Vehicle {
  id          String    @id @default(uuid())
  model       String
  brand       String
  dailyPrice  Float
  isAvailable Boolean   @default(true)
  rentals     Rental[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// Rental Model - Booking Management
model Rental {
  id         String    @id @default(uuid())
  customerId String
  vehicleId  String
  startDate  DateTime
  endDate    DateTime
  totalCost  Float
  status     String    @default("active") // active, completed, canceled
  customer   Customer  @relation(fields: [customerId], references: [id])
  vehicle    Vehicle   @relation(fields: [vehicleId], references: [id])
  feedback   Feedback?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

// Feedback Model - Customer Satisfaction
model Feedback {
  id        String   @id @default(uuid())
  rentalId  String   @unique
  rating    Int      // 1-5 stars
  comment   String?
  rental    Rental   @relation(fields: [rentalId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Database Relationships

```
User (1) ──────────── (Many) Customer
Customer (1) ──────── (Many) Rental
Vehicle (1) ─────────── (Many) Rental
Rental (1) ──────────── (1) Feedback
```

### Migration Commands

```bash
# Create a new migration
npx prisma migrate dev --name add_new_field

# Apply pending migrations
npx prisma migrate deploy

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Generate Prisma Client after schema changes
npx prisma generate
```

### Database Management

```bash
# Open Prisma Studio (Database GUI)
npx prisma studio

# Format schema file
npx prisma format

# Validate schema
npx prisma validate

# Pull schema from existing database
npx prisma db pull

# Push schema without migrations (dev only)
npx prisma db push
```

### Seeding Database

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@rentalpro.com',
      name: 'Admin User',
      phone: '+1234567890',
      password: hashedPassword,
      isVerified: true,
    },
  });

  // Create sample vehicles
  const vehicles = await prisma.vehicle.createMany({
    data: [
      { brand: 'Toyota', model: 'Camry', dailyPrice: 45.00 },
      { brand: 'Honda', model: 'Accord', dailyPrice: 50.00 },
      { brand: 'Tesla', model: 'Model 3', dailyPrice: 120.00 },
      { brand: 'BMW', model: 'X5', dailyPrice: 150.00 },
      { brand: 'Mercedes', model: 'C-Class', dailyPrice: 140.00 },
    ],
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Run seed:
```bash
npx prisma db seed
```

---

## 🏃 Running the Application

### Development Mode

```bash
# Start development server
npm run dev

# The application will start at:
# 🚀 http://localhost:3000

# Features in development mode:
# - Hot Module Replacement (HMR)
# - Fast Refresh for React
# - Detailed error messages
# - Source maps for debugging
```

### Production Mode

```bash
# Build for production
npm run build

# This creates an optimized production build
# Output: .next/ directory

# Start production server
npm run start

# Production features:
# - Minified JavaScript
# - Optimized images
# - Server-side rendering
# - Static page generation
```

### Other Commands

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix

# Type check
npx tsc --noEmit

# Clean build
rm -rf .next
npm run build

# View bundle analyzer
npm run analyze (if configured)
```

### Accessing the Application

1. **Landing Page**: http://localhost:3000
2. **Login**: http://localhost:3000/login
3. **Register**: http://localhost:3000/register
4. **Dashboard**: http://localhost:3000/overview (requires login)
5. **API Docs**: http://localhost:3000/api (coming soon)

---

## 📁 Project Structure

### Detailed Directory Breakdown

```
my-app/
│
├── 📁 app/                              # Next.js App Router (Main Application)
│   ├── 📁 (auth)/                       # Route Group: Authentication Routes
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx             # Login page component
│   │   ├── 📁 register/
│   │   │   └── 📄 page.tsx             # Registration page
│   │   └── 📄 layout.tsx               # Auth layout (minimal, no sidebar)
│   │
│   ├── 📁 (dashboard)/                  # Route Group: Protected Dashboard Routes
│   │   ├── 📁 analytics/
│   │   │   └── 📄 page.tsx             # Analytics dashboard with charts
│   │   ├── 📁 customers/
│   │   │   └── 📄 page.tsx             # Customer management page
│   │   ├── 📁 feedback/
│   │   │   └── 📄 page.tsx             # Feedback collection page
│   │   ├── 📁 overview/
│   │   │   └── 📄 page.tsx             # Dashboard home/overview
│   │   ├── 📁 rentals/
│   │   │   └── 📄 page.tsx             # Rental management page
│   │   ├── 📁 vehicles/
│   │   │   └── 📄 page.tsx             # Vehicle fleet management
│   │   └── 📄 layout.tsx               # Dashboard layout (with sidebar)
│   │
│   ├── 📁 api/                          # Next.js API Routes (Backend)
│   │   ├── 📁 analytics/
│   │   │   ├── 📁 kpis/
│   │   │   │   └── 📄 route.ts         # GET /api/analytics/kpis
│   │   │   └── 📁 trends/
│   │   │       └── 📄 route.ts         # GET /api/analytics/trends
│   │   ├── 📁 auth/
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 route.ts         # POST /api/auth/login
│   │   │   ├── 📁 register/
│   │   │   │   └── 📄 route.ts         # POST /api/auth/register
│   │   │   ├── 📁 verify/
│   │   │   │   └── 📄 route.ts         # POST /api/auth/verify
│   │   │   └── 📁 resend-otp/
│   │   │       └── 📄 route.ts         # POST /api/auth/resend-otp
│   │   ├── 📁 customers/
│   │   │   ├── 📁 [id]/                # Dynamic route parameter
│   │   │   │   └── 📄 route.ts         # PUT/DELETE /api/customers/:id
│   │   │   └── 📄 route.ts             # GET/POST /api/customers
│   │   ├── 📁 feedback/
│   │   │   ├── 📁 [id]/
│   │   │   │   └── 📄 route.ts         # DELETE /api/feedback/:id
│   │   │   └── 📄 route.ts             # GET/POST /api/feedback
│   │   ├── 📁 rentals/
│   │   │   ├── 📁 [id]/
│   │   │   │   └── 📄 route.ts         # PUT/DELETE /api/rentals/:id
│   │   │   └── 📄 route.ts             # GET/POST /api/rentals
│   │   └── 📁 vehicles/
│   │       ├── 📁 [id]/
│   │       │   └── 📄 route.ts         # PUT/DELETE /api/vehicles/:id
│   │       └── 📄 route.ts             # GET/POST /api/vehicles
│   │
│   ├── 📁 verify-email/
│   │   └── 📄 page.tsx                 # Email verification page (OTP input)
│   │
│   ├── 📄 layout.tsx                   # Root layout (applies to all pages)
│   ├── 📄 page.tsx                     # Landing page (/)
│   ├── 📄 globals.css                  # Global CSS and Tailwind directives
│   └── 📄 favicon.ico                  # Browser favicon
│
├── 📁 components/                       # Reusable React Components
│   ├── 📁 analytics/
│   │   ├── 📄 KPICard.tsx              # Metric display card component
│   │   ├── 📄 RevenueChart.tsx         # Revenue trend bar chart
│   │   ├── 📄 UtilizationChart.tsx     # Fleet utilization chart
│   │   └── 📄 SatisfactionChart.tsx    # Customer satisfaction chart
│   ├── 📁 chatbot/
│   │   └── 📄 Chatbot.tsx              # AI chatbot with starter prompts
│   ├── 📁 customers/
│   │   ├── 📄 CustomerCard.tsx         # Individual customer display card
│   │   └── 📄 CustomerForm.tsx         # Add/Edit customer form
│   ├── 📁 feedback/
│   │   └── 📄 FeedbackForm.tsx         # Feedback submission form
│   ├── 📁 landing/                     # Landing page sections
│   │   ├── 📄 Header.tsx               # Site header with navigation
│   │   ├── 📄 Hero.tsx                 # Hero section with CTA
│   │   ├── 📄 Features.tsx             # Features showcase
│   │   ├── 📄 Stats.tsx                # Statistics section
│   │   └── 📄 Footer.tsx               # Site footer
│   ├── 📁 layout/
│   │   └── 📄 Sidebar.tsx              # Dashboard navigation sidebar
│   ├── 📁 rentals/
│   │   └── 📄 RentalForm.tsx           # Create rental form
│   ├── 📁 ui/                          # Shadcn/UI Primitives
│   │   ├── 📄 button.tsx               # Button component
│   │   ├── 📄 card.tsx                 # Card component
│   │   ├── 📄 input.tsx                # Input component
│   │   ├── 📄 label.tsx                # Label component
│   │   ├── 📄 separator.tsx            # Separator component
│   │   └── 📄 sheet.tsx                # Sheet (drawer) component
│   └── 📁 vehicles/
│       └── 📄 VehicleForm.tsx          # Add/Edit vehicle form
│
├── 📁 contexts/                         # React Context Providers
│   └── 📄 AuthContext.tsx              # Authentication state management
│
├── 📁 lib/                             # Utility Functions & Helpers
│   ├── 📄 prisma.ts                    # Prisma client singleton
│   ├── 📄 auth.ts                      # Auth helper functions (JWT)
│   ├── 📄 email.ts                     # Email sending utilities
│   └── 📁 validations/                 # Zod Validation Schemas
│       ├── 📄 auth.ts                  # Login/Register validation
│       ├── 📄 customer.ts              # Customer CRUD validation
│       ├── 📄 rental.ts                # Rental CRUD validation
│       └── 📄 vehicle.ts               # Vehicle CRUD validation
│
├── 📁 prisma/                          # Prisma ORM Configuration
│   ├── 📄 schema.prisma                # Database schema definition
│   ├── 📁 migrations/                  # Migration history (auto-generated)
│   └── 📄 seed.ts                      # Database seeding script
│
├── 📁 public/                          # Static Assets (Served from /)
│   ├── 📄 next.svg                     # Next.js logo
│   ├── 📄 vercel.svg                   # Vercel logo
│   └── 📁 images/                      # Image assets
│
├── 📁 types/                           # TypeScript Type Definitions
│   └── 📄 index.ts                     # Global type definitions
│
├── 📄 .env                             # Environment variables (gitignored)
├── 📄 .env.example                     # Example environment file
├── 📄 .eslintrc.json                   # ESLint configuration
├── 📄 .gitignore                       # Git ignore rules
├── 📄 components.json                  # Shadcn/UI configuration
├── 📄 next.config.ts                   # Next.js configuration
├── 📄 package.json                     # Dependencies & scripts
├── 📄 postcss.config.mjs               # PostCSS configuration
├── 📄 README.md                        # This file
├── 📄 tailwind.config.ts               # Tailwind CSS configuration
└── 📄 tsconfig.json                    # TypeScript configuration
```

### Key File Explanations

#### Configuration Files

- **`next.config.ts`**: Next.js build and runtime configuration
- **`tailwind.config.ts`**: Tailwind CSS theme, plugins, and content paths
- **`tsconfig.json`**: TypeScript compiler options and path aliases
- **`components.json`**: shadcn/ui component configuration
- **`prisma/schema.prisma`**: Database schema and relationships

#### Core Application Files

- **`app/layout.tsx`**: Root layout wrapping entire app
- **`app/page.tsx`**: Homepage/landing page
- **`app/(dashboard)/layout.tsx`**: Dashboard layout with sidebar
- **`app/api/*/route.ts`**: API endpoint handlers

---

## 📡 API Reference

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "password": "SecurePass123!"
}

Response (201):
{
  "success": true,
  "message": "Verification code sent to email",
  "data": {
    "userId": "uuid",
    "email": "user@example.com"
  }
}
```

#### Verify Email
```http
POST /api/auth/verify
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}

Response (200):
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "isVerified": true
    }
  }
}
```

#### Resend OTP
```http
POST /api/auth/resend-otp
Content-Type: application/json

{
  "email": "user@example.com"
}

Response (200):
{
  "success": true,
  "message": "New verification code sent"
}
```

### Vehicle Endpoints

#### Get All Vehicles
```http
GET /api/vehicles
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "vehicles": [
      {
        "id": "uuid",
        "brand": "Toyota",
        "model": "Camry",
        "dailyPrice": 45.00,
        "isAvailable": true,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

#### Create Vehicle
```http
POST /api/vehicles
Authorization: Bearer {token}
Content-Type: application/json

{
  "brand": "Toyota",
  "model": "Camry",
  "dailyPrice": 45.00
}

Response (201):
{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "vehicle": { /* vehicle object */ }
  }
}
```

#### Update Vehicle
```http
PUT /api/vehicles/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "dailyPrice": 50.00,
  "isAvailable": false
}

Response (200):
{
  "success": true,
  "message": "Vehicle updated successfully",
  "data": {
    "vehicle": { /* updated vehicle */ }
  }
}
```

#### Delete Vehicle
```http
DELETE /api/vehicles/{id}
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Vehicle deleted successfully"
}
```

### Customer Endpoints

#### Get All Customers
```http
GET /api/customers
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "customers": [
      {
        "id": "uuid",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "+1234567890",
        "isDeleted": false,
        "rentals": [/* rental array */]
      }
    ]
  }
}
```

#### Create Customer
```http
POST /api/customers
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890"
}

Response (201):
{
  "success": true,
  "message": "Customer created successfully",
  "data": {
    "customer": { /* customer object */ }
  }
}
```

#### Update Customer
```http
PUT /api/customers/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "+0987654321"
}

Response (200):
{
  "success": true,
  "message": "Customer updated successfully"
}
```

#### Soft Delete Customer
```http
DELETE /api/customers/{id}
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Customer marked as deleted"
}
```

### Rental Endpoints

#### Get All Rentals
```http
GET /api/rentals
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "rentals": [
      {
        "id": "uuid",
        "startDate": "2024-01-01",
        "endDate": "2024-01-05",
        "totalCost": 200.00,
        "status": "active",
        "customer": {/* customer details */},
        "vehicle": {/* vehicle details */}
      }
    ]
  }
}
```

#### Create Rental
```http
POST /api/rentals
Authorization: Bearer {token}
Content-Type: application/json

{
  "customerId": "uuid",
  "vehicleId": "uuid",
  "startDate": "2024-01-01",
  "endDate": "2024-01-05"
}

Response (201):
{
  "success": true,
  "message": "Rental created successfully",
  "data": {
    "rental": {
      "id": "uuid",
      "totalCost": 200.00,
      "status": "active"
    }
  }
}
```

#### Update Rental
```http
PUT /api/rentals/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "completed",
  "endDate": "2024-01-06"
}

Response (200):
{
  "success": true,
  "message": "Rental updated successfully"
}
```

#### Delete Rental
```http
DELETE /api/rentals/{id}
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Rental deleted successfully"
}
```

### Feedback Endpoints

#### Get All Feedback
```http
GET /api/feedback
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "feedback": [
      {
        "id": "uuid",
        "rating": 5,
        "comment": "Excellent service!",
        "rental": {/* rental details */},
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

#### Submit Feedback
```http
POST /api/feedback
Authorization: Bearer {token}
Content-Type: application/json

{
  "rentalId": "uuid",
  "rating": 5,
  "comment": "Great experience!"
}

Response (201):
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "feedback": { /* feedback object */ }
  }
}
```

#### Delete Feedback
```http
DELETE /api/feedback/{id}
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Feedback deleted successfully"
}
```

### Analytics Endpoints

#### Get KPIs
```http
GET /api/analytics/kpis
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "kpis": {
      "revenue": "15234.50",
      "utilization": "67.5",
      "satisfaction": "4.8",
      "activeRentals": 12,
      "totalCustomers": 45,
      "totalVehicles": 20
    }
  }
}
```

#### Get Trends
```http
GET /api/analytics/trends?days=30
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "trends": {
      "revenue": [
        {"date": "2024-01-01", "revenue": 450.00},
        {"date": "2024-01-02", "revenue": 520.00}
      ],
      "utilization": [
        {"date": "2024-01-01", "utilization": 65.5}
      ],
      "satisfaction": [
        {"date": "2024-01-01", "satisfaction": 4.8, "count": 5}
      ]
    }
  }
}
```

### Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message here",
  "details": {
    "field": "Specific field error"
  }
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (no permission)
- `404`: Not Found
- `409`: Conflict (duplicate email, etc.)
- `500`: Server Error

---

## 🔐 Authentication

### How Authentication Works

1. **User Registration**:
   - User submits email, name, phone, password
   - Password is hashed using bcrypt (10 salt rounds)
   - 6-digit OTP generated and sent to email
   - User stored in database with `isVerified: false`

2. **Email Verification**:
   - User receives OTP via email
   - OTP valid for 10 minutes
   - Upon verification, JWT token issued
   - User marked as verified in database

3. **Login**:
   - User submits email and password
   - Password compared with hashed version
   - If verified, JWT token issued
   - If not verified, prompt to verify email

4. **Token Management**:
   - Token stored in localStorage
   - Token sent in Authorization header: `Bearer {token}`
   - Token verified on protected routes
   - Token expires after 7 days (configurable)

### Implementing Protected Routes

**Client-side Protection** (components/contexts/AuthContext.tsx):
```typescript
export function AuthProvider({ children }: { children: React.Node }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode and set user
      const decoded = jwt.decode(token);
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**Server-side Protection** (lib/auth.ts):
```typescript
import jwt from 'jsonwebtoken';

export function verifyToken(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
```

**Usage in API Routes**:
```typescript
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = verifyToken(request);

    // User is authenticated, proceed
    const data = await prisma.vehicle.findMany();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}
```

### Password Requirements

Passwords must meet these criteria:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)

Validation handled by Zod schema in `lib/validations/auth.ts`:
```typescript
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[!@#$%^&*]/, 'Password must contain special character'),
});
```

---

## 🎯 Features Explained

### Vehicle Management in Detail

**Adding a Vehicle:**
1. Navigate to Vehicles page
2. Click "Add New Vehicle" button
3. Fill form with brand, model, daily price
4. Submit - vehicle added with `isAvailable: true`

**Editing a Vehicle:**
1. Click "Edit" button on vehicle card
2. Modify price or other details
3. Submit - changes saved instantly

**Deleting a Vehicle:**
1. Click "Delete" button on vehicle card
2. Confirm deletion
3. Vehicle removed from database
4. Note: Can't delete if vehicle has active rentals

**Availability Management:**
- Automatically set to unavailable when rented
- Automatically set to available when rental completed
- Manual override available in edit form

### Customer Management in Detail

**Customer Lifecycle:**
1. **Creation**: Add customer with name, email, phone
2. **Active**: Customer can make rentals
3. **Soft Delete**: Mark as deleted (preserves history)
4. **Restoration**: Undelete if needed

**Customer Data:**
- Basic info: name, email, phone
- Rental history: all past and current rentals
- Feedback: linked through rentals
- Deletion status: soft delete flag

### Rental Process Detailed

**Step-by-Step Rental Creation:**

1. **Select Customer**:
   - Choose from dropdown of active customers
   - Only non-deleted customers shown

2. **Choose Vehicle**:
   - Only available vehicles displayed
   - Daily price shown next to each vehicle
   - If no vehicles available, can't create rental

3. **Pick Dates**:
   - Start date: minimum today
   - End date: must be after start date
   - Frontend validation prevents invalid ranges

4. **Calculate Cost**:
   - Automatic calculation: (end - start) × daily price
   - Updates in real-time as dates change
   - Displayed prominently before submission

5. **Confirm Rental**:
   - Submit creates rental with status "active"
   - Vehicle marked as unavailable
   - Customer's rental list updated

**Rental Statuses:**
- `active`: Rental in progress
- `completed`: Rental finished
- `canceled`: Rental was canceled

**Rental Modifications:**
- Can extend end date
- Can change status (admin only)
- Can't change customer or vehicle
- Can't set end date before today

### Analytics Deep Dive

**Revenue Chart:**
- **Data Source**: Sum of all rental `totalCost` per day
- **Calculation**: Groups rentals by created date
- **Metrics Shown**:
  - Total revenue (sum of all)
  - Average daily revenue
  - Peak revenue day
- **Visualization**: Animated bar chart with green gradient
- **Interactivity**: Hover to see exact amounts

**Utilization Chart:**
- **Data Source**: Count of rented vs total vehicles
- **Calculation**: (Active rentals / Total vehicles) × 100
- **Color Coding**:
  - Yellow bars: <50% utilization
  - Green bars: 50-79% utilization
  - Red bars: ≥80% utilization
- **Metrics**: Average, maximum, current status
- **Recommendations**: AI suggests optimal fleet size

**Satisfaction Chart:**
- **Data Source**: Feedback ratings (1-5 stars)
- **Calculation**: Average rating per day
- **Metrics**:
  - Average rating
  - Total review count
  - Status badge (Excellent/Good/Needs Work)
- **Visualization**: Multi-colored bars based on rating

**KPI Cards:**
Each KPI card shows:
- Main metric (large number)
- Description/context
- Visual icon with gradient
- Hover animation (lift effect)
- Real-time updates

---

## 🎨 Design System

### Color Palette

#### Primary Colors
```css
/* Indigo/Purple Gradient (Primary Actions) */
from-indigo-600 to-purple-600
#4F46E5 → #9333EA

/* Used for: Main buttons, primary CTAs, branding */
```

#### Module-Specific Gradients

```css
/* Vehicles - Blue/Cyan */
from-blue-500 to-cyan-500
#3B82F6 → #06B6D4

/* Rentals - Purple/Pink */
from-purple-500 to-pink-500
#A855F7 → #EC4899

/* Customers - Green/Emerald */
from-green-500 to-emerald-500
#22C55E → #10B981

/* Feedback - Yellow/Orange */
from-yellow-500 to-orange-500
#EAB308 → #F97316

/* Analytics - Teal/Cyan */
from-teal-500 to-cyan-500
#14B8A6 → #06B6D4
```

#### Neutral Colors
```css
/* Text */
text-gray-900: #111827 (headings)
text-gray-700: #374151 (body)
text-gray-600: #4B5563 (secondary)
text-gray-500: #6B7280 (tertiary)

/* Backgrounds */
bg-white: #FFFFFF (cards, modals)
bg-gray-50: #F9FAFB (page background)
bg-gray-100: #F3F4F6 (hover states)
```

### Typography

```css
/* Font Family */
font-sans: 'Geist Sans', system-ui, sans-serif
font-mono: 'Geist Mono', monospace

/* Font Sizes */
text-xs: 0.75rem (12px)
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)
text-3xl: 1.875rem (30px)
text-4xl: 2.25rem (36px)
text-5xl: 3rem (48px)

/* Font Weights */
font-medium: 500
font-semibold: 600
font-bold: 700
font-extrabold: 800
font-black: 900
```

### Spacing System

```css
/* Tailwind Spacing Scale */
0: 0px
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
5: 1.25rem (20px)
6: 1.5rem (24px)
8: 2rem (32px)
10: 2.5rem (40px)
12: 3rem (48px)
16: 4rem (64px)
20: 5rem (80px)
```

### Border Radius

```css
rounded-none: 0px
rounded-sm: 0.125rem (2px)
rounded: 0.25rem (4px)
rounded-md: 0.375rem (6px)
rounded-lg: 0.5rem (8px)
rounded-xl: 0.75rem (12px)
rounded-2xl: 1rem (16px)
rounded-3xl: 1.5rem (24px)
rounded-full: 9999px (circle)
```

### Shadow System

```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

### Animation Patterns

#### Entrance Animations
```tsx
// Fade in + Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

#### Staggered Children
```tsx
// Parent
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {/* Children animate with 0.1s delay between each */}
</motion.div>
```

#### Hover Effects
```tsx
// Scale on hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

#### Icon Rotation
```tsx
// 360° rotation on hover
<motion.div
  whileHover={{ rotate: 360, scale: 1.1 }}
  transition={{ duration: 0.6 }}
>
  <Icon />
</motion.div>
```

#### Glow Effect
```html
<!-- Gradient glow around cards -->
<div class="relative group">
  <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
  <div class="relative bg-white rounded-xl">
    <!-- Content -->
  </div>
</div>
```

### Component Patterns

#### Card Component
```tsx
<motion.div className="relative group">
  {/* Glow Effect */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-{color}-500 to-{color}-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300" />

  {/* Card */}
  <Card className="relative border-0 shadow-xl overflow-hidden">
    {/* Top Gradient Bar */}
    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-{color}-500 to-{color}-500" />

    <CardHeader>
      {/* Rotating Icon */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="p-3 bg-gradient-to-br from-{color}-500 to-{color}-500 rounded-xl shadow-lg"
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>

      {/* Title with Gradient Text */}
      <CardTitle className="text-xl font-extrabold bg-gradient-to-r from-{color}-600 to-{color}-600 bg-clip-text text-transparent">
        Title
      </CardTitle>
    </CardHeader>

    <CardContent>
      {/* Content */}
    </CardContent>
  </Card>
</motion.div>
```

#### Button Component
```tsx
<motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
  <button className="group relative">
    {/* Glow */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300" />

    {/* Button */}
    <Link className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl border-2 border-white">
      <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
      <span className="text-white font-extrabold text-base">
        Button Text
      </span>
    </Link>
  </button>
</motion.div>
```

---

## 🚀 Deployment

### Deploying to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications:

#### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)

#### Steps

1. **Push Code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/car-rental-sys.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**:
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from your `.env` file:
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `EMAIL_USER`
     - `EMAIL_PASSWORD`
     - `NEXT_PUBLIC_APP_URL`

4. **Deploy**:
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - You get a `.vercel.app` domain instantly

5. **Set Up Production Database**:
   - Option 1: Use PlanetScale (recommended)
   - Option 2: Use Railway
   - Option 3: Use your own MySQL server
   - Update `DATABASE_URL` in Vercel environment variables

6. **Run Migrations**:
   ```bash
   # In Vercel, these run automatically if you add to package.json
   "scripts": {
     "vercel-build": "prisma generate && prisma migrate deploy && next build"
   }
   ```

7. **Custom Domain** (Optional):
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed
   - SSL certificate auto-configured

#### Automatic Deployments
- Every push to `main` branch auto-deploys to production
- Pull requests create preview deployments
- View deployment logs in Vercel dashboard

### Alternative Deployment Options

#### 1. AWS (EC2 + RDS)

```bash
# Install Node.js on EC2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and build
git clone your-repo.git
cd my-app
npm install
npm run build

# Run with PM2
npm install pm2 -g
pm2 start npm --name "rentalpro" -- start
pm2 save
pm2 startup
```

#### 2. DigitalOcean App Platform

- Connect GitHub repository
- Select Node.js environment
- Add environment variables
- Deploy automatically

#### 3. Railway

- Connect GitHub
- Add MySQL database
- Set environment variables
- Deploy with one click

#### 4. Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t rentalpro .
docker run -p 3000:3000 --env-file .env rentalpro
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication Flow
- [ ] Register with valid data
- [ ] Receive OTP email
- [ ] Verify with correct OTP
- [ ] Login with credentials
- [ ] Access protected routes
- [ ] Logout successfully

#### Vehicle Management
- [ ] Add new vehicle
- [ ] Edit vehicle details
- [ ] Delete vehicle (without rentals)
- [ ] Attempt delete (with rentals)
- [ ] View vehicle list
- [ ] Filter available vehicles

#### Customer Management
- [ ] Add new customer
- [ ] Edit customer info
- [ ] Soft delete customer
- [ ] View customer rentals
- [ ] Restore deleted customer

#### Rental System
- [ ] Create rental (valid dates)
- [ ] Verify cost calculation
- [ ] Check vehicle unavailable after rental
- [ ] Update rental status
- [ ] Extend rental dates
- [ ] Complete rental
- [ ] Verify vehicle available after completion

#### Feedback
- [ ] Submit rating and comment
- [ ] View feedback list
- [ ] Delete feedback
- [ ] Verify analytics update

#### Analytics
- [ ] View all KPI cards
- [ ] Check revenue chart accuracy
- [ ] Verify utilization calculation
- [ ] Review satisfaction trends
- [ ] Test different time periods (7/30/90 days)

### API Testing with Postman

1. **Import Collection**:
   - Create Postman collection
   - Add all API endpoints
   - Set up environment variables

2. **Test Authentication**:
   ```javascript
   // Test: Register → Verify → Login
   pm.test("Registration successful", function () {
     pm.response.to.have.status(201);
     pm.expect(pm.response.json().success).to.be.true;
   });
   ```

3. **Test CRUD Operations**:
   - Create resource
   - Read resource
   - Update resource
   - Delete resource
   - Verify each step

### Load Testing

Use Apache Bench or Artillery:

```bash
# Apache Bench - 1000 requests, 10 concurrent
ab -n 1000 -c 10 http://localhost:3000/api/vehicles

# Artillery
npm install -g artillery
artillery quick --count 100 --num 10 http://localhost:3000/
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: "Module not found" errors

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

#### Issue: Prisma Client not generated

```bash
# Solution: Regenerate Prisma Client
npx prisma generate
```

#### Issue: Database connection errors

```env
# Check DATABASE_URL format
# Correct format:
DATABASE_URL="mysql://user:pass@host:port/database"

# Common mistakes:
# ❌ Missing protocol: user:pass@host:port/database
# ❌ Wrong port: mysql://user:pass@host:3307/database (should be 3306)
# ❌ Special chars not escaped in password
```

#### Issue: JWT token errors

```bash
# Verify JWT_SECRET is set
echo $JWT_SECRET

# Generate new secret if needed
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Issue: Email not sending

1. **Check Gmail Settings**:
   - 2FA enabled?
   - App password generated?
   - Less secure apps disabled?

2. **Verify SMTP Config**:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_SECURE="false"  # Important for port 587
   ```

3. **Test Email Function**:
   ```typescript
   // Add console.logs in lib/email.ts
   console.log('Sending email to:', to);
   console.log('SMTP config:', { host, port, user });
   ```

#### Issue: "Cannot find module '@/...'"

```json
// Check tsconfig.json has paths configured
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### Issue: Port 3000 already in use

```bash
# Find and kill process
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm run dev
```

#### Issue: Styles not loading

```bash
# Rebuild Tailwind CSS
npm run dev

# Check tailwind.config.ts content paths
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
]
```

#### Issue: API routes return 404

- Verify file is named `route.ts` (not `index.ts`)
- Check folder structure matches URL
- Ensure export named functions (GET, POST, etc.)
- Restart dev server

---

## ⚡ Performance Optimization

### Frontend Optimization

#### Image Optimization
```tsx
import Image from 'next/image';

// Use Next.js Image component
<Image
  src="/vehicle.jpg"
  alt="Vehicle"
  width={400}
  height={300}
  priority // For above-fold images
  placeholder="blur" // For better UX
/>
```

#### Code Splitting
```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const AnalyticsChart = dynamic(
  () => import('@/components/analytics/Chart'),
  { loading: () => <Skeleton /> }
);
```

#### Font Optimization
```tsx
// Already optimized in layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevents FOIT
});
```

### Database Optimization

#### Indexing
```prisma
model Rental {
  @@index([customerId])
  @@index([vehicleId])
  @@index([status])
  @@index([startDate, endDate])
}
```

#### Query Optimization
```typescript
// Include related data in single query
const rentals = await prisma.rental.findMany({
  include: {
    customer: true,
    vehicle: true,
  },
});

// Select only needed fields
const vehicles = await prisma.vehicle.findMany({
  select: {
    id: true,
    brand: true,
    model: true,
    // Don't fetch unnecessary fields
  },
});
```

#### Connection Pooling
```typescript
// Prisma handles this automatically
// But you can configure in schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma" // For serverless
}
```

### API Optimization

#### Response Caching
```typescript
export async function GET() {
  const data = await fetchData();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
```

#### Compression
```typescript
// Add to next.config.ts
module.exports = {
  compress: true, // Gzip compression
};
```

---

## 🔒 Security

### Security Best Practices Implemented

1. **Password Security**:
   - Bcrypt hashing with salt rounds
   - No plain text storage
   - Strong password requirements

2. **JWT Security**:
   - Secret key from environment
   - Token expiration
   - HTTPS only in production

3. **Input Validation**:
   - Zod schema validation
   - Type checking with TypeScript
   - Sanitization of user inputs

4. **SQL Injection Prevention**:
   - Prisma ORM with parameterized queries
   - No raw SQL queries

5. **XSS Protection**:
   - React auto-escapes output
   - Content Security Policy headers

6. **CORS Configuration**:
   ```typescript
   // Add to next.config.ts if needed
   async headers() {
     return [
       {
         source: '/api/:path*',
         headers: [
           { key: 'Access-Control-Allow-Origin', value: 'your-domain.com' },
         ],
       },
     ];
   }
   ```

### Security Checklist

- [ ] Environment variables not committed
- [ ] Strong JWT secret (32+ characters)
- [ ] HTTPS enabled in production
- [ ] Database password strong
- [ ] Email credentials secure (app password)
- [ ] API routes have authentication
- [ ] Input validation on all forms
- [ ] Error messages don't expose sensitive info
- [ ] Dependencies regularly updated
- [ ] Rate limiting implemented (recommended)
- [ ] CSRF protection (for forms)

---

## ❓ Frequently Asked Questions

### General

**Q: Is this project free to use?**
A: Yes, it's open source under MIT license. Use it for personal or commercial projects.

**Q: Can I customize the design?**
A: Absolutely! The entire design system is in Tailwind config. Modify colors, fonts, etc.

**Q: Is it production-ready?**
A: Yes, with proper configuration and security measures in place.

### Technical

**Q: Why MySQL instead of PostgreSQL?**
A: MySQL is widely supported and easier to set up. But you can switch to PostgreSQL easily with Prisma.

**Q: Can I use MongoDB?**
A: Yes, update Prisma schema to use MongoDB provider. Some queries may need adjustments.

**Q: How do I add new features?**
A: Follow the existing patterns - create API routes, components, and database models.

**Q: Is it mobile responsive?**
A: Yes, fully responsive for all screen sizes.

**Q: Can I deploy without Vercel?**
A: Yes, works on any Node.js hosting (AWS, DigitalOcean, Railway, etc.)

### Database

**Q: How do I backup the database?**
```bash
mysqldump -u username -p database_name > backup.sql
```

**Q: How do I restore a backup?**
```bash
mysql -u username -p database_name < backup.sql
```

**Q: Can I use a different database?**
A: Yes, Prisma supports PostgreSQL, SQLite, MongoDB, etc. Update schema.prisma.

### Authentication

**Q: How do I reset a password?**
A: Password reset feature is coming soon. Currently requires database update.

**Q: Can I use OAuth (Google/Facebook)?**
A: Not included, but you can add NextAuth.js for OAuth support.

**Q: How long do tokens last?**
A: Default is 7 days. Configure in `.env` with `JWT_EXPIRES_IN`.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Create detailed issue reports
2. **Suggest Features**: Propose new functionality
3. **Submit PRs**: Fix bugs or add features
4. **Improve Docs**: Enhance documentation
5. **Share**: Star the repo and spread the word

### Contribution Guidelines

1. **Fork the Repository**:
   ```bash
   git clone https://github.com/yourusername/car-rental-sys.git
   ```

2. **Create Feature Branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Changes**:
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**:
   - Run `npm run lint`
   - Test all affected features
   - Ensure no breaking changes

5. **Commit with Conventional Commits**:
   ```bash
   git commit -m "feat: add amazing feature"
   git commit -m "fix: resolve bug in rental form"
   git commit -m "docs: update README"
   ```

6. **Push and Create PR**:
   ```bash
   git push origin feature/AmazingFeature
   ```
   Then open a Pull Request on GitHub.

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting (optional)
- Name components in PascalCase
- Name files in kebab-case or PascalCase

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 RentalPro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

Special thanks to:

- **Next.js Team** - For the incredible framework
- **Vercel** - For hosting and deployment platform
- **Prisma** - For excellent database ORM
- **Tailwind CSS** - For utility-first CSS framework
- **Framer Motion** - For smooth animations
- **shadcn/ui** - For beautiful UI components
- **Lucide** - For icon library
- **Open Source Community** - For inspiration and tools

## 📞 Support & Contact

### Get Help

- **Documentation**: You're reading it! 📖
- **Issues**: [GitHub Issues](https://github.com/yourusername/car-rental-sys/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/car-rental-sys/discussions)
- **Email**: support@rentalpro.com

### Social Media

- **Twitter**: [@rentalpro](https://twitter.com/rentalpro)
- **LinkedIn**: [RentalPro](https://linkedin.com/company/rentalpro)
- **YouTube**: [RentalPro Tutorials](https://youtube.com/@rentalpro)

## 🗺️ Roadmap

### Upcoming Features

#### v2.0.0 (Q1 2025)
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)
- [ ] Advanced search and filters
- [ ] Export data to CSV/PDF
- [ ] Email notifications for rentals

#### v2.1.0 (Q2 2025)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Payment gateway integration

#### v3.0.0 (Q3 2025)
- [ ] Multi-tenant support
- [ ] Advanced analytics (ML predictions)
- [ ] API documentation (Swagger)
- [ ] Rate limiting
- [ ] Admin dashboard

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/car-rental-sys?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/car-rental-sys?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/car-rental-sys)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/car-rental-sys)
![License](https://img.shields.io/github/license/yourusername/car-rental-sys)

---

## 🔗 Quick Links

- [Live Demo](https://rentalpro-demo.vercel.app)
- [API Documentation](https://docs.rentalpro.com/api)
- [Tutorial Videos](https://youtube.com/rentalpro)
- [Community Forum](https://community.rentalpro.com)
- [Report Bug](https://github.com/yourusername/car-rental-sys/issues/new?template=bug_report.md)
- [Request Feature](https://github.com/yourusername/car-rental-sys/issues/new?template=feature_request.md)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with ❤️ and AI by the RentalPro Team**

[Website](https://rentalpro.com) • [Documentation](https://docs.rentalpro.com) • [Blog](https://blog.rentalpro.com)

© 2024 RentalPro. All rights reserved.

</div>
