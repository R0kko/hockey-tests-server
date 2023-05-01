const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Op} = require("sequelize");

exports.register = async (req, res) => {
    try {
        const { username, email, password, first_name, last_name, patronymic, role_id } = req.body;

        if (!username || !email || !password || !first_name || !last_name || !role_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { username },
                ],
            },
        });

        if (userExists) {
            return res.status(400).json({ message: 'Email or username already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            first_name,
            last_name,
            patronymic,
            role_id,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                patronymic: newUser.patronymic,
                role_id: newUser.role_id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log(username);

        if (!username || !password) {
            console.log("Missing required fields");
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // noinspection JSCheckFunctionSignatures
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Некорректный пароль' });
        }

        const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                patronymic: user.patronymic,
                role_id: user.role_id,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByPk(id, {
            attributes: ['id', 'email', 'username', 'first_name', 'last_name', 'patronymic', 'role_id']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, first_name, last_name, patronymic, role_id } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({
            username: username || user.username,
            email: email || user.email,
            first_name: first_name || user.first_name,
            last_name: last_name || user.last_name,
            patronymic: patronymic || user.patronymic,
            role_id: role_id || user.role_id
        });

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                patronymic: user.patronymic,
                role_id: user.role_id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
