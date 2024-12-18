//déclaration variables
const containerArticles = document.getElementById("containerArticles");

const modal = document.getElementById("modal");

let pann = JSON.parse(localStorage.getItem("panier")) || [];


//recuperation de la liste des articles
fetch("./assets/articles.json")
    .then(Response => Response.json())
    .then(data => {

        //affichage des articles
        data.forEach(article => {
            let descSclice = article.description.slice(0, 25);
            containerArticles.innerHTML += `<article class="unArticle">
     <a aria-label="lien vers les detail du ${article.nom}" href="./template/article.html?id=${article.id}"><img class="articleImg" src="./assets/images/${article.image}" alt="${article.nom}">
     <h2 class="articleNom">${article.nom}</h2>
     <p class="articleDesc">${descSclice}...</p>
     <p class="articlePrix">${article.prix}€</p></a>
     <button aria-label="bouton ajouter l'article au panier" class="articleAjouterPanier" id="btnAjouterPanier" onclick="ajouterPanier('${article.id}','${article.image}','${article.nom}','${article.prix}')">Ajouter au panier</button>
     </article>`
        });

    })
    // Gérer les erreurs
     .catch(error => {
        console.error("Erreur lors du chargement des articles :", error);
    });

//fonction bouton ajouter au panier
function ajouterPanier(id, image, nom, prix) {
    pann.push({ id: id, img: image, nom: nom, prix: prix });
    localStorage.setItem("panier", JSON.stringify(pann));
    eggModal();
}

//fonction qui gere la modal
function eggModal() {
    modal.classList.remove("open");
    setTimeout(() => {
        modal.classList.add("open");
    }, 50);

}

//detection de la disparition de la modal
modal.addEventListener("animationend", () => {
    modal.classList.remove("open");
})


