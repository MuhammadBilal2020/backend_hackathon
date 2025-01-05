import express from "express"
import { getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register" , registerUser)
router.get("/getAllUsers" , getAllUsers)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)




export default router