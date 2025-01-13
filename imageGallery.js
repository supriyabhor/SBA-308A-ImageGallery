import { fetchImagesByCategory, fetchImageDetails } from './app.js';

let currentPage = 1;
const perPage = 10; // Number of images per page

// Example list of categories (You can expand this list with more categories)
const popularCategories = [
    "nature", "technology", "people", "animals", "city", "sports", "business", "food", "travel", "fashion"
];

// Show gallery based on category, page, and per_page parameters
export async function showGallery(category, page = currentPage, per_page = perPage) {
    console.log(`Displaying gallery for category: ${category} (Page: ${page}, Per Page: ${per_page})`);

    const images = await fetchImagesByCategory(category, page, per_page);
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = '';  // Clear the gallery container

    // Append images to the gallery
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.small;
        imgElement.alt = image.alt;
        imgElement.dataset.id = image.id;
        imgElement.addEventListener('click', showImageDetails);
        galleryContainer.appendChild(imgElement);
    });

    // Pagination controls
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = `
        <button id="prev-button" ${page === 1 ? 'disabled' : ''}>Previous</button>
        <button id="next-button">Next</button>
    `;

    // Prev/Next button functionality
    document.getElementById('prev-button').addEventListener('click', () => {
        if (page > 1) {
            showGallery(category, page - 1, per_page);
        }
    });

    document.getElementById('next-button').addEventListener('click', () => {
        showGallery(category, page + 1, per_page);
    });
}



export async function displayCategories() {
    const categoryDropdown = document.getElementById("category-dropdown");
    
    // Clear any existing options
    categoryDropdown.innerHTML = '';

    // Add a default option to prompt the user to select a category
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select Category";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    categoryDropdown.appendChild(defaultOption);

    // Add each category as an option
    popularCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });

    // Event listener for when a category is selected
    categoryDropdown.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory) {
            console.log(`Selected category: ${selectedCategory}`);
            showGallery(selectedCategory);  // Display images for selected category
        }
    });
}

// Show image details when an image is clicked
async function showImageDetails(evt) {
    const imageId = evt.target.dataset.id;
    const details = await fetchImageDetails(imageId);
    const detailsContainer = document.getElementById("details");

    if (details) {
        detailsContainer.innerHTML = `
            <h3>Photographer Name: ${details.photographer}</h3>
            <h3>Photographer URL: <a href="${details.photographer_url}" target="_blank">${details.photographer_url}</a></h3>
            <img src="${details.src.original}" alt="${details.photographer}" />
            <p><strong>Width:</strong> ${details.width} px</p>
            <p><strong>Height:</strong> ${details.height} px</p>
        `;
        document.getElementById('image-details').style.display = 'block';  // Show the image details
    } else {
        detailsContainer.innerHTML = `<p>Details not available.</p>`;
    }
}

// Call the displayCategories function to render the category list when the page loads
window.onload = displayCategories;

 




