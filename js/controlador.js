//CONTENEDORES PADRES
const contenedorShop = document.getElementById("cardProductos")
const contadorCarrito = document.getElementById("contadorCarrito")
const contenedorCarrito = document.getElementById("carritoContenedor")
const totalSumaProductos = document.getElementById("precioTotal")
const contTituloCategoria = document.getElementById("tituloCategoria")
const confirmarCompra = document.getElementById("confirmarCompra")


//CONTENEDOR BOTON VACIAR CARRITO
const vaciarCarrito = document.getElementById("vaciarCarrito")

//CONTENEDOR CARTEL NO HAY PRODUCTOS 
const carritoContenedor = document.getElementById("carritoContenedor")

//CONTENEDOR BOTONES FILTRADO
const btnTodos = document.getElementById("todos")
const btnConjunto = document.getElementById("conjuntos")
const btnTop = document.getElementById("top")
const btnBombis = document.getElementById("bombis")


/*--------------------Get Storage-------------------------------*/

//PARA LOCALSTORAGE DOCUMENT LISTENER
document.addEventListener('DOMContentLoaded',()=>{
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    pintarProductosEnCarrito()
})

let carrito = []
//console.log(carrito)


//ASINCRONICA por medio de fetch accedo al JSON

fetch("../db.json")
    .then((res) => res.json())
    .then((data) => {
        //console.log(data)
        //productos viene de mi array.js vacio
        productos = data;
        pintarCard(data)
    })
    .catch((err) => console.log(err))



//FUNION QUE AGREGA PRODUCTOS AL CARRITO -> en pintarCard
const agregarProductos = (prodId) => {
    //para no repetir el producto
    const existe = carrito.some(prod => prod.id === prodId)
    console.log(existe)
    if(existe){
        const prod = carrito.map(prod => {
       // console.log(prod)
        //OPERADOR TERNARIO
        prod.id === prodId ? prod.cantidad++ : false
        })
    }else{
        //busco que coincida el id y cargo el producto al carrito
        const item = productos.find((prod) => prod.id === prodId)
        carrito.push(item)
              
    }
    pintarProductosEnCarrito()
}
//FUNCION ALERTA DE PRODUCTOS AGREGADOS
const alertaAgregarProductos = () => {
    Toastify({
        text: "Agragado al carrito de compras",
        duration: 1000,
        gravity: "top",
        //position: "right",
        offset:{
            x:80,
            y:70,
        },
        style: {
            color: "black",
            background: "linear-gradient(62deg, #FBAB7E 0%, #ffffff 99%)",
            borderRadius: "15%",
            border: "ipx solid black"
        }
    }).showToast()
}

//FUNCION ALERTA BOTON CONFIRMAR COMPRA
const alertaConfirmarCompra = () =>{
    swal("Gracias por su compra!");
}
//FUNCION DE ELIMINAR PRODUCTO DE A UNO DENTRO DEL CARRITO 
function eliminarDelCarrito(id){
    const prodId = id
    carrito = carrito.filter((prod) => prod.id !== prodId)
    console.log(carrito) 
    // llamo a la funcion que muestra el carrito
    pintarProductosEnCarrito()
}
//FUNCION VACIAR CARRITO
const vaciaCarrito = () =>{
    carrito.length = []
    pintarProductosEnCarrito()
}
//EVENTO QUE ESCUCHA EL BOTON VACIAR CARRITO vacia todo el carrito
vaciarCarrito.addEventListener("click", ()=>{
    vaciaCarrito()
})

//EVENTO QUE ESCUCHA BOTON CONFIRMAR COMPRA
confirmarCompra.addEventListener("click", () =>{
    alertaConfirmarCompra()
    vaciaCarrito()
})


//FUNCION QUE FILTRA LAS CATEGORIAS -> en botones todos-conjunto-top-bombis
const filtrarCategorias = (categoria) => {
 
    const filtrarCateg = productos.filter(prod => prod.categoria === categoria)
    //console.log(filtrarCateg)
    pintarCard(filtrarCateg)
}
//EVENTOS QUE ESCUCHA LOS BOTONES DE LAS CATEGORIAS -> en pintarCard
btnTodos.onclick = () => pintarCard() 
btnConjunto.onclick = () => { contTituloCategoria.innerText= "Conjuntos"; filtrarCategorias("Conjunto") }
btnTop.onclick = () => { contTituloCategoria.innerText= "Top"; filtrarCategorias("Top")}
btnBombis.onclick = () =>{ contTituloCategoria.innerText= "Bombis"; filtrarCategorias("Bombis")}


