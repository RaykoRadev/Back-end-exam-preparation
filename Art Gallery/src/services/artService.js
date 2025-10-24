import Art from "../models/Art.js";

export function getAll() {
    return Art.find();
}

export function create(data, userId) {
    return Art.create({ ...data, author: userId });
}

export async function getOne(artId, userId) {
    const art = await Art.findById(artId).populate("author");
    const isAuthor = art.author.equals(userId);

    const isSharedByUser = art.shared.some((el) => el.equals(userId));

    const result = { art, isAuthor, isSharedByUser };
    return result;
}

export function share(artId, userId) {
    return Art.findByIdAndUpdate(artId, { $push: { shared: userId } });
}

export function edit(artId, data) {
    return Art.findByIdAndUpdate(artId, data, { runValidators: true });
}

export async function deleteF(artId, userId) {
    const art = await Art.findById(artId);

    if (!art.author.equals(userId)) {
        throw new Error("Only the autor can delete arts!");
    }

    return Art.findByIdAndDelete(artId);
}
