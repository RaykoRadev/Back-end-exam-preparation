import Animal from "../models/Animal.js";

export async function getAll() {
    return Animal.find();
}

export async function create(data, owner) {
    return Animal.create({ ...data, owner });
}
