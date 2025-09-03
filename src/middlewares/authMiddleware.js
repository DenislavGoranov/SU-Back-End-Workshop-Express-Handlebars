import jsonwebtoken from "jsonwebtoken";
import { JWTsecret } from "../config/constants.js";

export const auth = (req, res, next) => {
    const token = req.cookies["auth"];

    if (!token) {
        return next();
    }

    try {
        const { id, email } = jsonwebtoken.verify(token, JWTsecret);

        req.user = { id, email };
        res.locals.user = { id, email };
        next();
    } catch (error) {
        res.clearCookie("auth");
        res.redirect("/user/login");
    }
};
