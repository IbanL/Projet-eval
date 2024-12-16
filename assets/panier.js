const containerPanier = document.getElementById("containerPanier");

const containerPrixTotal = document.getElementById("prixTotal");

const btnValiderPanier = document.getElementById("btnValiderCommande");

const panierTitre = document.getElementById("panierTitre");

const confirmPanier = document.getElementById("confirmPanier");

const main = document.querySelector("main");

let prixTotal = 0;

let i = 0;

let isPanierValide;

//debut affichage du panier
let panier = JSON.parse(localStorage.getItem("panier")) || null;

if (panier) {
    panier.forEach(article => {
        containerPanier.innerHTML += `<article class="pagePanierArticle">
                <img class="pagePanierImg" src="../assets/images/${article.img}" alt="${article.nom}">
                <div class="pagePanierInfoArticle">
                    <h3>${article.nom}</h3>
                    <h3>${article.prix}€</h3>
                    <button class="rmArticle" onclick="rmArticle(${i})">retirer l'article</button>
                </div>
            </article>`
        prixTotal += parseFloat(article.prix);
        i++;
    });

    containerPrixTotal.innerText = prixTotal + "€";
} else {
    main.innerHTML = `<h1 class="panierTitre">votre panier est vide</h1>
    <a href="../index.html"><button class="btnValiderCommande">retourner à l'accueil</button></a>
    `
}
//fin affichage du panier

//enlever un article au panier
function rmArticle(index) {
    panier.splice(index, 1);
    if (panier.length) {
        localStorage.setItem("panier", JSON.stringify(panier));
    } else {
        localStorage.removeItem("panier");
    }

    window.location.reload();
};

btnValiderPanier.addEventListener('click', () => {
    fetch("../assets/articles.json")
        .then(Response => Response.json())
        .then(data => {
            panier.forEach(article => {
                const articleReference = data.find(({ id }) => id === parseInt(article.id));
            
                
                if (!articleReference) {
                    isPanierValide = false;
                    return
                } else {
                    if (article.img === articleReference.image && article.nom === articleReference.nom && parseFloat(article.prix) === parseFloat(articleReference.prix)) {
                        isPanierValide = true;
                    } else {
                        isPanierValide = false;
                        return
                    }
                }
            });
            console.log(isPanierValide);
            if (isPanierValide) {
                confirmPanier.innerText = "la commande a été passé";
                confirmPanier.classList.add("suc");
            } else {
                confirmPanier.innerText = "une erreur est survenu lors de la confirmation de la commande";
                confirmPanier.classList.add("err");
            }
        });
});

