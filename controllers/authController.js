import User from "../models/user.js";
import { STATUS } from "../common/constants.js";
import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"
export const addUser = async (req, res) => {
    try {
        console.log("calld");
        const { name, email, password, userId,role } = req.body;
        if (!userId) return res.status(STATUS.BAD_REQUEST).send({ message: "userId is required !" });
        const findUser = await User.findOne({ userId })
        if (findUser) return res.status(STATUS.BAD_REQUEST).send({ message: "User already exists" })
           role=2
        const user = new User({ name, email, password, userId,role })
        const result = await user.save()
        res.status(STATUS.CREATED).send({ message: "User created successfully", result })
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).send({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { userId, password } = req.body;
        if (!userId || !password) {
            return res
                .status(STATUS.BAD_REQUEST)
                .send({ message: "User ID and password are required" });
        }
        const user = await User.findOne({ userId });
        if (!user) {
            return res
                .status(STATUS.BAD_REQUEST)
                .send({ message: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res
                .status(STATUS.BAD_REQUEST)
                .send({ message: "Invalid email or password" });
        }
        const token = JWT.sign({ id: user._id, role: user.role }, 'SECRET', {
            expiresIn: '1h',
        });
        const data = {
            userId: user.userId,
            name: user.name,
            token,
            role: user.role,
        };

        return res.status(STATUS.OK).send({
            message: "Login successful",
            data,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res
            .status(STATUS.INTERNAL_ERROR)
            .send({ message: "Internal Server Error" });
    }
};
