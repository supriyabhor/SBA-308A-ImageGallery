import { fetchImagesByCategory } from "./api";

let currentPage = 1;
const perPage = 10; // images

export async function showGallery(category, page= currentPage, per_page = perPage)
{
    console.log(`Displaying gallery for category: ${category} (Page: ${page}, Per Page: ${per_page})`);

    const images = await fetchImagesByCategory(category, page, per_page);
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = '';  

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.small;
        imgElement.alt = image.alt;
        imgElement.dataset.id = image.id;
        imgElement.addEventListener('click', showImageDetails);
        galleryContainer.appendChild(imgElement);
    });

    // prev next button control

const paginationContainer = document.getElementById('pagination');
paginationContainer.innerHTML = `
       <button id="prev-button" ${page === 1 ? 'disabled' : ''}>Previous</button>
       <button id="next-button">Next</button>
    `;

document.getElementsByid(prev-button).addEventListener('click', ()=> {
    if (page > 1)
    {
        showGallery(category, page -1, perPage);  
    }
  });

  document.getElementById('next-button').addEventListener('click', () => { 
     showGallery(category, page + 1, perPage);
  });

}





export async function displayCategories(categories) 
{
   const categoryList = document.getElementById("category-list");
   categoryList.innerHTML = '';

   categories.forEach(category => {
    const li =document.createElement('li');
    li.textContent = category;
    li.addEventListener('click', ()=> {
        console.log('selected category is: ${category}');
        showGallery(category);
    })
    categoryList.appendChild(li);
   });
}