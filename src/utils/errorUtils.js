export function getErrorMessage(error) {
    console.log(error.name);

    switch (error.name) {
        case "ValidationError":
            return Object.values(err.errors).at(0).message; //mongoose error
        default:
            return error.message; // default error
    }
}
