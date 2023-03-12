const footer = document.getElementById("footer");

const contDiv = document.createElement("div");
contDiv.classList.add("footer__container");
contDiv.innerHTML = `
      <p>AlaCachufleta</p>
      <a class="footer__container--redes" href="#"
        ><i class="fa-brands fa-whatsapp"></i
      ></a>
      <a class="footer__container--redes" href="#"
        ><i class="fa-brands fa-instagram"></i
      ></a>
      <a class="footer__container--redes" href="#"
        ><i class="fa-brands fa-facebook"></i
      ></a>
`
footer.appendChild(contDiv);

const contAutor = document.createElement("p");
contAutor.innerHTML = `@2023 | Creada por<a class="autor" href="#">Arguello Soledad</a>`
footer.appendChild(contAutor);