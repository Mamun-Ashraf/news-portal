const loadNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategories(data.data.news_category);
}

const displayNewsCategories = newsCategories => {
    const categoriesUl = document.getElementById('news-categories');
    newsCategories.forEach(newsCategory => {
        const newsCategoryLi = document.createElement('li')
        newsCategoryLi.innerHTML = `
        <p onclick = "loadCategoriesDetails('${newsCategory.category_id}')">${newsCategory.category_name}</p>
        `
        categoriesUl.appendChild(newsCategoryLi);


    });
}

loadNewsCategories();

const loadCategoriesDetails = async (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesDetails(data.data);
}

const displayCategoriesDetails = (categoriesdetails) => {
    // console.log(categoriesdetails);
    const categoriesDiv = document.getElementById('categories-details');
    categoriesdetails.forEach(categoryDetails => {
        const categoryDetailsDiv = document.createElement('div');
        categoryDetailsDiv.classList.add('d-flex');
        categoryDetailsDiv.classList.add('gap-4');
        categoryDetailsDiv.classList.add('mb-5');
        categoryDetailsDiv.innerHTML = `
        <div>
            <img src = "${categoryDetails.thumbnail_url}">
        </div>
        <div>
            <h4>"${categoryDetails.title}"</h4>
            <p>"${categoryDetails.details}"</p>
            <div class ="d-flex justify-content-around">
                <div class = "d-flex">
                    <img src = "${categoryDetails.author.img ? categoryDetails.author.img : "No image found"}" style = "height: 3rem; width:3rem; border-radius: 50%;">
                    <h5>${categoryDetails.author.name ? categoryDetails.author.name : "No name found"}</h5>
                </div>
                <h5>Total view: ${categoryDetails.total_view ? categoryDetails.total_view : "No view found"}</h5>
                <button class = "text-bg-primary px-5 py-2 rounded">Details</button>
            </div>
        </div>
        `;
        categoriesDiv.appendChild(categoryDetailsDiv);
    });
}
loadCategoriesDetails();