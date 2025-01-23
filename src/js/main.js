// Fetch file content
function loadComponent(file, elementId) {
    fetch(file)
        .then((response) => {
            if(!response.ok) throw new Error(`Failed to load ${file}`);
            return response.text();
        })
        .then((content) => {
            document.getElementById(elementId).innerHTML = content;
        })
        .catch((error) => {
            console.error(error);
        })
}

// load header and footer to page
loadComponent('/src/components/header.html', 'header');
loadComponent('/src/components/footer.html', 'footer');