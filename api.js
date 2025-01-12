const API_KEY = 'RjMK49lckHFPY6mHRQr3wGH2vIbrWlhB0nEYGNlUAfx9Im4IKWnUldSR'; 
const image_URL = 'https://api.pexels.com/v1/';

//add popular categories 
export async function popularCatagory()
{
    console.log('Fetching categories...');
    return ['Animal', 'Nature', 'Architecture', 'Food'];
}

//fetch images by category with pagination 
// pagination- page and per page param

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
        console.log('Fetched images:', response.data.photos); // Log the fetched images
        return response.data.photos;  // Return the images array
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}