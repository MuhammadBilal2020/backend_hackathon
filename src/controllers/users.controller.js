import express from "express"
import User from "../models/users.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const generateAccessToken = (user) => {
    if (!process.env.ACCESS_JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "1h", // Set the token expiration
    });
};

const generateRefreshToken = (user) => {
    if (!process.env.REFRESH_JWT_SECRET) {
        throw new Error("REFRESH_JWT_SECRET is not defined in the environment variables");
    }

    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: "1h", // Set the token expiration
    });
};

// register 
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username) return res.status(400).json({ message: "Username required" });
    if (!email) return res.status(400).json({ message: "Email required" });
    if (!password) return res.status(400).json({ message: "Password required" });

    const user = await User.findOne({ email: email });
    if (user) return res.status(401).json({ message: "User already exists" });

    const createUser = await User.create({
        username,
        email,
        password,
    });
    res.json({ message: "User registered successfully", data: createUser });
};

const getAllUsers = async (req, res) => {
    try {
        // Fetch all users and populate their blogs
        const users = await User.find()

        // Send the response with users
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching users", 
            error: error.message,
        });
    }
};


//login
let loginUser = async (req  , res) => {
    const { email, password } = req.body

    if (!email) return res.status(400).json({ message: "email is required" })
    if (!password) return res.status(400).json({ message: "password is required" })

    let user = await User.findOne({ email })
    console.log(user);

    if (!user) return res.status(404).json({ message: " user not found" })

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) return res.status(402).json({ message: "password is incorrect" })

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

      // cookies
  res.cookie("refreshToken", refreshToken, { http: true, secure: true });

  res.json({
    message: "user loggedIn successfully",
    accessToken,
    refreshToken,
    data: user,
  });



}


//logout
const logoutUser = async (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "user logout successfully" });
  };




export { registerUser ,loginUser , logoutUser , getAllUsers }