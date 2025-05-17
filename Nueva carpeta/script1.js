
    principal()

    renderizarCarrito()
    
    async function principal() {

        const response = await fetch("../data.json")
        const productos = await response.json()
        
        let botonBuscar = document.getElementById("botonBuscar")
        botonBuscar.addEventListener("click",() => filtrarYRenderizar(productos))
        
        let botonTodos = document.getElementById("todos")
        botonTodos.addEventListener("click", () => filtrartodos(productos))
        
        let botonIndumentaria = document.getElementById("indumentaria")
        botonIndumentaria.addEventListener("click", () => filtrarIndumentaria(productos))
        
        let botonDeportes = document.getElementById("accesorios")
        botonDeportes.addEventListener("click", () => filtrarAccesorios(productos))
        
        let botonVerOcultar = document.getElementById("botonVerOcultar")
        botonVerOcultar.addEventListener("click", verOcultar)
        renderizarProductos(productos) 
    }

    function obtenerCarritoLS() {
        let carrito = []
        let carritoLS = JSON.parse(localStorage.getItem("carrito"))
        
        if (carritoLS) {
            carrito = carritoLS 
        }
        return carrito
    }

    function filtrarYRenderizar(productos) {
        let productoFiltrados = filtrarProductos(productos)
        renderizarProductos(productoFiltrados)
        }

    function filtrarIndumentaria(productos) {
        let carrito = obtenerCarritoLS()
        let indumentaria = productos.filter(producto => producto.categoria.includes("indumentaria"))
        renderizarProductos(indumentaria, carrito)
        }

    function filtrartodos(productos) {
        let carrito = obtenerCarritoLS()
        let indumentaria = productos.filter(producto => producto.categoria.includes(""))
        renderizarProductos(indumentaria, carrito)
        }
    
    function filtrarAccesorios(productos) {
        let carrito = obtenerCarritoLS()
        let deportes = productos.filter(producto => producto.categoria.includes("accesorios"))
        renderizarProductos(deportes, carrito)
        }

    function verOcultar(e) {
    
        let contenedorCarrito = document.getElementById("contenedorCarrito")
        let contenedorProductos = document.getElementById("contenedorProductos")
            
        contenedorCarrito.classList.toggle("oculto")
        contenedorProductos.classList.toggle("oculto")

        e.target.innerText === "CARRITO" ? e.target.innerText = "VER PRODUCTOS" : e.target.innerText = "CARRITO"
        }

    function filtrarProductos(productos) {
        let inputBuscar = document.getElementById("inputBuscar")
        return productos.filter(producto => producto.nombre.includes(inputBuscar.value.toUpperCase()))
    }

    function renderizarProductos(productos) {
        /* let carrito = obtenerCarritoLS() */
        let contenedorProductos = document.getElementById("contenedorProductos")
        contenedorProductos.innerHTML = ""
        productos.forEach(producto => {
            let tarjetaProductos = document.createElement("div") 
            tarjetaProductos.className = "tarjetaProductos"
            
            tarjetaProductos.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img src=../imagenes/${producto.rutaImagen} />
            <p>Precio: ${producto.precio}</p>
            <button id=${producto.id}>Agregar al carrito</button>
            `
            
            contenedorProductos.appendChild(tarjetaProductos)
            let botonAgregarAlCarrito = document.getElementById(producto.id)
            botonAgregarAlCarrito.addEventListener("click", (e) => functionCarrito(e, productos))
    
        });
        
    }
    
    function renderizarCarrito() {

        let carrito = obtenerCarritoLS()

        let contenedorCarrito = document.getElementById("contenedorCarrito")
        if (carrito.length === 0) {

            contenedorCarrito.innerHTML = "<h2>Carrito vacio<h2>"
            
        } else {
            contenedorCarrito.innerHTML = ""
            carrito.forEach(producto => {
                let tarjetacarrito = document.createElement("div")
                tarjetacarrito.className = "tarjetaCarrito"
                tarjetacarrito.id = `tarjetaCarrito${producto.id}`

                tarjetacarrito.innerHTML = `
                <p>${producto.nombre}</p>
                <p>Precio: ${producto.precioUnitario}</p>
                <div class=unidades>
                <button id=dec${producto.id}>-</button>
                <p>${producto.unidades}</p>
                <button id=inc${producto.id}>+</button>
                </div>
                <p>subtotal: ${producto.subtotal}</p>
                <button id=eliminar${producto.id}>ELIMINAR</button>
                `
                contenedorCarrito.appendChild(tarjetacarrito)  
                               
                let botonEliminar = document.getElementById(`eliminar${producto.id}`)
                botonEliminar.addEventListener("click",  eliminarProductoDeCarrito)
         });
        } 

        let divComprar = document.createElement("button")
        divComprar.id = "comprar"
        divComprar.innerHTML = "COMPRAR"
        contenedorCarrito.appendChild(divComprar)

        let botonComprar = document.getElementById("comprar")
        botonComprar.addEventListener("click", botonFinalizarCompra )
    }


    function functionCarrito(e, productos) {

        let carrito = obtenerCarritoLS()
        let num = Number(e.target.id)

        let posProdEncontrado = carrito.findIndex(productos => productos.id === num)
        let productoBuscado = productos.find(producto => producto.id === num )

        Toastify({

            text: (`${productoBuscado.nombre} AGREGADO AL CARRITO`),
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #c70c0c, red)",
              }
            }).showToast();
        
        if (posProdEncontrado !== -1) {
            carrito[posProdEncontrado].unidades++
            carrito[posProdEncontrado].subtotal = carrito[posProdEncontrado].precioUnitario * carrito[posProdEncontrado].unidades
        } else {
            carrito.push({
                id: productoBuscado.id ,
                nombre: productoBuscado.nombre ,
                precioUnitario: productoBuscado.precio ,
                unidades: 1,
                subtotal: productoBuscado.precio
            }) 

        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarCarrito()
    }

    function botonFinalizarCompra() {

        let carrito = obtenerCarritoLS()

        if (carrito > -1) {
            Swal.fire({
                title: "TU CARRITO ESTA VACIO",
                text: "Ve a mirar nuestros productos",
                icon: "error"
              });
        } else {
            Swal.fire({
                title: "FINALIZAR COMPRA",
                text: "Seguro quieres relizar esta compra?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, comprar!",
                cancelButtonText: "Aun no"
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("carrito")
                    renderizarCarrito([])
                  Swal.fire({
                    title: "GRACIAS POR SU COMPRA!",
                    text: "En minutos recibiras un mail con toda la información",
                    icon: "success"
                  });
                }
              })

        }
    }

    function eliminarProductoDeCarrito(e) {

        let carrito = obtenerCarritoLS()
        let id = Number(e.target.id.substring(8))
        carrito = carrito.filter(producto => producto.id !== id)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        e.target.parentElement.remove()

        renderizarCarrito([])
    }
 