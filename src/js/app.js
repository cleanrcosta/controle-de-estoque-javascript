// Arrays para armazenar os dados de produtos, clientes e vendas
let produtos = [];
let clientes = [];
let vendas = [];

/* Função para Adicionar Produto ao HTML */
function addProduto() {
    const nome = document.getElementById("produtoNome").value;
    const preco = parseFloat(document.getElementById("produtoPreco").value);
    const estoque = parseInt(document.getElementById("produtoEstoque").value);

    if (!nome || isNaN(preco) || isNaN(estoque)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const novoProduto = { id: produtos.length + 1, nome, preco, estoque };
    produtos.push(novoProduto);  // Adiciona o produto ao array
    listarProdutos();  // Atualiza a lista de produtos
}

/* Função para listar produtos no HTML */
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = '';  // Limpa a lista antes de exibir os novos produtos
    produtos.forEach(produto => {
        const li = document.createElement("li");
        li.textContent = `ID: ${produto.id} - ${produto.nome} - R$ ${produto.preco} - Estoque: ${produto.estoque}`;
        lista.appendChild(li);
    });
}

/* Função para Adicionar Cliente ao HTML */
function addCliente() {
    const nome = document.getElementById("clienteNome").value;
    const telefone = document.getElementById("clienteTelefone").value;

    if (!nome || !telefone) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const novoCliente = { id: clientes.length + 1, nome, telefone };
    clientes.push(novoCliente);  // Adiciona o cliente ao array
    listarClientes();  // Atualiza a lista de clientes
}

/* Função para listar clientes no HTML */
function listarClientes() {
    const lista = document.getElementById("listaClientes");
    lista.innerHTML = '';  // Limpa a lista antes de exibir os novos clientes
    clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `ID: ${cliente.id} - ${cliente.nome} - Telefone: ${cliente.telefone}`;
        lista.appendChild(li);
    });
}

/* Função para Realizar Venda no HTML */
function realizarVenda() {
    const idCliente = parseInt(document.getElementById("vendaClienteId").value);
    const idProduto = parseInt(document.getElementById("vendaProdutoId").value);
    const quantidade = parseInt(document.getElementById("vendaQuantidade").value);

    if (isNaN(idCliente) || isNaN(idProduto) || isNaN(quantidade)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Encontra o cliente e o produto
    const cliente = clientes.find(c => c.id === idCliente);
    const produto = produtos.find(p => p.id === idProduto);

    if (!cliente || !produto || produto.estoque < quantidade) {
        alert("Cliente ou Produto não encontrados, ou estoque insuficiente.");
        return;
    }

    // Atualiza o estoque do produto
    produto.estoque -= quantidade;

    // Realiza a venda
    const valorTotal = produto.preco * quantidade;
    vendas.push({ cliente: cliente.nome, valorTotal });

    listarVendas();  // Atualiza a lista de vendas
    estoqueAtual();  // Atualiza o estoque
}

/* Função para listar vendas no HTML */
function listarVendas() {
    const lista = document.getElementById("listaVendas");
    lista.innerHTML = '';  // Limpa a lista antes de exibir as novas vendas
    vendas.forEach(venda => {
        const li = document.createElement("li");
        li.textContent = `Cliente: ${venda.cliente} - Total: R$ ${venda.valorTotal}`;
        lista.appendChild(li);
    });
}

/* Função para Exibir Estoque Atual no HTML */
function estoqueAtual() {
    const relatorio = document.getElementById("relatorio");
    relatorio.innerHTML = '';  // Limpa o relatório
    produtos.forEach(produto => {
        const li = document.createElement("li");
        li.textContent = `${produto.nome} - Estoque: ${produto.estoque}`;
        relatorio.appendChild(li);
    });
}

/* Função para Exibir Total de Vendas no HTML */
function exibirVendas() {
    const relatorio = document.getElementById("relatorio");
    relatorio.innerHTML = '';  // Limpa o relatório
    const total = vendas.reduce((acc, venda) => acc + venda.valorTotal, 0);
    const li = document.createElement("li");
    li.textContent = `Total de Vendas: R$ ${total}`;
    relatorio.appendChild(li);
}

/* Inicializa a lista de produtos e clientes ao carregar a página */
window.onload = function() {
    listarProdutos();  // Atualiza a lista de produtos
    listarClientes();  // Atualiza a lista de clientes
};
