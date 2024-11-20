function obtenerCarrito() { 
    return JSON.parse(localStorage.getItem("carrito")) || [];
}
function guardarCarrito(carrito) { 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.getElementById("agregar").addEventListener("click", function() {
    const tituloElement = document.getElementById("titulo"); 
    const precioElement = document.getElementById("precio"); 
    const categoriaElement = document.getElementById("categoria");

    if (!tituloElement || !precioElement || !categoriaElement) { 
        alert("Error: No se pudieron obtener los detalles del producto."); 
        return;
    }

    const nombre = tituloElement.innerText; 
    const precioText = precioElement.innerText.replace("Precio: $", "").replace(",", ""); 
    const precio = parseFloat(precioText); 
    const categoria = categoriaElement.innerText.replace("Categoría: ", "");

    console.log("Precio extraído:", precioText);

    if (isNaN(precio)) { 
        alert("Error: Precio inválido."); 
        return;
    }

    const producto = { 
        id: 1, 
        nombre: nombre, 
        precio: precio, 
        categoria: categoria, 
        cantidad: 1 
    };

    let carrito = obtenerCarrito();

    const indiceProducto = carrito.findIndex(item => item.id === producto.id);
    if (indiceProducto !== -1){
        carrito[indiceProducto].cantidad++;
    }else{
        carrito.push(producto);
    }

    guardarCarrito(carrito);
    alert("Producto agregado al carrito")
}); 

document.getElementById("comprar").addEventListener("click", function() { 
    window.location.href = "pago.html"; 

}); 