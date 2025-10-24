import Art from "../models/Art.js";

export function create(data, userId) {
    return Art.create({ ...data, author: userId });
}
