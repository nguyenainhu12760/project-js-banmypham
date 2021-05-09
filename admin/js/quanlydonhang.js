const url = "http://localhost:3000/";

const fetchApi = async (url, option) => {
  const res = await fetch(url, option);
  return res.json();
};

// lay don hang theo id
const getOrdersById = async (id) => {
  const ordersUrl = url + "orders/" + id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await fetchApi(ordersUrl, option);
};

const getOrders = async () => {
  const ordersUrl = url + "orders";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchApi(ordersUrl, option);
  showOrders(res);
};

// show don hang
const showOrders = (data) => {
  console.log(data);
  let tableBody = document.getElementById("conntentProducts");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    tableBody.innerHTML += `
			<tr>
				<td></td>
				<td>${item.id}</td>
				<td>${item.detailUser?.name}</td>
				<td>${item.detailUser?.phone}</td>
				<td>${item.detailUser?.address}</td>
				<td>${item.cart?.total}</td>
				<td>Chưa giao</td>
				<td>
							<button
							type="button"
							class="btn btn-outline-warning"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							onclick="getEdit(${item.id})"
							>
							Sửa
							</button>
							<button type="button" class="btn btn-outline-warning" onclick="removeOrders(${item.id})">Xóa</button>
							</td>
			</tr>
		`;
  });
};

// edit don hang
const editOrders = async (id) => {
  const data = {
    id: document.getElementById("id").value,
    customer_name: document.getElementById("customer_name").value,
    customer_phone_number: document.getElementById("customer_phone_number")
      .value,
    customer_email: document.getElementById("customer_email").value,
    customer_address: document.getElementById("customer_address").value,
    created_date: document.getElementById("created_date").value,
    quanlity: document.getElementById("quanlity").value,
    status: document.getElementById("status").value,
  };

  const ordersUrl = url + "orders/" + id;
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetchApi(ordersUrl, option);
  getOrders();
};

const getEdit = async (id) => {
  const orders = await getOrdersById(id);
  document.getElementById("id").value = orders.id;
  document.getElementById("customer_name").value = orders.customer_name;
  document.getElementById("customer_phone_number").value =
    orders.customer_phone_number;
  document.getElementById("customer_email").value = orders.customer_email;
  document.getElementById("customer_address").value = orders.customer_address;
  document.getElementById("created_date").value = orders.created_date;
  document.getElementById("status").value = orders.status;
};

// remove don hang
const removeOrders = async (id) => {
	alert("Bạn có muốn xóa đơn hàng?");
  const ordersUrl = url + "orders/" + id;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchApi(ordersUrl, option);
  getOrders();
};

const submitForm = async () => {
  let id = document.getElementById("id").value;
  if (id == 0) {
    await addOrders();
  } else {
    await editOrders(id);
  }
};
getOrders();
