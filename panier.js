// 
const getCart = async (index) => {
    return await JSON.parse(localStorage.getItem(localStorage.key(index)))
}

const containerCart = document.querySelector("#container-cart");
            containerCart.classList.add("container-cart", "align-items-center");

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

            

const displayCart = async () => {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let totalPrice = 0;

            const product = await getCart(i);
            const teddyImg = product[0];
            const teddyName = product[1]; 
            const teddyDescription = product[2];
            const teddyPrice = product [3];

            const cart = document.createElement("div");
            cart.classList.add("row", "align-items-center", "cart");
            containerCart.appendChild(cart);

            const img = document.createElement("img");
            img.classList.add("col-2", "text-center");
            img.setAttribute("src", teddyImg);
            img.setAttribute("alt", teddyName);
            img.setAttribute("style", "max-height : 150px", "text-center");
            cart.appendChild(img);           

            const name = document.createElement("h2");
            name.classList.add ("orinoco-font", "col-2", "text-center");
            name.innerText = teddyName;
            cart.appendChild(name);           

            const description = document.createElement ("p");
            description.innerText = teddyDescription;
            description.classList.add("col-4", "text-center")
            cart.appendChild(description);

            const price = document.createElement("h5");
            price.classList.add("orinoco-font", "col-2", "text-center")
            price.innerText = `${teddyPrice} €`;
            cart.appendChild(price);

            const containerButtonSubToCart = document.createElement("div");
            containerButtonSubToCart.classList.add('col-2', 'text-center'); 
            cart.appendChild(containerButtonSubToCart);

            const buttonSubToCart = document.createElement("button");
            buttonSubToCart.innerText = "RETIRER";
            buttonSubToCart.classList.add("btn", "btn-outline-dark", "orinoco-font", "text-center");
            buttonSubToCart.setAttribute("type","button");
            containerButtonSubToCart.appendChild(buttonSubToCart);
            const stringTeddyName = JSON.stringify(teddyName);   
            

            

            // fonction retirer du panier 
            buttonSubToCart.addEventListener('click', () => {
            console.log(stringTeddyName)
            localStorage.removeItem(stringTeddyName);
            location.reload(true);      
              });



        }
    } else {
        console.log("Le panier est vide !")
    }


    

    let totalPrice = 0; 
    for (let i = 0; i < localStorage.length; i++) {
        const product = await getCart(i);
        const teddyPrice = product [3];
        totalPrice += teddyPrice; 
        console.log(totalPrice);
    }
    
    // Total prix
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
            
}

displayCart();


