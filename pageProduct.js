// page produit : ecouter l'évenement click pour créer la page qui correspond ? 



let objetProduit = JSON.stringify(window.localStorage.getItem("productDetails"));

console.log(objetProduit);











const pageProduct = document.querySelector("#pageProduct");

const product = document.createElement("div");
      product.classList.add("row");
      pageProduct.appendChild(product);

const imgProduct = document.createElement("div");
      imgProduct.classList.add("col-4");
      product.appendChild(imgProduct);

const listProduct = document.createElement("div");
      listProduct.classList.add("col-6");
      product.appendChild(listProduct);

const nameProduct = document.createElement("p");
      listProduct.appendChild(nameProduct);
 
const priceProduct = document.createElement("p");
      listProduct.appendChild(priceProduct);

const descriptionProduct = document.createElement("p");
      listProduct.appendChild(descriptionProduct);

const labelProduct = document.createElement("label");
      listProduct.appendChild(labelProduct);

const selectProduct = document.createElement("select");
      listProduct.appendChild(selectProduct);

// colors.forEach(color => {
//     const option = document.createElement('option');
//     option.value = productColor;
//     option.textContent = productColor;
//     select.appendChild(option);
// });

const addToCart = document.createElement("button");
    addToCart.innerHTML = "Ajouter au panier";
    listProduct.appendChild(addToCart);


