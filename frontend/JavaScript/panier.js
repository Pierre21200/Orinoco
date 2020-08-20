// variables affichant le nombre d'article
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0; // revoir ça, mieux si c'est le bon direct plutot que de le mettre a jour plus bas
let localCart = JSON.parse(localStorage.getItem("cart"));
let totalPrice = 0;
//fonction
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

// Header Artcile Number
if (localCart && localCart.length > 0) {
  localCart.forEach(element => {
    articleNumberText += element.quantity;
    articleNumber.innerText = articleNumberText;
  });
} else {
  articleNumber.innerText = 0;
}

// on sélectionne la div dans laquelle on va placer nos informations
const containerCart = document.querySelector("#container-cart");
containerCart.classList.add("container-cart", "align-items-center");
containerCart.setAttribute("style", "padding-bottom : 50px");

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

if (localCart && localCart.length > 0) {
  // et pour chacun de ses éléments, on construit notre panier :
  localCart.forEach(teddy => {
    let teddyPriceQuantity = teddy.price * teddy.quantity;

    // incrémentation du prix
    totalPrice += teddyPriceQuantity;

    const cart = createElement(
      "div",
      ["row", "align-items-center", "cart"],
      [{ id: "cart" }],
      "",
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
      "",
      cart
    );

    const name = createElement(
      "h2",
      ["col-2", "text-center", "orinoco-font"],
      [{}],
      teddy.name,
      cart
    );

    const description = createElement(
      "p",
      ["col-4", "text-center"],
      [{}],
      teddy.description,
      cart
    );

    const containerQuantity = createElement("div", ["col-1"], [{}], "", cart);

    const quantity = createElement(
      "p",
      [],
      [{}],
      teddy.quantity,
      containerQuantity
    );

    const price = createElement(
      "h5",
      ["orinoco-font", "col-1", "text-center"],
      [{}],
      `${teddyPriceQuantity} €`,
      cart
    );

    const containerButtonSubToCart = createElement(
      "div",
      ["col-2", "text-center"],
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
          "votre panier est vide",
          body
        );

        const linkToHome = createElement(
          "a",
          ["link-to-home"],
          [{ href: "../../index.html" }],
          "",
          containerCart
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

        // enlever le formulaire !!!
      }

      articleNumberText -= 1;
      articleNumber.innerText = articleNumberText;
    });
  });

  const containerTotalPrice = createElement(
    "div",
    ["row", "container-total-price"],
    [{}],
    "",
    containerCart
  );

  const emptyPrice = createElement(
    "div",
    ["col-8"],
    [{}],
    "",
    containerTotalPrice
  );

  const total = createElement(
    "h5",
    ["col-1", "orinoco-font", "bold"],
    [{}],
    "TOTAL",
    containerTotalPrice
  );

  const totalPriceText = createElement(
    "h5",
    ["col-1", "total-price", "orinoco-font", "text-center", "bold"],
    [{}],
    `${totalPrice} €`,
    containerTotalPrice
  );

  const containerButtonToConfirm = createElement(
    "div",
    ["col-2", "text-center"],
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
    window.scrollTo(0, 500);
  });

  const clearCart = createElement(
    "div",
    ["row", "clear-cart"],
    [{}],
    "",
    containerCart
  );

  const emptyClear = createElement("div", ["col-5"], [{}], "", clearCart);

  const buttonClearCart = createElement(
    "button",
    ["btn", "btn-outline-dark", "orinoco-font", "bold", "btn-clear", "col-2"],
    [{}],
    "VIDER LE PANIER",
    clearCart
  );

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
      "votre panier est vide",
      body
    );

    const linkToHome = createElement(
      "a",
      ["link-to-home"],
      [{ href: "../../index.html" }],
      "",
      containerCart
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
      [{}],
      "acceuil",
      containerButtonToHome
    );
  });
} else {
  const body = document.getElementById("container-cart");

  const emptyCart = createElement(
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
    containerCart
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
    [{}],
    "acceuil",
    containerButtonToHome
  );

  articleNumberText = 0;
  articleNumber.innerText = articleNumberText;
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

const regexMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidEmail = value => (!value.match(regexMail) ? true : false);

const regexAddress = /([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)/;
const isValidAddress = value => (!value.match(regexAddress) ? true : false);

const regexCity = /^[[:alpha:]]([-' ]?[[:alpha:]])*$/;
const isValidCity = value => (!value.match(regexCity) ? true : false);

const isValidName = value =>
  isNotEmpty(value) &&
  doNotContainNumber(value) &&
  doNotContainSpecialCharacter(value);

firstName.addEventListener("keyup", () => {
  if (isValidName(firstName.value)) {
    errorFirstName.innerText = "";
    errors.firstName = true;
  } else {
    errorFirstName.innerText = "CE PRENOM N'EST PAS VALIDE";
    firstName.focus();
    errors.firstName = false;
  }
});

lastName.addEventListener("keyup", () => {
  if (isValidName(lastName.value)) {
    errorLastName.innerText = "";
    errors.lastName = true;
  } else {
    errorLastName.innerText = "CE NOM N'EST PAS VALIDE";
    lastName.focus();
    errors.lastName = false;
  }
});

address.addEventListener("keyup", () => {
  if (isValidAddress(address.value) && isNotEmpty(address.value)) {
    errorAddress.innerText = "";
    errors.address = true;
  } else {
    errorAddress.innerText = "CETTE ADRESSE N'EST PAS VALIDE";
    address.focus();
    errors.address = false;
  }
});

city.addEventListener("keyup", () => {
  if (isValidName(city.value) && isValidCity(city.value)) {
    errorCity.innerText = "";
    errors.city = true;
  } else {
    errorCity.innerText = "CETTE VILLE N'EST PAS VALIDE";
    city.focus();
    errors.city = false;
  }
});

email.addEventListener("keyup", () => {
  if (isNotEmpty(email.value)) {
    errorEmail.innerText = "";
    errors.email = true;
  } else {
    errorEmail.innerText = "CETTE ADRESSE MAIL N4EST PAS VALIDE";
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
        console.log("serveur ok, post ok");
        window.location = `checkout.html`;
        localStorage.removeItem("cart");
      })
      .catch(function (error) {
        console.log("erreur serveur");
        errorCatchForm.innerText =
          "veuillez nous excuser, le serveur ne repond pas";
      });
  } else {
    console.log("valid false");
    errorCatchForm.innerText = "veuillez remplir tout les champs du formulaire";
  }
});
