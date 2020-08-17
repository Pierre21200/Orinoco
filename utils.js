// Variables
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));

// afficher nombre d'article dans le panier dans le header
const headerArticleNumber = () => {
  if (localCart && localCart.length > 0) {
    localCart.forEach(element => {
      articleNumberText += element.quantity;
      articleNumber.innerText = articleNumberText;
    });
  } else {
    articleNumber.innerText = 0;
  }
};

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

// emptyCart
// faire une fonction emptyCart
