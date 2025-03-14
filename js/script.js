document.addEventListener('DOMContentLoaded', function() {
  // Cargar productos desde productos.json
  fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
      const productosContainer = document.getElementById('productos-container');

      productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div>
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <script src="https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js"
              data-preference-id="${producto.preference_id}" data-source="button">
            </script>
          </div>
        `;

        productosContainer.appendChild(productoDiv);
      });
    })
    .catch(error => console.error('Error al cargar productos:', error));
});