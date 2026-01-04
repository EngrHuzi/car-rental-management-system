# Database Diagrams - Car Rental Management System

## 1. ERD (Entity Relationship Diagram) - Basic

```mermaid
erDiagram
    USER ||--o{ SESSION : "has"
    VEHICLE ||--o{ RENTAL : "rented_in"
    CUSTOMER ||--o{ RENTAL : "makes"
    RENTAL ||--o| FEEDBACK : "receives"

    USER {
        uuid id PK
        string email UK
        string password
        boolean emailVerified
        string verificationToken UK
        datetime verificationExpires
        datetime createdAt
        datetime updatedAt
    }

    SESSION {
        uuid id PK
        uuid userId FK
        string token UK
        datetime expiresAt
        datetime createdAt
    }

    VEHICLE {
        uuid id PK
        string model
        string brand
        decimal dailyPrice
        boolean isAvailable
        datetime createdAt
        datetime updatedAt
    }

    CUSTOMER {
        uuid id PK
        string name
        string email UK
        string phone
        boolean isDeleted
        datetime createdAt
        datetime updatedAt
    }

    RENTAL {
        uuid id PK
        uuid vehicleId FK
        uuid customerId FK
        datetime startDate
        datetime endDate
        decimal totalCost
        enum status
        datetime createdAt
        datetime updatedAt
    }

    FEEDBACK {
        uuid id PK
        uuid rentalId FK-UK
        int rating
        text comment
        datetime createdAt
    }
```

## 2. EERD (Enhanced Entity Relationship Diagram) - Detailed

```mermaid
erDiagram
    USER ||--o{ SESSION : "authenticates_with"
    VEHICLE ||--o{ RENTAL : "is_rented_in"
    CUSTOMER ||--o{ RENTAL : "creates"
    RENTAL ||--|| FEEDBACK : "may_have"

    USER {
        uuid id PK "Primary Key - UUID"
        string email UK "Unique - User email"
        string password "Hashed password"
        boolean emailVerified "Default: false"
        string verificationToken UK "Unique - Email verification"
        datetime verificationExpires "Token expiry"
        datetime createdAt "Auto-generated"
        datetime updatedAt "Auto-updated"
    }

    SESSION {
        uuid id PK "Primary Key - UUID"
        uuid userId FK "Foreign Key -> User.id"
        string token UK "Unique - JWT token (max 500 chars)"
        datetime expiresAt "Session expiration - Indexed"
        datetime createdAt "Auto-generated"
    }

    VEHICLE {
        uuid id PK "Primary Key - UUID"
        string model "Vehicle model"
        string brand "Vehicle brand"
        decimal dailyPrice "Decimal(10,2) - Price per day"
        boolean isAvailable "Default: true - Indexed"
        datetime createdAt "Auto-generated"
        datetime updatedAt "Auto-updated"
    }

    CUSTOMER {
        uuid id PK "Primary Key - UUID"
        string name "Customer full name"
        string email UK "Unique - Customer email"
        string phone "Contact number"
        boolean isDeleted "Soft delete - Default: false - Indexed"
        datetime createdAt "Auto-generated"
        datetime updatedAt "Auto-updated"
    }

    RENTAL {
        uuid id PK "Primary Key - UUID"
        uuid vehicleId FK "Foreign Key -> Vehicle.id - Restrict"
        uuid customerId FK "Foreign Key -> Customer.id - Restrict"
        datetime startDate "Rental start - Indexed"
        datetime endDate "Rental end - Indexed"
        decimal totalCost "Decimal(10,2) - Total rental cost"
        enum status "active|completed|canceled - Default: active - Indexed"
        datetime createdAt "Auto-generated"
        datetime updatedAt "Auto-updated"
    }

    FEEDBACK {
        uuid id PK "Primary Key - UUID"
        uuid rentalId FK-UK "Foreign Key & Unique -> Rental.id - Cascade"
        int rating "1-5 stars - Indexed"
        text comment "Optional - Customer feedback"
        datetime createdAt "Auto-generated"
    }
```

