// page produit : ecouter l'évenement click pour créer la page qui correspond ? 







const params = new URLSearchParams(window.location.search);
const id = params.get("teddy");
const url = "http://localhost:3000/api/teddies/"+id;
console.log(url)

const getOneTeddy = url => {
      return fetch(url).then(response => response.json());
    };

    const renderProducts = () => {
      getOneTeddy(url).then(teddy => {
            console.log(teddy);
            console.log(teddy.description)

            const pageProduct = document.querySelector("#pageProduct");

const product = document.createElement("div");
      product.classList.add("row");
      pageProduct.appendChild(product);

const imgProduct = document.createElement("img");
      imgProduct.classList.add("col-4");
      imgProduct.setAttribute("src", teddy.imageUrl);  
      imgProduct.setAttribute("alt", "Photo de l'ours en Peluche "+teddy.name);     
      product.appendChild(imgProduct);

const listProduct = document.createElement("div");
      listProduct.classList.add("col-6");
      product.appendChild(listProduct);

const nameProduct = document.createElement("p");
      nameProduct.innerText = teddy.name;
      listProduct.appendChild(nameProduct);
 
const priceProduct = document.createElement("p");
      priceProduct.innerText = teddy.price
      listProduct.appendChild(priceProduct);

const descriptionProduct = document.createElement("p");
      descriptionProduct.innerText = teddy.description;
      listProduct.appendChild(descriptionProduct);

const labelProduct = document.createElement("label");
      listProduct.appendChild(labelProduct);

const selectProduct = document.createElement("select");
      listProduct.appendChild(selectProduct);

(teddy.colors).forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color;
    selectProduct.appendChild(option);
});

const addToCart = document.createElement("button");
    addToCart.innerHTML = "Ajouter au panier";
    listProduct.appendChild(addToCart);
      })
    }

renderProducts();    




