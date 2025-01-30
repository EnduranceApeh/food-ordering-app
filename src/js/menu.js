import { addTocart, cartQuantity, renderCartUI } from "../data/cart.js";
import { fetchData } from "./main.js";
import { convertToNaira } from "./utility.js";

let menu = {};
const url = '/src/data/menu.json';

// Call fetchData to initialize the process
function displayMenu(menu) {
    let html = '';
    Object.keys(menu).forEach(category => {
        console.log(`Category: ${category}`);

        menu[category].forEach(item => {
            html += `
          <div class="menu-card">
          <div>
              <img class="menu-card-img" src="${item.image}" alt="">
          </div>
          <div>
              <a href="#">
                  <p class="name">${item.name}</p>
              </a>
              <p class="price">₦${convertToNaira(item.price)}</p>
              <button class="add-to-cart-btn js-add-to-cart-icon" data-item-id="${item.id}">Add to cart<span><i class="fa-solid fa-cart-shopping"></i></span></button>
          </div>
          </div>
          `;
        });
    });
    // Add the generated HTML to the menu container
    document.querySelector('.js-menu').innerHTML = html;
    // Log the menu to verify
    console.log(`Rendered menu:`, menu);
    // Add to cart functionality
    document.querySelectorAll('.js-add-to-cart-icon')
        .forEach((button) => {
        button.addEventListener('click', () => {
            const itemId = button.dataset.itemId;
            addTocart(itemId);
            document.querySelector('.js-cart-count')
                .innerHTML = cartQuantity();
            renderCartUI()
        });
    });
}

async function loadMenu() {
    try{
        menu = await fetchData(url)
        displayMenu(menu)
    } catch(error) {
        console.log(error)
    }
}

loadMenu();



