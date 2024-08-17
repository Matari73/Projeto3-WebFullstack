import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome é obrigatório"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "O email é obrigatório"],
        unique: true,
        trim: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: [true, "A senha é obrigatória"]
    }
}, { collection: 'users' });

userSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = function (senha) {
    return bcrypt.compare(senha, this.senha);
};

const User = mongoose.model('User', userSchema);

export default User;
