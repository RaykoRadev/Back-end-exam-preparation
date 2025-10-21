import Animal from "../models/Animal.js";

export async function getAll() {
    return Animal.find();
}

export async function create(data, owner) {
    return Animal.create({ ...data, owner });
}

export async function getOne(anmlId, userId) {
    const animal = await Animal.findById(anmlId);
    const ownerId = animal.owner;
    const isOwner = ownerId.equals(userId);
    const alreadyDon = animal.donation.includes(userId);

    const result = { animal, isOwner, alreadyDon };
    return result;
}

export async function donate(anmlId, userId) {
    return Animal.findByIdAndUpdate(anmlId, { $push: { donation: userId } });
}
