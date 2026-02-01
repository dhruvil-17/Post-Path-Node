# Course Management Application

A simple web-based CRUD application for managing courses using Node.js, Express, EJS, and MySQL.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```sql
CREATE DATABASE course_db;
```

3. Update database credentials in `models/index.js` if needed:
   - Username: root
   - Password: password
   - Database: course_db

4. Start the application:
```bash
npm start
```

5. Visit http://localhost:3000

## Features

- Add new courses with name, duration, and fees
- View all courses in a table
- Edit existing courses
- Delete courses with confirmation
- Bootstrap styling for responsive design

## Project Structure

- `app.js` - Main application file
- `models/` - Sequelize models
- `controllers/` - Route handlers
- `routes/` - Express routes
- `views/` - EJS templates