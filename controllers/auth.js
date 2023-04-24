import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {

        //TEST DE SECURITE
        if(
            req.body.password.length > 256 || 
            req.body.username.length > 256 || 
            req.body.email.length > 256 || 
            req.body.password.length === 0 ||
            req.body.username.length === 0 ||
            req.body.email.length === 0 
        ) {
            return res.status(404).json("Oops a problem occurred")
        }


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);



        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        // return console.log("LE MEC QUI VEUT SE LOGUER ", newUser);

        await newUser.save();
        res.status(201).send("User has been created .")

    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        
        //TEST DE SECURITE
        if(
            req.body.password.length > 256 || 
            req.body.username.length > 256 || 
            req.body.password.length === 0 ||
            req.body.username.length === 0 
        ) {
            return res.status(404).json("Oops a problem occurred")
        }


        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(404).json("User not found")

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({
            status: 400,
            message: "username or password incorrect!"
        });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const {password, isAdmin, ...otherDetails} = user._doc;
        let data = otherDetails;
        data.token = token;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(data)
        
    } catch (err) {
        next(err);
    }
}



export const logout = (req, res) => {
    res.clearCookie("access_token", {
        secure: true,
        sameSite:"none"
    }).status(200).json("User logout!")
}

