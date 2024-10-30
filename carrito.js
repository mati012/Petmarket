document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let totalPrice = 0;
  
    // Display each item in the cart
    cart.forEach(product => {
      const productCard = `
        <div class="product-card">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      `;
      cartContainer.innerHTML += productCard;
  
      // Calculate total price
      totalPrice += parseFloat(product.price.replace('$', '').replace(',', ''));
    });
  
    // Display total price
    const totalDisplay = document.createElement("div");
    totalDisplay.classList.add("total");
    totalDisplay.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
    cartContainer.appendChild(totalDisplay);
  
    // Create a payment button
    const paymentButton = document.createElement("button");
    paymentButton.classList.add("btn", "btn-success", "mt-3");
    paymentButton.textContent = "Finalizar Compra";
    cartContainer.appendChild(paymentButton);
  
    // Add event listener for payment
    paymentButton.addEventListener("click", () => {
      alert("Pago Exitoso!");
      localStorage.removeItem("cart"); // Clear the cart
      window.location.reload(); // Refresh to clear the displayed items
    });
  });
  