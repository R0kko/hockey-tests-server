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
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
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
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUser = async (req, res) => {
    // Implement logic to get a user by ID
};

exports.updateUser = async (req, res) => {
    // Implement logic to update a user
};

exports.deleteUser = async (req, res) => {
    // Implement logic to delete a user
};
