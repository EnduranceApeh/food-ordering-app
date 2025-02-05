import { matchingItems, totalCost } from "../data/cart.js";
import { convertToNaira } from "./utility.js";

const checkoutBtn = document.querySelector('#checkout-btn');
const modalBg = document.querySelector("#modal-bg");
const modalCloseBtn = document.querySelector('.modal-close-btn')


checkoutBtn.addEventListener('click', () => {
    document.querySelector('.js-cart-tab')
            .classList.remove('show-cart-tab')
   modalBg.classList.add('modal-bg-active')
   loadOrderSummary()
})
modalCloseBtn.addEventListener('click', () => {
    modalBg.classList.remove('modal-bg-active');
})

function loadOrderSummary() {
    let orderItemsContainer = document.getElementById("order-items");
    orderItemsContainer.innerHTML = "";
    let subtotal = 0;
    
    matchingItems.forEach(item => {
        let itemTotal = parseInt(convertToNaira(item.price * item.quantity), 10);
        
        subtotal += itemTotal;
        
        let itemElement = document.createElement("div");
        itemElement.classList.add("order-item");
        itemElement.innerHTML = `<span>${item.name} (x${item.quantity})</span> <span>₦${itemTotal}</span>`;
        orderItemsContainer.appendChild(itemElement);
    });
    
    console.log(`subtotal: ${subtotal}`)
    let tax = subtotal * 0.05;
    console.log(`tax: ${tax}`)
    let total = subtotal + tax;
    
    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("tax").innerText = tax;
    document.getElementById("total").innerText = total;
}

function proceedToPayment() {
    alert("Redirecting to payment page...");
    window.location.href = "payment.html";
}