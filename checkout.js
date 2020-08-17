// on récupère infos du storage
const data = JSON.parse(localStorage.getItem("data"));
const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

// on veut afficher le prix total, un id de commande, et le prénom du contact !
const section = document.getElementById("section");

const containerThank = document.createElement("div");
containerThank.classList.add("container-thank");
section.appendChild(containerThank);

const thank = document.createElement("p");
thank.classList.add("orinoco-font", "bold");
thank.innerHTML = `NOUS VOUS CONFIRMONS VOTRE COMMANDE NUMERO <span class = font-default>${data.orderId}</span><br> POUR LA SOMME DE ${totalPrice} €.<br> MERCI POUR VOTRE COMMANDE !`;
containerThank.appendChild(thank);
