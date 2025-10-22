import Catalog from "../models/Catalog.js";

export async function create(data, userId) {
    return Catalog.create({ ...data, owner: userId });
}

export async function getAll() {
    return Catalog.find();
}
