import { Schema, Types, model } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        minLength: [5, "Title could be at least 5 characters long!"],
        validate: [
            /^[a-zA-Z ]+$/,
            "Title can only contain English letters and spaces!",
        ],
    },
    category: String,
    genre: {
        type: String,
        minLength: [5, "Genre could be at least 5 characters long!"],
        validate: [
            /^[a-zA-Z ]+$/,
            "Genre can only contain English letters and spaces!",
        ],
    },
    director: {
        type: String,
        minLength: [5, "Director's name could be at least 5 characters long!"],
        validate: [
            /^[a-zA-Z ]+$/,
            "Genre can only contain English letters and spaces!",
        ],
    },
    year: {
        type: Number,
        min: [1900, "Year can't be earlier than 1900"],
        max: [2025, "Year can't be later than 2025"],
    },
    imageUrl: {
        type: String,
        validate: [
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i,
            "Invalid image URL",
        ],
        required: true,
    },
    rating: {
        type: Number,
        max: 1,
        min: 10,
    },
    description: {
        type: String,
        minLength: 20,
        validate: [/^[a-zA-Z0-9 ]+$/],
    },
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
