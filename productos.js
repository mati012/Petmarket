let products = [
  {
    name: 'acana',
    price: '$49.990',
    imageUrl: '../img/acana.jpg',
    description: 'Comida especializada para gatos',
    rating: 4.5,
    descuento: false,
    category: 'comida',
  },
  {
    name: 'origen',
    price: '$69.990 ',
    imageUrl: '../img/orijen.jpg',
    description: 'comida especializada para perros',
    rating: 4,
    descuento: false,
    category: 'comida',
  },
  {
    name: 'Canil',
    price: '$39.990 ',
    imageUrl: '../img/canilPerro.jpg',
    description: 'Canil especializado para perros dimensiones medianas',
    rating: 4,
    descuento: false,
    category: 'transportadores',
  },

  {
    name: 'Mochila',
    price: '$29.990 ',
    imageUrl: '../img/canilGato.jpg',
    description: 'caja de sobres de la edicion modern horizon 3',
    rating: 4,
    descuento: false,
    category: 'transportadores',
  },

  {
    name: 'hueso de hule',
    price: '$9.990 ',
    imageUrl: '../img/juguetePerro.png',
    description: 'Hueso de hule especializado para perros',
    rating: 4,
    descuento: false,
    category: 'juguetes',
  },
  {
    name: 'Cuerda entrenadora',
    price: '$69.990 ',
    imageUrl: '../img/cuerdas.jpg',
    description: 'cuerda especializada para entrenar perros',
    rating: 4,
    descuento: false,
    category: 'juguetes',
  },
 
];

function displayProducts(category) {  
  const container = document.getElementById('container');
  container.innerHTML = '';

  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

  filteredProducts.forEach(product => {
    const productCard = `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.imageUrl}" alt="${product.name}" />
          <div class="new-label">Nuevo</div>
          <div class="info">
            <h2>${product.name}</h2>
            <ul>
              <li><strong>Calificación: </strong>${product.rating}</li>
            </ul>
          </div>
        </div>
        <div class="product-details">
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <div class="control">
            <button class="btn buy-button" data-product='${JSON.stringify(product)}'>
              ${product.price} Comprar ahora
            </button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += productCard;
  });

 
  const buyButtons = container.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const product = JSON.parse(e.target.getAttribute('data-product'));
      addToCart(product);
      alert(`${product.name} añadido al carrito!`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let category;
  if (window.location.pathname.includes('comida.html')) {
    category = 'comida';
  } else if (window.location.pathname.includes('transportadores.html')) {
    category = 'transportadores';
  } else if (window.location.pathname.includes('juguetes.html')) {
    category = 'juguetes';
  }
  if (category || window.location.pathname.includes('index.html') ) {
    displayProducts(category);
  }
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
}
function renderProductEditor() {
  const container = document.getElementById("productEditor");
  container.innerHTML = "";
  products.forEach((product, index) => {
    const productHTML = `
 <div class="product-card">
    <div class="product-image">
      <img src="${product.imageUrl}" alt="${product.name}" />
      <div class="new-label">Nuevo</div>
      <div class="info">
        <h2>${product.name}</h2>
        <ul>
          <li><strong>Calificación: </strong>${product.rating}</li>
        </ul>
      </div>
    </div>
    <div class="product-details">
      <h1>${product.name}</h1>
      <p>Precio: <input type="text" value="${product.price}" id="price-${index}" /></p>
      <p>Descripción: <textarea id="desc-${index}">${product.description}</textarea></p>
      <div class="control">
        <button class="btn save-button" onclick="saveProduct(${index})">
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
    `;
    container.innerHTML += productHTML;
  });
}

function saveProduct(index) {
  const price = document.getElementById(`price-${index}`).value;
  const description = document.getElementById(`desc-${index}`).value;
  products[index].price = price;
  products[index].description = description;
  alert("Producto actualizado");
  renderProductEditor();
}

document.addEventListener("DOMContentLoaded", () => {
  const editorContainer = document.getElementById("productEditor");
  if (editorContainer) {
      renderProductEditor();
  }
});
