const preguntas = document.getElementById("preguntas");

const content = document.createElement("div");
content.classList.add("preguntas__contenedor");
content.innerHTML = `
      <p class="preguntas__pregunta">¿Como realizo mi compra?</p>
      <p class="preguntas__respuesta">
       - Tenemos un Watsap para que puedas consultar modelo producto disponible y stock.<br>
       - Una vez comfirmado el disponible, al confirmar la compra seras direccionado a un formulario
       donde completaras unos datos, y te enviaremos un link de pago para concretar la compra.<br>
       - Luego te informaremos cuando retirar el producto.
      </p>

      <p class="preguntas__pregunta">¿Que formas de pago reciben?</p>
      <p class="preguntas__respuesta">
       - Recibimos efectivo, tarjetas de Debito, Credito o Transferencia bancaria, 
       tambien con link de pago en Pago Facil o Rapipagp
      </p>
      
      <p class="preguntas__pregunta">¿Como recibo mi compra?</p>
      <p class="preguntas__respuesta">
       - Una vez abonado el producto, queda disponible para ser retirado en sucursal.<br>
       - Por el momento no comtamos con envio.
      </p>
      <p class="preguntas__pregunta">¿Tiene cambio?</p>
      <p class="preguntas__respuesta">
       - ¡Si! Al momento de retirar si no estas conforme podes realizar el 
       cambio por otro producto, ya sea abonando la diferencia o por otro igual.
      </p>
`

preguntas.appendChild(content);