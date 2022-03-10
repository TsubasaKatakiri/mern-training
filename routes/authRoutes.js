const {Router}=require('express');
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const {check, validationResult} = require ("express-validator");
const jwt=require('jsonwebtoken');
const config=require('config');
const router=Router();

// /api/auth/register
router.post('/register', [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({min: 6}),
    ], async (req, res)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Incorrect registration data"})
        }
        const {email, password} = req.body;
        const candidate=await User.findOne({email});

        if(candidate){
            return res.status(400).json({message: "User is already registered"})
        }

        const hashPassword=await bcrypt.hash(password, 12);
        const user=new User({email, password: hashPassword});
        await user.save();
        res.status(201).json({message: "User created"});
    } catch (error) {
        res.status(500).json({message: "Something is wrong..."})
    }
})

// /api/auth/login
router.post('/login', [
    check('email', 'Email is incorrect').normalizeEmail().isEmail(),
    check('password', 'Password is incorrect').exists(),
    ], async (req, res)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Incorrect email and/or password"});
        }
        const {email, password} = req.body;
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Incorrect email and/or password"});
        }
        const isMatch=bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect email and/or password"});
        }

        const token=jwt.sign({userId: user.id}, config.get("jwtSecret"), {expiresIn: '1h'});
        res.status(200).json({token, userId: user.id});

    } catch (error) {
        res.status(500).json({message: "Something is wrong..."})
    }
})


module.exports=router;