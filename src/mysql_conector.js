//import mysql
import mysql from 'mysql'
let docente,dniV,codigo,tipo
let eReg
let horaIngreso
//variable para respuesta positiva para la toma de foto
let consulta=0
let contador=0
//variables horarios ingreso y salida
const horaIngresoTC=10
const horaSalidaTC=14
const horaIngresoAdm=8
const horaSalidaAdm=15
const minutosVer=30
const minutosVerAdm=45

//obtener dia y mes para la foto
var fec = new Date(),
mes = fec.getMonth() + 1,
horaV=fec.getHours(),
dia = fec.getDate();
//obtener hora para validar el ingreso

//crear conexion
const conector = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asistencia_unmsm',
})

//probar conexion
//const conectarBase = () => {
    // conector.connect(err => {
    //     if (err) throw err
    //    console.log('Conexion Exitosa!')
    // })
//}

conector.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos con el identificador ' + conector.threadId);
});


const agregarEntrada = (dni) => {
    consulta=1
    console.log("Agregando entrada")
    let estado='001'
    let tipoRegi='ING'
    //var doc=document.getElementById("dni").value;
    let codigoAsistencia = mes + "-" + dia + "-" + dni+"-"+tipoRegi;
    const sql = `INSERT INTO asistencia_ing (idAsi,dia,horIng,dniPer,estado,tipoReg,mes)`+
     `VALUES ('${codigoAsistencia}','${dia}','${horaIngreso}','${dni}','${estado}','${tipoRegi}','${mes}')`
    conector.query(sql, function (err, result, field) {
        try {
            consulta=1
        } catch (err) {
            console.log(err)
        }
    })
}
const agregarSalida = (dni) => {
    console.log("Agregando salida")
    
    let estado='001'
    let tipoReg='SAL'
    let codigoAsistencia = mes + "-" + dia + "-" + dni+"-"+tipoReg;
    const sql = `INSERT INTO asistencia_sal (idAsi,dia,horSal,dniPer,estado,tipoReg,mes)`+
     `VALUES ('${codigoAsistencia}','${dia}','${horaIngreso}','${dni}','${estado}','${tipoReg}','${mes}')`
    conector.query(sql, function (err, result, field) {
       
        try {
            consulta=1
        } catch (err) {
            console.log(err)
        }
    })
}

