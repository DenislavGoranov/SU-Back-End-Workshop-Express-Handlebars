import Cast from "../Models/Cast.js";

const castService = {
    getAll() {
        return Cast.find({});
    },
    async create(castData) {
        const newCast = new Cast(castData);
        await newCast.save();

        return castData;
    },
};

export default castService;
