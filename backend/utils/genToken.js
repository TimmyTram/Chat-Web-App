import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });


    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // in milliseconds
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CRSF attacks
        secure: process.env.NODE_ENV !== "development"
    });
}

export default generateTokenAndSetCookie;