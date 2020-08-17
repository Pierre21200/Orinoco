// variables affichant le nombre d'article
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0; // revoir ça, mieux si c'est le bon direct plutot que de le mettre a jour plus bas
let totalPrice = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));

//fonction
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

// on sélectionne la div dans laquelle on va placer nos informations
const containerCart = document.querySelector("#container-cart");
containerCart.classList.add("container-cart", "align-items-center");

// Ligne titre du tableau
const headerCart = createElement(
  "div",
  ["row", "align-items-center", "header-cart"],
  [{}],
  containerCart
);

const headerImg = createElement(
  "h3",
  ["col-2", "text-center", "orinoco-font"],
  [{}],
  headerCart
);
headerImg.innerHTML = "article";

const headerName = createElement(
  "h3",
  ["col-2", "text-center", "orinoco-font"],
  [{}],
  headerCart
);
headerName.innerHTML = "nom";

const headerDescription = createElement(
  "h3",
  ["col-4", "text-center", "orinoco-font"],
  [{}],
  headerCart
);
headerDescription.innerHTML = "description";

// const labelHeaderQuantity = document.createElement("label");
// labelHeaderQuantity.setAttribute("for","quantity");
// labelHeaderQuantity.classList.add("col-1");
// headerCart.appendChild(labelHeaderQuantity);

const headerQuantity = createElement(
  "h3",
  ["col-1", "text-center", "orinoco-font"],
  [{}],
  headerCart
);
headerQuantity.innerHTML = "quantite";

const headerPrice = createElement(
  "h3",
  ["col-1", "text-center", "orinoco-font"],
  [{}],
  headerCart
);
headerPrice.innerHTML = "prix";

