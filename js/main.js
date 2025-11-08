document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;

    const pageType = document.body.dataset.page;
    const pageCategory = document.body.dataset.category;

    fetch('apps.json')
        .then(response => {
            if (!response.ok) throw new Error('Erreur réseau lors du chargement de apps.json');
            return response.json();
        })
        .then(data => {
            if (pageType === 'home') {
                generateHomepage(data.categories);
            } else if (pageCategory) {
                generateCategoryPage(data.applications, pageCategory);
            }
        })
        .catch(error => {
            console.error("Erreur lors de la construction de la page :", error);
            galleryContainer.innerHTML = '<p style="color: red;">Impossible de charger le contenu. Veuillez réessayer.</p>';
        });

    function generateHomepage(categories) {
        if (!categories || categories.length === 0) {
            galleryContainer.innerHTML = '<p>Aucune catégorie à afficher.</p>';
            return;
        }
        const galleryHTML = categories.map(cat => `
            <a href="${cat.lien}" class="card">
                <img src="${cat.icone}" alt="Icône ${cat.titre}" class="card-icon">
                <h3>${cat.titre}</h3>
                <p>${cat.description}</p>
            </a>
        `).join('');
        galleryContainer.innerHTML = galleryHTML;
    }

    function generateCategoryPage(applications, category) {
        const filteredApps = applications.filter(app => app.categorie === category);
        if (filteredApps.length === 0) {
            galleryContainer.innerHTML = '<p>Aucune application disponible dans cette catégorie pour le moment.</p>';
            return;
        }
        const galleryHTML = filteredApps.map(app => `
            <a href="${app.lien}" class="card app-card">
                <h3>${app.titre}</h3>
                <p>${app.description}</p>
            </a>
        `).join('');
        galleryContainer.innerHTML = galleryHTML;
    }
});