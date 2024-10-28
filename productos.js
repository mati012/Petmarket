let products = [
  {
    name: 'Catan',
    price: '$49.990',
    imageUrl: '../img/catan-imagen2.jpg',
    description: 'Es un juego de mesa de tablero modular, con cartas y dados.',
    rating: 4.5,
    cantidadJ: 4,
    descuento: false,
    category: 'familiar',
  },
  {
    name: 'Dixit',
    price: '$39.990',
    imageUrl: '../img/dixit.jpg',
    description: 'Juego de mesa para la familia',
    rating: 3.5,
    cantidadJ: 6,
    descuento: false,
    category: 'familiar',
  },
  {
    name: 'King of Tokyo',
    price: '$69.990 ',
    imageUrl: '../img/king-of-tokyo.jpg',
    description: 'juego de mesa para la familia',
    rating: 4,
    cantidadJ: 6,
    descuento: false,
    category: 'familiar',
  },
  {
    name: 'Mazo Commander',
    price: '$39.990 ',
    imageUrl: '../img/mazo-commander.jpg',
    description: 'Mazo preconstruido',
    rating: 4,
    cantidadJ: 4,
    descuento: false,
    category: 'tcg',
  },

  {
    name: 'booster box modern horizon 3',
    price: '$229.990 ',
    imageUrl: '../img/booster-box.jpg',
    description: 'caja de sobres de la edicion modern horizon 3',
    rating: 4,
    cantidadJ: 4,
    descuento: false,
    category: 'tcg',
  },

  {
    name: 'Mala leche',
    price: '$69.990 ',
    imageUrl: '../img/mala-leche.jpg',
    description: 'juego de cartas para compartir con tus amigos',
    rating: 4,
    cantidadJ: 6,
    descuento: false,
    category: 'nacionales',
  },
  {
    name: 'Ranking top 31 minutos',
    price: '$69.990 ',
    imageUrl: '../img/31-minutos.jpg',
    description: 'juego de mesa para la familia',
    rating: 4,
    cantidadJ: 6,
    descuento: false,
    category: 'nacionales',
  },
  {
    name: 'Exploding kittens',
    price: '$29.990 ',
    imageUrl: '../img/exploding-kittens-game.jpg',
    description: 'juego de mesa para mayores',
    rating: 4,
    cantidadJ: 6,
    descuento: false,
    category: 'mayores',
  },
  {
    name: 'Cards Against Humanity ',
    price: '$19.990 ',
    imageUrl: '../img/cards-against-humanity.jpg',
    description: 'juego de mesa para mayores',
    rating: 4,
    cantidadJ: 4,
    descuento: false,
    category: 'mayores',
  }
 
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
              <li><strong>Cantidad de jugadores: </strong>${product.cantidadJ}</li>
            </ul>
          </div>
        </div>
        <div class="product-details">
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <div class="control">
            <button class="btn">${product.price} Comprar ahora</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += productCard;
  });
}


document.addEventListener('DOMContentLoaded', () => {
  
  let category;
  if (window.location.pathname.includes('tcg.html')) {
    category = 'tcg';
  } else if (window.location.pathname.includes('familiar.html')) {
    category = 'familiar';
  } else if (window.location.pathname.includes('nacional.html')) {
    category = 'nacionales';
  } else if (window.location.pathname.includes('mayores.html')) {
    category = 'mayores';
  }

  displayProducts(category); 
});
