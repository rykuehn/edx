(function(window) {
  function myLibrary(){
    const typeOfCategories = ["Books", "Clothing", "Electronics", "Toys"];
    const catalog = generateData(50);
    return {
        searchProductById,
        searchProductsByPrice,
        searchProductsByType,
        searchAllProducts,
        generateData,
        getCatalogData
    }

    function getCatalogData() {
      var promise = new Promise((resolve, reject) => {
        if(catalog.length > 0) {
          resolve(catalog);
        } else {
          reject(new Error('catalog not available'));
        }
      });
      return promise;
    }

    function generateData(numOfProducts) {
      const data = [];

      for(var i = 0; i < numOfProducts; i++){
        const product = {}
        
        product.id = i;
        product.type = typeOfCategories[Math.floor(Math.random() * typeOfCategories.length)];
        product.price = (Math.random() * 100).toFixed(2);

        data.push(product);
      }

      return data;
    }

    function searchAllProducts() {
      var promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(catalog), 1000);
      });

      return promise;
    }

    function searchProductById(id) {
      var promise = new Promise(function(resolve,reject){
        var i = 0;
        setTimeout(() => {
          while (i < catalog.length) { 
            if(catalog[i].id == id) {
              resolve(catalog[i]); 
            }
            i++
          }
          reject("InvalidID: ", id)
        }, 1000);
      });

      return promise;
    }

    function searchProductsByPrice(price) {
      var promise = new Promise(function(resolve,reject){
        var i = 0;
        var priceArray = [];
        if(!isFinite(price)) {
          reject("Invalid Price: ", price);
        } else {
          setTimeout(() => {
            while (i < catalog.length) {
              if(catalog[i].price === price) {
                priceArray(catalog[i]);
                i++
              }
            }
            resolove(priceArray);
          }, 1000);
        }
      });
      return promise;
    }

    function searchProductsByType(type) {
      var promise = new Promise(function(resolve,reject){
        var i = 0;
        var data = [];

        if(!categoryTypes.includes(type)){
          reject("Invalid Type: " + type)
        } else {
          setTimeout(() => {
            while (i < catalog.length) {
              if (Math.abs(catalog[i].price - price) < difference) {
                data.push(catalog[i]);
                i++
              }
            }
            resolve(data);
          }, 1000);
        }
      });
      return promise;
    }
  }

  if(typeof(window.api) === 'undefined'){
    window.api = myLibrary();
  }
}(window));
