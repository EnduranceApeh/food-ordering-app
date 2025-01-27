import { fetchData } from "../js/main.js";

const menu = await fetchData('/src/data/menu.json')

export const cart = [
    {
        itemId: '1',
        quantity: 2
    },
    {
        itemId: '20',
        quantity: 5
    }
]
const showCartTab = document.querySelector('.js-show-cart-tab')
const closeTab = document.querySelector('.js-close-tab')

// Add to cart function
export function addTocart(itemId) {
    let matchingItem;
            console.log(itemId)
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

            console.log(cart)
            
}

// calculate all item in cart
export function cartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity
    })
    console.log(`cartQunaity: ${cartQuantity}`);
    return cartQuantity 
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

let matchingItems = [];
matchingItems = cart.reduce((result, cartItem) => {
    Object.keys(menu).forEach((category) => {
        const matches = menu[category]
            .find((item) => item.id === cartItem.itemId)
        if(matches) {
            result.push(matches);
        }
        
    })
    return result
}, [])

matchingItems.forEach((item) => {
    
})
console.log(matchingItems);
