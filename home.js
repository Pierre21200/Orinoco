// Page d'acceuil

// Ludovic : problème dans la fonction createElement, setAttribute, innerText, peut on mettre une valeur non obligatoire ?
// difficulté à rajouter un if (response.ok)

// Variables
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));

// Fonctions
const createElement = (element, classes, attributes, parent) => {
  const el = document.createElement(element);
  classes.forEach(clas => {
    el.classList.add(clas);
  });
  attributes.forEach(att => {
    for (let key in att) {
      el.setAttribute(key, att[key]);
    }
  });
  parent.appendChild(el);
  return el;
};

// Augmenter la quantité de notre article s'il est déjà présent dans le panier
if (localCart && localCart.length > 0) {
  localCart.forEach(element => {
    articleNumberText += element.quantity;
    articleNumber.innerText = articleNumberText;
  });
} else {
  articleNumber.innerText = 0;
}

const products = document.querySelector("#product-item");

// D'appeller la function getteddies afin de l'executer
const getTeddies = () => {
  fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(teddies => {
      // On itere sur le tableau de teddies, pour chaque élément du tableau on va :
      teddies.forEach(teddy => {
        // Créer la div principale de l'élément qui contiendra tous les sous elements
        const card = createElement(
          "div",
          ["row", "align-items-center", "cart"],
          [{ id: teddy._id }],
          products
        );

        // création de la carte
        const cardBody = createElement(
          "div",
          ["card-body", "align-items-center", "row"],
          [{}],
          card
        );

        // Div container de l'image
        const containerImage = createElement("div", ["col-6"], [{}], cardBody);

        // L'image
        const imageProduct = createElement(
          "img",
          ["card-img-top", "text-center"],
          [
            { src: teddy.imageUrl },
            { alt: `Photo de l'ours en peluche ${teddy.name}` }
          ],
          containerImage
        );

        // Div des détails
        const containerDetails = createElement(
          "div",
          ["col-6", "text-center"],
          [{}],
          cardBody
        );

        // Le nom
        const nameProduct = createElement(
          "h2",
          ["cart-title", "text-center", "orinoco-font"],
          [{}],
          containerDetails
        );
        nameProduct.innerHTML = teddy.name;

        // Le prix
        const priceProduct = createElement(
          "h5",
          ["card-text", "text-center", "orinoco-font"],
          [{}],
          containerDetails
        );
        priceProduct.innerHTML = `${teddy.price} €`;

        // Le lien qui va mener à la page produit individuel
        const linkProduct = createElement(
          "a",
          [],
          [{ href: `page-produit.html?teddy=${teddy._id}` }],
          containerDetails
        );

        // Accompagné du bouton
        const buttonToProduct = createElement(
          "button",
          ["btn", "btn-outline-dark", "orinoco-font"],
          [{ type: "button" }],
          linkProduct
        );
        buttonToProduct.innerText = "PERSONNALISER";

        // Bouton addToCart
        const buttonAddToCart = createElement(
          "button",
          ["btn", "btn-outline-dark", "orinoco-font", "btn-home"],
          [
            { type: "button" },
            { "data-toggle": "modal" },
            { "data-target": "#addToCart" }
          ],
          containerDetails
        );
        buttonAddToCart.innerText = "AJOUTER AU PANIER";

        // Modal addtocart
        const modal = createElement(
          "div",
          ["modal", "fade"],
          [{ id: "addToCart" }],
          containerDetails
        );

        const modalDialog = createElement(
          "div",
          ["modal-dialog", "modal-sm"],
          [{}],
          modal
        );

        const modalContent = createElement(
          "div",
          ["modal-content"],
          [{}],
          modalDialog
        );

        const modalBody = createElement(
          "div",
          ["modal-body"],
          [{}],
          modalContent
        );
        modalBody.innerHTML = `<h5>L'article a bien été ajouté au panier </h5>`;

        const modalFooter = createElement(
          "div",
          ["modal-footer"],
          [{}],
          modalContent
        );

        const buttonFooterHome = createElement(
          "button",
          ["button-footer-home", "btn", "btn-outline-dark"],
          [{ "data-dismiss": "modal" }],
          modalFooter
        );
        buttonFooterHome.innerHTML = `<h6>Rester</h6>`;

        const linkCart = createElement(
          "a",
          [],
          [{ href: "panier.html" }],
          modalFooter
        );

        const buttonFooterCart = createElement(
          "button",
          ["button-footer-cart", "btn", "btn-outline-dark"],
          [{}],
          linkCart
        );
        buttonFooterCart.innerHTML = `<h6>Panier</h6>`;

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
        products
      );
      errorCatch.innerText =
        "VEUILLEZ NOUS EXCUSER, LE SERVEUR NE REPONDS PAS !";
    });
};

// Finalement, on execute la fonction
getTeddies();
