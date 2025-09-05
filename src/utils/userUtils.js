import { JWTsecret } from "../config/constants.js";
import jsonwebtoken from "jsonwebtoken";

export const getToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const token = jsonwebtoken.sign(payload, JWTsecret, {
        expiresIn: "1h",
    });

    return token;
};
