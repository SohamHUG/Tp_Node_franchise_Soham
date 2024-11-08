import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'franchise_resto',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;