import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(
            'mongodb+srv://trinvm1210:231056@cmcproject.ngnrcrr.mongodb.net/',
        );
        console.log(`Database is connect at ${connection.connection.host}`);
    } catch (error) {
        console.log('error.message', error.message);
    }
};
