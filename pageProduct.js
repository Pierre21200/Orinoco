// page produit


// on récupère l'URL de notre page actuelle, avec l'id qui nous intéresse, puis on ajoute cette id à l'url de l'API pour pouvoir travailler avec le teddy selectionné
const params = new URLSearchParams(window.location.search);
const id = params.get("teddy");
const url = "http://localhost:3000/api/teddies/"+id;

// nous renvoie une promesse par le fetch
const getOneTeddy = url => {
      return fetch(url).then(response => response.json());
    };


let localCart = JSON.parse(localStorage.getItem("cart"));

// on initie la fonction qui va nous permettre, avec la promesse renvoyée : 
const renderProducts = () => {

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
      imgProduct.setAttribute("alt", "Photo de l'ours en Peluche "+teddy.name);     
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

      (teddy.colors).forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            selectProduct.appendChild(option);
      });

      const br = document.createElement("br");
      listProduct.appendChild(br);

      const buttonAddToCart = document.createElement("button");
      buttonAddToCart.innerHTML = "AJOUTER AU PANIER";
      buttonAddToCart.classList.add("btn", "btn-outline-dark", "orinoco-font");
      buttonAddToCart.setAttribute("type","button");
      listProduct.appendChild(buttonAddToCart);

     



      // On initie la fonction permettant le stockage du tableau stringifié dans le local storage 
      
    
          // on execute la fonction lorsque l'utilisateur clique sur le bouton
          buttonAddToCart.addEventListener('click', () => {
          
            localCart = JSON.parse(localStorage.getItem("cart"));
              
            if (localCart && localCart.length > 0) {
        
              const found = localCart.find(element => element._id == teddy._id);
          
              if (found) {
                localCart.forEach(element => {
                element.quantity += 1;
                });
                localStorage.setItem("cart", JSON.stringify(localCart));
              }
              else {
              teddy = {...teddy, quantity : 1};
              localCart = [...localCart, teddy];
              localStorage.setItem("cart", JSON.stringify(localCart));
              }                  
          
            }

            else {
            teddy = {...teddy, quantity : 1};
            let localCart = [];
            localCart = [...localCart, teddy];
            localStorage.setItem("cart", JSON.stringify(localCart));     
            }  
            
          });  
          
        })
}

renderProducts();    




