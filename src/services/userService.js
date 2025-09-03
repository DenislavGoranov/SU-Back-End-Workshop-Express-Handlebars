import User from "../Models/User.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWTsecret } from "../config/constants.js";

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
    async login(userData) {
        const user = await User.findOne({ email: userData.email });

        if (!user) {
            throw new Error("No Such User!");
        }

        const isValid = await bcrypt.compare(userData.password, user.password);

        if (!isValid) {
            throw new Error("Invalid Email or Password");
        }

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
