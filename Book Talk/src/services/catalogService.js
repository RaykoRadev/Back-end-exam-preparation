import Catalog from "../models/Catalog.js";

export async function create(data, userId) {
    return Catalog.create({ ...data, owner: userId });
}

export async function getAll() {
    return Catalog.find();
}

export async function getOne(reviewId, userId) {
    const review = await Catalog.findById(reviewId);

    const isOwner = review.owner.equals(userId);
    const isInWishList = review.wishingList.includes(userId);

    const result = { review, isOwner, isInWishList };
    return result;
}

export async function addWish(reviewId, userId) {
    return Catalog.findByIdAndUpdate(reviewId, {
        $push: { wishingList: userId },
    });
}
