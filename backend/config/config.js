import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT || 'mysql'; // Default to 'mysql' if not set

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: false, // Disable logging for cleaner output
});

(async () => {
  try {
    // Create a connection to MySQL
    const connection = await mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
    });

    // Ensure the database exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();

    // Sync Sequelize models
    await sequelize.sync({ alter: true });
    console.log(`Database "${dbName}" is ready!`);
  } catch (error) {
    console.error('Error creating database:', error);
  }
})();

export default sequelize;
