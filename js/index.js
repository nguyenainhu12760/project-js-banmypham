// slide show
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

document.getElementById("handleSetPopUp").addEventListener("click", () => {
  let displayModal = document.getElementById("popUpCart").style.display;
  if ((displayModal = "none")) {
    document.getElementById("popUpCart").style.display = "block";
  }
});

//
document.getElementById("closePopUp").addEventListener("click", () => {
  if ((displayModal = "block")) {
    document.getElementById("popUpCart").style.display = "none";
  }
});

// lay tat ca san pham
const products = [];
window.onload = async () => {
  fetch("http://localhost:3000/products").then((rs) => {
    rs.json().then((data) => {
      console.log(data);
      data.forEach((item) => {
        if (item.catalog_id === "1") {
          document.getElementById("sanphambanchay").innerHTML += renderSanpham(
            item
          );
        } else if (item.catalog_id === "2") {
          document.getElementById("sanphamnoibat").innerHTML += renderSanpham(
            item
          );
        } else if (item.catalog_id === "3") {
          document.getElementById("sanphamhot").innerHTML += renderSanpham(
            item
          );
        }
      });
    });
  });
};

// render san pham theo danh muc
const cart = [];
const renderSanpham = (item) => {
  if (item) {
    let content = "";
    content += `
				<div class="sp1">
					<img src="images/${item.image}" alt="">
					<p class="textsp1">${item.name}</p>
					<p class="giasp1">${item.price}$</p>
						<button
							type="button"
							class="btn btn-danger"
							onClick="handleAddToCart('${item.id}')"
						>
							Thêm vào giỏ hàng
					</button>
				</div>
			`;
    return content;
  }
};

window.handleAddToCart = (id) => {
  fetch(`http://localhost:3000/products?id=${id}`).then((rs) => {
    rs.json().then((product) => {
      let temp = { product: product[0], quantity: 1 };
      let index = cart.findIndex((item) => {
        return item.product.id === id;
      });
      if (index === -1) {
        cart.push(temp);
        document.getElementById("cartContent").innerHTML = renderCart(cart);
      } else {
        cart[index].quantity += 1;
        document.getElementById("cartContent").innerHTML = renderCart(cart);
      }
    });
  });
};

// render CART
let quantity = 1;
const renderCart = (arr) => {
  if (arr) {
    let content = "";
    let total = 0;
    arr.forEach((item) => {
      total += Number(item.product.price) * item.quantity;
      content += `
				<span style="font-size: 16px; font-family: sans-serif;text-transform: uppercase; color:#8e7f7f">Tên sản phẩm: ${
          item.product.name
        } </span>
				<br>
				<span style="font-size: 16px; color:#8e7f7f; font-family: sans-serif;text-transform: uppercase;" >Hình ảnh: <img src="images/${
          item.product.image
        }" style="width: 100px; border-radius: 5px; margin-top: 18px;" alt=""></span>
				<br>
				<label for="quantity" style="font-size: 16px; color:#8e7f7f;font-family: sans-serif;text-transform: uppercase;">Số lượng: </label>
				<input type="number" style ="width: 20%; margin-top: 20px; border: 2px solid #fff; border-radius: 5px; " value=${
          item.quantity
        } min="1" disabled style="margin-top: 18px;" />
				<button type="button" onClick="handleIncreaseValue('${
          item.product.id
        }','true')">+</button>
				<button type="button" onClick="handleIncreaseValue('${
          item.product.id
        }','false')">-</button>
				<br>
				<span style="font-size: 16px; color:#8e7f7f; font-family: sans-serif;text-transform: uppercase; ">Thành tiền: ${
          Number(item.product.price) * item.quantity
        }</span>
				<br>
				
			`;
    });
    document.getElementById("total").innerHTML = total;
    return content;
  }
};

window.handleIncreaseValue = (id, status) => {
  cart.forEach((item) => {
    if (item.product.id === id) {
      if (status === "true") {
        item.quantity += 1;
        document.getElementById("cartContent").innerHTML = renderCart(cart);
      } else if (status === "false" && item.quantity > 1) {
        item.quantity -= 1;
        document.getElementById("cartContent").innerHTML = renderCart(cart);
      }
    }
  });
};

document.getElementById("handleCheckOut").addEventListener("click", () => {
  let total = document.getElementById("total").innerHTML;
  let temp = { cart, total };
  localStorage.setItem("cart", JSON.stringify(temp));
  location.href = "../checkout.html";
});

// share fb
	let facebookbtn = document.getElementById("faceBook");
	console.log(facebookbtn);
  let postUrl = encodeURI(document.location.href);
  let postTitle = encodeURI("check this out");
  facebookbtn.setAttribute(
    "href",
    `https://www.facebook.com/sharer.php?u=${postUrl}`
  );

