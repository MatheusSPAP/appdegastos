import Budget from '../models/budget.js';

class BudgetController {
    static async criarBudget(req, res) {
        try {
            const { month_year, budget_amount, user_id } = req.body;

            const budget = await Budget.create({ month_year, budget_amount, user_id });

            res.status(201).json(budget);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarBudget(req, res) {
        try {
            const { id } = req.params;
            const { budget_amount } = req.body;

            const budget = await Budget.update(id, { budget_amount });

            res.status(200).json(budget);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarBudgets(req, res) {
        try {
            const { user_id } = req.query;
            const budgets = await Budget.getByUserId(user_id);
            res.json(budgets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obterBudgetPorMes(req, res) {
        try {
            const { month_year } = req.params;
            const { user_id } = req.query;

            const budget = await Budget.getByUserAndMonth(user_id, month_year);
            if (!budget) {
                return res.status(404).json({ error: 'Orçamento não encontrado para este mês' });
            }

            res.json(budget);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deletarBudget(req, res) {
        try {
            const { id } = req.params;
            const user_id = req.userId;

            // Primeiro verifica se o orçamento existe e pertence ao usuário
            const budgetExistente = await Budget.getById(id);
            if (!budgetExistente) {
                return res.status(404).json({ error: 'Orçamento não encontrado' });
            }
            

            const deletado = await Budget.delete(id);
            if (!deletado) {
                return res.status(404).json({ error: 'Orçamento não encontrado' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default BudgetController;