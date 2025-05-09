const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        require: true 
    },
    email: { 
        type: String, 
        require: true, 
        unique: true ,
        lowercase:true,
        trim:true
    },
    password: { 
        type: String, 
        require: true 
    },
    role: { 
        type: [String], 
        require: true 
    },
    otp: { 
        type: String 
    }, 
    otpExpires: { 
        type: Date 
    } 
},{ 
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;