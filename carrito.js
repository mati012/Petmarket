document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];


  const cartLayout = document.createElement("div");
  cartLayout.classList.add("cart-container");

  const cartItems = document.createElement("div");
  cartItems.classList.add("cart-items");

  let totalPrice = 0;

  cart.forEach((product) => {
    const productCard = `
      <div class="cart-item-card">
        <div class="cart-item-image">
          <img src="${product.imageUrl}" alt="${product.name}" />
        </div>
        <div class="cart-item-info">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p class="cart-price">Price: ${product.price}</p>
        </div>
      </div>
    `;
    cartItems.innerHTML += productCard;
    totalPrice += parseFloat(product.price.replace("$", "").replace(",", ""));
  });


  const cartSummary = document.createElement("div");
  cartSummary.classList.add("cart-summary");

  const totalDisplay = document.createElement("div");
  totalDisplay.classList.add("cart-total");
  totalDisplay.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;

  const paymentButton = document.createElement("button");
  paymentButton.classList.add("cart-checkout-button");
  paymentButton.textContent = "Finalizar Compra";

  cartSummary.appendChild(totalDisplay);
  cartSummary.appendChild(paymentButton);


  cartLayout.appendChild(cartItems);
  cartLayout.appendChild(cartSummary);
  cartContainer.appendChild(cartLayout);

  paymentButton.addEventListener("click", () => {
    alert("Pago Exitoso!");
    localStorage.removeItem("cart");
    window.location.reload();
  });
});