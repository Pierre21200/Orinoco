// on initie la fonction qui va chercher nos données dans le localstorage
const getCart = async () => {
  return await JSON.parse(localStorage.getItem("cart"));
};

// variables affichant le nombre d'article
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;

// on sélectionne la div dans laquelle on va placer nos informations
const containerCart = document.querySelector("#container-cart");
containerCart.classList.add("container-cart", "align-items-center");

// Ligne titre du tableau
const headerCart = document.createElement("div");
headerCart.classList.add("row", "align-items-center", "header-cart");
containerCart.appendChild(headerCart);

const headerImg = document.createElement("h3");
headerImg.classList.add("col-2", "text-center", "orinoco-font");
headerImg.innerHTML = "article";
headerCart.appendChild(headerImg);

const headerName = document.createElement("h3");
headerName.classList.add("col-2", "text-center", "orinoco-font");
headerName.innerHTML = "nom";
headerCart.appendChild(headerName);

const headerDescription = document.createElement("h3");
headerDescription.classList.add("col-4", "text-center", "orinoco-font");
headerDescription.innerHTML = "description";
headerCart.appendChild(headerDescription);

// const labelHeaderQuantity = document.createElement("label");
// labelHeaderQuantity.setAttribute("for","quantity");
// labelHeaderQuantity.classList.add("col-1");
// headerCart.appendChild(labelHeaderQuantity);

const headerQuantity = document.createElement("h3");
headerQuantity.classList.add("col-1", "text-center", "orinoco-font");
headerQuantity.innerHTML = "quantite";
headerCart.appendChild(headerQuantity);

const headerPrice = document.createElement("h3");
headerPrice.innerHTML = "prix";
headerPrice.classList.add("col-1", "text-center", "orinoco-font");
headerCart.appendChild(headerPrice);

// on initie les variables pour éviter problème de scope
let totalPrice = 0;

let localCart = JSON.parse(localStorage.getItem("cart"));

