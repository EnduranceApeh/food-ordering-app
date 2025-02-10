import { fetchData } from "../js/main.js";
import { convertToNaira } from "../js/utility.js";

const menu = await fetchData('/src/data/menu.json')
const cartList = document.querySelector('.js-cart-list');
let matchingItems;
let totalCost;
// get cart items from local storage
export let cart = JSON.parse(localStorage.getItem('cart')) || [];
renderCartUI()

console.log(cart)
const showCartTab = document.querySelector('.js-show-cart-tab')
const closeTab = document.querySelector('.js-close-tab')

// Save to local storage
function saveTOLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart function
export function addTocart(itemId) {
    let matchingItem;
            cart.forEach((item) => {
                if(item.itemId === itemId) {
                    matchingItem = item;
                }
            })

            if(matchingItem) {
                matchingItem.quantity++;
            }else{
                cart.push({
                    itemId,
                    quantity: 1
                })
            }
            saveTOLocalStorage();
            renderCartUI()
            console.log(cart)
            
}

function removeFromCart(itemId) {
   let matchedItem = cart.filter((cartItem) => cartItem.itemId !== itemId)
    cart = matchedItem
    saveTOLocalStorage()
}

// calculate all item in cart
export function cartQuantity() {
    let cartQuantity;
    cartQuantity = cart.reduce((count, item) => count + item.quantity, 0)
    console.log(`cartQunaity: ${cartQuantity}`);
    return cartQuantity 
}
function updateCartQuantity(itemID, newQuantity) {
    let item = cart.find((item) => item.itemId === itemID);
    if(item) {
        item.quantity = newQuantity;
    }
    console.log('new quantity' + item.quantity)
}


if(showCartTab){
    showCartTab.addEventListener('click', () => {
        document.querySelector('.js-cart-tab')
            .classList.add('show-cart-tab')
        
    })
}

if(closeTab){
    closeTab.addEventListener('click', () => {
        document.querySelector('.js-cart-tab')
            .classList.remove('show-cart-tab')
    })
}

// calculate total price of item in cart
function totalPrice() {
    const totalPrice = matchingItems.reduce((count, item) => count + parseInt(item.price, 10), 0)
    console.log(typeof totalPrice)
    return totalPrice;
}

// render cart UI
 export function renderCartUI() {'  '
     matchingItems = cart.reduce((result, cartItem) => {
        Object.keys(menu).forEach((category) => {
            const matches = menu[category]
                .find((item) => item.id === cartItem.itemId)
            if(matches) {
                matches["quantity"] = cartItem.quantity
                result.push(matches);
            }
            
        })
        return result
    }, [])
    
    let cartItemHTML = ''
    matchingItems.forEach((item) => {
        cartItemHTML += `
        <div class="cart-items-info js-cart-item-info" data-item-id = ${item.id}>
        <div class="image">
           <img class="cartItem-img" src="${item.image}" alt="" />
        </div>
    
        <div class="details">
            <span class="name">${item.name}</span>
            <span class="price js-price">₦${convertToNaira(item.price)}</span>
            <div class="update-quantity">
            
                <div class="delete js-delete-item" data-item-id = ${item.id}>
                    <i class="fa-regular fa-trash-can delete-icon"></i>
                </div>
                <div class="add-min-quantity">
                    <span class="minus js-minus">
                        <i class="fa-solid fa-minus"></i>
                    </span>
                    <div class="js-quantity-display">${item.quantity}</div>
                    <span class="js-plus">
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
        `
    })

    if(cartList){
        cartList.innerHTML = cartItemHTML;
    }
    const deleteIcon = document.querySelectorAll('.js-delete-item');
deleteIcon.forEach((icon) => {
    const itemId = icon.dataset.itemId
    icon.addEventListener('click', () => {
        removeFromCart(itemId);
        renderCartUI()
        console.log(cart)
    })

})

document.querySelector('.js-quantity').innerHTML = cartQuantity()


document.querySelectorAll('.js-cart-item-info')
    .forEach((cartItemInfo) => {
        const itemID = cartItemInfo.dataset.itemId;
        const plus = cartItemInfo.querySelector('.js-plus'); 
        const minus = cartItemInfo.querySelector('.js-minus'); 
        const quantityDisplay = cartItemInfo
            .querySelector('.js-quantity-display');

        let currentQuantity = parseInt(quantityDisplay.textContent, 10);
        console.log(`currentQuantity ${currentQuantity}` );
        
        minus.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityDisplay.innerHTML = currentQuantity;
                updateCartQuantity(itemID, currentQuantity);
                document.querySelector('.js-quantity')
                    .innerHTML = cartQuantity();
            } else {
                removeFromCart(itemID);
                renderCartUI();
            }
        });

        plus.addEventListener('click', () => {
            currentQuantity++;
            quantityDisplay.innerHTML = currentQuantity;
            updateCartQuantity(itemID, currentQuantity);
            document.querySelector('.js-quantity')
                .innerHTML = cartQuantity();
        });
});

totalCost = `₦${convertToNaira(totalPrice())}`;
document.querySelector('.js-total-cost').innerHTML = totalCost;
}

export {matchingItems, totalCost}
/*document.getElementById('checkout').addEventListener('click', () => {
    openModal()
})
*/




