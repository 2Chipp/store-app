import jwt from 'jsonwebtoken';
import { SKEY } from '../Controllers/authController.js';

export const validateToken = (req, res, next) => {

    const {token} = req.cookies;

    if(!token) return res.status(401).json("No token, authorization denied");

    jwt.verify(token, SKEY,(err, user)=>{
        if(err) return req.status(401).json("Invalid token");

        req.user = user;

        next();
    });
}

export const validateTokenAndID = (req, res, next) => {
    validateToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            return res.status(403).json("Authorization denied");
        }
    });
};

export const validateTokenAndAdmin = (req, res, next) => {
    validateToken(req, res, () => {
        if(!req.user.isAdmin) return res.status(403).json("Authorization denied");
        
        next();
    });
};