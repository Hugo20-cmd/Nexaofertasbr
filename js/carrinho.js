let cart = [];

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  console.log("Carrinho:", cart);
}