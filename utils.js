// afficher nombre d'article dans le panier dans le header

if (localCart && localCart.length > 0) {
  localCart.forEach(element => {
    articleNumberText += element.quantity;
    articleNumber.innerText = articleNumberText;
  });
} else {
  articleNumber.innerText = 0;
}

// fonction de création d'élément : à revoir cependant !
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

// addToCart
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

fetch("flowers.jpg")
  .then(function (response) {
    if (response.ok) {
      response.blob().then(function (myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
      });
    } else {
      console.log("Mauvaise réponse du réseau");
    }
  })
  .catch(function (error) {
    console.log(
      "Il y a eu un problème avec l'opération fetch: " + error.message
    );
  });
