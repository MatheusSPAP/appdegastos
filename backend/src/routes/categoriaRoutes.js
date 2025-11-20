import express from 'express';
import CategoriaController from '../controllers/categoriaController.js';

const router = express.Router();

// Rotas para categorias 
router.post('/', CategoriaController.criarCategoria);
router.get('/', CategoriaController.listarCategorias);
router.get('/:id', CategoriaController.obterCategoria);
router.put('/:id', CategoriaController.atualizarCategoria);
router.delete('/:id', CategoriaController.deletarCategoria);

export default router;