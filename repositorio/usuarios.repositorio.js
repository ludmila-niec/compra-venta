const express = require('express');
const sql = require('../connection');

module.exports.getUsuarios =  async()=> {
    return new Promise((r, rej) => {
        sql.query('SELECT * FROM usuarios').then(resultado => {
        r(resultado[0]);
        }) 
    })    
}

module.exports.registrarUsuario = async (usuario)=>{
    return new Promise ((res, rej)=>{
        sql.query( `
            INSERT INTO usuarios
            (nombre, apellido, email, password) 
            values (?,?,?,?)
            `, 
            {replacements: [usuario.nombre, usuario.apellido, usuario.email, usuario.password],type: sql.QueryTypes.INSERT }).then(resultado => {
            res(resultado);
        }) 
    })
}

module.exports.buscarUsuarioPorId = async (id)=> {
    return new Promise((res, rej)=>{
        sql.query('SELECT * FROM usuarios WHERE id = :usuarioId', { replacements: {usuarioId: id},
        type: sql.QueryTypes.SELECT }).then(resultado => {
            // console.log(resultado);
            res(resultado);
        }) 
    })
} 

module.exports.buscarUsuarioPorE = async (email)=> {
    return new Promise((res, rej)=>{
        sql.query('SELECT * FROM usuarios WHERE email = :usuarioEmail', { replacements: {usuarioEmail: email},
        }).then(resultado => {
            //console.log(resultado);
            res(resultado[0]);
        }) 
    })
} 




