import BudgetDb from '../db/budgetDb.js';

class Budget {
    static async create({ month_year, budget_amount, user_id }) {
        // Validações
        if (!month_year) throw new Error('O mês/ano é obrigatório');
        if (!budget_amount || isNaN(budget_amount) || budget_amount <= 0) {
            throw new Error('O valor do orçamento deve ser um número positivo');
        }
        if (!user_id) throw new Error('ID do usuário é obrigatório');

        try {
            const id = await BudgetDb.create({ month_year, budget_amount, user_id });
            return this.getById(id);
        } catch (error) {
            throw new Error(`Erro ao salvar orçamento: ${error.message}`);
        }
    }

    static async update(id, { budget_amount }) {
        // Validações
        if (!budget_amount || isNaN(budget_amount) || budget_amount <= 0) {
            throw new Error('O valor do orçamento deve ser um número positivo');
        }

        try {
            const updated = await BudgetDb.update(id, { budget_amount });
            if (!updated) throw new Error('Orçamento não encontrado para atualização');
            return this.getById(id);
        } catch (error) {
            throw new Error(`Erro ao atualizar orçamento: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            return await BudgetDb.getById(id);
        } catch (error) {
            throw new Error(`Erro ao buscar orçamento: ${error.message}`);
        }
    }

    static async getByUserId(user_id) {
        try {
            return await BudgetDb.getByUserId(user_id);
        } catch (error) {
            throw new Error(`Erro ao buscar orçamentos: ${error.message}`);
        }
    }

    static async getByUserAndMonth(user_id, month_year) {
        try {
            const budget = await BudgetDb.getByUserAndMonth(user_id, month_year);
            if (!budget) throw new Error('Orçamento não encontrado');
            return budget;
        } catch (error) {
            throw new Error(`Erro ao buscar orçamento: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const deleted = await BudgetDb.delete(id);
            if (!deleted) throw new Error('Orçamento não encontrado');
            return deleted;
        } catch (error) {
            throw new Error(`Erro ao deletar orçamento: ${error.message}`);
        }
    }
}

export default Budget;