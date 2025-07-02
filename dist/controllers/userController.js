"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User_1.default({ name, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.createUser = createUser;
