import pool from './dbConfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserDataDb {
    static async create({ username, email, password_hash }) {
        const sql = `
            INSERT INTO users 
            (username, email, password_hash) 
            VALUES (?, ?, ?)
        `;
        const values = [username, email, password_hash];
        const [result] = await pool.query(sql, values);
        return result.insertId;
    }

    static async getById(id) {
        const sql = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
        const [rows] = await pool.query(sql, [id]);
        return rows[0] || null;
    }

    static async getByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.query(sql, [email]);
        return rows[0] || null;
    }

    static async update(id, { username, email, password_hash }) {
        const updateFields = {};
        const values = [];
        
        if (username) {
            updateFields.username = username;
            values.push(username);
        }
        if (email) {
            updateFields.email = email;
            values.push(email);
        }
        if (password_hash) {
            updateFields.password_hash = password_hash;
            values.push(password_hash);
        }

        if (values.length === 0) {
            throw new Error('Nenhum campo válido para atualização');
        }

        const sql = `
            UPDATE users 
            SET ${Object.keys(updateFields).map(field => `${field} = ?`).join(', ')}
            WHERE id = ?
        `;
        
        values.push(id);
        await pool.query(sql, values);
        return this.getById(id);
    }

    static async delete(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        return result.affectedRows > 0;
    }

    static async authenticate(email, password) {
        const user = await this.getByEmail(email);
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) return null;

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '24h' }
        );

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at
            },
            token
        };
    }
}

export default UserDataDb;