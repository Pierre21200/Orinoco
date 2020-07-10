fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(data => console.log(data))
// # 

// const url = 'http://localhost:3000/api/teddies'
// const getTeddies = async (url) => {
//   const response = await fetch(url);
//   return await response.json();
// }



function renderProduct (productName, productId, productImg, productPrice) {
  const products = document.querySelector('#product-item');
  const section = document.createElement('section');
  products.appendChild(section);
  section.innerHTML = '<img alt="${productName}" src="${productImg}">' 
  '<h6 class="product-title">${productName}</h6>'
  '<p class="price">${productPrice / 100} € </p>'
  '<button class="site-btn btn-line" type="button"><a href="product.html?id=${productId}">Sélectionner</a> </button>'
}

const displayProducts = async () => {
  const products = await getTeddies(url)
  products.forEach(product => {
    renderProduct(productName, product._id, product.imageUrl, product.price);
  });
}


