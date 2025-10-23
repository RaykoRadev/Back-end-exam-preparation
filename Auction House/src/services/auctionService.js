import Publish from "../models/Publish.js";

export function create(data, userId) {
    return Publish.create({ ...data, author: userId });
}
