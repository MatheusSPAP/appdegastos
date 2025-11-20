import pool from './dbConfig.js';

class CategoriaDb {
    static async create(name) {
        const sql = 'INSERT INTO categorias (name) VALUES (?)';
        const [result] = await pool.query(sql, [name]);
        return result.insertId;
    }

    static async getAll() {
        const sql = 'SELECT * FROM categorias ORDER BY name';
        const [rows] = await pool.query(sql);
        return rows;
    }

    static async getById(id) {
        const sql = 'SELECT * FROM categorias WHERE id = ?';
        const [rows] = await pool.query(sql, [id]);
        return rows[0] || null;
    }

    static async update(id, name) {
        const sql = 'UPDATE categorias SET name = ? WHERE id = ?';
        await pool.query(sql, [name, id]);
        return this.getById(id);
    }

    static async delete(id) {
        const checkSql = 'SELECT COUNT(*) as count FROM lancamentos WHERE category_id = ?';
        const [result] = await pool.query(checkSql, [id]);
        if (result[0].count > 0) {
            throw new Error('Esta categoria está em uso e não pode ser removida');
        }

        const deleteSql = 'DELETE FROM categorias WHERE id = ?';
        const [deleteResult] = await pool.query(deleteSql, [id]);
        return deleteResult.affectedRows > 0;
    }
}

export default CategoriaDb;