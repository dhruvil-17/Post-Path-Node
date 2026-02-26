# Expense Manager

A full-stack personal finance management application built with Sails.js, MongoDB, and modern web technologies.


## Project Definition

**Expense Manager** is a comprehensive personal finance web application that enables users to manage their financial accounts, track income and expenses, and monitor their financial health through an intuitive dashboard. The application provides secure user authentication, multi-account support, transaction categorization, and friend management for shared financial tracking.

This project is built using the Sails.js MVC framework, which provides a robust backend infrastructure with automatic REST API generation, middleware configuration, and database ORM (Waterline). The frontend utilizes EJS templates with Bootstrap and Tailwind CSS for responsive design.

---

## Description

Expense Manager is designed to help individuals take control of their personal finances by providing a simple yet powerful interface for tracking money flow. Users can create multiple financial accounts (e.g., Savings, Checking, Cash), record transactions (income, expenses, and transfers), and view their financial status through an interactive dashboard.

### Key Highlights

- **Multi-Account Support**: Create and manage multiple financial accounts with unique account numbers
- **Transaction Tracking**: Record income, expenses, and transfers between accounts
- **Smart Filtering**: Filter transactions by account, type, and category with pagination support
- **Secure Authentication**: JWT-based authentication with session management
- **Soft Delete**: All records use soft delete to preserve data integrity
- **Email Notifications**: Automatic welcome emails sent upon user registration
- **Real-time Ready**: Built with Socket.io for future real-time features

---

## Features

### Authentication
- User registration with email validation
- Secure login with password hashing (bcrypt)
- JWT token generation for API authentication
- Session-based login state management
- Logout functionality

### Account Management
- Create new accounts with auto-generated account numbers
- View all accounts with balance information
- Edit account details (name and balance)
- Delete accounts (soft delete)
- Default account automatically created on signup

### Transaction Management
- Three transaction types: Income, Expense, Transfer
- Create new transactions with category and date
- Update existing transactions
- Delete transactions (soft delete)
- Filter by account, type, and category
- Paginated transaction list (10 per page)
- Automatic balance updates for income/expense
- Transfer funds between accounts

### Friend Management
- Add friends by email address
- View list of friends
- Prevent self-addition and duplicate friends

### Dashboard
- View friends list
- Account overview
- Financial summary

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Sails.js 1.5.x |
| Runtime | Node.js ^22.13 |
| Database | MongoDB (sails-mongo) |
| ORM | Waterline |
| Authentication | JWT + Sessions |
| Password Hashing | bcrypt |
| Frontend | EJS Templates |
| CSS Framework | Bootstrap 5 + Tailwind CSS |
| Real-time | Socket.io |
| Session Store | Redis |
| Email | Nodemailer |
| Task Runner | Grunt |
| Linting | ESLint |

---

## Project Structure

```
expense-manager/
├── api/                      # Backend application code
│   ├── controllers/          # Request handlers
│   │   ├── AccountController.js
│   │   ├── AuthController.js
│   │   ├── DashboardController.js
│   │   ├── FriendController.js
│   │   └── TransactionController.js
│   ├── helpers/              # Custom helper functions
│   │   ├── create-jwt.js
│   │   └── generate-account-number.js
│   ├── models/               # Database models
│   │   ├── Account.js
│   │   ├── Friend.js
│   │   ├── Transaction.js
│   │   └── User.js
│   ├── policies/             # Middleware policies
│   └── services/            # Business logic services
├── assets/                   # Frontend static assets
│   ├── dependencies/         # Third-party libraries
│   ├── images/               # Image assets
│   ├── js/                   # Client-side JavaScript
│   └── styles/               # CSS stylesheets
├── config/                   # Application configuration
│   ├── blueprints.js         # REST API blueprints
│   ├── bootstrap.js          # Application bootstrap
│   ├── custom.js             # Custom settings
│   ├── datastores.js         # Database configuration
│   ├── globals.js            # Global variables
│   ├── http.js               # HTTP middleware
│   ├── i18n.js               # Internationalization
│   ├── log.js                # Logging configuration
│   ├── models.js             # Model settings
│   ├── policies.js           # Policy middleware
│   ├── routes.js             # Route definitions
│   ├── security.js           # Security settings
│   ├── session.js            # Session configuration
│   ├── sockets.js            # Socket.io configuration
│   └── views.js              # View engine settings
├── tasks/                    # Grunt task definitions
├── views/                    # EJS view templates
│   ├── layouts/              # Layout templates
│   ├── pages/                # Page templates
│   └── partials/             # Reusable partials
├── app.js                    # Application entry point
├── Gruntfile.js              # Grunt configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version ^22.13)
- **MongoDB** (running locally or remote connection)
- **Redis** (for session storage)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   cd expense-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all dependencies defined in `package.json`:
   - Sails.js and related packages
   - MongoDB driver
   - Redis session store
   - bcrypt for password hashing
   - JWT for token generation
   - Nodemailer for emails

3. **Configure environment variables**

   Create a `config/local.js` file with your configuration:

   ```javascript
   module.exports = {
     port: 1337,
     environment: 'development',
     datastores: {
       default: {
         adapter: require('sails-mongo'),
         url: 'mongodb://localhost:27017/expense_manager'
       }
     },
     session: {
       secret: 'your-session-secret',
       adapter: '@sailshq/connect-redis',
       host: 'localhost',
       port: 6379
     }
   };
   ```

   > **Note**: Add `config/local.js` to `.gitignore` to prevent committing sensitive data.

### Configuration

#### Database Configuration

Edit `config/datastores.js` to configure your MongoDB connection:

```javascript
module.exports.datastores = {
  default: {
    adapter: require('sails-mongo'),
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/expense_manager'
  }
};
```

#### Session Configuration

Edit `config/session.js` to configure Redis session store:

```javascript
module.exports.session = {
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  adapter: '@sailshq/connect-redis',
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  // ... other settings
};
```

#### Email Configuration

Configure email settings in `config/custom.js` for sending welcome emails:

```javascript
module.exports.custom = {
  email: {
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-password'
    }
  }
};
```

---

## Running the Application

### Development Mode

```bash
npm start
```

The application will start on `http://localhost:1337` (or the port specified in configuration).

