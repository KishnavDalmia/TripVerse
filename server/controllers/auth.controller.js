import User from './../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { use } from 'react';

export const register = async(req,res) => {
    const {name,username,email,password} = req.body;
    if(!email || !password || !name || !username) res.send(400).json({message: 'All fields are required'});
    const user = await User.findOne({email});
    if(user) res.send(400).json({message: 'User already exists'});
    const hashedPass = await bcrypt.hash(password,10);
    const newUser = new User({
        name,
        username,
        email,
        password: hashedPass
    });
    await newUser.save();

    const accessToken = jwt.sign({
        id: newUser._id,
        email: newUser.email,
        name: newUser.name
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '30s'});

    const refreshToken = jwt.sign({
        id: newUser._id,
        email: newUser.email,
        name: newUser.name
    },process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '1d'});
    
    res.cookie('jwt',refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({accessToken});
}

export const login = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password) res.send(400).json({message: 'Email and password are required'});
    const user = await User.findOne({email});
    if(!user) res.send(400).json({message: 'User not found'});
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid) res.send(400).json({message: 'Invalid password'});

    const accessToken = jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'}
    );

    const refreshToken = jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name
        },process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    );
    
    res.cookie('jwt',refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({accessToken});
}

export const refresh = async(req,res) =>{
    const cookies = req.cookies;
    if(!cookies?.jwt) res.send(401).json({message: 'Unauthorized'});

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,async(err,decoded) => {
        if(err) res.send(403).json({message: 'Forbidden'});
        const foundUser = await User.findOne({email: decoded.email});
        if(!foundUser) res.send(401).json({message: 'Unauthorized'});

        const accessToken = jwt.sign({
            id: foundUser._id,
            email: foundUser.email,
            name: foundUser.name
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'});
    });

    res.send({accessToken});
}

export const logout = async(req,res) => {
    if(!req.cookies?.jwt) res.send(204).json({message: 'No content'});
    res.clearCookie('jwt',{
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    res.json({message: 'Logged out successfully'});
}

export const me = async(req,res) => {

}