// on initie la fonciton displaycart
const displayCart = async () => {
  if (localCart && localCart.length > 0) {
    localCart.forEach(element => {
      articleNumberText += element.quantity;
      articleNumber.innerText = articleNumberText;
    });

    getCart().then(teddies => {
      // et pour chacun de ses éléments, on construit notre panier :
      teddies.forEach(teddy => {
        const cart = document.createElement("div");
        cart.classList.add("row", "align-items-center", "cart");
        cart.setAttribute("id", "cart");
        containerCart.appendChild(cart);

        const img = document.createElement("img");
        img.classList.add("col-2", "text-center");
        img.setAttribute("src", teddy.imageUrl);
        img.setAttribute("alt", teddy.name);
        img.setAttribute("style", "max-height : 150px");
        cart.appendChild(img);

        const name = document.createElement("h2");
        name.classList.add("orinoco-font", "col-2", "text-center");
        name.innerText = teddy.name;
        cart.appendChild(name);

        const description = document.createElement("p");
        description.innerText = teddy.description;
        description.classList.add("col-4", "text-center");
        cart.appendChild(description);

        const containerQuantity = document.createElement("div");
        containerQuantity.classList.add("col-1");
        cart.appendChild(containerQuantity);

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

        const quantity = document.createElement("p");
        quantity.innerText = `${teddy.quantity} `;
        containerQuantity.appendChild(quantity);

        const price = document.createElement("h5");
        price.classList.add("orinoco-font", "col-1", "text-center");
        let teddyPriceQuantity = teddy.price * teddy.quantity;
        price.innerText = `${teddyPriceQuantity} €`;
        cart.appendChild(price);

        const containerButtonSubToCart = document.createElement("div");
        containerButtonSubToCart.classList.add("col-2", "text-center");
        cart.appendChild(containerButtonSubToCart);

        // incrémentation du prix
        totalPrice += teddyPriceQuantity;

        const buttonSubToCart = document.createElement("button");
        buttonSubToCart.innerText = "RETIRER";
        buttonSubToCart.classList.add(
          "btn",
          "btn-outline-dark",
          "orinoco-font",
          "text-center"
        );
        buttonSubToCart.setAttribute("type", "button");
        containerButtonSubToCart.appendChild(buttonSubToCart);

        // bouton subToCart
        buttonSubToCart.addEventListener("click", () => {
          if (teddy.quantity > 1) {
            teddy.quantity -= 1;

            localStorage.setItem("cart", JSON.stringify(teddies));
            localCart = JSON.parse(localStorage.getItem("cart"));

            quantity.innerText = teddy.quantity;
            teddyPriceQuantity = teddy.price * teddy.quantity;
            price.innerText = `${teddyPriceQuantity} €`;

            totalPrice -= teddy.price;
            totalPriceText.innerText = `${totalPrice} €`;
          } else {
            teddies = teddies.filter(element => element._id != teddy._id);
            localStorage.setItem("cart", JSON.stringify(teddies));
            localCart = JSON.parse(localStorage.getItem("cart"));
            containerCart.removeChild(cart);
            totalPrice -= teddy.price;
            totalPriceText.innerText = `${totalPrice} €`;
          }

          localCart = JSON.parse(localStorage.getItem("cart"));

          if (localCart.length === 0) {
            containerCart.removeChild(containerTotalPrice);
            containerCart.removeChild(clearCart);

            const body = document.getElementById("container-cart");
            const emptyCart = document.createElement("p");
            emptyCart.classList.add(
              "col-12",
              "orinoco-font",
              "bold",
              "text-center",
              "empty-cart"
            );
            emptyCart.innerText = "votre panier est vide";
            body.appendChild(emptyCart);

            const linkToHome = document.createElement("a");
            linkToHome.classList.add("link-to-home");
            linkToHome.setAttribute("href", "index.html");
            containerCart.appendChild(linkToHome);

            const containerButtonToHome = document.createElement("div");
            containerButtonToHome.classList.add("container-button-home");
            linkToHome.appendChild(containerButtonToHome);

            const buttonToHome = document.createElement("button");
            buttonToHome.classList.add(
              "btn",
              "btn-outline-dark",
              "orinoco-font",
              "bold",
              "center-text"
            );
            buttonToHome.innerHTML = "<h3>acceuil</h3>";
            containerButtonToHome.appendChild(buttonToHome);
          }

          articleNumberText -= 1;
          articleNumber.innerText = articleNumberText;
        });
      });

      const containerTotalPrice = document.createElement("div");
      containerTotalPrice.classList.add("row", "container-total-price");
      containerCart.appendChild(containerTotalPrice);

      const emptyTotalPrice = document.createElement("div");
      emptyTotalPrice.classList.add("col-8");
      containerTotalPrice.appendChild(emptyTotalPrice);

      const total = document.createElement("h5");
      total.classList.add("col-1", "orinoco-font", "bold");
      total.innerText = "TOTAL";
      containerTotalPrice.appendChild(total);

      const totalPriceText = document.createElement("h5");
      totalPriceText.classList.add(
        "col-1",
        "total-price",
        "orinoco-font",
        "text-center",
        "bold"
      );
      totalPriceText.innerText = `${totalPrice} €`;
      containerTotalPrice.appendChild(totalPriceText);

      const containerButtonToConfirm = document.createElement("div");
      containerButtonToConfirm.classList.add("col-2", "text-center");
      containerTotalPrice.appendChild(containerButtonToConfirm);

      const buttonToConfirm = document.createElement("button");
      buttonToConfirm.classList.add(
        "btn",
        "btn-outline-dark",
        "orinoco-font",
        "bold",
        "btn-confirm"
      );
      buttonToConfirm.innerText = "CONFIRMER";
      containerButtonToConfirm.appendChild(buttonToConfirm);

      buttonToConfirm.addEventListener("click", () => {
        const form = document.getElementById("form");
        form.setAttribute("style", "display : block");
      });

      const clearCart = document.createElement("div");
      clearCart.classList.add("row", "clear-cart");
      containerCart.appendChild(clearCart);

      const emptyClear = document.createElement("div");
      emptyClear.classList.add("col-5");
      clearCart.appendChild(emptyClear);

      const buttonClearCart = document.createElement("button");
      buttonClearCart.classList.add(
        "btn",
        "btn-outline-dark",
        "orinoco-font",
        "bold",
        "btn-clear",
        "col-2"
      );
      buttonClearCart.innerText = "VIDER LE PANIER";
      clearCart.appendChild(buttonClearCart);

      buttonClearCart.addEventListener("click", () => {
        let localCart = [];
        localStorage.setItem("cart", JSON.stringify(localCart));

        containerCart.removeChild(cart);
        containerCart.removeChild(containerTotalPrice);
        containerCart.removeChild(clearCart);
        form.setAttribute("style", "display : none");

        const body = document.getElementById("container-cart");
        const emptyCart = document.createElement("p");
        emptyCart.classList.add(
          "col-12",
          "orinoco-font",
          "bold",
          "text-center",
          "empty-cart"
        );
        emptyCart.innerText = "votre panier est vide";
        body.appendChild(emptyCart);
        articleNumber.innerText = 0;

        const linkToHome = document.createElement("a");
        linkToHome.classList.add("link-to-home");
        linkToHome.setAttribute("href", "index.html");
        containerCart.appendChild(linkToHome);

        const containerButtonToHome = document.createElement("div");
        containerButtonToHome.classList.add("container-button-home");
        linkToHome.appendChild(containerButtonToHome);

        const buttonToHome = document.createElement("button");
        buttonToHome.classList.add(
          "btn",
          "btn-outline-dark",
          "orinoco-font",
          "bold",
          "center-text"
        );
        buttonToHome.innerHTML = "<h3>acceuil</h3>";
        containerButtonToHome.appendChild(buttonToHome);
      });
    });
  } else {
    const body = document.getElementById("container-cart");
    const emptyCart = document.createElement("p");
    emptyCart.classList.add(
      "col-12",
      "orinoco-font",
      "bold",
      "text-center",
      "empty-cart"
    );
    emptyCart.innerText = "votre panier est vide";
    body.appendChild(emptyCart);
    articleNumber.innerText = 0;

    const linkToHome = document.createElement("a");
    linkToHome.classList.add("link-to-home");
    linkToHome.setAttribute("href", "index.html");
    containerCart.appendChild(linkToHome);

    const containerButtonToHome = document.createElement("div");
    containerButtonToHome.classList.add("container-button-home");
    linkToHome.appendChild(containerButtonToHome);

    const buttonToHome = document.createElement("button");
    buttonToHome.classList.add(
      "btn",
      "btn-outline-dark",
      "orinoco-font",
      "bold",
      "center-text"
    );
    buttonToHome.innerHTML = "<h3>acceuil</h3>";
    containerButtonToHome.appendChild(buttonToHome);
  }

  // Qui récupère les données du local storage avec getCart, le tableau teddies

  const buttonSubmit = document.getElementById("submit");

  // on peut faire ça mieux avec target si j'ai bien compris
  buttonSubmit.addEventListener("click", () => {
    event.preventDefault();

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const adress = document.getElementById("adress");
    const city = document.getElementById("city");
    const email = document.getElementById("email");

    const errorFirstName = document.getElementById("error-firstName");
    const errorLastName = document.getElementById("error-lastName");
    const errorAdress = document.getElementById("error-adress");
    const errorCity = document.getElementById("error-city");
    const errorEmail = document.getElementById("error-email");

    const isNotEmpty = value => (value !== "" ? true : false);

    const containNumber = /[0-9]/;
    const doNotContainNumber = value =>
      !value.match(containNumber) ? true : false;

    const specialCharacter = /^[!@#$%^&*(),.'-_§?":{}|<>]+$/;
    const doNotContainSpecialCharacter = value =>
      !value.match(specialCharacter) ? true : false;

    const regexMail = /#^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$#/;
    const isValidEmail = value => (!value.match(regexMail) ? true : false);

    const isValidName = value =>
      isNotEmpty(value) &&
      doNotContainNumber(value) &&
      doNotContainSpecialCharacter(value);

    if (isValidName(firstName.value)) {
      errorFirstName.innerText = "";
      console.log("coucou");
    } else {
      errorFirstName.innerText = "Veuillez renseigner votre prénom";
      // firstName.focus(); quel focus ?
      console.log("pas coucou");
    }

    if (isValidName(lastName.value)) {
      errorFirstName.innerText = "";
      console.log("coucou");
    } else {
      errorLastName.innerText = "Veuillez renseigner votre nom";
      //lastName.focus(); quel focus ?
      console.log("pas coucou");
    }

    if (isValidName(city.value)) {
      errorCityName.innerText = "";
      console.log("coucou");
    } else {
      errorCity.innerText = "Veuillez renseigner votre nom";
      //lastName.focus(); quel focus ?
      console.log("pas coucou");
    }

    if (isValidEmail(email.value) && isNotEmpty(email.value)) {
      errorEmail.innerText = "";
      console.log("coucou");
    } else {
      errorEmail.innerText = "Veuillez renseigner votre nom";
      //lastName.focus(); quel focus ?
      console.log("pas coucou");
    }
  });

  // envoi des données au serveur
  // on initie postData
  // const postData = async (method, url, dataElt) => {
  //     const response = await fetch(url, {
  //         headers: {
  //             'Content-type' : 'application/json'

  //         },
  //         method,
  //         body: JSON.stringify(dataElt)
  //     })
  //     return await response.json();
  // }

  // const response = await postData('POST', 'http://localhost:3000/api/teddies/order', contact)
  console.log(totalPrice);
};

displayCart();
