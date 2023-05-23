//import mysql
import mysql from 'mysql'
let docente,dniV,codigo,tipo
let eReg
let horaIngreso
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
    password: '$191591Jor',
    database: 'asistencia_unmsm',
})


//probar conexion
const conectarBase = () => {
    // conector.connect(err => {
    //     if (err) throw err
    //    console.log('Conexion Exitosa!')
    // })
}

conector.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conector.threadId);
});


const agregarEntrada = (dni) => {
   
//var doc=document.getElementById("dni").value;
let codigoAsistencia = mes + "-" + dia + "-" + dni;
    let estado='001'
    const sql = `INSERT INTO asistencia (idAsi,dia,horIng,dniPer,estado)`+
     `VALUES ('${codigoAsistencia}','${dia}','${horaIngreso}','${dni}','${estado}')`
    conector.query(sql, function (err, result, field) {
        if (err) throw err
        //console.log(result)
    })
}
const agregarSalida = (dni) => {
    let codigoAsistencia = mes + "-" + dia + "-" + dni;
    const sql = `UPDATE asistencia SET horSal='${horaIngreso}' where idAsi='${codigoAsistencia}'`
    conector.query(sql, function (err, result, field) {
        if (err) throw err
        //console.log(result)
    })
}

const consultarIngreso = (dni) => {
    //var doc=document.getElementById("dni").value;
    let codigoAsistencia = mes + "-" + dia + "-" + dni;
    const sql = `select * from asistencia where idAsi='${codigoAsistencia}'`
    conector.query(sql, function (err, result, field) {
        conector.query(sql, function (err, result, field) {
            try {
                //Imprime todo el objeto docente
                //console.log(result)
                if (result.length==0){
                    agregarEntrada(dni)
                    eReg="DOCENTE "+dni+" REGISTRÓ SU ENTRADA "+" = "+ horaIngreso
                    throw 'DOCENTE NO REGISTRO ASISTENCIA INGRESO'
                    
                }else{
                    agregarSalida(dni)
                    eReg="DOCENTE "+dni+" REGISTRÓ SU SALIDA "+" = "+ horaIngreso
                    console.log('REGISTRAR ASISTENCIA SALIDA')

                }
            } catch (err) {
                console.log(err)
            }
        })
    })

}


const consultarDni = (dni) => {
    const sql = `select * from docente where dni='${dni}'`
    conector.query(sql, function (err, result, field) {
        try {
            //Imprime todo el objeto docente
            console.log(result)
            if (result.length==0){
                eReg="DOCENTE NO ENCONTRADO"
                throw 'DOCENTE NO ENCONTRADO'
            }else{
             //aqui va consultarIngreso pero lo voy a cambiar para que verifique la hora   
             consultarIngreso(dni)
             docente=result[0].apNombres;
             dniV=result[0].dni;
             codigo=result[0].codDoc;
             tipo=result[0].tipo;           
            }
        } catch (err) {
            console.log(err)
        }
    })

}

const obtenerEstadoR =() =>{
    return eReg
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


export { conectarBase, agregarEntrada, agregarSalida, consultarDni,obtenerEstadoR }