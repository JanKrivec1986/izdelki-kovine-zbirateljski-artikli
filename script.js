document.addEventListener('DOMContentLoaded', function () {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('products.json ni najden.');
            }
            return response.json();
        })
        .then(products => {
            const containers = {
                odlitki: document.getElementById('odlitki-container'),
                nakit: document.getElementById('nakit-container'),
                kovanci: document.getElementById('kovanci-container'),
                zbirateljski: document.getElementById('zbirateljski-container')
            };

            products.forEach(product => {
                const container = containers[product.category];
                if (!container) return;

                const div = document.createElement('div');
                div.className = 'product';

                div.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">${parseFloat(product.price).toFixed(2)} €</p>
                    <a href="mailto:info@tvojadomena.si?subject=Povpraševanje za ${encodeURIComponent(product.name)}">
                        <button>Povpraševanje</button>
                    </a>
                `;

                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Napaka pri nalaganju:', error);
            document.body.innerHTML += '<p style="color:red;text-align:center;">Napaka pri nalaganju izdelkov.</p>';
        });
});
