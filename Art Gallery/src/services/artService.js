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

    const result = { art, isAuthor };
    return result;
}
