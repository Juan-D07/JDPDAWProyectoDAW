const btnDaw1 = document.getElementById("btnDaw1");
const btnDaw2 = document.getElementById("btnDaw2");
const gridDaw1 = document.getElementById("gridDaw1");
const gridDaw2 = document.getElementById("gridDaw2");




btnDaw1.addEventListener("click",()=>{
  if (!btnDaw1.classList.contains("activo")){
    btnDaw1.classList.toggle("activo")
    btnDaw1.classList.toggle("inactivo")
    btnDaw2.classList.toggle("activo")
    btnDaw2.classList.toggle("inactivo")
    gridDaw1.classList.toggle("oculto")
    gridDaw2.classList.toggle("oculto")
  }

})

btnDaw2.addEventListener("click",()=>{
  if (!btnDaw2.classList.contains("activo")){
    btnDaw1.classList.toggle("activo")
    btnDaw1.classList.toggle("inactivo")
    btnDaw2.classList.toggle("activo")
    btnDaw2.classList.toggle("inactivo")
    gridDaw1.classList.toggle("oculto")
    gridDaw2.classList.toggle("oculto")
    }
})