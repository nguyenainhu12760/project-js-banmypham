const getEle = (id) => document.getElementById(id);
let cart;
window.onload = () => {
  cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  getEle("cartContent").innerHTML = renderCart(cart);
};

const renderCart = (arr) => {
  if (arr) {
    let content = "";
    arr.cart.forEach((item) => {
      content += `
				<div class="col-12" style="display:flex;align-item:center;justify-content:space-around">
					<div>
						<p>Tên sản phẩm: <span id="nameProduct">${item.product.name}</span></p>
						<p>Số lượng: <span id="quantityQ=Product">${item.quantity}</span></p>
						<p>Đơn giá: <span id="priceProduct">${item.product.price}</span></p>
					</div>
					<img src="${item.product.image}" style="width:200px" />
				</div>
			`;
    });
    getEle("toTalCart").innerHTML = arr.total;
    return content;
  }
};

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

getEle("checkOutContent").addEventListener("click", () => {
  let name = getEle("nameCustomer").value;
  let address = getEle("addressCustomer").value;
  let phone = getEle("phoneCustomer").value;
  let detailUser = { name, address, phone };
  let data = { detailUser, cart };
  postData("http://localhost:3000/orders", data)
    .then((data) => {
      swal("Đặt hàng thành công", "Đơn hàng đang được xử lý", "success").then(
        () => {
          location.href = "../index.html";
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

// check out
// const checkout = async () => {
//   const data = {
//     id: document.getElementById("id").value,
//     customer_name: document.getElementById("customer_name").value,
//     customer_phone_number: document.getElementById("customer_phone_number")
//       .value,
//     customer_email: document.getElementById("customer_phone_number").value,
//     customer_address: document.getElementById("customer_address").value,
//     created_date: document.getElementById("created_date").value,
//     quanlity: document.getElementById("quanlity").value,
//     status: document.getElementById("status").value,
//   };
//   const productsUrl = url + "orders";
//   const option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   const res = await fetchApi(productsUrl, option);
//   postOrderDetail(res.id);
// };
// const postOrderDetail = async (id) => {
// 	let storage = localStorage.getItem("cart");
//   if (storage) {
//     cart = JSON.parse(storage);
//   }

//   let orderDetails = [];
//   for (let index = 0; index < cart.length; index++) {
//     const item = cart[index];
//     let orderDetail = {
//       order_id: id,
//       customer_name: item.customer_name,
//       customer_phone_number: item.customer_phone_number,
//       customer_email: item.customer_email,
//       customer_address: item.customer_address,
//       created_date: item.created_date,
//       quanlity: item.quanlity,
//     };
//     orderDetails.push(orderDetail);
//   }
//   let promises = orderDetails.map((item) => {
//     return postOrderDetailAsync(item);
//   });
//   await Promise.all(promises);
//   localStorage.removeItem("cart");
//   cart = [];
//   renderCart();
// };

// const postOrderDetailAsync = async (data) => {
//   const productsUrl = url + "order_details";
//   const option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   await fetchApi(productsUrl, option);
// };
