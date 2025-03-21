import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/genToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match."});
        }

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error: "Username already exists."});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword
        });

        if (newUser) {
            // generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username
            });
        } else {
            res.status(400).json({error: "Invalid User Data."});
        }

    } catch (error) {
        console.log("[ERROR]: Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error."})
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});

        const isPasswordValid = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordValid) {
            return res.status(400).json({error: "Invalid username or password."});
        }

        generateTokenAndSetCookie(user._id, res);
        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username
        });

    } catch(error) {
        console.log("[ERROR]: Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error."})
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged Out Sucessfully."});
    } catch (error) {
        console.log("[ERROR]: Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error."})
    }
};