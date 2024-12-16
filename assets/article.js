const containerArticle = document.getElementById("containerPageArticle");

const searchParams = window.location.search;

const params = new URLSearchParams(searchParams);

const articleId = parseInt(params.get("id"));

const modal = document.getElementById("modal");

let pann = JSON.parse(localStorage.getItem("panier")) || [];

fetch("../assets/articles.json")
    .then(Response => Response.json())
    .then(data => {
        let monArticle = data.find(({ id }) => id === articleId);

        containerArticle.innerHTML = `<img class="pageArticleImg" src="../assets/images/${monArticle.image}" alt="${monArticle.nom}">
                    <h2 class="pageArticleNom">${monArticle.nom}</h2>
                    <p class="pageArticleDesc">${monArticle.description}</p>
                    <h4 class="pageArticlePrix">${monArticle.prix}€</h4>
                    <button class="pageArticleBtn" onclick="ajouterPanier('${monArticle.id}','${monArticle.image}','${monArticle.nom}','${monArticle.prix}')">ajouter au panier</button>`

        document.title = monArticle.nom + " - Egg";
    });





function ajouterPanier(id, image, nom, prix) {
    pann.push({ id: id, img: image, nom: nom, prix: prix });
    localStorage.setItem("panier", JSON.stringify(pann));
    eggModal();
}

function eggModal() {
    modal.classList.remove("open");
    setTimeout(() => {
        modal.classList.add("open");
    }, 50);

}

modal.addEventListener("animationend", () =>{
    modal.classList.remove("open");
})