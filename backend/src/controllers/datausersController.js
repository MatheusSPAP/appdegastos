import User from '../models/userDatamodels.js';

class UserController {
    static async registrar(req, res) {
        try {
            const { username, email, password } = req.body;
            const novoUsuario = await User.create({ username, email, password });
            
            // Não retornar a senha hash
            const { password_hash, ...usuarioSemSenha } = novoUsuario;
            
            res.status(201).json(usuarioSemSenha);
        } catch (error) {
            const status = error.message.includes('já está em uso') ? 409 : 400;
            res.status(status).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const authResult = await User.authenticate(email, password);
            res.json(authResult);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    static async obterUsuario(req, res) {
        try {
            const { id } = req.params;
            const usuario = await User.getById(id);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizacao = req.body;

            

            const usuarioAtualizado = await User.update(id, dadosAtualizacao);
            res.json(usuarioAtualizado);
        } catch (error) {
            const status = error.message.includes('já está em uso') ? 409 : 400;
            res.status(status).json({ error: error.message });
        }
    }

    static async deletarUsuario(req, res) {
        try {
            const { id } = req.params;

            

            const deletado = await User.delete(id);
            if (!deletado) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserController;