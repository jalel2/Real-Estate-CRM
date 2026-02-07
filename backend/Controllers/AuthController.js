import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import generateToken from '../Utils/TokenGenerator.js';


export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: 'User not found'});
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'});

        const token = generateToken(user);
        res.status(200).json({user,token, redirectTo: user.role === 'admin' ? 'admin logged in successfully' : 'agent logged in successfully'});
    } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    };



export const logout = (req, res) => {
    try{
        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }};
