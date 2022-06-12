const storageBox = {};

fetch('http://localhost:3000/menu')
  .then((res) => res.json())
  .then((data) => {
    const foodImage = document.querySelector('#dish-image');
    foodImage.src = data[0].image;
    const foodName = document.querySelector('#dish-name');
    foodName.innerText = data[0].name;
    const foodDescription = document.querySelector('#dish-description');
    foodDescription.innerText = data[0].description;
    const foodPrice = document.querySelector('#dish-price');
    foodPrice.innerText = `$${data[0].price}`; //  "$" + data[0].price

    data.forEach((element) => {
      const menuItem = document.createElement('span');
      menuItem.innerText = element.name;
      const menuDiv = document.querySelector('#menu-items');
      menuDiv.append(menuItem);
      storageBox[element.name] = 0;

      menuItem.addEventListener('click', () => {
        foodName.innerText = element.name;
        foodImage.src = element.image;
        foodDescription.innerText = element.description;
        document.querySelector('#number-in-cart').innerText = storageBox[element.name];
        // if (storageBox[foodName.innerText] === undefined) {
        //     document.querySelector('#number-in-cart').innerText="0"
        // }else {
        //     document.querySelector('#number-in-cart').innerText=storageBox[foodName.innerText]
        // }
      });
    });
    const inputContainer = document.querySelector('#cart-form');
    inputContainer.addEventListener('submit', (e) => {
      e.preventDefault();
      let cartNumber = document.querySelector('#cart-amount').value;
      const currentNumberInCart = document.querySelector('#number-in-cart');

      const foodItemName = document.querySelector('#dish-name');
      if (cartNumber.length === 0) {
        cartNumber = 0;
      }
      // else {
      //   cartNumber = cartNumber;
      // }

      storageBox[foodItemName.textContent] = parseInt(cartNumber, 10) + storageBox[foodItemName.textContent];
      // parseInt(x,10) === +x
      currentNumberInCart.innerText = storageBox[foodItemName.textContent];
      document.querySelector('#cart-amount').value = '';
    });
  });
