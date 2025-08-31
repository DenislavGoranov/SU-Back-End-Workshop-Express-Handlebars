import Cast from "../Models/Cast.js";

const castService = {
    getAll() {
        return Cast.find();
    },
    getAllWithFilter(filter) {
        let query = Cast.find();

        if (filter.exclude && filter.exclude.length > 0) {
            query = query.where("_id").nin(filter.exclude);
        }

        return query;
    },
    async create(castData) {
        const newCast = new Cast(castData);
        await newCast.save();

        return castData;
    },
};

export default castService;
