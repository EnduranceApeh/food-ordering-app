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
}

// load header and footer to page
loadComponent('./src/components/header.html', 'header');

loadComponent('./src/components/order-summary.html', 'modal-bg');
loadComponent('../components/footer.html', 'footer');
