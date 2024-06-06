import { db } from '../connect.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    const { name, email, password, role, createdBy, superiorId } = req.body;

    console.log('Iniciando o processo de registro...');

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao verificar e-mail:', err.message);
            return res.status(500).json({ message: 'Erro ao verificar e-mail' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'E-mail já está registrado' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Erro ao criptografar a senha:', err.message);
                return res.status(500).json({ message: 'Erro ao criptografar a senha' });
            }
            console.log('Senha criptografada:', hashedPassword);

            db.query(
                'INSERT INTO users (name, email, password, role, created_by, superior_id) VALUES (?, ?, ?, ?, ?, ?)',
                [name, email, hashedPassword, role, createdBy, superiorId],
                (err, result) => {
                    if (err) {
                        console.error('Erro ao registrar usuário:', err.message);
                        return res.status(500).json({ message: 'Erro ao registrar usuário' });
                    }
                    console.log('Resultado da inserção:', result);
                    res.status(201).json({ message: 'Usuário criado com sucesso' });
                }
            );
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    console.log('Iniciando o processo de login...');

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err.message);
            return res.status(500).json({ message: 'Erro ao fazer login' });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Erro ao comparar senha:', err.message);
                return res.status(500).json({ message: 'Erro ao fazer login' });
            }
            if (!isMatch) {
                return res.status(400).json({ message: 'E-mail ou senha incorretos' });
            }

            const token = jwt.sign(
                { userId: user.user_id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login bem-sucedido', token });
        });
    });
};

export const deleteUser = (req, res) => {
    const userId = req.params.id;

    db.query('DELETE FROM users WHERE user_id = ?', userId, (err, result) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err.message);
            return res.status(500).json({ message: 'Erro ao deletar usuário' });
        }
        console.log('Usuário deletado:', result);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    });
};