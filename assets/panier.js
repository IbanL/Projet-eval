//declaration des variables
const containerPanier = document.getElementById("containerPanier");

const containerPrixTotal = document.getElementById("prixTotal");

const btnValiderPanier = document.getElementById("btnValiderCommande");

const panierTitre = document.getElementById("panierTitre");

const confirmPanier = document.getElementById("confirmPanier");

const main = document.querySelector("main");

let prixTotal = 0;

let i = 0;

let isPanierValide;

//recuperation du panier dans le localStorage
let panier = JSON.parse(localStorage.getItem("panier")) || null;

//si le panier n'est pas vide
if (panier) {
    //affichage du panier
    panier.forEach(article => {
        containerPanier.innerHTML += `<article class="pagePanierArticle">
                <img class="pagePanierImg" src="../assets/images/${article.img}" alt="${article.nom}">
                <div class="pagePanierInfoArticle">
                    <h3>${article.nom}</h3>
                    <h3>${article.prix}€</h3>
                    <button aria-label="bouton supprimer l'article du panier" class="rmArticle" onclick="rmArticle(${i})">retirer l'article</button>
                </div>
            </article>`
        //calcul du prix total
        prixTotal += parseFloat(article.prix);
        i++;
    });
    //affichage du prix total
    containerPrixTotal.innerText = prixTotal + "€";
} else {
    //affichage du panier vide
    main.innerHTML = `<h1 class="panierTitre">votre panier est vide</h1>
    <a href="../index.html"><button aria-label="bouton retourner a l'accueil" class="btnValiderCommande">retourner à l'accueil</button></a>
    `
}


//enlever un article du panier
function rmArticle(index) {
    panier.splice(index, 1);
    if (panier.length) {
        localStorage.setItem("panier", JSON.stringify(panier));
    } else {
        localStorage.removeItem("panier");
    }
    window.location.reload();
};

//bouton valider panier
btnValiderPanier.addEventListener('click', () => {
    //recuperation de la liste des articles
    fetch("../assets/articles.json")
        .then(Response => Response.json())
        .then(data => {
            //verification de la validité des articles
            panier.forEach(article => {
                //recupere l'article dans la base de donnée
                const articleReference = data.find(({ id }) => id === parseInt(article.id));

                //verifie si l'article existe
                if (!articleReference) {
                    isPanierValide = false;
                    return
                } else {
                    //si l'article existe, on verifie si ses valeurs sont correct
                    if (article.img === articleReference.image && article.nom === articleReference.nom && parseFloat(article.prix) === parseFloat(articleReference.prix)) {
                        isPanierValide = true;
                    } else {
                        isPanierValide = false;
                        return
                    }
                }
            });

            //si le panier est valide
            if (isPanierValide) {
                //confirmation de la commande
                confirmPanier.innerText = "la commande a été passé";
                confirmPanier.classList.add("suc");
            } else {
                //si le panier est invalide, la refuse
                confirmPanier.innerText = "une erreur est survenu lors de la confirmation de la commande";
                confirmPanier.classList.add("err");
            }
        })
        // Gérer les erreurs
        .catch(error => {
            console.error("Erreur lors du chargement des articles :", error);
        });
});

