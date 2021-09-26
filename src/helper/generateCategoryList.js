const generateCategoryList = (products) => {
    let categories = [];
    categories.push('All');
    for (const productListEl of products) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i] === productListEl.category) break;
            else if (i === categories.length - 1)
                categories.push(productListEl.category);
        }
    }
    return categories;
}

export default generateCategoryList;