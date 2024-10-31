document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalPrice = 0;

  cart.forEach((product) => {
    const productCard = `
        <div class="product-card">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Price: ${product.price}</p>F
        </div>
      `;
    cartContainer.innerHTML += productCard;

    totalPrice += parseFloat(product.price.replace("$", "").replace(",", ""));
  });

  const totalDisplay = document.createElement("div");
  totalDisplay.classList.add("total");
  totalDisplay.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDisplay);

  const paymentButton = document.createElement("button");
  paymentButton.classList.add("btn", "btn-success", "mt-3");
  paymentButton.textContent = "Finalizar Compra";
  cartContainer.appendChild(paymentButton);

  paymentButton.addEventListener("click", () => {
    alert("Pago Exitoso!");
    localStorage.removeItem("cart");
    window.location.reload();
  });
});
