
const numero=document.querySelector('#dni')
const btnRegistrar=document.querySelector('#btn_registrar')
const btn=document.querySelector('#btn2')
const btn2=document.getElementById('btn2')


let men
//const btnBorrar=document.getElementsByClassName('borrar')

btnRegistrar.addEventListener('click',function(){
    //window.location.href= `agregar/${nombre.value}/${numero.value}`
    window.location.href= `consultar/${dni.value}`
})

function hola(){
    //window.location.href= `agregar/${nombre.value}/${numero.value}`
    console.log("men")
}


var input=  document.getElementById('dni');
input.addEventListener('input',function(){
  if (this.value.length == 8) {
    btn.removeAttribute('class', 'disabled');
    btn.disabled=false
    console.log(this.value.length)
  }else{
    btn.disabled=true
    btn.setAttribute('class', 'disabled');
  }

})
// function verificar(valor) {
//     var le=$("#dni").val().length
//     console.log(valor)
//         console.log(le)
//   }
// for(let i of btnBorrar){
//     i.addEventListener('click', function(){
//         let id=this.getAttribute('id')
//         window.location.href=`borrar/${id}`
//     })
// }