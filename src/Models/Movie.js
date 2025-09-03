import { Schema, Types, model } from "mongoose";

const movieSchema = new Schema({
    title: String,
    type: String,
    category: String,
    genre: String,
    director: String,
    year: String,
    imageUrl: String,
    rating: Number,
    description: String,
    casts: [
        {
            type: Types.ObjectId,
            ref: "Cast",
        },
    ],
    owner: {
        type: Types.ObjectId,
        ref: "User",
    },
});

const Movie = model("Movie", movieSchema);

export default Movie;
