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

