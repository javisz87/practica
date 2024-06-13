document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los botones "Agregar al carrito"
    const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');

    agregarCarritoButtons.forEach((button) => {
        // Agrega un evento clic a cada botón
        button.addEventListener('click', async (event) => {
            const productoId = button.getAttribute('data-producto-id');

            try {
                // Envía una solicitud POST al servidor para agregar el producto al carrito
                const response = await fetch(`/agregar-al-carrito/${productoId}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    // El producto se agregó correctamente al carrito
                    alert('Producto agregado al carrito');
                } else {
                    // Maneja el caso en que la solicitud no sea exitosa
                    alert('No se pudo agregar el producto al carrito');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error en el servidor');
            }
        });
    });
});