import mongoose from "mongoose";

const ProfilesSchema = new mongoose.Schema({
    name: String,
    quantity: String,
    description: String
}, { timestamps: true });
const ProfilesModel = mongoose.model('profiles', ProfilesSchema, 'profiles');

export default ProfilesModel; 
