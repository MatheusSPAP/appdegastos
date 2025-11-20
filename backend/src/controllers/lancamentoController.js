import Lancamento from '../models/lancamento.js';

class LancamentoController {
    static async criarLancamento(req, res) {
        try {
            const { date, amount, description, tipo_lancamento, category_id, user_id } = req.body;

            const novoLancamento = await Lancamento.create({
                date,
                amount,
                description,
                tipo_lancamento,
                category_id,
                user_id
            });

            res.status(201).json(novoLancamento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarLancamentos(req, res) {
        try {
            const { user_id } = req.query; // Alterado para pegar da query
            const lancamentos = await Lancamento.getByUserId(user_id);
            res.json(lancamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obterLancamento(req, res) {
        try {
            const { id } = req.params;
            const lancamento = await Lancamento.getById(id);

            if (!lancamento) {
                return res.status(404).json({ error: 'Lançamento não encontrado' });
            }

            

            res.json(lancamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async atualizarLancamento(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizacao = req.body;

            // Primeiro verifica se o lançamento existe
            const lancamentoExistente = await Lancamento.getById(id);
            if (!lancamentoExistente) {
                return res.status(404).json({ error: 'Lançamento não encontrado' });
            }

            const lancamentoAtualizado = await Lancamento.update(id, dadosAtualizacao);
            res.json(lancamentoAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarLancamento(req, res) {
        try {
            const { id } = req.params;

            // Primeiro verifica se o lançamento existe
            const lancamentoExistente = await Lancamento.getById(id);
            if (!lancamentoExistente) {
                return res.status(404).json({ error: 'Lançamento não encontrado' });
            }

            const deletado = await Lancamento.delete(id);
            if (!deletado) {
                return res.status(404).json({ error: 'Lançamento não encontrado' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default LancamentoController;