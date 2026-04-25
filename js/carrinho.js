// PEGAR PARAMETROS
const params = new URLSearchParams(window.location.search);

// MOSTRAR PRODUTO NA PÁGINA
if (document.getElementById("nome")) {
  document.getElementById("nome").innerText = params.get("nome");
  document.getElementById("preco").innerText = "R$ " + params.get("preco");
  document.getElementById("imagem").src = params.get("img");
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    nome: params.get("nome"),
    preco: parseFloat(params.get("preco")),
    link: params.get("link")
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert("Produto adicionado ao carrinho!");
}

// CONTADOR
function atualizarContador() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let contador = document.getElementById("contador");

  if (contador) {
    contador.innerText = carrinho.length;
  }
}
atualizarContador();

// ABRIR CARRINHO (AGORA VAI PRA PÁGINA)
function verCarrinho() {
  window.location.href = "carrinho.html";
}

// MOSTRAR ITENS NO CARRINHO
function carregarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let lista = document.getElementById("lista");
  let total = 0;

  if (!lista) return;

  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    total += item.preco;

    lista.innerHTML += `
      <div class="item">
        <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
        <button class="remover" onclick="removerItem(${index})">X</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: R$ " + total.toFixed(2);
}

carregarCarrinho();

// REMOVER ITEM
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.splice(index, 1);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  carregarCarrinho();
  atualizarContador();
}

// LIMPAR
function limparCarrinho() {
  localStorage.removeItem("carrinho");
  carregarCarrinho();
  atualizarContador();
}

// COMPRAR TUDO
function comprarTudo() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.forEach(item => {
    window.open(item.link, "_blank");
  });
}