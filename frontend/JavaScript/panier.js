// Page panier

// Variables
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));
let totalPrice = 0;

// Structure conditionnelle qui permet d'incrémententer la quantité d'artcicle affiché dans le header
if (localCart && localCart.length > 0) {
  localCart.forEach(element => {
    articleNumberText += element.quantity;
    articleNumber.innerText = articleNumberText;
  });
} else {
  articleNumber.innerText = 0;
}

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

// fonction pour le panier vide que l'on utilise dans trois cas différents
const emptyCart = () => {
  localCart = [];
  localStorage.setItem("cart", JSON.stringify(localCart));
  articleNumberText = 0;
  articleNumber.innerText = articleNumberText;
  form.setAttribute("style", "display : none");
  const body = document.querySelector("body");
  body.removeChild(containerCart);

  const emptyCartText = createElement(
    "p",
    ["col-12", "orinoco-font", "bold", "text-center", "empty-cart"],
    [{}],
    "votre panier est vide",
    body
  );

  const linkToHome = createElement(
    "a",
    ["link-to-home"],
    [{ href: "../../index.html" }],
    "",
    body
  );

  const containerButtonToHome = createElement(
    "div",
    ["container-button-home"],
    [{}],
    "",
    linkToHome
  );

  const buttonToHome = createElement(
    "button",
    ["btn", "btn-outline-dark", "orinoco-font", "bold", "center-text"],
    [{ style: "font-size : 25px" }],
    "acceuil",
    containerButtonToHome
  );
};

// On récupère dans notre page HTML, l'élément dans lequel on va placer nos éléments dynamique
const containerCart = document.querySelector("#container-cart");

// Ligne titre du tableau
const headerCart = createElement(
  "div",
  ["row", "align-items-center", "header-cart"],
  [{}],
  "",
  containerCart
);

const headerImg = createElement(
  "h3",
  ["col-2", "text-center", "orinoco-font"],
  [{}],
  "article",
  headerCart
);

const headerName = createElement(
  "h3",
  ["col-2", "text-center", "orinoco-font"],
  [{}],
  "nom",
  headerCart
);

const headerDescription = createElement(
  "h3",
  ["col-4", "text-center", "orinoco-font"],
  [{}],
  "description",
  headerCart
);

const headerQuantity = createElement(
  "h3",
  ["col-1", "text-center", "orinoco-font"],
  [{}],
  "quantite",
  headerCart
);

const headerPrice = createElement(
  "h3",
  ["col-1", "text-center", "orinoco-font"],
  [{}],
  "prix",
  headerCart
);

