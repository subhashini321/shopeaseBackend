import mongoose from 'mongoose';
import { MONGODB_URL } from '../common/constants.js';
import User from '../models/user.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        let isOwner = await User.countDocuments({role:1});
        if(isOwner == 0){
            let userObj = {name:'OWNER', userId:'owner',email:'chatadmin@yopmail.com', password:'Test@1234', role:1};
            await User.create(userObj);
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// export default connectDB;
