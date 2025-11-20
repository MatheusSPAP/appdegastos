import pool from './dbConfig.js';

class BudgetDb {
    static async create({ month_year, budget_amount, user_id }) {
        const formattedDate = new Date(month_year);
        formattedDate.setDate(1);
        const isoDate = formattedDate.toISOString().split('T')[0];

        const sql = `
            INSERT INTO monthly_budgets 
            (month_year, budget_amount, user_id) 
            VALUES (?, ?, ?)
        `;
        const values = [isoDate, budget_amount, user_id];

        const [result] = await pool.query(sql, values);
        return result.insertId;
    }

    static async update(id, { budget_amount }) {
        const sql = `
            UPDATE monthly_budgets 
            SET budget_amount = ?
            WHERE id = ?
        `;
        const values = [budget_amount, id];

        const [result] = await pool.query(sql, values);
        return result.affectedRows > 0;
    }


    static async getByUserId(user_id) {
        const sql = `
            SELECT * FROM monthly_budgets 
            WHERE user_id = ?
            ORDER BY month_year DESC
        `;
        const [rows] = await pool.query(sql, [user_id]);
        return rows;
    }

    static async getById(id) {
        const sql = `
            SELECT * FROM monthly_budgets 
            WHERE id = ?
        `;
        const [rows] = await pool.query(sql, [id]);
        return rows[0] || null;
    }

    static async getByUserAndMonth(user_id, month_year) {
        const formattedDate = new Date(month_year);
        formattedDate.setDate(1);
        const isoDate = formattedDate.toISOString().split('T')[0];

        const sql = `
            SELECT * FROM monthly_budgets 
            WHERE user_id = ? AND month_year = ?
        `;
        const [rows] = await pool.query(sql, [user_id, isoDate]);
        return rows[0] || null;
    }

    static async delete(id) {
        const sql = 'DELETE FROM monthly_budgets WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        return result.affectedRows > 0;
    }
}

export default BudgetDb;