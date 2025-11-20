import LancamentoDb from '../db/lancamentoDb.js';

class Lancamento {
    static async create({ date, amount, description, tipo_lancamento, category_id, user_id }) {
        // Validações
        if (!date) throw new Error('A data é obrigatória');
        if (!amount || isNaN(amount)) throw new Error('O valor é obrigatório');
        if (!description || description.trim() === '') {
            throw new Error('A descrição é obrigatória');
        }
        if (!tipo_lancamento) throw new Error('O tipo de lançamento é obrigatório');
        if (!user_id) throw new Error('ID do usuário é obrigatório');

        try {
            const id = await LancamentoDb.create({
                date,
                amount,
                description: description.trim(),
                tipo_lancamento,
                category_id,
                user_id
            });
            return this.getById(id);
        } catch (error) {
            throw new Error(`Erro ao criar lançamento: ${error.message}`);
        }
    }

    static async getByUserId(user_id) {
        try {
            return await LancamentoDb.getByUserId(user_id);
        } catch (error) {
            throw new Error(`Erro ao buscar lançamentos: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            const lancamento = await LancamentoDb.getById(id);
            if (!lancamento) throw new Error('Lançamento não encontrado');
            return lancamento;
        } catch (error) {
            throw new Error(`Erro ao buscar lançamento: ${error.message}`);
        }
    }

    static async update(id, { date, amount, description, tipo_lancamento, category_id }) {
        try {
            await LancamentoDb.update(id, {
                date,
                amount,
                description: description?.trim(),
                tipo_lancamento,
                category_id
            });
            return this.getById(id);
        } catch (error) {
            throw new Error(`Erro ao atualizar lançamento: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const deleted = await LancamentoDb.delete(id);
            if (!deleted) throw new Error('Lançamento não encontrado');
            return deleted;
        } catch (error) {
            throw new Error(`Erro ao deletar lançamento: ${error.message}`);
        }
    }
}

export default Lancamento;