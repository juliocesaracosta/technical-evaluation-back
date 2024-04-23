'use strict'

var Theme = require('../models/theme');
var mongoose = require('mongoose');

function saveTheme(req, res){
    var params = req.body;
    var theme = new Theme();
    
    if(params.description){
        theme.description = params.description;
        // controlar usuarios duplicados
        Theme.find({ $or: [
            { description: theme.description }
        ]}).exec((err, themes) => {
            
            if(err) return res.status(500).send({message:'Error en la petición.', error: 1});

            if(themes && themes.length >= 1){
                return res.status(200).send({message: 'La tematica ya está registrada.', error: 1});
            } else {
                theme.save((err, themeStored) => {
                        
                    if(err) return res.status(500).send({message:'Error al guardar la tematica.', error: 1});
                    
                    if(themeStored){
                        res.status(200).send({theme: themeStored, message:'Tematica registrada con éxito.', error: 0});
                    }else {
                        res.status(400).send({message:'No se ha regitrado la tematica.'})
                    }
                });
            }
        });

    } else {
        res.status(200).send({
            message:'envia todo los campos necesarios!',
            error: 1
        });
    }
}

function updateTheme (req, res) {
    var params = req.body;
    var themeId = mongoose.Types.ObjectId(req.params.id);
    if (params.description) {
        Theme.findOne({
            title : params.publication.title.trim(),
            _id : {$ne : themeId }
        }).exec((err, themeExist) => {
            if (err) return res.status(500).send({message: 'Error al consultar la tematica.', error: 1});
            if (themeExist) return res.status(500).send({ message: 'La tematica ya esta registrada.', error: 1 });   

            Theme.findByIdAndUpdate(themeId, params.description, { new: true }, (err, themeUpdate) => {
                if (err) return res.status(500).send({ message: 'Error al editar la tematica.', error: 1 });
                if (themeUpdate) {
                    res.status(200).send({ option: themeUpdate, message:'Tematica actualizada correctamente.', error: 0 });
                } else {
                    res.status(400).send({ message: 'No se ha actualizado la tematica.', error: 1 })
                }
            });
        })
    } else {
        res.status(200).send({
            message: 'Envia todo los campos de la tematica.',
            error: 1
        });
    }
}

function getTheme(req, res){
    if (req.params.id === "0") {
        return res.status(200).send({option: {}, message: '', error: 0});
    } else {
        var id = mongoose.Types.ObjectId(req.params.id);
        OptionMenu.find({ _id: id })
            .populate({path:'module'})
            .exec((err, option) => {
            if(err) return res.status(500).send({message:'Error en la peticion.'});

            if(!option) return res.status(200).send({message:'La Opción '+ publicationTitle +' no existe.', error: 1});

            return res.status(200).send({option: option, message: '', error: 0});
        });
    }
}

function getThemes(req, res){
    OptionMenu.find({})
    .populate({path:'module'})
    .exec((err, options) => {
        console.log(err)
        if(err) return res.status(500).send({message:'Error en la peticion.'});

        return res.status(200).send({options: options, message: '', error: 0});
    });
}

module.exports = {
    saveTheme,
    getTheme,
    getThemes,
    updateTheme
};