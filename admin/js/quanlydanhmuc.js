const url = "http://localhost:3000/";

const fetchApi = async (url, option) => {
  const res = await fetch(url, option);
  return res.json();
};

// lay san pham theo id
const getCategoriesId = async (catalog_id) => {
  const categoriesUrl = url + "categories/" + catalog_id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await fetchApi(categoriesUrl, option);
};

const getCategories = async () => {
  const categoriesUrl = url + "categories";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchApi(categoriesUrl, option);
  showCategories(res);
};

// show danh muc
const showCategories = (data) => {
  let tableBody = document.getElementById("conntentProducts");
  tableBody.innerHTML = "";
  for (let index = 0; index < data.length; index++) {
    const categories = data[index];
    tableBody.innerHTML += `
					<tr>
							<td></td>
							<td>${categories.catalog_id}</td>
							<td>${categories.name}</td>
							<td>
							<button
							type="button"
							class="btn btn-outline-warning"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							onclick="getEdit(${categories.catalog_id})"
							>
							Sửa
							</button>
							<button type="button" class="btn btn-outline-warning" onclick="removeCategories(${categories.catalog_id})">Xóa</button>
							</td>
					</tr>
			`;
  }
};

// edit danh mục
const editCategories = async (catalog_id) => {
  const data = {
    catalog_id: document.getElementById("catalog_id").value,
    name: document.getElementById("name").value,
  };
  const categoriesUrl = url + "categories/" + catalog_id;
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetchApi(categoriesUrl, option);
  getCategories();
};

const getEdit = async (catalog_id) => {
  const categories = await getCategoriesId(catalog_id);
  (document.getElementById("catalog_id").value = categories.catalog_id),
    (document.getElementById("name").value = categories.name);
};

// remove danh muc
window.removeCategories = (catalog_id) => {
  swal("Are u sure?", "Ban muon xoa danh muc nay?", "warning").then(() => {
    const categoriesUrl = url + `categories/` + catalog_id;
    console.log(categoriesUrl);
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = fetchApi(categoriesUrl, option);
    res.then(() => {
      getCategories();
    });
  });
};

//add danh muc
const addCategories = async () => {
  const data = {
    catalog_id: Number(document.getElementById("catalog_id").value),
    name: document.getElementById("name").value,
  };
  const categoriesUrl = url + "categories";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetchApi(categoriesUrl, option);
  console.log(res);
  showAddedCategories(res);
  clearForm();
};

const showAddedCategories = (categories) => {
  let tableBody = document.getElementById("conntentProducts");
  tableBody.innerHTML += `
	<tr>
	<td></td>
	<td>${categories.catalog_id}</td>
	<td>${categories.name}</td>
</tr>
	`;
};

const submitForm = async () => {
  let catalog_id = document.getElementById("catalog_id").value;
  if (catalog_id != 0) {
    editCategories(catalog_id);
  } else {
    document.getElementById("warning").innerHTML = "id_catalog khac 0";
  }
  if (catalog_id > 0) {
    await addCategories(catalog_id);
  }
};
const clearForm = () => {
  document.getElementById("catalog_id").value = 1;
  document.getElementById("name").value = "";
};

getCategories();
