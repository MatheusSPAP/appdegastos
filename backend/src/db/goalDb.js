import pool from './dbConfig.js';

class GoalDb {
    static async create({ name, amount, category_id, user_id }) {
        const sql = `
            INSERT INTO goals 
            (name, amount, category_id, user_id) 
            VALUES (?, ?, ?, ?)
        `;
        const values = [name, amount, category_id, user_id];
        const [result] = await pool.query(sql, values);
        return result.insertId;
    }

    static async getByUserId(user_id) {
        const sql = `
            SELECT g.*, c.name as category_name 
            FROM goals g
            JOIN categorias c ON g.category_id = c.id
            WHERE g.user_id = ?
            ORDER BY g.created_at DESC
        `;
        const [rows] = await pool.query(sql, [user_id]);
        return rows;
    }

    static async getById(id) {
        const sql = `
            SELECT g.*, c.name as category_name 
            FROM goals g
            JOIN categorias c ON g.category_id = c.id
            WHERE g.id = ?
        `;
        const [rows] = await pool.query(sql, [id]);
        return rows[0] || null;
    }

    static async update(id, { name, amount, category_id }) {
        const sql = `
            UPDATE goals 
            SET name = ?, amount = ?, category_id = ?
            WHERE id = ?
        `;
        await pool.query(sql, [name, amount, category_id, id]);
        return this.getById(id);
    }

    static async delete(id) {
        const sql = 'DELETE FROM goals WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        return result.affectedRows > 0;
    }
}

export default GoalDb;