### Production Mode

```bash
NODE_ENV=production npm start
```

### Using Sails CLI

```bash
sails lift
```

### Running Tests

```bash
npm test
```

This will run:
- ESLint for code quality
- Custom tests (if any)

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home - redirects to signup |
| GET | `/signup` | Registration page |
| POST | `/signup` | Register new user |
| GET | `/login` | Login page |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout user |

**Signup Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/accounts` | List all accounts |
| GET | `/accounts/new` | New account form |
| POST | `/accounts` | Create account |
| GET | `/accounts/edit/:id` | Edit account form |
| POST | `/accounts/update/:id` | Update account |
| POST | `/accounts/delete/:id` | Delete account (soft) |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transactions` | List transactions (with filters) |
| POST | `/transactions/create` | Create transaction |
| GET | `/transactions/:id/edit` | Edit transaction form |
| POST | `/transactions/:id/update` | Update transaction |
| POST | `/transactions/:id/delete` | Delete transaction (soft) |

**Query Parameters for List:**
- `?account=` - Filter by account ID
- `?type=` - Filter by type (income, expense, transfer)
- `?search=` - Search by category
- `?page=` - Page number (default: 1)

**Create Transaction Request:**
```json
{
  "type": "expense",
  "account": "account-id",
  "amount": 50.00,
  "category": "Food",
  "transactionDate": "2024-01-15T10:30:00Z"
}
```

**Transfer Request:**
```json
{
  "type": "transfer",
  "fromAccount": "account-id-1",
  "toAccount": "account-id-2",
  "amount": 100.00,
  "category": "Savings",
  "transactionDate": "2024-01-15T10:30:00Z"
}
```

### Friends

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/friends` | List all friends |
| POST | `/friends/add` | Add friend by email |

**Add Friend Request:**
```json
{
  "email": "friend@example.com"
}
```

---

## Database Models

### User

Represents application users.

```javascript
{
  username: String,        // Required
  email: String,           // Required, Unique, Email format
  password: String,        // Required, Hashed
  accounts: Collection    // One-to-many with Account
}
```

### Account

Represents financial accounts owned by users.

```javascript
{
  name: String,           // Required, Account name
  accountNumber: String,  // Required, Unique, Auto-generated
  balance: Number,        // Current balance, default: 0
  isDefault: Boolean,     // Default account flag
  owner: User,             // Foreign key to User
  deletedAt: DateTime     // Soft delete timestamp
}
```

### Transaction

Represents financial transactions.

```javascript
{
  type: String,           // Required, Enum: income, expense, transfer
  account: Account,       // For income/expense
  fromAccount: Account,   // For transfers (source)
  toAccount: Account,    // For transfers (destination)
  amount: Number,         // Required, Transaction amount
  category: String,       // Optional, Transaction category
  owner: User,            // Foreign key to User
  transactionDate: Date, // Required, Date of transaction
  note: String,           // Optional, Transaction note
  deletedAt: DateTime     // Soft delete timestamp
}
```

### Friend

Represents friend relationships between users.

```javascript
{
  user: User,             // The user who added the friend
  friend: User            // The friend user
}
```

---

## Security

### Authentication
- Passwords are hashed using bcrypt (cost factor: 10)
- JWT tokens are generated for API authentication
- Session-based authentication for web interface

### Data Protection
- Soft delete implemented for all main entities
- SQL injection prevention via Waterline ORM
- CSRF protection via csurf middleware
- Secure headers configured in `config/security.js`

### Best Practices
- Environment variables for sensitive data
- Input validation on all endpoints
- Error logging with sails.log

---

## Built-in Helpers

The application includes custom Sails helpers:

### `generateAccountNumber`
Generates a unique account number using UUID.

```javascript
const accountNumber = await sails.helpers.generateAccountNumber();
// Returns: "ACC-XXXXXXXXXXXX"
```

### `createJwt`
Creates a JWT token for authenticated users.

```javascript
const token = await sails.helpers.createJwt(userId);
// Returns: "eyJhbGciOiJIUzI1..."
```

---

## License

This project is for educational purposes. Use at your own risk.

---

## Support

For issues or questions, please refer to the Sails.js documentation at https://sailsjs.com/documentation or the project maintainer.

---

*Last Updated: 2024*

