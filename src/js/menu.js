
fetch('/src/data/menu.json')
    .then((response) => {
        if(!response.ok){
            throw new Error(`Failed to load ${file}`);
        }
        return response.json()
    })
    .then((data) => {
        const menu = data.menu;
        displayMenu(menu)
    })
    .catch((error) => console.log(error))

function displayMenu(menu) {
    let html = '';
    Object.keys(menu).forEach(category => {
        console.log(`Category: ${category}`);

        menu[category].forEach(item => {
          html += `
          <div class="menu-card">
          <div>
              <img class="menu-card-img" src="${item.image}" alt="">
              <span class="add-to-cart-icon"><i class="fa-solid fa-plus"></i></span>
          </div>
          <div>
              <a href="#">
                  <p class="name">${item.name}</p>
              </a>
              <p class="price">${item.price}</p>

          </div>
          </div>
          `
        });
        console.log(html)
        
      });

      document.querySelector('.js-menu').innerHTML = html
      
}