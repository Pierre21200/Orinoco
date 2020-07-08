
fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(data => console.log(data));



  const card1 = document.getElementById('teddy1');

  const teddy1 = document.getElementById('5be9c8541c9d440000665243');
  teddy1.innerHTML = data;



  var myImage = document.querySelector('.my-image');
  fetch('flowers.jpg').then(function(response) {
    return response.blob();
  }).then(function(blob) {
    var objectURL = URL.createObjectURL(blob);
    myImage.src = objectURL;
  });

