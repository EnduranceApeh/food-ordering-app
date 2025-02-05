export async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json(); 
        return data.menu;
        
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

// Fetch file content
async function loadComponent(file, elementId) {
  try{
    const response = await fetch(file);
    const content = await response.text()
    document.getElementById(elementId).innerHTML = content;
  } catch(error) {
    console.log(error)
  }
        /*.then((response) => {
            if(!response.ok) throw new Error(`Failed to load ${file}`);
            return response.text();
        })
        .then((content) => {
            document.getElementById(elementId).innerHTML = content;
        })
        .catch((error) => {
            console.error(error);
        })*/
}

// load header and footer to page
loadComponent('/src/components/header.html', 'header');

loadComponent('/src/components/order-summary.html', 'modal-bg');
loadComponent('/src/components/footer.html', 'footer');
