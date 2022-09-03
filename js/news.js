const loadNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategories(data.data.news_category);
}

const displayNewsCategories = newsCategories => {
    console.log(newsCategories);
    const categoriesUl = document.getElementById('news-categories');
    newsCategories.forEach(newsCategory => {
        const newsCategoryLi = document.createElement('li')
        newsCategoryLi.innerText = `
        ${newsCategory.category_name}
        `;
        categoriesUl.appendChild(newsCategoryLi);
    });
}

loadNewsCategories();