//FUNCION QUE PINTA LAS CARD EN EL DOM
const pintarCard = (categoria) => {
    //actualizo al html para pintar segun la categoria que elija
    contenedorShop.innerHTML = "";
   
    //creo una variable auxiliar y pregunto si existe la categoria
    let prodAMostrar;
    //OPERADOR TERNARIO - guardo una copia del array original - sino existe la categoria que muestre el array original
    categoria ? prodAMostrar = categoria : prodAMostrar = productos;
    // recorro la copia 
    prodAMostrar.forEach((producto) =>{
        //DESTRUCTURING
        const {id, precio, titulo, img }= producto
        //INYECTO LAS CARD EN EL DOM
        const content = document.createElement("div")
        content.classList.add("productos__card")
        content.innerHTML = ` 

            <img class="producto__card--img" src="${img}" alt="imagen del producto">

            <div class="productos__card--encabezado">
                <p class="productos__contenedor--titulo">${titulo}</p>
                <p class="productos_card--precio">$${precio}</p> 
            </div>

            <hr>

            <div class="productos__card--pie">
                <p class="productos__card--descr">Los talles disponibles son
                    <span class="productos__card--desc-intro">S - M - L - XL</span>
                    y los podes elejir en 
                    <span class="productos__card--desc-intro">
                    Blanco - Negro - Gris - Beige - Rojo - Fuxia - Estampados.
                    </span> 
                    A consultar disponibles
                </p>
                <button class="producto__card--btn" id=${id}>Agregar al carrito</button>
            </div>
    
        `
        contenedorShop.appendChild(content)
        //EVENTO QUE ESCUCHA AL BOTON AGRAGAR PRODUCTOS
        const boton = document.getElementById(`${id}`)
        // console.log(boton)
        boton.addEventListener("click", function(){
            alertaAgregarProductos()
            agregarProductos(id)
            
        })
    })   

}

//FUNCION QUE PINTA LOS PRODUCTOS DENTRO DEL CARRITO
const pintarProductosEnCarrito = () =>{
    //cada vez que llamo a la funcion borro el nodo y lo inicio vacio
    contenedorCarrito.innerHTML = ""
    //para el incremento del numero en el carrito
    let totalOfProducts= 0
    //recorre el array y lo llena con info actualizada
    carrito.forEach((producto) =>   {
        //DESTRUCTURING
        const {id, precio, titulo, cantidad, img} = producto
        //INYECTO LOS PRODUCTOS EN EL DOM DEL CARRITO
        const contItemsCarrito = document.createElement("div")
        contItemsCarrito.classList.add("carrito")
        contItemsCarrito.innerHTML = `
        <hr>
        <img class="carrito__img" src="${img}">

        <div class="carrito__body">

            <div class="carrito__body--tituloPrecio">
                <p class="carrito__body--tituloPrecio-title">${titulo}</P>
                <p class="carrito__body--tituloPrecio-precio">Precio: <span class="precio__num">$${precio}</span></p>              
            </div>
            
            <div class="carrito__body--cantidad">
                <span id="restar${id}" class="carrito__body--cantidad-resta" ><i class="bi bi-dash-square"></i></span>
                <span  class="carrito__body--cantidad-num" id="cantidad">${cantidad}</span> 
                <span id ="sumar${id}" class="carrito__body--cantidad-suma" ><i class="bi bi-plus-square"></i></span>
            
                <a id="eliminarDelCarrito${id}" class="carrito__pie--btnEliminar">
                    <i class="bi bi-trash3"></i>
                </a>              
            </div>

        </div>
        
        <p class="carrito__pie--subTotal">Sub-total: 
            <span class="carrito__pie--subTotal-num" id="cantidad"> $${cantidad * precio}</span>
        </p>
                  
        `
        contenedorCarrito.appendChild(contItemsCarrito)
        //por cada click aumenta el numero del carrito
        totalOfProducts = totalOfProducts + cantidad
        //console.log(totalOfProducts)

        //EVENTO QUE ESCUCHA EL BOTON RESTAR, SUMAR Y VACIAR DENTRO DEL CARRITO
        const restar = document.getElementById(`restar${id}`)
        restar.addEventListener("click" , ()=>{
            if(producto.cantidad !== 1){
                producto.cantidad--;
                pintarProductosEnCarrito()
            }
        })
        const sumar = document.getElementById(`sumar${id}`)
        sumar.addEventListener("click" , ()=>{
            producto.cantidad++;
            pintarProductosEnCarrito()
        })

        const eliminar = document.getElementById(`eliminarDelCarrito${id}`)
        eliminar.addEventListener("click", () =>{
           eliminarDelCarrito(id)
           pintarProductosEnCarrito()
        })
    })
    
    //por cada producto, el acumulador le sume precio al prod
    totalSumaProductos.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
    //OPERAADOR TERNARIO -  mostrar cartel cuando no hay nada en el carrito
    carrito.length === 0 ? carritoContenedor.innerHTML = `<p class="text-center text-primary "> !No Hay Productos! </p>` : false
    //IGUALA CANTIDADES DEL CARRITO DEL HEADER A LO QUE TENGA EL CARRITO
    contadorCarrito.innerText= totalOfProducts
    guardarStorage()
}

//LLAMADO DE FUNCIONES
pintarCard()


//GUARDAR STORAGE
function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}