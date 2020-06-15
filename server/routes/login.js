const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//
const Usuario = require('../models/usuario');
//
const app = express();

app.post('/login', (req, res) => {
    console.log(req.body);
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            });
        }
        //
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            });
        }

        let jwtoken = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

        //ok save
        res.json({
            ok: true,
            usuario: usuarioDB,
            token: jwtoken
        });
    });

});


module.exports = app;