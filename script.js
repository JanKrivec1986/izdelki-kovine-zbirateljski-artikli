// script.js

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function loadProducts() {
    try {
        // Nalaganje JSON datoteke iz root mape repozitorija
        const response = await fetch('./products.json');

        if (!response.ok) {
            throw new Error(`Napaka pri nalaganju: ${response.status}`);
        }

        const products = await response.json();

        // Povezava kategorij z ustreznimi HTML vsebniki
        const containers = {
            odlitki: document.getElementById('odlitki-container'),
            nakit: document.getElementById('nakit-container'),
            kovanci: document.getElementById('kovanci-container'),
            zbirateljski: document.getElementById('zbirateljski-container')
        };

        // Preveri, ali vsi vsebniki obstajajo
        Object.entries(containers).forEach(([key, container]) => {
            if (!container) {
                console.warn(`Manjka HTML vsebnik za kategorijo: ${key}`);
            }
        });

        // Ustvari in prikaži izdelke
        products.forEach(product => {
            const container = containers[product.category];

            if (!container) {
                console.warn(`Neznana kategorija: ${product.category}`);
                return;
            }

            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });

    } catch (error) {
        console.error('Napaka pri nalaganju izdelkov:', error);
        showErrorMessage();
    }
}

// Funkcija za ustvarjanje kartice izdelka
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product';

    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Slika+ni+na+voljo'">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="price">${formatPrice(product.price)}</p>
        <a href="mailto:info@tvojadomena.si?subject=Povpraševanje za ${encodeURIComponent(product.name)}">
            <button>Povpraševanje</button>
        </a>
    `;

    return div;
}

// Formatiranje cene
function formatPrice(price) {
    const number = parseFloat(price);
    if (isNaN(number)) return price;
    return number.toFixed(2) + ' €';
}

// Prikaz sporočila o napaki
function showErrorMessage() {
    const sections = [
        'odlitki-container',
        'nakit-container',
        'kovanci-container',
        'zbirateljski-container'
    ];

    sections.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `
                <p style="color: red;">
                    Izdelkov trenutno ni mogoče naložiti. Prosimo, poskusite kasneje.
                </p>
            `;
        }
    });
}