if (localCart && localCart.length > 0) {
  localCart.forEach(element => {
    articleNumberText += element.quantity;
    articleNumber.innerText = articleNumberText;
  });

  // et pour chacun de ses éléments, on construit notre panier :
  localCart.forEach(teddy => {
    let teddyPriceQuantity = teddy.price * teddy.quantity;

    // incrémentation du prix
    totalPrice += teddyPriceQuantity;

    const cart = createElement(
      "div",
      ["row", "align-items-center", "cart"],
      [{ id: "cart" }],
      containerCart
    );

    const img = createElement(
      "img",
      ["col-2", "text-center"],
      [
        { src: teddy.imageUrl },
        { alt: teddy.name },
        { style: "max-height : 150px" }
      ],
      cart
    );

    const name = createElement(
      "h2",
      ["col-2", "text-center", "orinoco-font"],
      [{}],
      cart
    );
    name.innerText = teddy.name;

    const description = createElement(
      "p",
      ["col-4", "text-center"],
      [{}],
      cart
    );
    description.innerText = teddy.description;

    const containerQuantity = createElement("div", ["col-1"], [{}], cart);

    // const quantity = document.createElement("input");
    // quantity.setAttribute("style", "text-align : center");
    // quantity.setAttribute("type", "number");
    // quantity.setAttribute("name", "quantity");
    // quantity.setAttribute("value", teddy.quantity);
    // quantity.setAttribute("min", "0");
    // quantity.setAttribute("max", "99");
    // quantity.setAttribute("step", "1");
    // quantity.setAttribute("size", "1");
    // containerQuantity.appendChild(quantity);

    const quantity = createElement("p", [], [{}], containerQuantity);
    quantity.innerText = `${teddy.quantity} `;

    const price = createElement(
      "h5",
      ["orinoco-font", "col-1", "text-center"],
      [{}],
      cart
    );
    price.innerText = `${teddyPriceQuantity} €`;

    const containerButtonSubToCart = createElement(
      "div",
      ["col-2", "text-center"],
      [{}],
      cart
    );

    const buttonSubToCart = createElement(
      "button",
      ["btn", "btn-outline-dark", "orinoco-font", "text-center"],
      [{ type: "button" }],
      containerButtonSubToCart
    );
    buttonSubToCart.innerText = "RETIRER";

    // bouton subToCart
    buttonSubToCart.addEventListener("click", () => {
      if (teddy.quantity > 1) {
        teddy.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(localCart));
        quantity.innerText = teddy.quantity;
        teddyPriceQuantity = teddy.price * teddy.quantity;
        price.innerText = `${teddyPriceQuantity} €`;
        totalPrice -= teddy.price;
        totalPriceText.innerText = `${totalPrice} €`;
      } else {
        localCart = localCart.filter(element => element._id != teddy._id);
        localStorage.setItem("cart", JSON.stringify(localCart));
        containerCart.removeChild(cart);
        totalPrice -= teddy.price;
        totalPriceText.innerText = `${totalPrice} €`;
      }

      if (localCart.length === 0) {
        containerCart.removeChild(containerTotalPrice);
        containerCart.removeChild(clearCart);

        const body = document.getElementById("container-cart");

        const emptyCart = createElement(
          "p",
          ["col-12", "orinoco-font", "bold", "text-center", "empty-cart"],
          [{}],
          body
        );
        emptyCart.innerText = "votre panier est vide";

        const linkToHome = createElement(
          "a",
          ["link-to-home"],
          [{ href: "index.html" }],
          containerCart
        );

        const containerButtonToHome = createElement(
          "div",
          ["container-button-home"],
          [{}],
          linkToHome
        );

        const buttonToHome = createElement(
          "button",
          ["btn", "btn-outline-dark", "orinoco-font", "bold", "center-text"],
          [{}],
          containerButtonToHome
        );
        buttonToHome.innerHTML = "<h3>acceuil</h3>";
      }

      articleNumberText -= 1;
      articleNumber.innerText = articleNumberText;
    });
  });

  const containerTotalPrice = createElement(
    "div",
    ["row", "container-total-price"],
    [{}],
    containerCart
  );

  const emptyPrice = createElement("div", ["col-8"], [{}], containerTotalPrice);

  const total = createElement(
    "h5",
    ["col-1", "orinoco-font", "bold"],
    [{}],
    containerTotalPrice
  );
  total.innerText = "TOTAL";

  const totalPriceText = createElement(
    "h5",
    ["col-1", "total-price", "orinoco-font", "text-center", "bold"],
    [{}],
    containerTotalPrice
  );
  totalPriceText.innerText = `${totalPrice} €`;

  const containerButtonToConfirm = createElement(
    "div",
    ["col-2", "text-center"],
    [{}],
    containerTotalPrice
  );

  const buttonToConfirm = createElement(
    "button",
    ["btn", "btn-outline-dark", "orinoco-font", "bold", "btn-confirm"],
    [{}],
    containerButtonToConfirm
  );
  buttonToConfirm.innerText = "CONFIRMER";

  buttonToConfirm.addEventListener("click", () => {
    const form = document.getElementById("form");
    form.setAttribute("style", "display : block");
  });

  const clearCart = createElement(
    "div",
    ["row", "clear-cart"],
    [{}],
    containerCart
  );

  const emptyClear = createElement("div", ["col-5"], [{}], clearCart);

  const buttonClearCart = createElement(
    "button",
    ["btn", "btn-outline-dark", "orinoco-font", "bold", "btn-clear", "col-2"],
    [{}],
    clearCart
  );
  buttonClearCart.innerText = "VIDER LE PANIER";

  buttonClearCart.addEventListener("click", () => {
    let localCart = [];
    localStorage.setItem("cart", JSON.stringify(localCart));
    containerCart.removeChild(cart);
    containerCart.removeChild(containerTotalPrice);
    containerCart.removeChild(clearCart);
    articleNumberText = 0;
    articleNumber.innerText = articleNumberText;
    form.setAttribute("style", "display : none");

    const body = document.getElementById("container-cart");

    const emptyCart = createElement(
      "p",
      ["col-12", "orinoco-font", "bold", "text-center", "empty-cart"],
      [{}],
      body
    );
    emptyCart.innerText = "votre panier est vide";

    const linkToHome = createElement(
      "a",
      ["link-to-home"],
      [{ href: "index.html" }],
      containerCart
    );

    const containerButtonToHome = createElement(
      "div",
      ["container-button-home"],
      [{}],
      linkToHome
    );

    const buttonToHome = createElement(
      "button",
      ["btn", "btn-outline-dark", "orinoco-font", "bold", "center-text"],
      [{}],
      containerButtonToHome
    );
    buttonToHome.innerHTML = "<h3>acceuil</h3>";
  });
} else {
  const body = document.getElementById("container-cart");

  const emptyCart = createElement(
    "p",
    ["col-12", "orinoco-font", "bold", "text-center", "empty-cart"],
    [{}],
    body
  );
  emptyCart.innerText = "votre panier est vide";

  const linkToHome = createElement(
    "a",
    ["link-to-home"],
    [{ href: "index.html" }],
    containerCart
  );

  const containerButtonToHome = createElement(
    "div",
    ["container-button-home"],
    [{}],
    linkToHome
  );

  const buttonToHome = createElement(
    "button",
    ["btn", "btn-outline-dark", "orinoco-font", "bold", "center-text"],
    [{}],
    containerButtonToHome
  );
  buttonToHome.innerHTML = "<h3>acceuil</h3>";

  articleNumberText = 0;
  articleNumber.innerText = articleNumberText;
}

