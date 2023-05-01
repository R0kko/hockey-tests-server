const User = require('../models/User');
const CategoryName = require('../models/CategoryName');
const RefereeCategory = require('../models/RefereeCategory');

exports.assignCategory = async (req, res) => {
    try {
        const { username, categoryId } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const category = await CategoryName.findByPk(categoryId);
        const valid_until = new Date();

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        } else if (category.name === '3-я категория') {
            valid_until.setFullYear(valid_until.getFullYear() + 1);
        } else if (category.name === '2-я категория') {
            valid_until.setFullYear(valid_until.getFullYear() + 2);
        } else if (category.name === '1-я категория') {
            valid_until.setFullYear(valid_until.getFullYear() + 3);
        } else if (category.name === 'Всероссийская категория') {
            valid_until.setFullYear(valid_until.getFullYear() + 4);
        } else if (category.name === 'Юный судья') {
            valid_until.setFullYear(valid_until.getFullYear() + 1);
        } else {
            return res.status(404).json({ message: 'Category not found' });
        }

        // check if this category is already assigned to this user
        const refereeCategoryExists = await RefereeCategory.findOne({
            where: {
                user_id: user.id,
                category_id: categoryId
            }
        });

        if (refereeCategoryExists) {
            return res.status(400).json({ message: 'Category already assigned to this user' });
        }

        const refereeCategory = await RefereeCategory.create({
            user_id: user.id,
            category_id: categoryId,
            valid_until: valid_until
        });

        res.status(201).json({ message: 'Category assigned successfully', refereeCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllRefereeCategories = async (req, res) => {
    try {
        const refereeCategories = await RefereeCategory.findAll();
        res.status(200).json(refereeCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getRefereeCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const refereeCategory = await RefereeCategory.findByPk(id);

        if (!refereeCategory) {
            return res.status(404).json({ message: 'Referee category not found' });
        }

        res.status(200).json(refereeCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateRefereeCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryId } = req.body;

        const refereeCategory = await RefereeCategory.findByPk(id);

        if (!refereeCategory) {
            return res.status(404).json({ message: 'Referee category not found' });
        }

        await refereeCategory.update({ category_id: categoryId });

        res.status(200).json({ message: 'Referee category updated successfully', refereeCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteRefereeCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const refereeCategory = await RefereeCategory.findByPk(id);

        if (!refereeCategory) {
            return res.status(404).json({ message: 'Referee category not found' });
        }

        await refereeCategory.destroy();

        res.status(200).json({ message: 'Referee category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
