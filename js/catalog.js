// const url = "http://localhost:3000/";

// const fetchApi = async (url, option) => {
//   const res = await fetch(url, option);
//   return res.json();
// };

// // danh muc
// const getCategoriestById = async (catalog_id) => {
//   const categoriesUrl = url + "categories/" + catalog_id;
//   const option = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   return await fetchApi(categoriesUrl, option);
// };

// const getCategories = async () => {
//   const categoriesUrl = url + "categories";
//   const option = {
//     method: "GET", 
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const res = await fetchApi(categoriesUrl, option);
//   showCategories(res);
// };

// // show catalog
// const showCategories = (spbanchay) => {
// 	spbanchay = JSON.parse(categories);
//   document.getElementById("sanphambanchay").innerHTML = spbanchay.categories[0].id + " " + spbanchay.categories[0].name
// };

// getCategories ();