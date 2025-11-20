import UserDataDb from '../db/userDatadb.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class User {
    static async create({ username, email, password }) {
        // Validações
        if (!username || username.trim() === '') {
            throw new Error('O nome de usuário é obrigatório');
        }
        if (!email || email.trim() === '') {
            throw new Error('O email é obrigatório');
        }
        if (!password || password.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres');
        }

        // Verifica se o email já existe
        const existingUser = await this.getByEmail(email);
        if (existingUser) {
            throw new Error('Este email já está em uso');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await UserDataDb.create({
                username: username.trim(),
                email: email.trim(),
                password_hash: hashedPassword
            });
            return this.getById(userId);
        } catch (error) {
            if (error.message.includes('ER_DUP_ENTRY')) {
                throw new Error('Este email já está em uso');
            }
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            const user = await UserDataDb.getById(id);
            if (!user) throw new Error('Usuário não encontrado');
            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }

    static async getByEmail(email) {
        try {
            return await UserDataDb.getByEmail(email.trim());
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }

    static async authenticate(email, password) {
        try {
            const authResult = await UserDataDb.authenticate(email.trim(), password);
            if (!authResult) throw new Error('Credenciais inválidas');
            return authResult;
        } catch (error) {
            throw new Error(`Erro na autenticação: ${error.message}`);
        }
    }

    static async update(id, { username, email, password }) {
        try {
            const updateData = {};
            if (username) updateData.username = username.trim();
            if (email) updateData.email = email.trim();
            if (password) {
                if (password.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres');
                updateData.password_hash = await bcrypt.hash(password, 10);
            }

            if (Object.keys(updateData).length === 0) {
                throw new Error('Nenhum dado válido para atualização');
            }

            await UserDataDb.update(id, updateData);
            return this.getById(id);
        } catch (error) {
            if (error.message.includes('ER_DUP_ENTRY')) {
                throw new Error('Este email já está em uso');
            }
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const deleted = await UserDataDb.delete(id);
            if (!deleted) throw new Error('Usuário não encontrado');
            return deleted;
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }
}

export default User;