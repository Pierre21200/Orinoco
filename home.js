// Page d'acceuil

// Variables
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));

// Fonctions
const createElement = (element, classes, attributes, text, parent) => {
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
        teddy.price /= 100;

        // Créer la div principale de l'élément qui contiendra tous les sous elements
        const card = createElement(
          "div",
          ["row", "align-items-center", "cart"],
          [{ id: teddy._id }],
          "",
          products
        );

        // création de la carte
        const cardBody = createElement(
          "div",
          ["card-body", "align-items-center", "row"],
          [{}],
          "",
          card
        );

        // Div container de l'image
        const containerImage = createElement(
          "div",
          ["col-6"],
          [{}],
          "",
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
          "",
          containerImage
        );

        // Div des détails
        const containerDetails = createElement(
          "div",
          ["col-6", "text-center"],
          [{}],
          "",
          cardBody
        );

        // Le nom
        const nameProduct = createElement(
          "h2",
          ["cart-title", "text-center", "orinoco-font"],
          [{}],
          teddy.name,
          containerDetails
        );

        // Le prix
        const priceProduct = createElement(
          "h5",
          ["card-text", "text-center", "orinoco-font"],
          [{}],
          `${teddy.price} €`,
          containerDetails
        );

        // Le lien qui va mener à la page produit individuel
        const linkProduct = createElement(
          "a",
          [],
          [{ href: `page-produit.html?teddy=${teddy._id}` }],
          "",
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
          "",
          containerDetails
        );

        const modalDialog = createElement(
          "div",
          ["modal-dialog", "modal-sm"],
          [{}],
          "",
          modal
        );

        const modalContent = createElement(
          "div",
          ["modal-content"],
          [{}],
          "",
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
          [{}],
          "",
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
          [{ href: "panier.html" }],
          "",
          modalFooter
        );

        const buttonFooterCart = createElement(
          "button",
          ["button-footer-cart", "btn", "btn-outline-dark"],
          [{}],
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
        "",
        products
      );
      errorCatch.innerText =
        "VEUILLEZ NOUS EXCUSER, LE SERVEUR NE REPONDS PAS !";
    });
};

// Finalement, on execute la fonction
getTeddies();
