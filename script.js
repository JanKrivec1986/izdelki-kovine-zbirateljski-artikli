const products = [
    {
        name: "Paradižnik",
        description: "Svež domač paradižnik.",
        price: "3.00",
        category: "zelenjava",
        image: "https://via.placeholder.com/300x200?text=Paradižnik"
    },
    {
        name: "Kovinski kip - Konj",
        description: "Ročno izdelan kovinski odlitek.",
        price: "120.00",
        category: "umetnina",
        image: "https://via.placeholder.com/300x200?text=Kip+Konj"
    }
];

function loadProducts() {
    const vegContainer = document.getElementById('veg-container');
    const artContainer = document.getElementById('art-container');

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';

        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price} €</p>
            <a href="mailto:info@mojaposest.si?subject=Naročilo ${product.name}">
                <button>Naroči</button>
            </a>
        `;

        if (product.category === 'zelenjava') {
            vegContainer.appendChild(div);
        } else if (product.category === 'umetnina') {
            artContainer.appendChild(div);
        }
    });
}

loadProducts();