const consultarIngreso = (dni) => {
    //var doc=document.getElementById("dni").value;
    console.log("Consultando Ingreso")
    let codigoAsistencia = mes + "-" + dia + "-" + dni+"-ING";
    const sql = `select * from asistencia_ing where idAsi='${codigoAsistencia}'`
    conector.query(sql, function (err, result, field) {
        conector.query(sql, function (err, result, field) {
            try {
                //Imprime todo el objeto docente
                //console.log(result)
                if (result.length==0){
                    agregarEntrada(dni)
                    eReg="PERSONAL "+dni+" REGISTRÓ SU ENTRADA "+": "+ horaIngreso
                    throw 'DOCENTE NO REGISTRO ASISTENCIA INGRESO'
                }else{
                    eReg="YA ESTA REGISTRADO TU INGRESO, TU SALIDA ES "+ horaSalidaTC
                    console.log("YA ESTA REGISTRADO TU INGRESO")
                }
            } catch (err) {
                console.log(err)
            }
        })
    })
}
const consultarSalida = (dni) => {
    //var doc=document.getElementById("dni").value;
    
    let codigoAsistencia = mes + "-" + dia + "-" + dni+"-SAL";
    let eRegIng=""
    const sql1 = `select * from asistencia_ing where dniPer='${dni}' and dia='${dia}' and mes='${mes}'`
    conector.query(sql1, function (err, result, field) {
        conector.query(sql1, function (err, result, field) {
            try {
                console.log("Consultando Entrada dentro de la salida")
                  if (result.length==0){
                    eRegIng="PENDIENTE EL REGISTRO DE SU INGRESO"
                }
            } catch (err) {
                console.log(err)
            }
        })
    })
    const sql = `select * from asistencia_sal where idAsi='${codigoAsistencia}'`
    conector.query(sql, function (err, result, field) {
        conector.query(sql, function (err, result, field) {
            try {
                console.log("Consultando Salida en Salida")
                //Imprime todo el objeto docente
                //console.log(result)
                if (result.length==0){
                    agregarSalida(dni)
                    eReg="DOCENTE "+dni+" REGISTRÓ SU SALIDA "+" = "+ horaIngreso + " "+ eRegIng
                    throw 'DOCENTE NO REGISTRO ASISTENCIA SALIDA'                  
                }else{
                    eReg="YA ESTA REGISTRADO TU SALIDA "
                    console.log("YA ESTA REGISTRADO TU SALIDA ")
                }
            } catch (err) {
                console.log(err)
            }
        })
    })

}
const consultarEstadoReg = (dni) => {
    console.log("Consultando Estado de registro")
    const sql = `select * from asistencia_ing where dniPer='${dni}' and dia='${dia}' and mes='${mes}'`
    conector.query(sql, function (err, result, field) {
        conector.query(sql, function (err, result, field) {
            try {
                //Imprime todo el objeto docente
                console.log("estoy consultando registro Estado Reg ENTRADA")
                // let tipoRegistroEntradaOSalida=result[0].tipoReg
                // console.log(tipoRegistroEntradaOSalida)
                if (result.length!=0){
                        eReg="YA SE REGISTRO SU INGRESO"
                }else{
                    contador++
                    eReg="LLEGASTE TARDE, TU SALIDA ES A LAS "+horaSalidaTC+", COMUNICATE CON RECURSOS"
                }
            } catch (err) {
                console.log(err)
            }
        })
    })
    if(contador != 1){
        const sql2 = `select * from asistencia_sal where dniPer='${dni}' and dia='${dia}' and mes='${mes}'`
        conector.query(sql2, function (err2, result2, field2) {
            conector.query(sql2, function (err2, result2, field2) {
                try {
                    //Imprime todo el objeto docente
                    //console.log(result)
                    // let tipoRegistroEntradaOSalida=result[0].tipoReg
                    // console.log(tipoRegistroEntradaOSalida)
                    // if(ingresoCont==1){
                    //     eReg="YA SE REGISTRO SU SALIDA, TIENE PENDIENTE SU INGRESO"
                    // }
                console.log("estoy consultando registro Estado Reg SALIDA")

                    if (result2.length!=0){
                            eReg="YA SE REGISTRO SU SALIDA"
                    }
                    else{
                        eReg="URGENTE COMUNICATE CON RECURSOS"
                    }
                } catch (err2) {
                    console.log(err2)
                }
            })
        })
    }
    
}


const consultarDni = (dni) => {
    console.log("Consultando DNI en la BD "+horaV)
    const sql = `select * from docente where dni='${dni}'`
    conector.query(sql, function (err, result, field) {
        try {
            //Imprime todo el objeto docente
            //console.log(result)
            if (result.length==0){
                eReg="DOCENTE NO ENCONTRADO"
                throw 'DOCENTE NO ENCONTRADO'
            }else{
             //aqui va consultarIngreso pero lo voy a cambiar para que verifique la hora   
             tipo=result[0].tipo;
             if(tipo=='TC'){
                if(horaV<horaIngresoTC){
                    consultarIngreso(dni)
                }else if(horaV>horaSalidaTC){
                    consultarSalida(dni)
                }else if(horaV>=horaIngresoTC && horaV<horaSalidaTC ){
                    consultarEstadoReg(dni)
                }
             }           
            }
        } catch (err) {
            console.log(err)
        }
    })

}

const obtenerEstadoR =() =>{
    return eReg
}
const obtenerEstadoConsulta =() =>{
    return consulta
}

(function(){
    var actualizarHora=function(){
        var fecha = new Date(),
        horas=fecha.getHours(),
        ampm,
        minutos=fecha.getMinutes(),
        segundos=fecha.getSeconds(),
        diaSemana=fecha.getDay(),
        dia=fecha.getDate(),
        mes=fecha.getMonth(),
        year=fecha.getFullYear();
 
    //minutos
    if(minutos<10){
        minutos="0"+minutos;
    }
    if(segundos<10){
        segundos="0"+segundos;
    }
    horaIngreso=horas+':'+minutos+':'+segundos

};
    actualizarHora();
    var intervalo= setInterval(actualizarHora,1000);
}())


export {agregarEntrada, agregarSalida, consultarDni,obtenerEstadoR,obtenerEstadoConsulta }