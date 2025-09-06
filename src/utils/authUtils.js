export const isTheOwner = (movieOwnerId, userId) => {
    return userId == movieOwnerId;
};
