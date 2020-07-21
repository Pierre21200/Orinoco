// page produit


// on récupère l'URL de notre page actuelle, avec l'id qui nous intéresse, puis on ajoute cette id à l'url de l'API pour pouvoir travailler avec le teddy selectionné
const params = new URLSearchParams(window.location.search);
const id = params.get("teddy");
const url = "http://localhost:3000/api/teddies/"+id;

// nous renvoie une promesse par le fetch
const getOneTeddy = url => {
      return fetch(url).then(response => response.json());
    };

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



      // on stocke dans un tableau le teddy selectionné
      const product = [teddy.imageUrl, teddy.name, teddy.description, teddy.price]; 
    
      // on stringify les clés et les valeurs
      const stringTeddyName = JSON.stringify(teddy.name);
      const stringProduct = JSON.stringify(product);

      // On initie la fonction permettant le stockage du tableau stringifié dans le local storage 
      const addToCart = teddy => {
            localStorage.setItem(stringTeddyName, stringProduct);
          };
    
          const darkButton = () => {
          // Pour que le bouton reste noir quand on ajoute l'article au panier 
          buttonAddToCart.innerText = "L'ARTICLE A BIEN ETE AJOUTE AU PANIER !";
          buttonAddToCart.classList.remove("btn-outline-dark");
          buttonAddToCart.classList.add("btn-dark");
    
          // Pour que le bouton mene à la page panier
          const linkAddToCart = document.createElement("a");
          linkAddToCart.setAttribute("href", "panier.html");
          linkAddToCart.classList.add("text-center"); 
          listProduct.appendChild(linkAddToCart); 
          linkAddToCart.appendChild(buttonAddToCart);
          }
    
          // on execute la fonction lorsque l'utilisateur clique sur le bouton
          buttonAddToCart.addEventListener('click', () => {
          addToCart();
          darkButton();      
          });  
          
      })
}

renderProducts();    




