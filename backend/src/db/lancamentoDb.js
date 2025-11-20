import pool from './dbConfig.js';

class LancamentoDb {
    static async create({ date, amount, description, tipo_lancamento, category_id, user_id }) {
        const sql = `
            INSERT INTO lancamentos 
            (date, amount, description, tipo_lancamento, category_id, user_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [date, amount, description, tipo_lancamento, category_id, user_id];
        const [result] = await pool.query(sql, values);
        return result.insertId;
    }

    static async getByUserId(user_id) {
        const sql = `
            SELECT l.*, c.name as category_name 
            FROM lancamentos l
            LEFT JOIN categorias c ON l.category_id = c.id
            WHERE l.user_id = ?
            ORDER BY l.date DESC
        `;
        const [rows] = await pool.query(sql, [user_id]);
        return rows;
    }

    static async getById(id) {
        const sql = `
            SELECT l.*, c.name as category_name 
            FROM lancamentos l
            LEFT JOIN categorias c ON l.category_id = c.id
            WHERE l.id = ?
        `;
        const [rows] = await pool.query(sql, [id]);
        return rows[0] || null;
    }

    static async update(id, { date, amount, description, tipo_lancamento, category_id }) {
        const sql = `
            UPDATE lancamentos 
            SET date = ?, amount = ?, description = ?, tipo_lancamento = ?, category_id = ?
            WHERE id = ?
        `;
        await pool.query(sql, [date, amount, description, tipo_lancamento, category_id, id]);
        return this.getById(id);
    }

    static async delete(id) {
        const sql = 'DELETE FROM lancamentos WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        return result.affectedRows > 0;
    }
}

export default LancamentoDb;