// 1. Inicialización de datos (Cargar desde localStorage)
let peliculas = JSON.parse(localStorage.getItem('bibliotecaPeliculas')) || [];

// Captura de elementos
const formPelicula = document.getElementById('formPelicula');
const contenedor = document.getElementById('contenedorPeliculas');
const filtroGenero = document.getElementById('filtroGenero');
const btnVerFavoritas = document.getElementById('btnVerFavoritas');
const btnLimpiarFiltro = document.getElementById('btnLimpiarFiltro');

// 2. Función Reutilizable: Guardar datos
const actualizarStorage = () => {
    localStorage.setItem('bibliotecaPeliculas', JSON.stringify(peliculas));
};

// 3. Función Reutilizable: Renderizar (Mostrar en pantalla)
const renderizar = (lista = peliculas) => {
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de dibujar

    if (lista.length === 0) {
        contenedor.innerHTML = '<p class="text-center w-100 text-muted py-5">No hay películas registradas para mostrar.</p>';
        return;
    }

    lista.forEach((peli, index) => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <div class="card h-100 shadow-sm border-0 card-pelicula position-relative">
                <span class="badge bg-warning text-dark badge-puntaje">⭐ ${peli.puntaje}/10</span>
                <div class="card-body pt-4">
                    <h5 class="card-title fw-bold">${peli.titulo}</h5>
                    <h6 class="card-subtitle mb-2 text-primary">${peli.genero}</h6>
                    <p class="card-text text-muted small">"${peli.comentario || 'Sin comentarios'}"</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="favorito-label">${peli.favorita ? '❤️ Favorita' : ''}</span>
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarPelicula(${index})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });
};

// 4. Registrar Película (Evento Submit)
formPelicula.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura de valores de los inputs
    const titulo = document.getElementById('titulo').value.trim();
    const genero = document.getElementById('genero').value;
    const puntaje = parseInt(document.getElementById('puntaje').value);
    const comentario = document.getElementById('comentario').value.trim();
    const favorita = document.getElementById('favorita').checked;

    // VALIDACIONES
    if (titulo === "") {
        alert("El nombre de la película es obligatorio.");
        return;
    }
    if (isNaN(puntaje) || puntaje < 1 || puntaje > 10) {
        alert("El puntaje debe ser un número entre 1 y 10.");
        return;
    }

    // Crear OBJETO
    const nuevaPeli = {
        titulo,
        genero,
        puntaje,
        comentario,
        favorita
    };

    // Agregar al ARREGLO y actualizar
    peliculas.push(nuevaPeli);
    actualizarStorage();
    renderizar();
    formPelicula.reset();
});

// 5. Eliminar Película
window.eliminarPelicula = (index) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta película?")) {
        peliculas.splice(index, 1);
        actualizarStorage();
        renderizar();
    }
};

// 6. Filtros
filtroGenero.addEventListener('change', (e) => {
    const seleccion = e.target.value;
    if (seleccion === "Todos") {
        renderizar(peliculas);
    } else {
        const filtradas = peliculas.filter(p => p.genero === seleccion);
        renderizar(filtradas);
    }
});

btnVerFavoritas.addEventListener('click', () => {
    const soloFavoritas = peliculas.filter(p => p.favorita);
    renderizar(soloFavoritas);
});

btnLimpiarFiltro.addEventListener('click', () => {
    renderizar(peliculas);
    filtroGenero.value = "Todos";
});

// Carga inicial
renderizar();
