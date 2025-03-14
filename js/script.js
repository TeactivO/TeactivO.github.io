document.addEventListener('DOMContentLoaded', function() {
  fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
      const productosContainer = document.getElementById('productos-container');

      productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('col', 'mb-5');

        productoDiv.innerHTML = `
          <div class="card h-100">
            <!-- Product image -->
            <img class="card-img-top" src="${producto.imagen}" alt="${producto.nombre}" />
            <!-- Product details -->
            <div class="card-body p-4">
              <div class="text-center">
                <h5 class="fw-bolder">${producto.nombre}</h5>
                <p>${producto.descripcion}</p>
                <p class="fw-bold">$${producto.precio.toFixed(2)}</p>
              </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
              <div id="mp-button-${producto.id}"></div>
            </div>
          </div>
        `;

        productosContainer.appendChild(productoDiv);

        // Crear e insertar el script de Mercado Pago después de agregar los productos
        const mpScript = document.createElement('script');
        mpScript.src = "https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js";
        mpScript.setAttribute('data-preference-id', producto.preference_id);
        mpScript.setAttribute('data-source', 'button');

        document.getElementById(`mp-button-${producto.id}`).appendChild(mpScript);
      });
    })
    .catch(error => console.error('Error al cargar productos:', error));
});
