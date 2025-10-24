import Art from "../models/Art.js";

export function getAll() {
    return Art.find();
}

export function create(data, userId) {
    return Art.create({ ...data, author: userId });
}
