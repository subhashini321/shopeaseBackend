import express from "express"
import { addUser, login } from "../controllers/authController.js"

const authRouter=express.Router()


authRouter.post("/add-user",addUser)
authRouter.post("/login",login)

export default authRouter

