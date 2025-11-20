import express from 'express';
import LancamentoController from '../controllers/lancamentoController.js';

const router = express.Router();


// Rotas para lançamentos
router.post('/', LancamentoController.criarLancamento);
router.get('/', LancamentoController.listarLancamentos);
router.get('/:id', LancamentoController.obterLancamento);
router.put('/:id', LancamentoController.atualizarLancamento);
router.delete('/:id', LancamentoController.deletarLancamento);

export default router;