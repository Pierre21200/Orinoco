// Variables
let localCart = JSON.parse(localStorage.getItem("cart"));
let articleNumber = document.getElementById("article-number");
let articleNumberText = 0;
articleNumber.innerText = articleNumberText;

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

const containerBackToHome = document.createElement("div");
containerBackToHome.classList.add("row");
section.appendChild(containerBackToHome);

const emptyBackToHome = document.createElement("div");
emptyBackToHome.classList.add("col-5");
containerBackToHome.appendChild(emptyBackToHome);

const backToHome = document.createElement("button");
backToHome.innerText = "RETOUR A L'ACCEUIL";
backToHome.classList.add(
  "text-center",
  "btn",
  "btn-outline-dark",
  "orinoco-font",
  "bold",
  "btn-clear",
  "col-2"
);
containerBackToHome.appendChild(backToHome);

backToHome.addEventListener("click", () => {
  console.log("coucou");
  localStorage.clear();
  window.location = `../../index.html`;
});
