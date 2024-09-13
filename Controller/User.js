const User = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware for Securing Routes
exports.secure = async function (req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) throw new Error('Please enter a token');

        let verify = jwt.verify(token, 'post');
        let userVerify = await User.findById(verify.id);
        if (!userVerify) throw new Error('User not found');

        next();
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        });
    }
};

// User Signup
exports.UserSignup = async function (req, res, next) {
    try {
        console.log(req.file);
        if (!req.file) throw new Error('Profile picture upload failed');

        req.body.profilePicture = req.file.originalname; // Save the filename of the uploaded image

        req.body.password = await bcrypt.hash(req.body.password, 10); // Hash the password

        let userCreate = await User.create(req.body);

        res.status(200).json({
            status: 'Success',
            message: 'User created successfully!',
            data: userCreate
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        });
    }
};

// User Login
exports.UserLogin = async function (req, res, next) {
    try {
        let userFind = await User.findOne({ email: req.body.email });
        if (!userFind) throw new Error('User not found!');

        let passwordCompare = await bcrypt.compare(req.body.password, userFind.password);
        if (!passwordCompare) throw new Error('Password invalid!');

        let token = jwt.sign({ id: userFind._id }, 'post');

        res.status(200).json({
            status: 'Success',
            message: 'User logged in successfully!',
            data: userFind,
            token
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        });
    }
};

// Find All Users
exports.FindData = async function (req, res, next) {
    try {
        let userFind = await User.find();

        res.status(200).json({
            status: 'Success',
            message: 'Users found successfully!',
            data: userFind
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        });
    }
};

// Find User by ID
exports.FindId = async function (req, res, next) {
    try {
        let userFind = await User.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            message: 'User found successfully!',
            data: userFind
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        });
    }
};

// Delete User by ID
exports.UserDelete = async function (req, res, next) {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'Success',
            message: 'User deleted successfully!'
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        });
    }
};

// Update User by ID
exports.UserUpdate = async function (req, res, next) {
    try {

        console.log(req.file);
        if (!req.file) throw new Error('Profile picture upload failed');

        req.body.profilePicture = req.file.originalname; 

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            status: 'Success',
            message: 'User updated successfully!',
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        });
    }
};