## 3. Detailed Cardinality Diagram

```mermaid
erDiagram
    USER ||--o{ SESSION : "1 user can have many sessions"
    VEHICLE ||--o{ RENTAL : "1 vehicle can be in many rentals"
    CUSTOMER ||--o{ RENTAL : "1 customer can make many rentals"
    RENTAL ||--o| FEEDBACK : "1 rental can have 0 or 1 feedback"
```

## 4. Complete Database Schema with Indexes

```mermaid
graph TB
    subgraph "Authentication Module"
        User[User Entity<br/>---<br/>id: UUID PK<br/>email: String UNIQUE<br/>password: String<br/>emailVerified: Boolean<br/>verificationToken: String UNIQUE<br/>verificationExpires: DateTime<br/>createdAt: DateTime<br/>updatedAt: DateTime]

        Session[Session Entity<br/>---<br/>id: UUID PK<br/>userId: UUID FK<br/>token: String UNIQUE<br/>expiresAt: DateTime INDEX<br/>createdAt: DateTime]
    end

    subgraph "Fleet Management Module"
        Vehicle[Vehicle Entity<br/>---<br/>id: UUID PK<br/>model: String<br/>brand: String<br/>dailyPrice: Decimal<br/>isAvailable: Boolean INDEX<br/>createdAt: DateTime<br/>updatedAt: DateTime<br/>---<br/>UNIQUE: model + brand]
    end

    subgraph "Customer Management Module"
        Customer[Customer Entity<br/>---<br/>id: UUID PK<br/>name: String<br/>email: String UNIQUE<br/>phone: String<br/>isDeleted: Boolean INDEX<br/>createdAt: DateTime<br/>updatedAt: DateTime]
    end

    subgraph "Rental Management Module"
        Rental[Rental Entity<br/>---<br/>id: UUID PK<br/>vehicleId: UUID FK<br/>customerId: UUID FK<br/>startDate: DateTime INDEX<br/>endDate: DateTime INDEX<br/>totalCost: Decimal<br/>status: Enum INDEX<br/>createdAt: DateTime<br/>updatedAt: DateTime]

        Status[RentalStatus Enum<br/>---<br/>• active<br/>• completed<br/>• canceled]
    end

    subgraph "Feedback Module"
        Feedback[Feedback Entity<br/>---<br/>id: UUID PK<br/>rentalId: UUID FK UNIQUE<br/>rating: Int INDEX<br/>comment: Text<br/>createdAt: DateTime]
    end

    User -->|1:N CASCADE| Session
    Vehicle -->|1:N RESTRICT| Rental
    Customer -->|1:N RESTRICT| Rental
    Rental -->|1:1 CASCADE| Feedback
    Rental -.->|uses| Status

    classDef authClass fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef fleetClass fill:#fff4e1,stroke:#ff9900,stroke-width:2px
    classDef customerClass fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    classDef rentalClass fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    classDef feedbackClass fill:#fff3e0,stroke:#ff6f00,stroke-width:2px

    class User,Session authClass
    class Vehicle fleetClass
    class Customer customerClass
    class Rental,Status rentalClass
    class Feedback feedbackClass
```

## 5. Relationship Details

### Relationships Summary:

| From Entity | To Entity | Relationship Type | Cardinality | Delete Action |
|------------|-----------|-------------------|-------------|---------------|
| User | Session | One-to-Many | 1:N | CASCADE |
| Vehicle | Rental | One-to-Many | 1:N | RESTRICT |
| Customer | Rental | One-to-Many | 1:N | RESTRICT |
| Rental | Feedback | One-to-One | 1:0..1 | CASCADE |

### Constraints & Indexes:

#### User
- **Primary Key**: `id` (UUID)
- **Unique**: `email`, `verificationToken`
- **Indexes**: Default on PK and unique fields

#### Session
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `userId` → User.id (CASCADE DELETE)
- **Unique**: `token`
- **Indexes**: `expiresAt`

