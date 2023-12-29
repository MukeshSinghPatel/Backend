const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.signup = async (req,res) => {
    try {
        // get data
        const { name, email, password, role } = req.body;
        // check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "error in hashing password"
            });
        }

        // create entry for user
        const user = await User.create({
            name, email, password: hashedPassword, role
        })
        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can't be registered, please try again later"
        })

    }
}


// login

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        // validate an email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Please Enter Valid Details"
            });
        }
        let user = await User.findOne({ email }); 
        // if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            });
        }
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        // verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h"
            })

            user = user.toObject();
            user.token=token;
            console.log(user)
            user.password = undefined;
            console.log(user)
            const options = {
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("mukuCookie",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged In Successsful"
            });
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password Incorrect"
            });
        }
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Failure"
        })
    }
}