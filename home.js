// Page d'acceuil

// La fonction getteddies nous retourne la promesse renvoye par le fetch !!!! mettre en avant avantages de fetch par rapport a ancienne requete
const getTeddies = url => {
  return fetch(url).then(response => response.json());
};

// l'url appelé dans la fonction getteddies
const url = "http://localhost:3000/api/teddies";

// On selectionne l'élément du dom ou l'on va ajoute tous nos elements
const products = document.querySelector("#product-item");

// La fonction renderProducts permet :
const renderProducts = () => {
  // D'appeller la function getteddies afin de l'executer
  getTeddies(url).then(teddies => { 
  
    // Elle affiche dans la console les éléments du tableau récupérés
    console.log("liste des teddies: ", teddies); 

    // On itere sur le tableau de teddies, pour chaque élément du tableau on va : 
    teddies.forEach((teddy, index) => { 
      // L'afficher dans la console, accompagné de son index
      console.log(`teddy numero ${index}: `, teddy);

      // Créer la div principale de l'élément qui contiendra tous les sous elements
      const card = document.createElement("div");
      card.setAttribute("id", teddy._id);
      card.classList.add("card");

      // Créer la carte
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "row", "align-items-center");
      card.appendChild(cardBody);

      // Div de l'image
      const containerImage = document.createElement("div");
      containerImage.classList.add("col-6");
      cardBody.appendChild(containerImage);

      // L'image
      const imageProduct = document.createElement("img");
      imageProduct.classList.add("card-img-top", "text-center");
      imageProduct.setAttribute("src", teddy.imageUrl);
      imageProduct.setAttribute("alt", `¨Photo de l'ours en peluche ${teddy.name}`);
      containerImage.appendChild(imageProduct);

      // Div des détails
      const containerDetails = document.createElement("div");
      containerDetails.classList.add("col-6", "text-center");
      cardBody.appendChild(containerDetails);

      // Le nom
      const nameProduct = document.createElement("h2");
      nameProduct.classList.add("card-title", "text-center", "orinoco-font");  
      nameProduct.innerHTML = teddy.name;
      containerDetails.appendChild(nameProduct); 

      // Le prix
      const priceProduct = document.createElement("h5");
      priceProduct.classList.add("card-text", "text-center", "orinoco-font");
      containerDetails.appendChild(priceProduct);
      priceProduct.innerHTML =  `${teddy.price} €`;

      // Le lien qui va mener à la page produit individuel
      const linkProduct = document.createElement("a");
      linkProduct.setAttribute("href", `page-produit.html?teddy=${teddy._id}`);
      containerDetails.appendChild(linkProduct); 

      // Accompagné du bouton
      const buttonToProduct = document.createElement("button");
      buttonToProduct.classList.add("btn", "btn-outline-dark", "orinoco-font");
      buttonToProduct.setAttribute("type","button");
      buttonToProduct.innerText = "PERSONNALISER";
      linkProduct.appendChild(buttonToProduct);

      // Accompagné du bouton
      const buttonAddToCart = document.createElement("button");
      buttonAddToCart.classList.add("btn", "btn-outline-dark", "orinoco-font", "btn-home");
      buttonAddToCart.setAttribute("type","button");
      buttonAddToCart.innerText = "AJOUTER AU PANIER";
      containerDetails.appendChild(buttonAddToCart);

      //  On ajoute alors la div principale a l'élément du dom selectionné plus tot (ligne 10)
      products.appendChild(card);

      


      

      
    


      // on execute la fonction lorsque l'utilisateur clique sur le bouton
      buttonAddToCart.addEventListener('click', () => {

        localCart = localStorage.getItem("cart");
      
        
        if (localCart && localCart.length > 0) {
        // const found = localCart.find(element => element._id == teddy._id);
          localCart = JSON.parse(localStorage.getItem("cart"));
          localCart = [...localCart, teddy];
          localStorage.setItem("cart", JSON.stringify(localCart));
        }

        else {
          console.log("pas de cart");
          let localCart = [];
          localCart = [...localCart, teddy];
          localStorage.setItem("cart", JSON.stringify(localCart));     
        }    


      });  
    
    });
  });   
};

// Finalement, on execute la fonction
renderProducts();

