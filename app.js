// import { popularCatagory } from './api.js';

// import { displayCategories, showGallery } from './imageGallery.js';

// async function initialLoadPage()
// {
//   console.log("page loading....");

//   const categories = await popularCatagory();
//   console.log("Popular Categories :", categories);
//   displayCategories(categories);
  
//   const searchButton = document.getElementById("search-button");
//   const searchInput = document.getElementById("search-input");

//   searchButton.addEventListener('click', async () => {
//     const searchQuery = searchInput.value.trim();
//     console.log('Search query:', searchQuery);
//     if (searchQuery) {
//         await showGallery(searchQuery, 1, 15);  // Search by keyword, page 1, 15 images per page
//     } else {
//         alert('Please enter ');
//     }
// });
  
// }

// initialLoadPage()

const API_KEY = 'RjMK49lckHFPY6mHRQr3wGH2vIbrWlhB0nEYGNlUAfx9Im4IKWnUldSR';
const image_URL = 'https://api.pexels.com/v1/';

// Initializing page and loading categories
import { displayCategories, showGallery } from './imageGallery.js';

async function initialLoadPage() {
    console.log("Page loading....");

    // Fetch popular categories and display them
    const categories = await popularCatagory();
    console.log("Popular Categories:", categories);
    displayCategories(categories);

    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    // Event listener for search functionality
    searchButton.addEventListener('click', async () => {
        const searchQuery = searchInput.value.trim();
        console.log('Search query:', searchQuery);
        if (searchQuery) {
            await showGallery(searchQuery, 1, 15);  // Search by keyword, page 1, 15 images per page
        } else {
            alert('Please enter a search query');
        }
    });
}

initialLoadPage();


// Fetching popular categories
export async function popularCatagory() {
    console.log('Fetching categories...');
    return ['Animal', 'Nature', 'Architecture', 'Food'];
}

// Fetching images by category with pagination
export async function fetchImagesByCategory(category, page = 1, per_page = 15) {
    console.log(`Fetching images for category: ${category} (Page: ${page}, Per Page: ${per_page})`);
    try {
        const response = await axios.get(`${image_URL}search`, {
            headers: {
                'Authorization': API_KEY
            },
            params: {
                query: category,
                page: page,
                per_page: per_page
            }
        });
        console.log('Fetched images:', response.data.photos);
        return response.data.photos;  // Return the images array
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

// Fetching image details by ID
export async function fetchImageDetails(id) {
    console.log(`Fetching details for image using ID: ${id}`);
    try {
        const response = await axios.get(`${image_URL}photos/${id}`, {
            headers: {
                'Authorization': API_KEY
            }
        });
        console.log('Fetched image details:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching image details:', error);
        return null;
    }
}

