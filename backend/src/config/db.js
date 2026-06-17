require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'fabrica_maniquies',
    port: 3306
};

async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

module.exports = { getConnection };
