const loadCategoriesList = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    displayCategoriesList(data.data.news_category);
}

const displayCategoriesList = categoriesList => {
    const categoriesUl = document.getElementById('categoriesList');
    categoriesList.forEach(categoryList => {
        const categoryLi = document.createElement('li')
        categoryLi.innerHTML = `
        <p onclick = "loadCategoriesDetails('${categoryList.category_id}')">${categoryList.category_name}</p>
        `
        categoriesUl.appendChild(categoryLi);


    });
}

loadCategoriesList();

// function of loader

const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const loadCategoriesDetails = async (categoryId) => {
    // Start Loader
    toggleLoader(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    displayCategoriesDetails(data.data);
}

loadCategoriesDetails('08');

const displayCategoriesDetails = (categoriesDetails) => {
    // displaying news count
    const itemCount = document.getElementById('items-count');
    itemCount.innerText = `${categoriesDetails.length} news found for category`

    // displaying news details
    const categoriesDiv = document.getElementById('categories-details');
    categoriesDiv.textContent = '';
    categoriesDetails.forEach(categoryDetails => {
        const categoryDetailsDiv = document.createElement('div');
        categoryDetailsDiv.classList.add('d-md-flex', 'gap-4', 'mb-5', 'bg-white', 'rounded', 'p-md-3');
        categoryDetailsDiv.innerHTML = `
        <div>
            <img src = "${categoryDetails.thumbnail_url}">
        </div>
        <div>
            <h4 class="mb-4">"${categoryDetails.title}</h4>
            <p>${categoryDetails.details}</p>
            <div class ="d-lg-flex justify-content-around">
                <div class = "d-flex align-items-center gap-3">
                    <img src = "${categoryDetails.author.img ? categoryDetails.author.img : "No image found"}" style = "height: 3rem; width:3rem; border-radius: 50%;">
                    <div>
                        <h5>${categoryDetails.author.name ? categoryDetails.author.name : "No name found"}</h5>
                        <p>${categoryDetails.author.published_date ? categoryDetails.author.published_date : "published date is not found"}</p>
                    </div>
                </div>
                <h5 class="d-flex align-items-center"><i class="fa-regular fa-eye me-3"></i>${categoryDetails.total_view ? categoryDetails.total_view : "No view found"}</h5>
                <i onclick = "loadNewsDetails('${categoryDetails._id}')" class="fa-solid fa-arrow-right d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#newsModal"></i>
            </div>
        </div>
        `;
        categoriesDiv.appendChild(categoryDetailsDiv);
    });

    // Stop loader

    toggleLoader(false);
}

const loadNewsDetails = async (newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await res.json();
    displayNewsDetails(data.data)
}

const displayNewsDetails = newsInformations => {
    newsInformations.forEach(newsInfo => {
        const modalTitle = document.getElementById('modal-title');
        const modalDate = document.getElementById('modal-date');
        const modalView = document.getElementById('modal-view');
        modalTitle.innerText = `${newsInfo.title}`;
        modalDate.innerText = `${newsInfo.author.published_date}`;
        modalView.innerText = `${newsInfo.total_view}`;
    })
}