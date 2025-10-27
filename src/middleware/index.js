import passport from "../config/passport.js";
import { createErrorResponse } from "../utils/responseAPI.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// ========== AUTH MIDDLEWARE ==========
const isAuthenticated = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (_, user) => {
        if (!user) {
            res.status(401).json(createErrorResponse(401, "Unauthorized"));
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};

// ========== EXPORT ==========
const middleware = {
    isAuthenticated,
};

export default middleware;
