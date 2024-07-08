import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username
        });

    } catch (error) {
        console.log("[ERROR]: Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error."})
    }
};

export const login = (req, res) => {
    console.log("loginUser");
};

export const logout = (req, res) => {
    console.log("logoutUser");
};