//declaration des variables
const containerArticle = document.getElementById("containerPageArticle");

const searchParams = window.location.search;

const params = new URLSearchParams(searchParams);

const articleId = parseInt(params.get("id"));

const modal = document.getElementById("modal");

let pann = JSON.parse(localStorage.getItem("panier")) || [];


//recuperation de la liste des articles
fetch("../assets/articles.json")
    .then(Response => Response.json())
    .then(data => {

        //recherche de l'article actuel
        let monArticle = data.find(({ id }) => id === articleId);

        //affichage de l'article actuel
        containerArticle.innerHTML = `<img class="pageArticleImg" src="../assets/images/${monArticle.image}" alt="${monArticle.nom}">
                    <h2 class="pageArticleNom">${monArticle.nom}</h2>
                    <p class="pageArticleDesc">${monArticle.description}</p>
                    <h4 class="pageArticlePrix">${monArticle.prix}€</h4>
                    <button aria-label="bouton ajouter l'article au panier" class="pageArticleBtn" onclick="ajouterPanier('${monArticle.id}','${monArticle.image}','${monArticle.nom}','${monArticle.prix}')">ajouter au panier</button>`

        //affichage du titre de la page
        document.title = monArticle.nom + " - Egg";
    })
    // Gérer les erreurs
    .catch(error => {
        console.error("Erreur lors du chargement des articles :", error);
    });




// fonction ajouter au panier
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