import Cast from "../Models/Cast.js";

const castService = {
    getAll() {
        return Cast.find({});
    },
    getById(castId) {
        return Cast.findById(castId);
    },
    async create(castData) {
        const newCast = new Cast.create(castData);
        await newCast.save;

        return castData;
    },
};

export default castService;
