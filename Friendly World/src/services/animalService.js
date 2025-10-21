import Animal from "../models/Animal.js";

export async function getAll(filter = {}) {
    if (filter === 3) {
        return Animal.find().sort("-1").limit(3);
    }

    return Animal.find(filter);
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

export async function edit(anmlId, data) {
    return Animal.findByIdAndUpdate(anmlId, data, { runValidators: true });
}

export async function donate(anmlId, userId) {
    return Animal.findByIdAndUpdate(anmlId, { $push: { donation: userId } });
}
