
/* =========================================================
   CIUDAD BROASTER — index.js
   ========================================================= */

/* ---------- 1. Animación de entrada de las imágenes ---------- */

function debounce(fn, wait = 30) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // Mitad de la imagen
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.offsetHeight / 2;
    // Borde inferior de la imagen
    const imageBottom = sliderImage.offsetTop + sliderImage.offsetHeight;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
window.addEventListener('resize', debounce(checkSlide));
// Importante: sin esto, las imágenes visibles al cargar se quedan invisibles
// hasta que el usuario hace scroll.
window.addEventListener('load', checkSlide);
checkSlide();


/* ---------- 2. Bloques de pedido ---------- */

const contenedor = document.getElementById('contenedorPedidos');
const btnAgregar = document.getElementById('btnAgregar');

// Una sola fuente de verdad: el bloque que ya está en el HTML.
// Así no hay que mantener la lista de platos en dos sitios.
const plantillaBloque = contenedor.querySelector('.bloquePedido').cloneNode(true);

function bloqueLimpio() {
  const nuevo = plantillaBloque.cloneNode(true);
  nuevo.querySelector('.cantidad').value = 1;
  nuevo.querySelector('.combos').selectedIndex = 0;
  return nuevo;
}

// El botón de eliminar solo tiene sentido si hay más de un pedido.
function actualizarBotonesEliminar() {
  const bloques = contenedor.querySelectorAll('.bloquePedido');
  bloques.forEach(bloque => {
    bloque.querySelector('.btnEliminar').hidden = bloques.length === 1;
  });
}

btnAgregar.addEventListener('click', function () {
  contenedor.appendChild(bloqueLimpio());
  actualizarBotonesEliminar();
});

contenedor.addEventListener('click', function (e) {
  if (!e.target.classList.contains('btnEliminar')) return;
  e.target.closest('.bloquePedido').remove();
  actualizarBotonesEliminar();
});

actualizarBotonesEliminar();


/* ---------- 3. Envío por WhatsApp ---------- */

const NUMERO_WHATSAPP = '584147436059';
const formulario = document.getElementById('formPedido');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('PrimerNombre').value.trim();
  const direccion = document.getElementById('DireccionEntrega').value.trim();
  const telefono = document.getElementById('telefonoContacto').value.trim();

  const lineas = [];
  document.querySelectorAll('.bloquePedido').forEach((bloque, i) => {
    const plato = bloque.querySelector('.combos').value;
    const cantidad = bloque.querySelector('.cantidad').value;
    lineas.push(`Pedido ${i + 1}: ${cantidad} x ${plato}`);
  });

  const mensaje =
    '¡Hola! Me gustaría ordenar lo siguiente:\n' +
    `Nombre: ${nombre}\n` +
    `Dirección: ${direccion}\n` +
    `Teléfono: ${telefono}\n` +
    lineas.join('\n');

  // encodeURIComponent es obligatorio: sin esto, un plato con "&"
  // (Green & Crispy) corta el mensaje a la mitad.
  window.open(
    `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`,
    '_blank'
  );
});