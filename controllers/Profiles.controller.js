import ProfilesModel from "../models/Profiles.model.js";

export const createProfile = (req, res) => {
    console.log(req.body)
    const createProfileDB = ProfilesModel.create({ name: "test" })
    return res.status(200).json({ message: "x" })
};
