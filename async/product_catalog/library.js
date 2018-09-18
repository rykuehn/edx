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
        getCatalogData,
        getIntersection
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
        setTimeout(function(){
          while (i < catalog.length){
            if (catalog[i].id == id){                        
              resolve({id:id,price:catalog[i].price,type:catalog[i].type});
            }
            i++;
          }
          reject("Invalid ID: " + id);
        }, 1000);
      });
      return promise;
    }

    function searchProductsByPrice(price, difference) {
      var promise = new Promise(function(resolve,reject){
        var i = 0;
        var priceArray = [];
        if(!isFinite(price)) {
          reject("Invalid Price: ", price);
        } else {
          setTimeout(() => {
            while (i < catalog.length) {
              if (Math.abs(catalog[i].price - price) < difference){
                priceArray.push(catalog[i]);
                i++
              }
            }
            resolve(priceArray);
          }, 1000);
        }
      });
      return promise;
    }

    function searchProductsByType(type) {
      var promise = new Promise(function(resolve,reject){
        var i = 0;
        var data = [];
        if(!typeOfCategories.includes(type)){
            reject("Invalid Type: " + type)
        } else {
          setTimeout(() => {
            while (i < catalog.length) {
              if (catalog[i].type == type){
                data.push(catalog[i]);
              }
              i++
            }
            resolve(data);
          }, 1000);
        }
      });
      return promise;
    }

    function getIntersection(arrA,arrB,searchedId){
      var samePrice = arrA;
      var sameType = arrB;
      var similarArray = [];
      samePrice.forEach(function(obj1){
          sameType.forEach(function(obj2){
              if(obj1.id == obj2.id && obj1.id != searchedId)
                  similarArray.push(obj1);     
          });
      });
      return similarArray;
    }
  }

  if(typeof(window.api) === 'undefined'){
    window.api = myLibrary();
  }
}(window));
