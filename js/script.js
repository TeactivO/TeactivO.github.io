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
          </div>
        `;

        // Crear el script de Mercado Pago
        const script = document.createElement('script');
        script.src = "https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js";
        script.setAttribute('data-preference-id', producto.preference_id);
        script.setAttribute('data-source', 'button');

        // Agregar el script al productoDiv
        productoDiv.appendChild(script);

        productosContainer.appendChild(productoDiv);
      });
    })
    .catch(error => console.error('Error al cargar productos:', error));
});