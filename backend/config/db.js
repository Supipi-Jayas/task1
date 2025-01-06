import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || 'taskmgt';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '1234';
const dbHost = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
});
(async () => {
    try {
        const connection = await mysql.createConnection({
            host: dbHost,
            user: dbUser,
            password: dbPassword,
        });

        // Create the database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Database "${dbName}" created or already exists.`);
        await connection.end();

        // Authenticate Sequelize connection
        await sequelize.authenticate();
        console.log('Database connected with Sequelize.');

        // Import models dynamically and sync them
        const { default: User } = await import('../models/users.js');
        const { default: Task } = await import('../models/Task.js');

        // Sync models (Create tables if they don't exist, alter if needed)
        await User.sync({ alter: true });
        console.log('User table synced successfully.');

        await Task.sync({ alter: true });
        console.log('Task table synced successfully.');

    } catch (error) {
        console.error('Error during database initialization:', error.message);
    }
})();

export { sequelize };
