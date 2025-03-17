// Arrays para armazenar os dados de produtos, clientes e vendas
let produtos = [];
let clientes = [];
let vendas = [];
let vendaId = 1; // Inicializa o ID das vendas

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

    // Realiza a venda com ID incremental
    const valorTotal = produto.preco * quantidade;
    vendas.push({ id: vendaId++, cliente: cliente.nome, produto: produto.nome, produtoId: produto.id, quantidade, valorTotal });

    listarVendas();  // Atualiza a lista de vendas
    estoqueAtual();  // Atualiza o estoque
}

/* Função para listar vendas no HTML */
function listarVendas() {
    const lista = document.getElementById("listaVendas");
    lista.innerHTML = '';  // Limpa a lista antes de exibir as novas vendas
    vendas.forEach(venda => {
        const li = document.createElement("li");
        li.textContent = `ID: ${venda.id} - Cliente: ${venda.cliente} - Produto: ${venda.produto} - Quantidade: ${venda.quantidade} - Total: R$ ${venda.valorTotal}`;
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

/* Função para Exibir Histórico e Total de Vendas no HTML */
function exibirVendas() {
    const relatorio = document.getElementById("relatorio");
    relatorio.innerHTML = '';  // Limpa o relatório
    
    // Total de vendas
    const total = vendas.reduce((acc, venda) => acc + venda.valorTotal, 0);
    const liTotal = document.createElement("li");
    liTotal.textContent = `Total de Vendas: R$ ${total}`;
    relatorio.appendChild(liTotal);
    
    // Total de produtos vendidos por ID
    let produtosVendidos = {};
    vendas.forEach(venda => {
        if (!produtosVendidos[venda.produtoId]) {
            produtosVendidos[venda.produtoId] = { nome: venda.produto, quantidade: 0 };
        }
        produtosVendidos[venda.produtoId].quantidade += venda.quantidade;
    });
    
    Object.values(produtosVendidos).forEach(produto => {
        const li = document.createElement("li");
        li.textContent = `Produto: ${produto.nome} - Quantidade Vendida: ${produto.quantidade}`;
        relatorio.appendChild(li);
    });
}

/* Inicializa a lista de produtos e clientes ao carregar a página */
window.onload = function() {
    listarProdutos();  // Atualiza a lista de produtos
    listarClientes();  // Atualiza a lista de clientes
};

/* Função para Exibir Histórico de Vendas por Cliente */
function relatorioVendasPorCliente() {
    const relatorio = document.getElementById("relatorio");
    relatorio.innerHTML = ''; // Limpa o relatório antes de exibir os dados

    if (vendas.length === 0) {
        relatorio.innerHTML = "<li>Nenhuma venda realizada.</li>";
        return;
    }

    // Agrupar vendas por cliente
    let vendasPorCliente = {};

    vendas.forEach(venda => {
        const cliente = clientes.find(c => c.nome === venda.cliente);
        
        if (!cliente) return;

        if (!vendasPorCliente[cliente.id]) {
            vendasPorCliente[cliente.id] = {
                nome: cliente.nome,
                telefone: cliente.telefone,
                totalGasto: 0,
                compras: []
            };
        }

        vendasPorCliente[cliente.id].compras.push({
            produto: venda.produto,
            quantidade: venda.quantidade,
            valorTotal: venda.valorTotal
        });

        vendasPorCliente[cliente.id].totalGasto += venda.valorTotal;
    });

    // Exibir os dados no HTML
    Object.values(vendasPorCliente).forEach(cliente => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>Cliente:</strong> ${cliente.nome} | <strong>Telefone:</strong> ${cliente.telefone} | <strong>Total Gasto:</strong> R$ ${cliente.totalGasto}`;
        relatorio.appendChild(li);

        // Listar produtos comprados
        const ulCompras = document.createElement("ul");
        cliente.compras.forEach(compra => {
            const liCompra = document.createElement("li");
            liCompra.textContent = `Produto: ${compra.produto} | Quantidade: ${compra.quantidade} | Valor: R$ ${compra.valorTotal}`;
            ulCompras.appendChild(liCompra);
        });

        relatorio.appendChild(ulCompras);
    });
}
