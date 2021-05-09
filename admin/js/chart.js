let order_details = [];
window.onload = () => {
  fetch("http://localhost:3000/order_details").then((rs) => {
    rs.json().then((data) => {
      order_details = data;
      console.log(order_details);
      let name = order_details.map((item) => {
        return item.catagories_name;
      });
      let totalBanChay = 0;
      let totalHot = 0;
      let totalNoiBat = 0;
      order_details.map((item) => {
        if (item.catagories_name === "Sản phẩm nổi bật") {
          totalNoiBat += item.unit_price;
        } else if (item.catagories_name === "Sản phẩm bán chạy") {
          totalBanChay += item.unit_price;
        } else if (item.catagories_name === "Sản phẩm hot") {
          totalHot += item.unit_price;
        }
      });
      uniq = [...new Set(name)];
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: uniq,
          datasets: [
            {
              label: "# Đã bán",
              data: [totalBanChay, totalHot, totalNoiBat],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  });
};
