import express from 'express';
import GoalController from '../controllers/goalController.js';

const router = express.Router();


// Rotas para metas
router.post('/', GoalController.criarGoal);
router.get('/', GoalController.listarGoals);
router.get('/:id', GoalController.obterGoal);
router.put('/:id', GoalController.atualizarGoal);
router.delete('/:id', GoalController.deletarGoal);

export default router;