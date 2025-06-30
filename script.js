const keranjang = [];

function addToCart(product, price) {
      if (cart[product]) {
        cart[product].quantity += 1;
      } else {
        cart[product] = { price: price, quantity: 1 };
      }
      updateCart();
    }

    function updateCart() {
      const tableBody = document.querySelector("#cart-table tbody");
      tableBody.innerHTML = "";
      let total = 0;

      for (let item in cart) {
        const row = document.createElement("tr");
        const price = cart[item].price * cart[item].quantity;
        total += price;

        row.innerHTML = `
          <td>${item}</td>
          <td>${cart[item].quantity}</td>
          <td>Rp ${price.toLocaleString('id-ID')}</td>
        `;
        tableBody.appendChild(row);
      }

      document.getElementById("total").innerText = "Rp " + total.toLocaleString('id-ID');
    }
function checkout() {
      if (Object.keys(cart).length === 0) {
        alert("Keranjang kosong!");
      } else {
        alert("Terima kasih sudah berbelanja di GlowSkin!");
        cart = {};
        updateCart();
      }
    }

document.addEventListener("DOMContentLoaded", function () {
  const tombolBayar = document.getElementById("btnBayar");
  const form = document.querySelector("form");

  if (tombolBayar) {
    tombolBayar.addEventListener("click", function () {
      const nama = form.nama.value.trim();
      const alamat = form.alamat.value.trim();

      if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
      }

      if (nama === "" || alamat === "") {
        alert("Lengkapi data terlebih dahulu!");
        return;
      }

      const idTransaksi = generateTransaksiID();
      let total = keranjang.reduce((sum, item) => sum + item.harga, 0);

      const strukDiv = document.getElementById("struk");
      strukDiv.innerHTML = `
        <h3>Pembayaran Berhasil!</h3>
        <p>Terima kasih, <strong>${nama}</strong>!</p>
        <p>ID Transaksi: <strong>${idTransaksi}</strong></p>
        <p>Total Pembayaran: <strong>Rp${total.toLocaleString()}</strong></p>
      `;
      strukDiv.style.display = "block";

      tombolBayar.disabled = true;
      tombolBayar.innerText = "Sudah Dibayar";

      alert("Pembayaran berhasil!");
  });
});