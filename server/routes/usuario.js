const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
//
const Usuario = require('../models/usuario');
const { verificaToken, verificaRol } = require('../middleware/autenticacion');
//
const app = express();
//
app.get('/usuario', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, )
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            //errro db
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    total: conteo
                });
            });
        });
});
//
app.post('/usuario', [verificaToken, verificaRol], function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
        estado: body.estado,
        google: body.google
    });
    usuario.save((err, usuarioDb) => {
        //errro db
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //ok save
        res.json({
            ok: true,
            usuario: usuarioDb

        });
    });
});
//
app.put('/usuario/:id', [verificaToken, verificaRol], function(req, res) {
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado', ]);
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDb) => {
        //errro db
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //ok save
        res.json({
            ok: true,
            usuario: usuarioDb

        });
    });
});
//
app.delete('/usuario/:id', [verificaToken, verificaRol], function(req, res) {
    let id = req.params.id;
    let cambiaEstado = { estado: false };
    //Usuario.findByIdAndRemove(id, (err, usarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usarioBorrado) => {
        //errro db
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //
        if (!usarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            });
        }
        //ok delete
        res.json({
            ok: true,
            usuario: usarioBorrado
        });
    });
});
//
module.exports = app;