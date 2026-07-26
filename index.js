

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
        // half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) 
          sliderImage.classList.add('active');
        
        else 
        {
          sliderImage.classList.remove('active');
        }
      });
    }

// window.scrollY = 500 (has bajado 500 píxeles)
//window.innerHeight = 800 (tu ventana mide 800 píxeles)
//sliderImage.offsetTop = 1000 (la imagen empieza a los 1000 píxeles)
//sliderImage.height = 400 (la imagen mide 400 píxeles)


window.addEventListener('scroll', debounce(checkSlide))

const contenedor = document.getElementById("contenedorPedidos")
const btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", function() {

  const nuevoBloque = contenedor.querySelector(".bloquePedido").cloneNode(true);

    nuevoBloque.querySelector(".cantidad").value = 1;
    nuevoBloque.querySelector(".combos").selectedIndex = 0;

    contenedor.appendChild(nuevoBloque)
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