// page produit

// on récupère l'URL de notre page actuelle, avec l'id qui nous intéresse, puis on ajoute cette id à l'url de l'API pour pouvoir travailler avec le teddy selectionné
const params = new URLSearchParams(window.location.search);
const id = params.get("teddy");
console.log(id);
const url = "http://localhost:3000/api/teddies/" + id;

// nous renvoie une promesse par le fetch
const getOneTeddy = url => {
  return fetch(url).then(response => response.json());
};

// variables affichant le nombre d'article
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;

let localCart = JSON.parse(localStorage.getItem("cart"));

// on initie la fonction qui va nous permettre, avec la promesse renvoyée :
const renderProducts = () => {
  if (localCart && localCart.length > 0) {
    localCart.forEach(element => {
      articleNumberText += element.quantity;
      articleNumber.innerText = articleNumberText;
    });
  } else {
    articleNumber.innerText = 0;
  }

  getOneTeddy(url).then(teddy => {
    // on sélectionne la div dans laquelle on va palcer tout nos éléments
    const pageProduct = document.querySelector("#pageProduct");

    // Puis création de tout les éléments, en intégrant les infos tirées de l'API
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("row", "align-items-center", "product-list");
    pageProduct.appendChild(containerProduct);

    const imgProduct = document.createElement("img");
    imgProduct.classList.add("col-5");
    imgProduct.setAttribute("src", teddy.imageUrl);
    imgProduct.setAttribute("alt", "Photo de l'ours en Peluche " + teddy.name);
    containerProduct.appendChild(imgProduct);

    const listProduct = document.createElement("div");
    listProduct.classList.add("col-6");
    containerProduct.appendChild(listProduct);

    const nameProduct = document.createElement("h2");
    nameProduct.classList.add("orinoco-font");
    nameProduct.innerText = teddy.name;
    listProduct.appendChild(nameProduct);

    const priceProduct = document.createElement("h5");
    priceProduct.classList.add("orinoco-font");
    priceProduct.innerText = `${teddy.price} €`;
    listProduct.appendChild(priceProduct);

    const descriptionProduct = document.createElement("p");
    descriptionProduct.innerText = teddy.description;
    listProduct.appendChild(descriptionProduct);

    const labelProduct = document.createElement("label");
    labelProduct.innerText = "Choix de la couleur : ";
    listProduct.appendChild(labelProduct);

    const selectProduct = document.createElement("select");
    listProduct.appendChild(selectProduct);

    teddy.colors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      selectProduct.appendChild(option);
    });

    const br = document.createElement("br");
    listProduct.appendChild(br);

    // Accompagné du bouton
    const buttonAddToCart = document.createElement("button");
    buttonAddToCart.classList.add(
      "btn",
      "btn-outline-dark",
      "orinoco-font",
      "btn-home"
    );
    buttonAddToCart.setAttribute("type", "button");
    buttonAddToCart.setAttribute("data-toggle", "modal");
    buttonAddToCart.setAttribute("data-target", "#addToCart");
    buttonAddToCart.innerText = "AJOUTER AU PANIER";
    listProduct.appendChild(buttonAddToCart);

    // Modal addtocart
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.setAttribute("id", "addToCart");
    listProduct.appendChild(modal);

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog", "modal-sm");
    modal.appendChild(modalDialog);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalDialog.appendChild(modalContent);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.innerHTML = `<h5>L'article a bien été ajouté au panier </h5>`;
    modalContent.appendChild(modalBody);

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");
    modalContent.appendChild(modalFooter);

    const buttonFooterProduct = document.createElement("button");
    buttonFooterProduct.classList.add(
      "button-footer-home",
      "btn",
      "btn-outline-dark"
    );
    buttonFooterProduct.setAttribute("data-dismiss", "modal");
    buttonFooterProduct.innerHTML = `<h6>Rester</h6>`;
    modalFooter.appendChild(buttonFooterProduct);

    const linkHome = document.createElement("a");
    linkHome.setAttribute("href", "index.html");
    modalFooter.appendChild(linkHome);

    const buttonFooterHome = document.createElement("button");
    buttonFooterHome.classList.add(
      "button-footer-home",
      "btn",
      "btn-outline-dark"
    );
    buttonFooterHome.innerHTML = `<h6>Acceuil</h6>`;
    linkHome.appendChild(buttonFooterHome);

    const linkCart = document.createElement("a");
    linkCart.setAttribute("href", "panier.html");
    modalFooter.appendChild(linkCart);

    const buttonFooterCart = document.createElement("button");
    buttonFooterCart.classList.add(
      "button-footer-cart",
      "btn",
      "btn-outline-dark"
    );
    buttonFooterCart.innerHTML = `<h6>Panier</h6>`;
    linkCart.appendChild(buttonFooterCart);

    // On initie la fonction permettant le stockage du tableau stringifié dans le local storage

    // on execute la fonction lorsque l'utilisateur clique sur le bouton
    buttonAddToCart.addEventListener("click", () => {
      localCart = JSON.parse(localStorage.getItem("cart"));

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
};

renderProducts();
