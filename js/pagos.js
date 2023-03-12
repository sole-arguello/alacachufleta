const pagos = document.getElementById("pagos");


const contImg = document.createElement("img");
contImg.classList.add("pago__contenedor--img")
contImg.src = "./img/modo-de-pago.png";
contImg.alt = "Inagen de forma de pago";
pagos.appendChild(contImg);

const contentDiv = document.createElement("div");
contentDiv.classList.add("pago__contenedor--info");
contentDiv.innerHTML = ` 

  <i class="bi bi-cash-coin"><b class="icono">Efectivo</b></i>
  <i class="bi bi-bank"><b class="icono">Transferencia Bancaria</b></i>
  <i class="bi bi-phone-vibrate-fill"><b class="icono">Mercado Pago</b></i>
  <i class="bi bi-wallet2"><b class="icono">Pago Facil - Rapipago</b></i>

`
pagos.appendChild(contentDiv);