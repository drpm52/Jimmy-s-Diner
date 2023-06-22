"use strict";

const main = document.querySelector("main");
const payBtn = document.querySelector(".pay-btn");
const paymentDetails = document.querySelector(".payment-details");
const completeOrder = document.querySelector(".complete-order");
const removeBtn = document.querySelector(".remove");
const yourOrder = document.querySelector(".your-order");
const thankYouMsg = document.querySelector(".thanks");
const items = document.querySelector(".items");
const totalPrice = document.querySelector(".total-price");
let cart = [];
let name1 = "";

function enterCardDetails() {
  yourOrder.classList.add("hidden");
  paymentDetails.classList.remove("hidden");

  const nameEl = document.getElementById("name");

  name1 = nameEl.value;
  return name1;
}
function payBtnHandleClick(name1) {
  paymentDetails.classList.add("hidden");
  thankYouMsg.classList.remove("hidden");

  thankYouMsg.innerHTML = `<h1 >Thanks ${name1}, Your order is on its way!</h1>`;
}

function removeHandleClick(e) {
  const removeItemName = e.target.id;

  const foundItemIndex = cart.findIndex((el) => el.name === removeItemName);

  if (foundItemIndex !== -1) {
    const foundItem = cart[foundItemIndex];

    if (foundItem.quantity > 1) {
      foundItem.quantity--;
    } else {
      cart.splice(foundItemIndex, 1);
    }
  }

  if (cart.length === 0) {
    items.innerHTML = "";
    yourOrder.classList.add("hidden");
  }

  updateInnerHTML();
  totalCost(cart);
}

const removeHidden = (e) => {
  // thankYouMsg.classList.add("hidden");
  yourOrder.classList.remove("hidden");
  completeOrder.classList.remove("hidden");
  totalPrice.classList.remove("hidden");
};

function reset() {
  thankYouMsg.classList.add("hidden");
}

function totalCost(arr) {
  let totalCost = 0;
  arr.forEach((item) => (totalCost += item.cost * item.quantity));
  let totalCostHTML = `<h3 >Total price</h3>
  <h4 >$${totalCost}</h4>`;

  totalPrice.innerHTML = totalCostHTML;
}

function updateInnerHTML() {
  //
  let str = "";
  cart.forEach((item) => {
    str += ` <div class="ordered-item row"
        <h3>${item.name} </h3> x <h3 id ="${item.name}-quantity">${
      item.quantity
    } </h3>
        <div class="remove-btn-div">
        <button class="remove" id = ${item.name} data-cost =${
      item.cost
    }>remove</button>
        </div>
        <h4 class = "price" id="${item.name}-price">$${item.quantity * item.cost}</h4>
        </div>`;
    items.innerHTML = str;
  });
}

main.addEventListener("click", function (e) {
  const name = e.target.id;
  const cost = e.target.dataset.cost;
  const cartItem = cart.find((el) => el.name === name);
  if (e.target.classList.contains("add")) {
    removeHidden();

    if (!cartItem) {
      cart.push({
        name: name,
        cost: cost,
        quantity: 1,
      });
    } else {
      cartItem.quantity++;
    }
  }

  updateInnerHTML();
  totalCost(cart);
});

yourOrder.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    removeHandleClick(e);
  }
});
payBtn.addEventListener("click", function (e) {
  e.preventDefault();
  enterCardDetails();
  payBtnHandleClick(name1);
});
window.addEventListener("onload", reset);

