import Goal from '../models/goal.js';

class GoalController {
    static async criarGoal(req, res) {
        try {
            const { name, amount, category_id, user_id } = req.body;

            const novaGoal = await Goal.create({
                name,
                amount,
                category_id,
                user_id
            });

            res.status(201).json(novaGoal);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarGoals(req, res) {
        try {
            const { user_id } = req.query;
            const goals = await Goal.getByUserId(user_id);
            res.json(goals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obterGoal(req, res) {
        try {
            const { id } = req.params;
            const goal = await Goal.getById(id);

            if (!goal) {
                return res.status(404).json({ error: 'Meta não encontrada' });
            }

            

            res.json(goal);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async atualizarGoal(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizacao = req.body;

            // Primeiro verifica se a meta existe
            const goalExistente = await Goal.getById(id);
            if (!goalExistente) {
                return res.status(404).json({ error: 'Meta não encontrada' });
            }

            const goalAtualizada = await Goal.update(id, dadosAtualizacao);
            res.json(goalAtualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarGoal(req, res) {
        try {
            const { id } = req.params;

            // Primeiro verifica se a meta existe
            const goalExistente = await Goal.getById(id);
            if (!goalExistente) {
                return res.status(404).json({ error: 'Meta não encontrada' });
            }

            const deletado = await Goal.delete(id);
            if (!deletado) {
                return res.status(404).json({ error: 'Meta não encontrada' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default GoalController;