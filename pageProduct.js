// page produit

// on récupère l'URL de notre page actuelle, avec l'id qui nous intéresse, puis on ajoute cette id à l'url de l'API pour pouvoir travailler avec le teddy selectionné
const params = new URLSearchParams(window.location.search);
const id = params.get("teddy");
const url = "http://localhost:3000/api/teddies/" + id;

// variables
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));
const pageProduct = document.querySelector("#pageProduct");

// fonctions
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

//affichage quantité dans headers
if (localCart && localCart.length > 0) {
  localCart.forEach(element => {
    articleNumberText += element.quantity;
    articleNumber.innerText = articleNumberText;
  });
} else {
  articleNumber.innerText = 0;
}

// on initie la fonction qui va nous permettre, avec la promesse renvoyée :

const getOneTeddy = () => {
  fetch(url)
    .then(response => response.json())
    .then(teddy => {
      // Puis création de tout les éléments, en intégrant les infos tirées de l'API

      const containerProduct = createElement(
        "div",
        ["row", "align-items-center", "product-list"],
        [{}],
        pageProduct
      );

      const imgProduct = createElement(
        "img",
        ["col-5"],
        [
          { src: teddy.imageUrl },
          { alt: "Photo de l'ours en Peluche " + teddy.name }
        ],
        containerProduct
      );

      const listProduct = createElement(
        "div",
        ["col-6"],
        [{}],
        containerProduct
      );

      const nameProduct = createElement(
        "h2",
        ["orinoco-font"],
        [{}],
        listProduct
      );
      nameProduct.innerText = teddy.name;

      const priceProduct = createElement(
        "h5",
        ["orinoco-font"],
        [{}],
        listProduct
      );
      priceProduct.innerText = `${teddy.price} €`;

      const descriptionProduct = createElement("p", [], [{}], listProduct);
      descriptionProduct.innerText = teddy.description;

      const labelProduct = createElement("label", [], [{}], listProduct);
      labelProduct.innerText = "Choix de la couleur : ";

      const selectProduct = createElement("select", [], [{}], listProduct);

      teddy.colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        selectProduct.appendChild(option);
      });

      const br = createElement("br", [], [{}], listProduct);

      const buttonAddToCart = createElement(
        "button",
        ["btn", "btn-outline-dark", "orinoco-font", "btn-home"],
        [
          { type: "button" },
          { "data-toggle": "modal" },
          { "data-target": "#addToCart" }
        ],
        listProduct
      );
      buttonAddToCart.innerText = "AJOUTER AU PANIER";

      // Modal addtocart
      const modal = createElement(
        "div",
        ["modal", "fade"],
        [{ id: "addToCart" }],
        listProduct
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

      const buttonFooterProduct = createElement(
        "button",
        ["button-footer-home", "btn", "btn-outline-dark"],
        [{ "data-dismiss": "modal" }],
        modalFooter
      );
      buttonFooterProduct.innerHTML = `<h6>Rester</h6>`;

      const linkHome = createElement(
        "a",
        [],
        [{ href: "index.html" }],
        modalFooter
      );

      const buttonFooterHome = createElement(
        "button",
        ["button-footer-home", "btn", "btn-outline-dark"],
        [{}],
        linkHome
      );
      buttonFooterHome.innerHTML = `<h6>Acceuil</h6>`;

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
      console.log(
        "Il y a eu un problème avec l'opération fetch: " + error.message
      );
    });
};

getOneTeddy();
