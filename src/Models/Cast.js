import { Schema, model } from "mongoose";

const castSchema = new Schema({
    title: {
        type: String,
        minLength: [5, "Name could be at least 5 characters long!"],
        validate: [
            /^[a-zA-Z ]+$/,
            "Name can only contain English letters and spaces",
        ],
    },
    age: {
        type: Number,
        minLength: [1, "Actor have to be 1 year old at least!"],
        maxLength: [120, "Actor can/'t be older that 120 years!"],
    },
    born: {
        type: String,
        minLength: [
            10,
            "The actor's birthplace must be at least 3 characters long!",
        ],
        validate: [
            /^[a-zA-Z ]+$/,
            "Actor's born place can only contain English letters and spaces",
        ],
    },
    imageUrl: {
        type: String,
        validate: [
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i,
            "Invalid image URL",
        ],
        required: true,
    },
});

const Cast = model("Cast", castSchema);

export default Cast;
