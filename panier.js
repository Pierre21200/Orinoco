// on initie la fonction qui va chercher nos données dans le localstorage
const getCart = async () => {
    return await JSON.parse(localStorage.getItem("cart"))
}

// on sélectionne la div dans laquelle on va placer nos informations 
const containerCart = document.querySelector("#container-cart");
    containerCart.classList.add("container-cart", "align-items-center");

// Ligne titre du tableau
const headerCart = document.createElement("div");
    headerCart.classList.add("row", "align-items-center", "header-cart");
    containerCart.appendChild(headerCart);

const headerImg = document.createElement("h3");
    headerImg.classList.add("col-2", "text-center", "orinoco-font");
    headerImg.innerHTML = "article"; 
    headerCart.appendChild(headerImg);

const headerName = document.createElement("h3");
    headerName.classList.add("col-2", "text-center", "orinoco-font");
    headerName.innerHTML = "nom"; 
    headerCart.appendChild(headerName);

const headerDescription = document.createElement("h3");
    headerDescription.classList.add("col-4", "text-center", "orinoco-font");
    headerDescription.innerHTML = "description"; 
    headerCart.appendChild(headerDescription);

const headerPrice = document.createElement("h3");
    headerPrice.innerHTML = "prix"; 
    headerPrice.classList.add("col-2", "text-center", "orinoco-font");
    headerCart.appendChild(headerPrice);

   
const localCartLenght = JSON.parse(localStorage.getItem("cart")).length;
    const articleNumber = document.getElementById("article-number");
    articleNumber.innerText = localCartLenght;


// on initie la variable totalPrice pour éviter problème de scope           
let totalPrice = 0;


const localCart = JSON.parse(localStorage.getItem("cart")); 


// on initie la fonciton displaycart
const displayCart = async () => {

    // Qui récupère les données du local storage avec getCart, le tableau teddies 
    getCart().then(teddies => {

        // et pour chacun de ses éléments, on construit notre panier :
        teddies.forEach(teddy => {

            const cart = document.createElement("div");
            cart.classList.add("row", "align-items-center", "cart");
            cart.setAttribute("id", "cart");
            containerCart.appendChild(cart);

            const img = document.createElement("img");
            img.classList.add("col-2", "text-center");
            img.setAttribute("src", teddy.imageUrl);
            img.setAttribute("alt", teddy.name);
            img.setAttribute("style", "max-height : 150px");
            cart.appendChild(img);           

            const name = document.createElement("h2");
            name.classList.add ("orinoco-font", "col-2", "text-center");
            name.innerText = teddy.name;
            cart.appendChild(name);           

            const description = document.createElement ("p");
            description.innerText = teddy.description;
            description.classList.add("col-4", "text-center")
            cart.appendChild(description);

            const price = document.createElement("h5");
            price.classList.add("orinoco-font", "col-2", "text-center")
            price.innerText = `${teddy.price} €`;
            cart.appendChild(price);

            const containerButtonSubToCart = document.createElement("div");
            containerButtonSubToCart.classList.add('col-2', 'text-center'); 
            cart.appendChild(containerButtonSubToCart);

            const buttonSubToCart = document.createElement("button");
            buttonSubToCart.innerText = "RETIRER";
            buttonSubToCart.classList.add("btn", "btn-outline-dark", "orinoco-font", "text-center");
            buttonSubToCart.setAttribute("type","button");
            containerButtonSubToCart.appendChild(buttonSubToCart);
                         

            // fonction retirer du panier 
            const subToCart = () => {
                teddies = teddies.filter(element => element._id != teddy._id ); 
                localStorage.setItem("cart", JSON.stringify(teddies));  
                location.reload(true);
            }

            // qu'on associe au bouton subToCart
            buttonSubToCart.addEventListener('click', () => {
                subToCart();
                });  


            // incrémentation du prix            
            totalPrice += teddy.price; 
        
        });  

        // Bouton confirmer amène le formulaire
        if (localCart && localCart.length > 0) {
        const containerTotalPrice = document.createElement("div");
        containerTotalPrice.classList.add("row", "container-total-price");
        containerCart.appendChild(containerTotalPrice);

        const empty = document.createElement("div");
        empty.classList.add("col-7");
        containerTotalPrice.appendChild(empty);

        const total = document.createElement("h5");
        total.classList.add("col-1", "orinoco-font", "bold");
        total.innerText = "TOTAL";
        containerTotalPrice.appendChild(total);

        const totalPriceText = document.createElement("h5");
        totalPriceText.classList.add("col-2", "total-price", "orinoco-font", "text-center", "bold");
        totalPriceText.innerText = `${totalPrice} €`; 
        containerTotalPrice.appendChild(totalPriceText); 

        const containerButtonToConfirm = document.createElement("div");
        containerButtonToConfirm.classList.add("col-2", "text-center");
        containerTotalPrice.appendChild(containerButtonToConfirm);
    
        const buttonToConfirm = document.createElement("button");
        buttonToConfirm.classList.add("btn", "btn-outline-dark", "orinoco-font", "bold", "btn-confirm");
        buttonToConfirm.innerText = "CONFIRMER";
        containerButtonToConfirm.appendChild(buttonToConfirm);


        const getForm = () => {
            const form = document.getElementById("form");
            form.setAttribute("style", "visibility : visible");
        }

        buttonToConfirm.addEventListener('click', () => {
            getForm();        
            });     
        }
    
        else {
        const body = document.getElementById("container-cart"); 
        const emptyCart = document.createElement("p");
        emptyCart.classList.add("col-12", "orinoco-font", "bold", "text-center", "empty-cart")
        emptyCart.innerText = "VOTRE PANIER EST VIDE";
        body.appendChild(emptyCart);
        }
    })

    const buttonSubmit = document.getElementById("submit");

    buttonSubmit.addEventListener('click', () => {
        sendContact();          
        });

    const sendContact = () => {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const adress = document.getElementById("adress");
    const city = document.getElementById("city");
    const email = document.getElementById("email");

    const contact = {
        firstName : firstName.value,
        lastName : lastName.value,
        adress : adress.value,
        city : city.value,
        email : email.value
    };

    const cartInformation = [
        localCart, 
        contact
    ];

    console.log(cartInformation);

    // localStorage.setItem("contact",JSON.stringify(contact))

    }
    

    // envoi des données au serveur
    // on initie postData
    const postData = async (method, url, dataElt) => {
        const response = await fetch(url, {
            headers: {
                'Content-type' : 'application/json'

            },
            method,
            body: JSON.stringify(dataElt)
        })
        return await response.json();
    }

    // const response = await postData('POST', 'http://localhost:3000/api/teddies/order', contact)

};


displayCart();


