const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, email, password, first_name, last_name, patronymic, role_id } = req.body;

        if ( !username || !email || !password || !first_name || !last_name || !role_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ message: 'Email already in use' });
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
    // Implement login logic
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
