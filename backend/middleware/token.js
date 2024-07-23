import { JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.Header.startsWith("Bearer ")){
        return res.status(403).json({});
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Post verification, append a new field to request body 
        // which would come from the decoded user
        if (decoded.userId){
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({});
        }
    } catch (err) {
        return res.status(403).json({});
    }
}
