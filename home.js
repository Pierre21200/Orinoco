// desole les commentaires sont sans accents, c'est la galere avec mon clavier

// la function retourne juste la promesse renvoye par le fetch
const getTeddies = url => {
  return fetch(url).then(response => response.json());
};

// l'url appelle dans la function getTeddies
const url = "http://localhost:3000/api/teddies";

// on selectionne d'abord l'element du dom ou l'on va ajoute tous nos elements
const products = document.querySelector("#product-item");

// function permettant de cree nos produits et les ajouter a l'element principale du dom qui est en l'ocurence products (ligne 10)
// pour exectuer la function il faut l'appeler, voir plus bas
const renderProducts = () => {
  // appelle de la function getTeddies afin de l'executer
  getTeddies(url).then(teddies => {
    // ouvre ta console
    console.log("liste des teddies: ", teddies);

    // on itere sur le tableau de teddies renvoye par le backend
    teddies.forEach((teddy, index) => {
      // ouvre ta console
      console.log(`teddy numero ${index}: `, teddy);

      // on cree la div principale qui contiendra tous les sous elements
      const divCard = document.createElement("div");
      divCard.setAttribute("id", teddy._id);

      // ceci est un premier element en l'ocurence l'affichage du nom
      const name = document.createElement("p");
      name.classList.add("name");
      name.innerHTML = teddy.name;

      // on ajoute le nom a la div principale
      divCard.appendChild(name);

      // il suffit de faire la meme chose pour tous les autres elements

      //  on ajoute la div principale a l'element du dom selectionne plus tot (ligne 10)
      products.appendChild(divCard);
    });
  });
};

// appelle de la function afin de l'executer
renderProducts();

// function renderProduct(productName, productId, productImg, productPrice) {
//   const products = document.querySelector("#product-item");
//   const section = document.createElement("section");
//   products.appendChild(section);
//   section.innerHTML = '<img alt="${productName}" src="${productImg}">';
//   ('<h6 class="product-title">${productName}</h6>');
//   ('<p class="price">${productPrice / 100} € </p>');
//   ('<button class="site-btn btn-line" type="button"><a href="product.html?id=${productId}">Sélectionner</a> </button>');
// }

// const displayProducts = async () => {
//   const products = await getTeddies(url);
//   products.forEach(product => {
//     renderProduct(productName, product._id, product.imageUrl, product.price);
//   });
// };
