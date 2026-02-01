const mysql = require('mysql2/promise');

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',  // XAMPP default - empty
  database: 'course_db',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;