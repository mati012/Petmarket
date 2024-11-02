let products = [
  {
    id:1,
    name: 'acana',
    price: '$49.990',
    imageUrl: '../img/acana.jpg',
    description: 'Comida especializada para gatos',
    rating: 4.5,
    descuento: false,
    category: 'comida',
  },
  {
    id:2,
    name: 'origen',
    price: '$69.990 ',
    imageUrl: '../img/orijen.jpg',
    description: 'comida especializada para perros',
    rating: 4,
    descuento: false,
    category: 'comida',
  },
  { id:3,
    name: 'Canil',
    price: '$39.990 ',
    imageUrl: '../img/canilPerro.jpg',
    description: 'Canil especializado para perros dimensiones medianas',
    rating: 4,
    descuento: false,
    category: 'transportadores',
  },

  {
    id:4,
    name: 'Mochila',
    price: '$29.990 ',
    imageUrl: '../img/canilGato.jpg',
    description: 'caja de sobres de la edicion modern horizon 3',
    rating: 4,
    descuento: false,
    category: 'transportadores',
  },

  {
    id:5,
    name: 'hueso de hule',
    price: '$9.990 ',
    imageUrl: '../img/juguetePerro.png',
    description: 'Hueso de hule especializado para perros',
    rating: 4,
    descuento: false,
    category: 'juguetes',
  },
  {
    id:6,
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
      <a href="product.html?id=${product.id}" class="product-image">
        <img src="${product.imageUrl}" alt="${product.name}" />
      </a>
    
      <div class="product-details">
        <h1>${product.name}</h1>
        <p>${product.description}</p>
           <ul>
          <li><strong>Calificación: </strong>${product.rating}</li>
        </ul>
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

  filteredProducts.forEach(product => {
    const productCard = `
      <div class="product-card" onclick="redirectToProduct(${product.id})">
        <!-- Your existing HTML for product display -->
      </div>
    `;
    container.innerHTML += productCard;
  });
  
  function redirectToProduct(id) {
    window.location.href = `product.html?id=${id}`;
  }
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
      <a href="product.html?id=${product.id}" class="product-image">
        <img src="${product.imageUrl}" alt="${product.name}" />
      </a>
      <div class="info">
        <h2>${product.name}</h2>
        <ul>
          <li><strong>Calificación: </strong>${product.rating}</li>
        </ul>
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
document.addEventListener("DOMContentLoaded", () => {
  const productId = new URLSearchParams(window.location.search).get('id');
  const product = products.find(p => p.id == productId);

  if (product) {
    displayProductDetails(product);
    loadReviews(productId);
  }

  document.getElementById("submitReview").addEventListener("click", () => {
    const reviewText = document.getElementById("reviewText").value.trim();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && reviewText) {
      saveReview(productId, currentUser.nombre, reviewText);
      document.getElementById("reviewText").value = ""; 
      loadReviews(productId);
    } else {
      alert("You must be logged in to leave a review.");
    }
  });
});

function displayProductDetails(product) {
  const container = document.getElementById("productDetails");
  container.innerHTML = `
      <div class="product-foro">
          <div class="product-image-foro">
              <img src="${product.imageUrl}" alt="${product.name}" />
          </div>
          <div class="product-details-foro">
              <h1>${product.name}</h1>
              <ul>
                  <li><strong>Calificación: </strong>${product.rating}</li>
              </ul>
              <p>${product.description}</p>
              <div class="control-foro">
                  <button class="btn buy-button-foro" data-product='${JSON.stringify(product)}'>
            ${product.price} Comprar ahora
          </button>
              </div>
          </div>
      </div>
  `;
}
function saveReview(productId, userName, reviewText) {
  const reviews = JSON.parse(sessionStorage.getItem("reviews")) || {};
  if (!reviews[productId]) reviews[productId] = [];
  
  reviews[productId].push({
      user: userName,
      text: reviewText,
      date: new Date().toLocaleString()
  });
  
  sessionStorage.setItem("reviews", JSON.stringify(reviews));
}

function loadReviews(productId) {
  const reviews = JSON.parse(sessionStorage.getItem("reviews")) || {};
  const reviewsContainer = document.getElementById("reviewsContainer");
  reviewsContainer.innerHTML = "";
  
  if (reviews[productId]) {
      reviews[productId].forEach(review => {
          const reviewElement = document.createElement("div");
          reviewElement.classList.add("review");
          reviewElement.innerHTML = `
              <p><strong>${review.user}</strong> <span class="date">(${review.date})</span></p>
              <p>${review.text}</p>
          `;
          reviewsContainer.appendChild(reviewElement);
      });
  }
}