const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

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
