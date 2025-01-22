// const jwt = require('jsonwebtoken');
// const STATUS = require('./statusCodes');  // Import your status codes
import jwt from "jsonwebtoken"
import { STATUS } from "../common/constants.js";

export const verifyToken = (requiredRole = null) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is passed as Bearer <token>

        if (!token) {
            return res.status(STATUS.UNAUTHORIZED).send({ message: "No token provided" });
        }

        try {
            const decoded = jwt.verify(token, 'SECRET');  // Replace 'SECRET' with your JWT secret key
            req.user = decoded;
        req.body.id = decoded.id;


            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(STATUS.FORBIDDEN).send({ message: "You do not have permission to access this resource" });
            }

            next();

        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(STATUS.UNAUTHORIZED).send({ message: "Invalid token" });
        }
    };
};