// on utilise une structure conditionnelle, qui vérifie si le panier existe et contient au moins un article
if (localCart && localCart.length > 0) {
  localCart.forEach(teddy => {
    // on met d'abord a jour le prix en fonction de quanité de teddy
    let teddyPriceQuantity = teddy.price * teddy.quantity;

    // incrémentation du prix total
    totalPrice += teddyPriceQuantity;

    // et pour chacun de ses éléments, on construit notre panier :
    const cart = createElement(
      "div",
      ["row", "align-items-center", "cart"],
      [null],
      "",
      containerCart
    );

    // element qui n'apparait que dans les media queries, caché avec un display : none
    const ImgEmpty = createElement(
      "div",
      ["col-2", "img-empty"],
      [{}],
      "",
      cart
    );

    const img = createElement(
      "img",
      ["col-lg-2", "col-8", "container-img"],
      [{ src: teddy.imageUrl }, { alt: teddy.name }],
      "",
      cart
    );

    const name = createElement(
      "h2",
      ["col-lg-2", "col-12", "text-center", "orinoco-font"],
      [{}],
      teddy.name,
      cart
    );

    // element qui n'apparait que dans les media queries, caché avec un display : none
    const spanDescription = createElement(
      "span",
      ["orinoco-font", "bold", "span", "col-12", "text-center"],
      [{}],
      "description :",
      cart
    );

    // element qui n'apparait que dans les media queries, caché avec un display : none
    const emptyDescription = createElement(
      "div",
      ["description-empty", "col-3"],
      [{}],
      "",
      cart
    );

    const description = createElement(
      "p",
      ["col-lg-4", "col-6", "text-center"],
      [{}],
      teddy.description,
      cart
    );

    const containerQuantity = createElement(
      "div",
      ["col-lg-1", "col-12", "text-center"],
      [{}],
      "",
      cart
    );

    // element qui n'apparait que dans les media queries, caché avec un display : none
    const spanQuantity = createElement(
      "span",
      ["orinoco-font", "bold", "span"],
      [{}],
      "quantite :",
      containerQuantity
    );

    const quantity = createElement(
      "p",
      [],
      [{}],
      teddy.quantity,
      containerQuantity
    );

    // element qui n'apparait que dans les media queries, caché avec un display : none
    const spanPrice = createElement(
      "span",
      ["orinoco-font", "bold", "span", "col-12", "text-center"],
      [{}],
      "prix :",
      cart
    );

    const price = createElement(
      "h5",
      ["orinoco-font", "col-lg-1", "col-12", "text-center"],
      [{}],
      `${teddyPriceQuantity} €`,
      cart
    );

    const containerButtonSubToCart = createElement(
      "div",
      ["col-lg-2", "col-12", "text-center", "container-sub"],
      [{}],
      "",
      cart
    );

    const buttonSubToCart = createElement(
      "button",
      ["btn", "btn-outline-dark", "orinoco-font", "text-center"],
      [{ type: "button" }],
      "RETIRER",
      containerButtonSubToCart
    );

    // bouton subToCart, retirer du panier
    buttonSubToCart.addEventListener("click", () => {
      articleNumberText -= 1;
      articleNumber.innerText = articleNumberText;
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
        emptyCart();
      }
    });
  });

  const containerTotalPrice = createElement(
    "div",
    ["row", "container-total-price", "align-items-center"],
    [{}],
    "",
    containerCart
  );

  const emptyPrice = createElement(
    "div",
    ["col-lg-7"],
    [{}],
    "",
    containerTotalPrice
  );

  const total = createElement(
    "h5",
    ["col-lg-2", "orinoco-font", "bold", "text-center", "total"],
    [{}],
    "TOTAL :",
    containerTotalPrice
  );

  const totalPriceText = createElement(
    "h5",
    ["col-lg-1", "total", "orinoco-font", "text-center", "bold"],
    [{}],
    `${totalPrice} €`,
    containerTotalPrice
  );

  const containerButtonToConfirm = createElement(
    "div",
    ["col-lg-2", "text-center"],
    [{}],
    "",
    containerTotalPrice
  );

  const buttonToConfirm = createElement(
    "button",
    ["btn", "btn-outline-dark", "orinoco-font", "bold", "btn-confirm"],
    [{}],
    "CONFIRMER",
    containerButtonToConfirm
  );

  buttonToConfirm.addEventListener("click", () => {
    const form = document.getElementById("form");
    form.setAttribute("style", "display : block");
    window.scrollTo(0, 100000);
  });

  const clearCart = createElement(
    "div",
    ["row", "clear-cart"],
    [{}],
    "",
    containerCart
  );

  const emptyClear = createElement(
    "div",
    ["col-sm-5", "col-3"],
    [{}],
    "",
    clearCart
  );

  const buttonClearCart = createElement(
    "button",
    [
      "btn",
      "btn-outline-dark",
      "orinoco-font",
      "bold",
      "btn-clear",
      "col-sm-2",
      "col-6"
    ],
    [{}],
    "VIDER LE PANIER",
    clearCart
  );

  buttonClearCart.addEventListener("click", () => {
    emptyCart();
  });
} else {
  emptyCart();
}

//input onchange
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
const errorCatchForm = document.getElementById("error-catch-form");

let errors = [];
errors.firstName = false;
errors.lastName = false;
errors.address = false;
errors.city = false;
errors.email = false;

