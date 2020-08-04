// Page d'acceuil

// La fonction getteddies nous retourne la promesse renvoye par le fetch !!!! mettre en avant avantages de fetch par rapport a ancienne requete
const getTeddies = url => {
  return fetch(url).then(response => response.json());
};

// l'url appelé dans la fonction getteddies
const url = "http://localhost:3000/api/teddies";

// On selectionne l'élément du dom ou l'on va ajoute tous nos elements
const products = document.querySelector("#product-item");

// variables affichant le nombre d'article 
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;


let localCart = JSON.parse(localStorage.getItem("cart"));


// La fonction renderProducts permet :
const renderProducts = () => {

  if (localCart && localCart.length > 0) {
    localCart.forEach(element => {
      articleNumberText += element.quantity;
      articleNumber.innerText = articleNumberText;
    });
  } else {
    articleNumber.innerText = 0;
  }
  

  // D'appeller la function getteddies afin de l'executer
  getTeddies(url).then(teddies => { 

    // On itere sur le tableau de teddies, pour chaque élément du tableau on va : 
    teddies.forEach((teddy, index) => {

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
      buttonAddToCart.setAttribute("data-toggle","modal");
      buttonAddToCart.setAttribute("data-target","#addToCart");
      buttonAddToCart.innerText = "AJOUTER AU PANIER";
      containerDetails.appendChild(buttonAddToCart);



      // Modal addtocart
      const modal = document.createElement("div");
      modal.classList.add("modal","fade");
      modal.setAttribute("id","addToCart");
      containerDetails.appendChild(modal);

      const modalDialog = document.createElement("div");
      modalDialog.classList.add("modal-dialog", "modal-sm");
      modal.appendChild(modalDialog);

      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");
      modalDialog.appendChild(modalContent);

      const modalBody = document.createElement("div");
      modalBody.classList.add("modal-body");
      modalBody.innerHTML = `<h5>L'article a bien été ajouté au panier </h5>`;
      modalContent.appendChild(modalBody);

      const modalFooter = document.createElement("div");
      modalFooter.classList.add("modal-footer", "raw");
      modalContent.appendChild(modalFooter);





      const buttonFooterHome = document.createElement("button");
      buttonFooterHome.classList.add("button-footer-home", "btn", "btn-primary");
      buttonFooterHome.setAttribute("data-dismiss", "modal");
      buttonFooterHome.innerHTML = `<h6>Rester</h6>`;
      modalFooter.appendChild(buttonFooterHome);


      const linkCart = document.createElement("a");
      linkCart.setAttribute("href","panier.html");
      modalFooter.appendChild(linkCart);

      const buttonFooterCart = document.createElement("button");
      buttonFooterCart.classList.add("button-footer-cart", "btn","btn-primary");
      buttonFooterCart.innerHTML = `<h6>Panier</h6>`;
      linkCart.appendChild(buttonFooterCart);



      //  On ajoute alors la div principale a l'élément du dom selectionné plus tot (ligne 10)
      products.appendChild(card);
      
      // on execute la fonction lorsque l'utilisateur clique sur le bouton
      buttonAddToCart.addEventListener('click', () => {

        localCart = JSON.parse(localStorage.getItem("cart"));

        if (localCart && localCart.length > 0) {
  
          const found = localCart.find(element => element._id == teddy._id);
          
          if (found) {
            found.quantity +=1;
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

        articleNumberText += 1; 
        articleNumber.innerText = articleNumberText;


        

     

      });            
    });
  }); 
  

  
    



};

// Finalement, on execute la fonction
renderProducts();

