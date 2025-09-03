import jsonwebtoken from "jsonwebtoken";
import { JWTsecret } from "../config/constants.js";

export default auth = (req, res, next) => {
    const token = req.cookies("auth");

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jsonwebtoken.verify(token, JWTsecret);
        next();
    } catch (error) {
        res.clearCookie("auth");
        res.redirect("/user/login");
    }
};
