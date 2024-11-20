document.getElementById("aplicarFiltros").addEventListener("click", function () {
    const busqueda = document.getElementById("busqueda").value.toLowerCase();
    const categoria = document.getElementById("categoria").value.toLowerCase();
    const precioMin = parseInt(document.getElementById("precioMin").value) || 0;
    const precioMax = parseInt(document.getElementById("precioMax").value) || Infinity;

    const filas = document.querySelectorAll(".tabla-productos tbody tr");

    filas.forEach((fila) => {
        const nombre = fila.cells[0].innerText.toLowerCase();
        const detalles = fila.cells[1].innerText.toLowerCase();
        const precio = parseInt(fila.cells[2].innerText.replace("$", "").replace(".", ""));

        // Condiciones de búsqueda y filtrado
        const coincideBusqueda = nombre.includes(busqueda) || detalles.includes(busqueda);
        const coincideCategoria = !categoria || detalles.includes(categoria);
        const coincidePrecio = precio >= precioMin && precio <= precioMax;

        if (coincideBusqueda && coincideCategoria && coincidePrecio) {
            fila.style.display = ""; // Muestra la fila
        } else {
            fila.style.display = "none"; // Oculta la fila
        }
    });
});
