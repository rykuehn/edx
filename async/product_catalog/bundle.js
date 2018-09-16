document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    let activeProduct;

    const createProductsTable = data => {
      data.forEach(product => {
        const id = document.createElement('th');
        const type = document.createElement('th');
        const price = document.createElement('th');
        const productRow = document.createElement('tr');
        const examineButton = document.createElement('button');
        const table = document.getElementsByClassName('allProductsTable')[0];

        id.innerHTML = product.id;
        type.innerHTML = product.type;
        price.innerHTML = product.price;
        examineButton.innerHTML = 'Examine';
        examineButton.addEventListener('click', () => examineProduct(product))

        productRow.appendChild(id)
        productRow.appendChild(type)
        productRow.appendChild(price);
        productRow.appendChild(examineButton);

        table.appendChild(productRow);
      });
    }

    const examineProduct = (product) => {
      const productIDCategory = document.getElementsByClassName('productID')[0];
      const priceCategory = document.getElementsByClassName('price')[0];
      const typeCategory = document.getElementsByClassName('type')[0];

      productIDCategory.innerHTML = product.id;
      priceCategory.innerHTML = product.price;
      typeCategory.innerHTML =product.type;

      activeProduct = product;
      generateSimilarProducts(activeProduct);
    }

    const init = () => {
      window.api.getCatalogData().then(result => createProductsTable(result));
      document.getElementById("inputButton").addEventListener('click', function(){
        processSearch(document.getElementById('input').value);
    });
    }

    const generateSimilarProducts = (activeProduct) => {
      const category = activeProduct.type;
      const similarProducts = window.api.getCatalogData().then(result => result.filter(product => product.type=== category));
    }

    init();

    const processSearch = (id) => { 
      document.getElementById('input').value = '';
      window.api.searchProductById(id).then(result => examineProduct(result));
    }
  }
}