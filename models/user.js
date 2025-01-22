
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema, model } = mongoose

const UserSchema = new Schema({
    name: { type: String, required: true },
    userId:{type:String,required:true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: [1, 2], default: 1 },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = model("users", UserSchema)
export default User