#### Vehicle
- **Primary Key**: `id` (UUID)
- **Unique Composite**: (`model`, `brand`)
- **Indexes**: `isAvailable`

#### Customer
- **Primary Key**: `id` (UUID)
- **Unique**: `email`
- **Indexes**: `isDeleted`

#### Rental
- **Primary Key**: `id` (UUID)
- **Foreign Keys**:
  - `vehicleId` → Vehicle.id (RESTRICT DELETE)
  - `customerId` → Customer.id (RESTRICT DELETE)
- **Indexes**: `(startDate, endDate)`, `status`
- **Enum**: `status` (active, completed, canceled)

#### Feedback
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `rentalId` → Rental.id (CASCADE DELETE, UNIQUE)
- **Indexes**: `rating`

## 6. Business Rules Diagram

```mermaid
graph LR
    subgraph "Authentication Rules"
        A1[Email must be unique]
        A2[Password must be hashed]
        A3[Token expires after set time]
        A4[Email verification required]
    end

    subgraph "Vehicle Rules"
        V1[Model + Brand must be unique]
        V2[Cannot delete if active rentals]
        V3[Auto-unavailable when rented]
        V4[Daily price must be positive]
    end

    subgraph "Customer Rules"
        C1[Email must be unique]
        C2[Soft delete preserves history]
        C3[Cannot delete if active rentals]
    end

    subgraph "Rental Rules"
        R1[End date > Start date]
        R2[Vehicle must be available]
        R3[Customer must not be deleted]
        R4[Cost = Days × Daily Price]
        R5[Status: active/completed/canceled]
    end

    subgraph "Feedback Rules"
        F1[One feedback per rental]
        F2[Rating: 1-5 stars]
        F3[Deleted with rental]
    end

    style A1 fill:#e1f5ff
    style A2 fill:#e1f5ff
    style A3 fill:#e1f5ff
    style A4 fill:#e1f5ff
    style V1 fill:#fff4e1
    style V2 fill:#fff4e1
    style V3 fill:#fff4e1
    style V4 fill:#fff4e1
    style C1 fill:#e8f5e9
    style C2 fill:#e8f5e9
    style C3 fill:#e8f5e9
    style R1 fill:#f3e5f5
    style R2 fill:#f3e5f5
    style R3 fill:#f3e5f5
    style R4 fill:#f3e5f5
    style R5 fill:#f3e5f5
    style F1 fill:#fff3e0
    style F2 fill:#fff3e0
    style F3 fill:#fff3e0
```

## 7. Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant S as Session
    participant C as Customer
    participant V as Vehicle
    participant R as Rental
    participant F as Feedback

    Note over U,S: 1. Authentication Flow
    U->>S: Creates session (login)
    S-->>U: Returns JWT token

    Note over C,V: 2. Rental Creation Flow
    C->>V: Check vehicle availability
    V-->>C: Return available vehicles
    C->>R: Create rental booking
    R->>V: Update vehicle (isAvailable = false)

    Note over R,F: 3. Rental Completion Flow
    R->>R: Update status to 'completed'
    R->>V: Update vehicle (isAvailable = true)
    R->>F: Customer submits feedback
    F-->>R: Feedback linked to rental

    Note over S,U: 4. Session Expiry Flow
    S->>S: Check expiresAt
    S->>U: Delete expired sessions (CASCADE)
```

## How to Use These Diagrams:

### In GitHub/GitLab:
Just paste the mermaid code blocks into your `.md` files, and they will render automatically.

### In Overleaf/LaTeX:
Unfortunately, Overleaf doesn't natively support Mermaid. You'll need to:
1. Render these diagrams using [Mermaid Live Editor](https://mermaid.live)
2. Export as PNG/SVG
3. Include images in LaTeX using `\includegraphics{}`

### In Documentation Sites:
Most modern documentation platforms (Docusaurus, VitePress, MkDocs) support Mermaid natively.

### Online Rendering:
- Visit [Mermaid Live Editor](https://mermaid.live)
- Paste the code
- Export as PNG, SVG, or PDF
