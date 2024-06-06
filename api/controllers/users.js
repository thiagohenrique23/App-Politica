import { db } from '../connect.js';

export const getUser = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err.message);
            return res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
        res.status(200).json(results);
    });
};

export const getUserById = (req, res) => {
    const userId = req.params.id;

    db.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err.message);
            return res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const user = results[0];
        res.status(200).json(user);
    });
};