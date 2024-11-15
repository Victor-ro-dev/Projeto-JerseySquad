document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('/json/camisas.json');
    const data = await response.json();

    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Produtos HOME
    function renderProducts(products) {
        if (productsContainer) {
            productsContainer.innerHTML = '';
            if (products.length === 0) {
                productsContainer.innerHTML = '<p class="text-center">Não temos esse modelo de camisa!<i class="fa-regular fa-face-frown"></i></p>';
            }
            products.forEach(product => {
                const productCard = `
                    <div class="col-lg-3 col-md-4 col-6">
                        <a style="text-decoration: none;" href="/templates/camisas.html?product=${product.time}">
                            <div class="card mb-5">
                                <img src="${product.image_url}" class="card-img-top" alt="${product.name}">
                                <div class="card-body">
                                    <h6 class="card-title" style="font-size: 14px;">${product.name}</h6>
                                    <p class="card-text">${product.price}</p>
                                </div>
                            </div>
                        </a>
                    </div>`;
                productsContainer.insertAdjacentHTML('beforeend', productCard);
            });
        }
    }

    
    function filterProducts(term) {
        return data.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const filteredProducts = filterProducts(searchTerm);
        renderProducts(filteredProducts);
    });

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value;
        const filteredProducts = filterProducts(searchTerm);
        renderProducts(filteredProducts);
    });

    renderProducts(data);

    
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const user = document.getElementById('user');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Usuário registrado com sucesso!');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');
            if (username === storedUsername && password === storedPassword) {
                alert('Login bem-sucedido!');
                window.location.href = '/index.html';
            } else {
                alert('Nome de usuário ou senha incorretos.');
            }

        });
    }

    // Função Produtos Individual
    const productsPage = document.getElementById('product');
    if (productsPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedTeam = urlParams.get('product');

        const filteredProducts = data.filter(product => product.time === selectedTeam);
        filteredProducts.forEach(product => {
            const productJersey = `
                <div class="col-md-6">
                    <img src="${product.image_url}" alt="Produto" class="product-image">
                </div>
                <div class="col-md-6">
                    <div class="d-flex align-items-center justify-content-between mt-xl-0 mt-4 mb-xl-0 mb-3">
                        <h3>${product.name}</h3>
                        <p class="ms-3 mb-0">
                            <span>4.6</span>
                            <i class="fa fa-star product-rating"></i>
                        </p>
                    </div>
                    <p class="product-price">${product.price}</p>
                    <p class="product-description mb-5">${product.description}</p>
                    <div class="mt-3 d-flex justify-content-between text-center">
                        <div class="d-flex flex-column input-group w-25 mb-3">
                            <div><label for="sizes" class="form-label">Quantidade:</label></div>
                            <div>
                                <select class="form-select" id="Quantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div id="tamanhos">
                            <label for="sizes" class="form-label">Escolha o tamanho:</label> <br>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="button">P</button>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="button">M</button>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="button">G</button>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="button">XG</button>
                        </div>
                    </div>
                    <div class="mt-5 d-flex justify-content-center">
                        <button class="btn btn-danger btn-lg" id="addToCartButton">Comprar</button>
                    </div>
                </div>`;

            productsPage.insertAdjacentHTML('beforeend', productJersey);

            // Botão que desativa ao ativar outro
            document.querySelectorAll('.btn[data-bs-toggle="button"]').forEach(button => {
                button.addEventListener('click', function () {
                    document.querySelectorAll('.btn[data-bs-toggle="button"]').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Adiciona item ao carrinho
            document.getElementById('addToCartButton').addEventListener('click', () => {
                const selectedSize = document.querySelector('.btn.active')?.innerText
                const quantity = document.getElementById('Quantity').value

                if (!selectedSize) {
                    alert('Selecione um tamanho!');
                    return;
                }
                if (!quantity || quantity <= 0) {
                    alert('Selecione uma quantidade válida!');
                    return;
                }

                const cartItem = {
                    name: product.name,
                    imageUrl: product.image_url,
                    price: product.price,
                    size: selectedSize,
                    quantity: quantity
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));

                alert('Produto adicionado ao carrinho!');
            });
        });
    }

    //Gerar página do carrinho
    const cartPage = document.getElementById('itens');
    const cartFinish = document.getElementById('finish');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartPage.innerHTML = `<p class="text-center mt-4">Seu carrinho está vazio.</p>`;
    } else {
        cart.forEach(item => {
            const cartItem = ` 
        <div class="row cart-item mb-3">
        <div class="col-md-2"> 
        <img src="${item.imageUrl}" alt="${item.name}" class="img-fluid"> 
        </div> 
        <div class="col-md-3"> <h5>${item.name}</h5> <p>Tamanho: ${item.size}</p> </div> 
        <div class="col-md-2"> <input type="number" class="form-control" value="${item.quantity}" min="1" max="5"> </div> 
        <div class="col-md-2"> <p class="product-price">${item.price}</p> </div> 
        <div class="col-md-2"> <button class="btn btn-link btn-remove">Remover</button> </div> </div>`;


            cartPage.insertAdjacentHTML('beforeend', cartItem);
        });
    }

    const cartActions = ` <div class="d-flex justify-content-around mt-4"> <div> <a href="/index.html" class="btn btn-secondary">Continuar Comprando</a> </div> <div> <button class="btn btn-danger" id="finalizePurchase">Finalizar Compra</button> </div> </div>`;

    cartFinish.insertAdjacentHTML('beforeend', cartActions);

    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', function () {
            const itemName = this.closest('.cart-item').querySelector('h5').innerText;

            const updatedCart = cart.filter(item => item.name !== itemName);

            localStorage.setItem('cart', JSON.stringify(updatedCart));

            this.closest('.cart-item').remove();
        });
    });

});


    
