import { Schema, Types, model } from "mongoose";

const movieSchema = new Schema({
    id: Number,
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
});

const Movie = model("Movie", movieSchema);

export default Movie;
