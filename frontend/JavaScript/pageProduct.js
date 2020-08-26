// Page produit

// Variables
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));

// Fonction qui facilite la création des éléments de notre page
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
const pageProduct = document.querySelector("#pageProduct");

// on récupère l'URL de notre page actuelle, avec l'id qui nous intéresse, puis on ajoute cette id à l'url de l'API pour pouvoir travailler avec le teddy selectionné
const params = new URLSearchParams(window.location.search);
const id = params.get("teddy");
const url = "http://localhost:3000/api/teddies/" + id;

// on initie la fonction qui va nous permettre, avec la promesse renvoyée :
const getOneTeddy = () => {
  fetch(url)
    .then(response => response.json())
    .then(teddy => {
      teddy.price /= 100;
      // Puis création de tout les éléments, en intégrant les infos tirées de l'API

      const containerProduct = createElement(
        "div",
        ["row", "align-items-center", "product-list"],
        [{}],
        "",
        pageProduct
      );

      const imgProduct = createElement(
        "img",
        ["col-md-5", "col-12", "container-img"],
        [
          { src: teddy.imageUrl },
          { alt: "Photo de l'ours en Peluche " + teddy.name }
        ],
        "",
        containerProduct
      );

      const listProduct = createElement(
        "div",
        ["col-md-6", "col-12", "list-product"],
        [{}],
        "",
        containerProduct
      );

      const nameProduct = createElement(
        "h2",
        ["orinoco-font"],
        [{}],
        teddy.name,
        listProduct
      );

      const priceProduct = createElement(
        "h5",
        ["orinoco-font"],
        [{}],
        `${teddy.price} €`,
        listProduct
      );

      const descriptionProduct = createElement(
        "p",
        [],
        [{}],
        teddy.description,
        listProduct
      );

      const labelProduct = createElement(
        "label",
        ["orinoco-font", "bold"],
        [{}],
        "choix de la couleur :",
        listProduct
      );

      const selectProduct = createElement("select", [], [{}], "", listProduct);

      teddy.colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        selectProduct.appendChild(option);
      });

      const br = createElement("br", [], [{}], "", listProduct);

      const buttonAddToCart = createElement(
        "button",
        ["btn", "btn-outline-dark", "orinoco-font", "btn-home"],
        [
          { type: "button" },
          { "data-toggle": "modal" },
          { "data-target": "#addToCart" }
        ],
        "AJOUTER AU PANIER",
        listProduct
      );

      // Modal addtocart
      const modal = createElement(
        "div",
        ["modal", "fade"],
        [{ id: "addToCart" }],
        "",
        listProduct
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

      const buttonFooterProduct = createElement(
        "button",
        ["button-footer-home", "btn", "btn-outline-dark"],
        [{ "data-dismiss": "modal" }],
        "Rester",
        modalFooter
      );

      const linkHome = createElement(
        "a",
        [],
        [{ href: "../../index.html" }],
        "",
        modalFooter
      );

      const buttonFooterHome = createElement(
        "button",
        ["button-footer-home", "btn", "btn-outline-dark"],
        [{}],
        "Acceuil",
        linkHome
      );

      const linkCart = createElement(
        "a",
        [],
        [{ href: "../HTML/panier.html" }],
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

      // on execute la fonction lorsque l'utilisateur clique sur le bouton
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
    })
    .catch(function (error) {
      const errorCatch = createElement(
        "p",
        ["orinoco-font", "text-center", "bold"],
        [{ style: "font-size : 100px" }, { style: "margin : 50px" }],
        "",
        pageProduct
      );
      errorCatch.innerText =
        "VEUILLEZ NOUS EXCUSER, LE SERVEUR NE REPONDS PAS !";
    });
};

getOneTeddy();
