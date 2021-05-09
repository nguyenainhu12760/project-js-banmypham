const url = "http://localhost:3000/";

const fetchApi = async (url, option) => {
  const res = await fetch(url, option);
  return res.json();
};

// lay san pham theo id
const getProductById = async (id) => {
  const productsUrl = url + "products/" + id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await fetchApi(productsUrl, option);
};

const getProducts = async () => {
  const productsUrl = url + "products";
  const option = {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchApi(productsUrl, option);
  showProducts(res);
};

// show san pham
const showProducts = (data) => {
  let tableBody = document.getElementById("conntentProducts");
  tableBody.innerHTML = "";
  for (let index = 0; index < data.length; index++) {
    const products = data[index];
    tableBody.innerHTML += `
					<tr>
							<td></td>
							<td>${products.id}</td>
							<td>${products.catalog_id}</td>
							<td>${products.name}</td>
							<td>${products.brand}</td>
							<td><img src=${products.image} style="width:100px" /></td>
							<td>${products.detail}</td>
							<td>${products.status}</td>
							<td>${products.price}</td>
							<td>
							<button
							type="button"
							class="btn btn-outline-warning"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							onclick="getEdit(${products.id})"
							>
							Sửa
							</button>
							<button type="button" class="btn btn-outline-warning" onclick="removeProduct(${products.id})">Xóa</button>
							</td>
					</tr>
			`;
  }
};

// edit sản phẩm
const editProduct = async (id) => {
  const data = {
		id: document.getElementById("id").value,
		catalog_id: document.getElementById("catalog_id").value,
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    image: document.getElementById("image").files,
    detail: document.getElementById("detail").value,
    status: document.getElementById("status").value,
    price: document.getElementById("price").value,
  };
  const productsUrl = url + "products/" + id;
  const option = {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetchApi(productsUrl, option);
  getProducts();
};

const getEdit = async (id) => {
  const products = await getProductById(id);
	document.getElementById("id").value = products.id;
  document.getElementById("catalog_id").value = products.catalog_id,
  document.getElementById("name").value = products.name;
  document.getElementById("brand").value = products.brand;
  document.getElementById("image").value = products.image;
  document.getElementById("detail").value = products.detail;
  document.getElementById("status").value = products.status;
  document.getElementById("price").value = products.price;
};

// remove san pham
const removeProduct = async (id) => {
	alert("Bạn có muốn xóa sản phẩm?");
  const productsUrl = url + "products/" + id;
  const option = {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchApi(productsUrl, option);
  getProducts();
};

//add san pham
const addProduct = async () => {
  const data = {
		id: document.getElementById("id").value,
		catalog_id: document.getElementById("catalog_id").value,
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    image: document.getElementById("image").value,
    detail: document.getElementById("detail").value,
    status: document.getElementById("status").value,
    price: document.getElementById("price").value,
  };
  const productsUrl = url + "products";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetchApi(productsUrl, option);
  showAddedProduct(res);
  clearForm();
};

const showAddedProduct = (products) => {
  let tableBody = document.getElementById("conntentProducts");
  tableBody.innerHTML += `
	<tr>
	<td></td>
	<td>${products.id}</td>
	<td>${products.catalog_id}</td>
	<td>${products.name}</td>
	<td>${products.brand}</td>
	<td><img src=${products.image} style="width:100px" /></td>
	<td>${products.detail}</td>
	<td>${products.status}</td>
	<td>${products.price}</td>
</tr>
	`;
};

const submitForm = async () => {
  let id = document.getElementById("id").value;
	if (id != 0) {
		editProduct(id);
	}
	else{
		document.getElementById('warning').innerHTML = 'id khac 0'
	}
	if (id > 0) {
		await	addProduct(id)
	}

};
const clearForm = () => {
	document.getElementById("id").value = 1;
	document.getElementById("catalog_id").value = 1;
  document.getElementById("name").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("image").value = "";
  document.getElementById("detail").value = "";
  document.getElementById("status").value = "";
  document.getElementById("price").value = "";
};

getProducts();
