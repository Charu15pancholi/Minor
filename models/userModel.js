const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

// docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=password -d mysql
// docker run --name mysql-container -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=test mysql

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

// Create users table if it doesn't exist
const createUsersTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);
};

createUsersTable();

// Define a User model
const User = {
  createUser: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
    return rows;
  },

  findUser: async (username, password) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (rows.length > 0) {
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  },

  find: async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },
};

module.exports = User;
