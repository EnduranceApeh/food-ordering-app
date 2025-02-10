import { addTocart, cartQuantity, renderCartUI } from "../data/cart.js";
import { fetchData } from "./main.js";
import { convertToNaira } from "./utility.js";

let menu = {};
const url = '../src/data/menu.json';

const itemsToShow = 4; // Number of items to display initially
let isExpanded = false; // Track if "View More" is clicked

async function loadMenu() {
    try {
        menu = await fetchData(url);
        displayMenu(menu);
    } catch (error) {
        console.log(error);
    }
}



function displayMenu(menu) {
    let html = '';
    let totalItems = 0; 

    Object.keys(menu).forEach(category => {
        menu[category].forEach((item, index) => {
            totalItems++;

            // Add a "hidden-item" class if index >= itemsToShow
            const hiddenClass = index > itemsToShow ? "hidden-item" : "";

            html += `
              <div class="menu-card ${hiddenClass}">
                  <div>
                      <img class="menu-card-img" src="${item.image}" alt="">
                  </div>
                  <div class="menu-detail">
                      <a href="#">
                          <p class="name">${item.name}</p>
                      </a>
                      <p class="price">₦${convertToNaira(item.price)}</p>
                      <button class="add-to-cart-btn js-add-to-cart-icon" data-item-id="${item.id}">
                          Add to cart<span><i class="fa-solid fa-cart-shopping"></i></span>
                      </button>
                  </div>
              </div>
            `;
        });
    });

    // Insert the menu items into the container
    const menuContainer = document.querySelector('.js-menu');
    menuContainer.innerHTML = html;

    // Add event listeners for add to cart
    document.querySelectorAll('.js-add-to-cart-icon').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.dataset.itemId;
            addTocart(itemId);
            document.querySelector('.js-cart-count').innerHTML = cartQuantity();
            renderCartUI();
        });
    });

    // Add event listener for View More button (after it's added to DOM)
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener("click", toggleViewMore);
    }
}

function toggleViewMore() {
    const hiddenItems = document.querySelectorAll(".hidden-item");
    const viewMoreBtn = document.getElementById("viewMoreBtn");

    if (!isExpanded) {
        // Show all items
        console.log(hiddenItems)
        hiddenItems.forEach(item => item.classList.remove("hidden-item"));
        viewMoreBtn.textContent = "View Less";
    } else {
        // Hide the extra items again
        hiddenItems.forEach(item => item.classList.add("hidden-item"));
        viewMoreBtn.textContent = "View all";
        loadMenu()
        console.log(hiddenItems)
    }

    isExpanded = !isExpanded; // Toggle state
}

loadMenu();
 