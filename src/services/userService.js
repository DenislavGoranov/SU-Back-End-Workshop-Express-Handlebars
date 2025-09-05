import User from "../Models/User.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWTsecret } from "../config/constants.js";
import { getToken } from "../utils/userUtils.js";

export default {
    async register(userData) {
        if (userData.password !== userData.rePassword) {
            throw new Error("Passwords Missmatch!");
        }

        const user = await User.create(userData);

        const token = getToken(user);

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

        const token = getToken(user);

        return token;
    },
};
