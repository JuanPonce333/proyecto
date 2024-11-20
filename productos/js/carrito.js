let carrito = [];

function agregarProducto(producto) {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    actualizarCarrito();
}

function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
}

function modificarCantidad(id, cantidad) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad = cantidad;
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const tablaCarrito = document.querySelector("#tabla-carrito tbody");
    tablaCarrito.innerHTML = "";

    let total = 0;
    carrito.forEach(producto => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td><input type="number" value="${producto.cantidad}" min="1" onchange="modificarCantidad(${producto.id}, this.value)"></td>
            <td>${producto.precio}</td>
            <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
            <td><button onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
        `;

        tablaCarrito.appendChild(fila);
        total += producto.precio * producto.cantidad;
    });

    document.getElementById("precio-total").innerText = total.toFixed(2);
}

document.getElementById("proceder-pago").addEventListener("click", () => {
    alert("Proceder al pago no está implementado aún."); // Aquí puedes redirigir a una página de pago
});

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

document.addEventListener("DOMContentLoaded", cargarCarrito);
