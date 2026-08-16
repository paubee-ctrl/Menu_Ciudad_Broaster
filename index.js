

function debounce(checkSlide, wait = 30) 
{
    let timeout; // esta variable tiene el tiempo de wait
    
    return function () 
    {
        clearTimeout(timeout) // en caso de que haya un tiempo, se reinicia el código
         // se restaura desde 0
        timeout = setTimeout(checkSlide, wait)
    }
}

const sliderImages = document.querySelectorAll('.slide-in');

 function checkSlide() {
    sliderImages.forEach(sliderImage => {
        const caja = sliderImage.getBoundingClientRect();

        // La mitad de la imagen ya entró por abajo de la pantalla
        const yaEntro = caja.top + caja.height / 2 < window.innerHeight;
        // Todavía no salió por arriba
        const noSalio = caja.bottom > 0;

        if (yaEntro && noSalio) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}



window.addEventListener('scroll', debounce(checkSlide))
window.addEventListener('resize', debounce(checkSlide))   // nueva
window.addEventListener('load', checkSlide)               // nueva

const contenedor = document.getElementById("contenedorPedidos")
const btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", function() {

  const elbloque = contenedor.querySelector(".bloquePedido")
  if(elbloque === null)
  {
     contenedor.innerHTML += `<div class="bloquePedido">
        <p>
          <label>Pedido a Realizar: </label>
          <select class="combos" name="combos">
            <option value="Combo Hamburguesa">Combo Hamburguesa</option>
            <option value="Combo Club House">Combo Club House</option>
            <option value="Combo Kids">Combo Kids</option>
            <option value="Combo Fit">Combo Fit</option>
            <option value="Combo Green & Crispy">Combo Green & Crispy</option>
            <option value="Combo Crujiente">Combo Crujiente</option>
            <option value="Combo Pana">Combo Pana</option>
            <option value="Combo Milanesa">Combo Milanesa</option>
            <option value="Combo Cordon Bleu">Combo Cordon Bleu</option>
            <option value="Combo Individual">Combo Individual</option>
            <option value="Combo 2 Piezas">Combo 2 Piezas</option>
            <option value="Combo 3 Piezas">Combo 3 Piezas</option>
            <option value="Combo 4 Piezas">Combo 4 Piezas</option>
            <option value="Combo 5 Piezas">Combo 5 Piezas</option>
            <option value="Combo Familiar Pequeño">Combo Familiar Pequeño</option>
            <option value="Combo Familiar Grande">Combo Familiar Grande</option>
          </select>
        </p>
        <p>
          <label>Indica Cuántos: </label>
          <input type="number" class="cantidad" min="1" max="10" step="1" value="1">
        </p>
         <button type="button" class="btnEliminar">Eliminar Pedido</button>

      </div>`
  }

  else
  {
    const nuevoBloque = contenedor.querySelector(".bloquePedido").cloneNode(true);

    nuevoBloque.querySelector(".cantidad").value = 1;
    nuevoBloque.querySelector(".combos").selectedIndex = 0;

    contenedor.appendChild(nuevoBloque)
  }


})


contenedor.addEventListener("click", function (e) 
{
  // Verificamos si lo que clickearon tiene la clase "btnEliminar"
  if(e.target.classList.contains("btnEliminar")) 
  { /// el boton que acabo de tocar tiene la clase btnEliminar? 
    const bloque = e.target.closest(".bloquePedido"); // yo o alguno de mis padres tiene está clase? busca desde mi hasta arriba
    bloque.remove(); // si la tiene eliminala. 
  }
});

const formulario = document.getElementById("miFormulario");


formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("PrimerNombre").value;
  const direccion = document.getElementById("DirecciónEntrega").value;
  const telefono = document.getElementById("telefonoContacto").value;

  const bloques = document.querySelectorAll(".bloquePedido");
  let listaPedidos = "";

  bloques.forEach((bloque, index) => {
    const combo = bloque.querySelector(".combos").value;
    const cantidad = bloque.querySelector(".cantidad").value;
    listaPedidos =  listaPedidos + `Pedido ${index + 1}: ${cantidad} x ${combo}%0A`;
  });

  const texto =
    `¡Hola! Me gustaría ordenar lo siguiente:%0A` +
    `Nombre: ${nombre}%0A` +
    `Dirección: ${direccion}%0A` +
    `Teléfono: ${telefono}%0A` +
    listaPedidos;

  const numeroWhatsApp = "584147436059"; 
  const url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;
  window.open(url, "_blank");
});