import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { getToken } from "../utils/userUtils.js";

export default {
    async register(userData) {
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            throw new Error("User already exists!");
        }

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
            throw new Error("Invalid Email or Password!");
        }

        const isValid = await bcrypt.compare(userData.password, user.password);

        if (!isValid) {
            throw new Error("Invalid Email or Password");
        }

        const token = getToken(user);

        return token;
    },
};
