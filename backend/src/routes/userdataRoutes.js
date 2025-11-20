import express from 'express';
import UserController from '../controllers/datausersController.js';

const router = express.Router();

// Rotas 
router.post('/registrar', UserController.registrar);
router.post('/login', UserController.login);
router.get('/:id', UserController.obterUsuario);
router.put('/:id', UserController.atualizarUsuario);
router.delete('/:id', UserController.deletarUsuario);

export default router;