const isNotEmpty = value => (value !== "" ? true : false);

const containNumber = /[0-9]/;
const doNotContainNumber = value =>
  !value.match(containNumber) ? true : false;

const specialCharacter = /^[!@#$%^&*(),.'-_§?":;{}|<>]+$/;
const doNotContainSpecialCharacter = value =>
  !value.match(specialCharacter) ? true : false;

const isValidName = value =>
  isNotEmpty(value) &&
  doNotContainNumber(value) &&
  doNotContainSpecialCharacter(value);

const regexMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidEmail = value => (regexMail.test(value) ? true : false);

const regexAddress = /^[0-9]{1,5} ([-a-zA-Zàâäéèêëïîôöùûüç ])+/;
const isValidAddress = value => (regexAddress.test(value) ? true : false);

firstName.addEventListener("keyup", () => {
  if (isValidName(firstName.value)) {
    errorFirstName.innerText = "CE PRENOM EST VALIDE";
    errorFirstName.setAttribute("style", "color : green");
    errors.firstName = true;
  } else {
    errorFirstName.innerText = "CE PRENOM N'EST PAS VALIDE";
    errorFirstName.setAttribute("style", "color : red");
    firstName.focus();
    errors.firstName = false;
  }
});

lastName.addEventListener("keyup", () => {
  if (isValidName(lastName.value)) {
    errorLastName.innerText = "CE NOM EST VALIDE";
    errorLastName.setAttribute("style", "color : green");
    errors.lastName = true;
  } else {
    errorLastName.innerText = "CE NOM N'EST PAS VALIDE";
    errorLastName.setAttribute("style", "color : red");
    lastName.focus();
    errors.lastName = false;
  }
});

address.addEventListener("keyup", () => {
  if (isValidAddress(address.value)) {
    errorAddress.innerText = "CETTE ADRESSE EST VALIDE";
    errorAddress.setAttribute("style", "color : green");
    errors.address = true;
  } else {
    errorAddress.innerText = "CETTE ADRESSE N'EST PAS VALIDE";
    errorAddress.setAttribute("style", "color : red");
    address.focus();
    errors.address = false;
  }
});

city.addEventListener("keyup", () => {
  if (isValidName(city.value)) {
    errorCity.innerText = "CETTE VILLE EST VALIDE";
    errorCity.setAttribute("style", "color : green");
    errors.city = true;
  } else {
    errorCity.innerText = "CETTE VILLE N'EST PAS VALIDE";
    errorCity.setAttribute("style", "color : red");
    city.focus();
    errors.city = false;
  }
});

email.addEventListener("keyup", () => {
  if (isValidEmail(email.value)) {
    errorEmail.innerText = "CETTE ADRESSE MAIL EST VALIDE";
    errorEmail.setAttribute("style", "color : green");
    errors.email = true;
  } else {
    errorEmail.innerText = "CETTE ADRESSE MAIL N'EST PAS VALIDE";
    errorEmail.setAttribute("style", "color : red");
    email.focus();
    errors.email = false;
  }
});

// Qui récupère les données du local storage avec getCart, le tableau localCart
const buttonSubmit = document.getElementById("submit");

buttonSubmit.addEventListener("click", () => {
  event.preventDefault();

  let valid = true;
  for (let key in errors) {
    if (errors[key] === false) {
      valid = false;
    }
  }

  if (valid) {
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

    fetch("http://localhost:3000/api/teddies/order", {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(cartInformation)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        localStorage.setItem("data", JSON.stringify(data));
        window.location = `checkout.html`;
        localStorage.removeItem("cart");
      })
      .catch(function (error) {
        errorCatchForm.innerText =
          "veuillez nous excuser, le serveur ne repond pas";
        window.scrollTo(0, 100000);
      });
  } else {
    errorCatchForm.innerText = "veuillez remplir tout les champs du formulaire";
    window.scrollTo(0, 100000);
  }
});