// Qui récupère les données du local storage avec getCart, le tableau localCart

const buttonSubmit = document.getElementById("submit");

// on peut faire ça mieux avec target si j'ai bien compris
buttonSubmit.addEventListener("click", () => {
  event.preventDefault();

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  const errorFirstName = document.getElementById("error-firstName");
  const errorLastName = document.getElementById("error-lastName");
  const errorAddress = document.getElementById("error-address");
  const errorCity = document.getElementById("error-city");
  const errorEmail = document.getElementById("error-email");

  const isNotEmpty = value => (value !== "" ? true : false);

  const containNumber = /[0-9]/;
  const doNotContainNumber = value =>
    !value.match(containNumber) ? true : false;

  const specialCharacter = /^[!@#$%^&*(),.'-_§?":{}|<>]+$/;
  const doNotContainSpecialCharacter = value =>
    !value.match(specialCharacter) ? true : false;

  const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidEmail = value => (!value.match(regexMail) ? true : false);

  const regexAddress = /([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)/;
  const isValidAddress = value => (!value.match(regexAddress) ? true : false);

  const isValidName = value =>
    isNotEmpty(value) &&
    doNotContainNumber(value) &&
    doNotContainSpecialCharacter(value);

  const formValidate = () => {
    if (isValidName(firstName.value)) {
      errorFirstName.innerText = "";
    } else {
      errorFirstName.innerText = "Veuillez renseigner votre prénom";
      firstName.focus();
      return false;
    }

    if (isValidName(lastName.value)) {
      errorLastName.innerText = "";
    } else {
      errorLastName.innerText = "Veuillez renseigner votre nom";
      lastName.focus();

      return false;
    }

    if (isValidAddress(address.value) && isNotEmpty(address.value)) {
      errorAddress.innerText = "";
    } else {
      errorAddress.innerText = "Veuillez renseigner votre adresse postale";
      address.focus();
      return false;
    }

    if (isValidName(city.value)) {
      errorCity.innerText = "";
    } else {
      errorCity.innerText = "Veuillez renseigner votre ville";
      city.focus();

      return false;
    }

    if (isNotEmpty(email.value)) {
      errorEmail.innerText = "";
    } else {
      errorEmail.innerText = "Veuillez renseigner votre adesse mail";
      email.focus();
      return false;
    }

    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    };

    const cartInformation = {
      products: localCart,
      contact
    };

    localStorage.setItem("totalPrice", totalPrice);

    const postToApi = () =>
      fetch("http://localhost:3000/api/localCart/order", {
        headers: {
          "Content-type": "application/json"
        },
        "Access-Control-Allow-Origin": "*",
        method: "POST",
        body: JSON.stringify(cartInformation)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          localStorage.setItem("data", JSON.stringify(data));
          window.location = `checkout.html`;
        });

    postToApi();
  };
  formValidate();
});
