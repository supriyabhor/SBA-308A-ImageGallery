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