import express from 'express';
import BudgetController from '../controllers/budgetController.js';

const router = express.Router();


// Rotas para orçamentos
router.post('/', BudgetController.criarBudget);
router.put('/:id', BudgetController.atualizarBudget);
router.get('/', BudgetController.listarBudgets);
router.get('/:month_year', BudgetController.obterBudgetPorMes);
router.delete('/:id', BudgetController.deletarBudget);

export default router;