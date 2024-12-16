const containerArticles = document.getElementById("containerArticles");

const modal = document.getElementById("modal");

let pann = JSON.parse(localStorage.getItem("panier")) || [];

fetch("./assets/articles.json")
    .then(Response => Response.json())
    .then(data => {


            //gestion du panier


        data.forEach(article => {
            let descSclice = article.description.slice(0,25);
            containerArticles.innerHTML += `<article class="unArticle">
     <a  href="./template/article.html?id=${article.id}"><img class="articleImg" src="./assets/images/${article.image}" alt="${article.nom}">
     <h3 class="articleNom">${article.nom}</h3>
     <p class="articleDesc">${descSclice}...</p>
     <p class="articlePrix">${article.prix}€</p></a>
     <button class="articleAjouterPanier" id="btnAjouterPanier" onclick="ajouterPanier('${article.id}','${article.image}','${article.nom}','${article.prix}')">Ajouter au panier</button>
     </article>`
        });

    })

    function ajouterPanier(id,image,nom,prix) {
            pann.push({id: id, img: image, nom: nom, prix: prix});
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