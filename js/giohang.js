// var removeCartItemButtons = document.getElementsByClassName('btn-danger')
// console.log(removeCartItemButtons)
// for (var i = 0; i < removeCartItemButtons.length; i++) {
// 	var button = removeCartItemButtons[i];
// 	button.addEventListener('click', function (event) {
// 		var buttonClicked = event.target
// 		buttonClicked.parentElement.parentElement.remove()
// 	})

// }

// let carts = document.querySelectorAll(".btn btn-danger");
// let products = [
// 	{
// 		name: 'demo',
// 		tag: 'demoluon',
// 		price: 14,
// 		inCart: 0
// 	},
// 	{
// 		name: 'demo2',
// 		tag: 'demoluon2',
// 		price: 14,
// 		inCart: 1
// 	}
// ];
// for (let i = 0; i < carts.length; i++) {
//   carts[i].addEventListener("click", () => {
//     cartNumbers();
//   });
//   function cartNumbers() {
//     let productNumbers = localStorage.getItem("cartNumbers");

// 		productNumbers = parseInt(productNumbers);

// 		if (productNumbers) {
// 			localStorage.setItem("cartNumbers",productNumbers + 1);

// 		} else {
// 			localStorage.setItem("cartNumbers", 1);
// 			document.querySelector('.cart span').textContent = 1;

// 		}
// 	}
// 	onloadcartNumbers()
// }

// var shoppingCart = (function () {
//   cart = [];

//   function Item(name, price, count) {
//     this.name = name;
//     this.price = price;
//     this.count = count;
//   }

//   // luu gio hang
//   function saveCart() {
//     sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
//   }
//   // load gio hang
//   function loadCart() {
//     cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
//   }
//   if (sessionStorage.getItem("shoppingCart") != null) {
//     loadCart();
//   }

// 	var obj = {};
	
//   // them vao gio hang
//   obj.addItemToCart = function (name, price, count) {
//     for (var item in cart) {
//       if (cart[item].name === name) {
//         cart[item].count++;
//         saveCart();
//         return;
//       }
//     }
//     var item = new Item(name, price, count);
//     cart.push(item);
//     saveCart();
// 	};
	
//   // dem so luong item trong gio hang
//   obj.setCountForItem = function (name, count) {
//     for (var i in cart) {
//       if (cart[i].name === name) {
//         cart[i].count = count;
//         break;
//       }
//     }
// 	};
	
//   // remove 1 item trong gio hang
//   obj.removeItemFromCart = function (name) {
//     for (var item in cart) {
//       if (cart[item].name === name) {
//         cart[item].count--;
//         if (cart[item].count === 0) {
//           cart.splice(item, 1);
//         }
//         break;
//       }
//     }
//     saveCart();
// 	};
	
//   // remove tat ca cac item trong gio hang
//   obj.removeItemFromCartAll = function (name) {
//     for (var item in cart) {
//       if (cart[item].name === name) {
//         cart.splice(item, 1);
//         break;
//       }
//     }
//     saveCart();
//   };

//   // Clear cart
//   obj.clearCart = function () {
//     cart = [];
//     saveCart();
// 	};
	
// 	// dem so luong item trong gio hang 
//   obj.totalCount = function() {
//     var totalCount = 0;
//     for(var item in cart) {
//       totalCount += cart[item].count;
//     }
//     return totalCount;
// 	}
	
// 	// tat ca so luong item trong gio hang
// 	obj.totalCart = function() {
//     var totalCart = 0;
//     for(var item in cart) {
//       totalCart += cart[item].price * cart[item].count;
//     }
//     return Number(totalCart.toFixed(2));
// 	}
	
// 	// list cart
// 	obj.listCart = function() {
//     var cartCopy = [];
//     for(i in cart) {
//       item = cart[i];
//       itemCopy = {};
//       for(p in item) {
//         itemCopy[p] = item[p];

//       }
//       itemCopy.total = Number(item.price * item.count).toFixed(2);
//       cartCopy.push(itemCopy)
//     }
//     return cartCopy;
// 	}
// 	return obj;
// })();

// // thêm item
// $('.add-to-cart').click(function(event) {
//   event.preventDefault();
//   var name = $(this).data('name');
//   var price = Number($(this).data('price'));
//   shoppingCart.addItemToCart(name, price, 1);
//   displayCart();
// });

// // Clear items
// $('.clear-cart').click(function() {
//   shoppingCart.clearCart();
//   displayCart();
// });

// function displayCart() {
//   var cartArray = shoppingCart.listCart();
//   var output = "";
//   for(var i in cartArray) {
//     output += "<tr>"
//       + "<td>" + cartArray[i].name + "</td>" 
//       + "<td>(" + cartArray[i].price + ")</td>"
//       + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
//       + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
//       + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
//       + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
//       + " = " 
//       + "<td>" + cartArray[i].total + "</td>" 
//       +  "</tr>";
//   }
//   $('.show-cart').html(output);
//   $('.total-cart').html(shoppingCart.totalCart());
//   $('.total-count').html(shoppingCart.totalCount());
// }

// // Delete item button

// $('.show-cart').on("click", ".delete-item", function(event) {
//   var name = $(this).data('name')
//   shoppingCart.removeItemFromCartAll(name);
//   displayCart();
// })


// // -1
// $('.show-cart').on("click", ".minus-item", function(event) {
//   var name = $(this).data('name')
//   shoppingCart.removeItemFromCart(name);
//   displayCart();
// })
// // +1
// $('.show-cart').on("click", ".plus-item", function(event) {
//   var name = $(this).data('name')
//   shoppingCart.addItemToCart(name);
//   displayCart();
// })

// // Item count input
// $('.show-cart').on("change", ".item-count", function(event) {
//    var name = $(this).data('name');
//    var count = Number($(this).val());
//   shoppingCart.setCountForItem(name, count);
//   displayCart();
// });

// displayCart();

// const url = "http://localhost:3000/";

// const fetchApi = async (url, option) => {
//   const res = await fetch(url, option);
//   return res.json();
// };

// const getProductById = async (id) => {
//   const productsUrl = url + "products/" + id;
//   const option = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   return await fetchApi(productsUrl, option);
// };

// const getProducts = async () => {
//   const productsUrl = url + "products";
//   const option = {
//     method: "GET", 
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const res = await fetchApi(productsUrl, option);
//   showProducts(res);
// };

// getProducts();
