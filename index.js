//importamos express
import express, { response } from "express"
import {conectarBase,agregarEntrada,agregarSalida,consultarDni,obtenerEstadoR} from "./src/mysql_conector.js"

//iniciamos servidor
const app=express()


//puerto
app.listen('8000', function(){
    console.log('aplicacion iniciada en el puerto 8000')
})

//inicamos pug
app.set('views','./vistas')
app.set('view engine','pug')

//conf archivos estaticos
app.use(express.static('./vistas'))
app.use(express.static('./src'))
app.use(express.static('./css'))
app.use(express.static('./public'))
//renderizar vista
app.get('/',function(req,res){
    //res.send('aplicación iniciada')
    conectarBase()
    //todos=obtenerContactos()
    //res.render('index',{titulo :'Aplicacion de contactos',contactos:todos})
    let estadoReg=obtenerEstadoR()
    res.render('index',{titulo :'Asistencia Farmacia & Bioquímica',mensaje:estadoReg})
})

app.get('/consultar/:dni',function(req,res){
    const dni = req.params.dni
    consultarDni(dni)
    //regresar al inicio
    console.log(dni)
    res.redirect('/')
})
//borrar
app.get('/borrar/:id', function(req,res){
    let id=req.params.id
    borrarContacto(id)
    res.redirect('/')
})
//agregar

// app.get('/agregar/:nombre/:numero',function(req,res){
//     const nombre = req.params.nombre
//     const numero = req.params.numero
//     agregarContacto(numero,nombre)
//     //regresar al inicio
//     res.redirect('/')
//     console.log(nombre,numero)
// })