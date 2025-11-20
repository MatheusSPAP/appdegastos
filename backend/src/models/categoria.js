import CategoriaDb from '../db/categoriaDb.js';

class Categoria {
    static async create(name) {
        if (!name || name.trim() === '') {
            throw new Error('O nome da categoria é obrigatório');
        }

        try {
            const id = await CategoriaDb.create(name.trim());
            return this.getById(id);
        } catch (error) {
            if (error.message.includes('ER_DUP_ENTRY')) {
                throw new Error('Já existe uma categoria com este nome');
            }
            throw new Error(`Erro ao criar categoria: ${error.message}`);
        }
    }

    static async getAll() {
        try {
            return await CategoriaDb.getAll();
        } catch (error) {
            throw new Error(`Erro ao buscar categorias: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            const categoria = await CategoriaDb.getById(id);
            if (!categoria) throw new Error('Categoria não encontrada');
            return categoria;
        } catch (error) {
            throw new Error(`Erro ao buscar categoria: ${error.message}`);
        }
    }

    static async update(id, name) {
        if (!name || name.trim() === '') {
            throw new Error('O nome da categoria é obrigatório');
        }

        try {
            await CategoriaDb.update(id, name.trim());
            return this.getById(id);
        } catch (error) {
            if (error.message.includes('ER_DUP_ENTRY')) {
                throw new Error('Já existe uma categoria com este nome');
            }
            throw new Error(`Erro ao atualizar categoria: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const deleted = await CategoriaDb.delete(id);
            if (!deleted) throw new Error('Categoria não encontrada');
            return deleted;
        } catch (error) {
            if (error.message.includes('em uso')) {
                throw new Error('Esta categoria está em uso e não pode ser removida');
            }
            throw new Error(`Erro ao deletar categoria: ${error.message}`);
        }
    }
}

export default Categoria;