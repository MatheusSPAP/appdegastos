import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Importação de rotas
import userdataRoutes from './src/routes/userdataRoutes.js';
import categoriaRoutes from './src/routes/categoriaRoutes.js';
import lancamentoRoutes from './src/routes/lancamentoRoutes.js';
import goalRoutes from './src/routes/goalRoutes.js';
import budgetRoutes from './src/routes/budgetRoutes.js';

// --- Configuração do Servidor ---
const app = express();
const port = process.env.PORT || 3000;

// Configuração de caminho para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middlewares ---
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// --- Rotas da API ---
app.use('/api/data', userdataRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/lancamentos', lancamentoRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/budget', budgetRoutes);

// Rota principal que serve o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

// --- Iniciar o Servidor ---
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});