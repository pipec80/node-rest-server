const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} , no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'EL nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'EL correo es necesario']
    },
    password: {
        type: String,
        require: [true, 'EL password es necesario']
    },
    img: {
        type: String,
        require: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();
    delete userObj.password;
    return userObj;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });


module.exports = mongoose.model('Usuario', usuarioSchema);