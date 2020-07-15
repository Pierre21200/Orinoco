// desole les commentaires sont sans accents, c'est la galere avec mon clavier

// la function retourne juste la promesse renvoye par le fetch
const getteddies = url => {
  return fetch(url).then(response => response.json());
};

// l'url appelle dans la function getteddies
const url = "http://localhost:3000/api/teddies";

// on selectionne d'abord l'element du dom ou l'on va ajoute tous nos elements
const products = document.querySelector("#product-item");

// function permettant de cree nos produits et les ajouter a l'element principale du dom qui est en l'ocurence products (ligne 10)
// pour exectuer la function il faut l'appeler, voir plus bas
const renderProducts = () => {
  // appelle de la function getteddies afin de l'executer
  getteddies(url).then(teddies => {     // teddies = response ? 
    // ouvre ta console
    console.log("liste des teddies: ", teddies); // teddies = response ? 

    // on itere sur le tableau de teddies renvoye par le backend
    teddies.forEach((teddy, index) => { // teddy = element du tableau ? 
      // ouvre ta console
      console.log(`teddy numero ${index}: `, teddy);

      // on cree la div principale qui contiendra tous les sous elements
      const divCard = document.createElement("div");
      divCard.setAttribute("id", teddy._id);
      divCard.classList.add("card");

      // on créé la carte et ses éléments 
      const divCardBody = document.createElement("div");
      divCardBody.classList.add("card-body");
      divCard.appendChild(divCardBody);

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.setAttribute("src", teddy.imageUrl);
      img.setAttribute("alt", teddy.name);
      divCardBody.appendChild(img);

      const name = document.createElement("h5");
      name.classList.add("card-title");
      divCardBody.appendChild(name);    
      name.innerHTML = teddy.name;
      
      const price = document.createElement("p");
      price.classList.add("card-text");
      divCardBody.appendChild(price);
      price.innerHTML = teddy.price;

      const a = document.createElement("a");
      a.setAttribute("href", `page-produit.html?teddy=${teddy._id}`); // 
      divCardBody.appendChild(a); 

      const buttonCard = document.createElement("button");
      buttonCard.classList.add("btn", "btn-primary");
      buttonCard.setAttribute("type","button");
      
      buttonCard.innerText = "Sélectionner";
      a.appendChild(buttonCard);
    
      

      //  on ajoute la div principale a l'élément du dom selectionné plus tot (ligne 10)
      products.appendChild(divCard);

      
    });
  });
};

// appelle de la function afin de l'executer
renderProducts();





