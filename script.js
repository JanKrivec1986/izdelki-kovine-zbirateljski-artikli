async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();

        const container = document.getElementById('products-container');

        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product';

            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p>${product.description}</p>
                <p class="price">${product.price} €</p>
                <a href="mailto:info@tvojadomena.si?subject=Povpraševanje za ${encodeURIComponent(product.name)}">
                    <button>Povpraševanje</button>
                </a>
            `;

            container.appendChild(div);
        });
    } catch (error) {
        console.error('Napaka pri nalaganju izdelkov:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);
