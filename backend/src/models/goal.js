import GoalDb from '../db/goalDb.js';

class Goal {
    static async create({ name, amount, category_id, user_id }) {
        // Validações
        if (!name || name.trim() === '') throw new Error('O nome da meta é obrigatório');
        if (!amount || isNaN(amount) || amount <= 0) {
            throw new Error('O valor da meta deve ser um número positivo');
        }
        if (!category_id) throw new Error('A categoria da meta é obrigatória');
        if (!user_id) throw new Error('ID do usuário é obrigatório');

        try {
            const id = await GoalDb.create({ 
                name: name.trim(), 
                amount, 
                category_id, 
                user_id 
            });
            return this.getById(id);
        } catch (error) {
            if (error.message.includes('ER_NO_REFERENCED_ROW_2')) {
                throw new Error('Categoria não encontrada');
            }
            throw new Error(`Erro ao criar meta: ${error.message}`);
        }
    }

    static async getByUserId(user_id) {
        try {
            return await GoalDb.getByUserId(user_id);
        } catch (error) {
            throw new Error(`Erro ao buscar metas: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            const goal = await GoalDb.getById(id);
            if (!goal) throw new Error('Meta não encontrada');
            return goal;
        } catch (error) {
            throw new Error(`Erro ao buscar meta: ${error.message}`);
        }
    }

    static async update(id, { name, amount, category_id }) {
        try {
            await GoalDb.update(id, { 
                name: name?.trim(), 
                amount, 
                category_id 
            });
            return this.getById(id);
        } catch (error) {
            if (error.message.includes('ER_NO_REFERENCED_ROW_2')) {
                throw new Error('Categoria não encontrada');
            }
            throw new Error(`Erro ao atualizar meta: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const deleted = await GoalDb.delete(id);
            if (!deleted) throw new Error('Meta não encontrada');
            return deleted;
        } catch (error) {
            throw new Error(`Erro ao deletar meta: ${error.message}`);
        }
    }
}

export default Goal;