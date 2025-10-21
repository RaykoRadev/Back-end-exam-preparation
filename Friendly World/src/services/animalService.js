import Animal from "../models/Animal.js";

export async function getAll() {
    return Animal.find();
}
