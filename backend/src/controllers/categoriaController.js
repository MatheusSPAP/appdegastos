import Categoria from '../models/categoria.js';

class CategoriaController {
    static async criarCategoria(req, res) {
        try {
            const { name } = req.body;
            const novaCategoria = await Categoria.create({ name });
            res.status(201).json(novaCategoria);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarCategorias(req, res) {
        try {
            const categorias = await Categoria.getAll();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obterCategoria(req, res) {
        try {
            const { id } = req.params;
            const categoria = await Categoria.getById(id);

            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            res.json(categoria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async atualizarCategoria(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const categoriaAtualizada = await Categoria.update(id, { name });
            res.json(categoriaAtualizada);
        } catch (error) {
            const status = error.message.includes('não encontrada') ? 404 : 400;
            res.status(status).json({ error: error.message });
        }
    }

    static async deletarCategoria(req, res) {
        try {
            const { id } = req.params;
            const deletado = await Categoria.delete(id);

            if (!deletado) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            res.status(204).send();
        } catch (error) {
            const status = error.message.includes('em uso') ? 409 : 500;
            res.status(status).json({ error: error.message });
        }
    }
}

export default CategoriaController;