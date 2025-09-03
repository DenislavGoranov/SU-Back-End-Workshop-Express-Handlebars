import User from "../Models/User.js";
import jsonwebtoken from "jsonwebtoken";

const JWTsecret = "asdasd";

export default {
    async register(userData) {
        await User.create(userData);

        const payload = {
            id: userData.id,
            email: userData.email,
        };

        const token = jsonwebtoken.sign(payload, JWTsecret, {
            expiresIn: "1h",
        });

        return token;
    },
};
