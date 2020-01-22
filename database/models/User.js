const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Création de la collection Users
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, ' le nom est obligatoire'],
    },
    email: {
        type: String,
        required: [true, "l'email est obligatoire"],
        unique: true,
        // unique: [true, "l'email est deja pris"]
    },
    password: {
        type: String,
        required: [true, "le mot de passe est obligatoire"],
    },

})

UserSchema.pre('save', ( next ) => {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
        
})

module.exports = mongoose.model('user', UserSchema)