

export async function displayCategories(categories) 
{
   const categoryList = document.getElementById("category-list");
   categoryList.innerHTML = '';

   categories.forEach(category => {
    const li =document.createElement('li');
    li.textContent = category;
    li.addEventListener('click', ()=> {
        console.log('selected category is: ${category}');
        displayGallery(category);
    })
    categoryList.appendChild(li);
   });
}