// Page d'acceuil

// Variables
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));

// Fonction qui facilite la création des éléments de notre page
const createElement = (element, classes, attributes = [], text, parent) => {
  const el = document.createElement(element);
  classes.forEach(clas => {
    el.classList.add(clas);
  });
  attributes.forEach(att => {
    for (let key in att) {
      el.setAttribute(key, att[key]);
    }
  });
  el.innerText = text;
  parent.appendChild(el);
  return el;
};

// Structure conditionnelle qui permet d'incrémententer la quantité d'artcicle affiché dans le header
if (localCart && localCart.length > 0) {
  localCart.forEach(element => {
    articleNumberText += element.quantity;
    articleNumber.innerText = articleNumberText;
  });
} else {
  articleNumber.innerText = 0;
}

// On récupère dans notre page HTML, l'élément dans lequel on va placer nos éléments dynamique
const products = document.querySelector("#product-item");

// D'appeller la function getteddies afin de l'executer
const getTeddies = () => {
  fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(teddies => {
      // On itere sur le tableau de teddies, pour chaque élément du tableau on va :
      teddies.forEach(teddy => {
        // Diviser le prix des teddies par 100
        teddy.price /= 100;

        // Créer la div principale de l'élément qui contiendra tous les sous elements
        const card = createElement(
          "div",
          ["row", "align-items-center", "card"],
          [{ id: teddy._id }],
          null,
          products
        );

        // création de la carte
        const cardBody = createElement(
          "div",
          ["card-body", "align-items-center", "row"],
          [null],
          null,
          card
        );

        // Div container de l'image
        const containerImage = createElement(
          "div",
          ["col-md-6", "col-12", "container-img"],
          [null],
          null,
          cardBody
        );

        // L'image
        const imageProduct = createElement(
          "img",
          ["card-img-top", "text-center"],
          [
            { src: teddy.imageUrl },
            { alt: `Photo de l'ours en peluche ${teddy.name}` }
          ],
          null,
          containerImage
        );

        // Div des détails
        const containerDetails = createElement(
          "div",
          ["col-md-6", "col-12", "text-center"],
          [null],
          null,
          cardBody
        );

        // Le nom
        const nameProduct = createElement(
          "h2",
          ["card-title", "text-center", "orinoco-font"],
          [null],
          teddy.name,
          containerDetails
        );

        // Le prix
        const priceProduct = createElement(
          "h5",
          ["card-text", "text-center", "orinoco-font"],
          [null],
          `${teddy.price} €`,
          containerDetails
        );

        // Le lien qui va mener à la page produit individuel
        const linkProduct = createElement(
          "a",
          [],
          [{ href: `frontend/HTML/page-produit.html?teddy=${teddy._id}` }],
          null,
          containerDetails
        );

        // Accompagné du bouton
        const buttonToProduct = createElement(
          "button",
          ["btn", "btn-outline-dark", "orinoco-font"],
          [{ type: "button" }],
          "PERSONNALISER",
          linkProduct
        );

        // Bouton addToCart
        const buttonAddToCart = createElement(
          "button",
          ["btn", "btn-outline-dark", "orinoco-font", "btn-home"],
          [
            { type: "button" },
            { "data-toggle": "modal" },
            { "data-target": "#addToCart" }
          ],
          "AJOUTER AU PANIER",
          containerDetails
        );

        // Modal addtocart
        const modal = createElement(
          "div",
          ["modal", "fade"],
          [{ id: "addToCart" }],
          null,
          containerDetails
        );

        const modalDialog = createElement(
          "div",
          ["modal-dialog", "modal-sm"],
          [null],
          null,
          modal
        );

        const modalContent = createElement(
          "div",
          ["modal-content"],
          [null],
          null,
          modalDialog
        );

        const modalBody = createElement(
          "div",
          ["modal-body", "text-center"],
          [{ style: "font-size : 30px" }],
          "L'article a bien été ajouté au panier",
          modalContent
        );

        const modalFooter = createElement(
          "div",
          ["modal-footer"],
          [null],
          null,
          modalContent
        );

        const buttonFooterHome = createElement(
          "button",
          ["button-footer-home", "btn", "btn-outline-dark"],
          [{ "data-dismiss": "modal" }],
          "Rester",
          modalFooter
        );

        const linkCart = createElement(
          "a",
          [],
          [{ href: "frontend/HTML/panier.html" }],
          null,
          modalFooter
        );

        const buttonFooterCart = createElement(
          "button",
          ["button-footer-cart", "btn", "btn-outline-dark"],
          [null],
          "Panier",
          linkCart
        );

        // lorsque l'utilisateur clique sur le bouton
        buttonAddToCart.addEventListener("click", () => {
          if (localCart && localCart.length > 0) {
            const found = localCart.find(element => element._id == teddy._id);

            if (found) {
              found.quantity += 1;
              localStorage.setItem("cart", JSON.stringify(localCart));
            } else {
              teddy = { ...teddy, quantity: 1 };
              localCart = [...localCart, teddy];
              localStorage.setItem("cart", JSON.stringify(localCart));
            }
          } else {
            teddy = { ...teddy, quantity: 1 };
            let localCart = [];
            localCart = [...localCart, teddy];
            localStorage.setItem("cart", JSON.stringify(localCart));
          }
          articleNumberText += 1;
          articleNumber.innerText = articleNumberText;
        });
      });
    })
    .catch(function (error) {
      const errorCatch = createElement(
        "p",
        ["orinoco-font", "text-center", "bold"],
        [{ style: "font-size : 100px" }, { style: "margin : 50px" }],
        null,
        products
      );
      errorCatch.innerText =
        "VEUILLEZ NOUS EXCUSER, LE SERVEUR NE REPONDS PAS !";
    });
};

// Finalement, on execute la fonction
getTeddies();
