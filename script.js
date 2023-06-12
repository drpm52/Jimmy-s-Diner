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


let total = [];

const removeHidden = () => {
  if (
    yourOrder.classList.contains("hidden") &&
    completeOrder.classList.contains("hidden") &&
    totalPrice.classList.contains("hidden")
  ) {
    yourOrder.classList.remove("hidden");
    completeOrder.classList.remove("hidden");
    totalPrice.classList.remove("hidden");
  }
};


function totalCost(arr) {
  let sum = arr.reduce((acc, item) => acc+item, 0)
 return sum
}
function removeHandleClick(e){
  if (e.target.classList.contains(".remove"))
  {const closest = e.target.closest('.ordered-item')
  closest.innerhtml=""

  let totalCostHTML = `<h3 >Total price</h3>
  <h4 >$${totalCost(total)-(e.target.dataset.cost)}</h4>`;

  totalPrice.innerHTML = totalCostHTML}
  else{
    return
  }


  
 }


function updateInnerHTML(e){
  if (e.target.classList.contains("add")) {
    removeHidden();
    const food = e.target.id;
    const cost = e.target.dataset.cost;
    total.push(+cost);
   

    let html = ` <div class="ordered-item row"
   <h3>${food} </h3>
   <div class="remove-btn-div">
     <button class="remove" data-cost =${cost}>remove</button>
   </div>
   <h4 class="price">$${cost}</h4>
   </div>`;

    let totalCostHTML = `<h3 >Total price</h3>
  <h4 >$${totalCost(total)}</h4>`;

    items.innerHTML += html;
    totalPrice.innerHTML = totalCostHTML;
  }
  else {
    return;
  }
}
let name1 =""
function enterCardDetails(){
  console.log(paymentDetails.classList);
  paymentDetails.classList.remove('hidden')
  const nameEl = document.getElementById('name')
 name1 = name1.value;
 return name1
}

function payBtnHandleClick(name1){
 
  
  paymentDetails.classList.add('hidden')
  thankYouMsg.classList.remove('hidden')
  thankYouMsg.innerHTML = `<h1 >Thanks ${name1}, Your order is on its way!</h1>`


}
function reset (){
  thankYouMsg.classList.add('hidden')
}

main.addEventListener("click", function (e) {
  updateInnerHTML(e)
});


yourOrder.addEventListener('click', function(e){
  removeHandleClick(e)
}
)
payBtn.addEventListener('click', 
payBtnHandleClick(name1)
)
window.addEventListener('onload', reset)

