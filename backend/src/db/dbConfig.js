import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Testar a conexão ao iniciar
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
})();



export default pool;