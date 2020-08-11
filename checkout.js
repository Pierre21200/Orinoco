// on récupère des infos dans notre URL
const params = new URLSearchParams(window.location.search);
const firstName = params.get("firstName");
const totalPrice = params.get("totalPrice");

// on veut afficher le prix total, un id de commande, et le prénom du contact !

const section = document.getElementById("section");

const thank = document.createElement("p");
thank.innerText = `Nous confirmons votre commande numéro ... pour la somme de ${totalPrice} €. Merci pour votre commande ${firstName} !`;
section.appendChild(thank);

const getApiOrder = url => {
  return fetch(url).then(response => response.json());
};

// getteddies, voir .catch, remettre dans une fonction normale

// l'url appelé dans la fonction getteddies
const url = "http://localhost:3000/api/teddies/order";

console.log(url);

// getApiOrder(url).then(orders => {
//   orders.forEach(order => {
//     console.log(order);
//   });
// });
