var productData = [
  {
    "id": "1",
    "price": "2.34",
    "type": "clothing"
  },
  {
    "id": "12",
    "price": "12.34",
    "type": "clothing"
  },
  {
    "id": "32",
    "price": "32.24",
    "type": "clothing"
  },
  {
    "id": "22",
    "price": "99.22",
    "type": "clothing"
  },
  {
    "id": "87",
    "price": "1.11",
    "type": "electronics"
  },
  {
    "id": "67",
    "price": "276.6",
    "type": "electronics"
  },
  {
    "id": "68",
    "price": "34.56",
    "type": "electronics"
  },
  {
    "id": "343",
    "price": "45.43",
    "type": "electronics"
  },
  {
    "id": "99",
    "price": "34.34",
    "type": "food"
  },
  {
    "id": "34",
    "price": "6.34",
    "type": "food"
  },
  {
    "id": "2",
    "price": "2.34",
    "type": "clothing"
  },
  {
    "id": "3",
    "price": "12.34",
    "type": "clothing"
  },
  {
    "id": "4",
    "price": "32.24",
    "type": "clothing"
  },
  {
    "id": "5",
    "price": "99.22",
    "type": "clothing"
  },
  {
    "id": "6",
    "price": "1.11",
    "type": "beauty"
  },
  {
    "id": "7",
    "price": "276.6",
    "type": "beauty"
  },
  {
    "id": "8",
    "price": "34.56",
    "type": "beauty"
  },
  {
    "id": "9",
    "price": "45.43",
    "type": "beauty"
  },
  {
    "id": "10",
    "price": "34.34",
    "type": "food"
  },
  {
    "id": "11",
    "price": "6.34",
    "type": "food"
  }
];

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
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

        productRow.appendChild(id)
        productRow.appendChild(type)
        productRow.appendChild(price);
        productRow.appendChild(examineButton);

        table.appendChild(productRow);

        console.log(id);
      });
    }

    createProductsTable(productData);
  }
}