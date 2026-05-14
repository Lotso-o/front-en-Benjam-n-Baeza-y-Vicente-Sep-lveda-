let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

const form = document.getElementById("formPelicula");
const lista = document.getElementById("listaPeliculas");
const listaFavoritas = document.getElementById("listaFavoritas");
const filtroGenero = document.getElementById("filtroGenero");


// MENU HAMBURGUESA
document.getElementById("menuBtn")
.addEventListener("click", function(){
    document
    .getElementById("menu")
    .classList.toggle("oculto");
});


// CAMBIAR SECCIONES
function mostrarSeccion(id){

    document
    .querySelectorAll("main section")
    .forEach(sec => sec.classList.add("oculto"));

    document
    .getElementById(id)
    .classList.remove("oculto");

    if(id === "favoritas"){
        renderizarFavoritas();
    }
}

window.mostrarSeccion = mostrarSeccion;


// STORAGE
function guardarStorage(){
    localStorage.setItem(
        "peliculas",
        JSON.stringify(peliculas)
    );
}


// VALIDAR
function validarFormulario(titulo,puntaje){

    if(titulo.trim()===""){
        alert("Nombre obligatorio");
        return false;
    }

    if(puntaje < 1 || puntaje > 10){
        alert("Puntaje entre 1 y 10");
        return false;
    }

    return true;
}


// RENDER PRINCIPAL
function renderizar(data = peliculas){

    lista.innerHTML="";

    data.forEach((peli,index)=>{

        const div=document.createElement("div");
        div.className="col-md-4";

        div.innerHTML=`
            <div class="card pelicula-card p-3">
                <h5>${peli.titulo}</h5>
                <p>${peli.genero}</p>
                <p>${peli.puntaje}</p>
                <p>${peli.comentario}</p>
                <p>${peli.favorita ? "⭐" : ""}</p>

                <button
                class="btn btn-danger"
                onclick="eliminarPelicula(${index})">
                Eliminar
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}


// RENDER FAVORITAS
function renderizarFavoritas(){

    listaFavoritas.innerHTML="";

    const favoritas = peliculas.filter(
        p => p.favorita
    );

    favoritas.forEach(peli=>{

        const div=document.createElement("div");
        div.className="col-md-4";

        div.innerHTML=`
            <div class="card p-3">
                <h5>${peli.titulo}</h5>
                <p>${peli.genero}</p>
                <p>⭐</p>
            </div>
        `;

        listaFavoritas.appendChild(div);
    });
}


// ELIMINAR
function eliminarPelicula(index){
    peliculas.splice(index,1);
    guardarStorage();
    renderizar();
}
window.eliminarPelicula = eliminarPelicula;


// FORM
form.addEventListener("submit", function(e){

    e.preventDefault();

    const titulo =
    document.getElementById("titulo").value;

    const genero =
    document.getElementById("genero").value;

    const puntaje =
    Number(document.getElementById("puntaje").value);

    const comentario =
    document.getElementById("comentario").value;

    const favorita =
    document.getElementById("favorita").checked;

    if(!validarFormulario(titulo,puntaje)) return;

    peliculas.push({
        titulo,
        genero,
        puntaje,
        comentario,
        favorita
    });

    guardarStorage();
    renderizar();
    form.reset();
});


// FILTRO
filtroGenero.addEventListener("change", function(){

    const genero = filtroGenero.value;

    if(genero==="Todas"){
        renderizar();
    }else{
        renderizar(
            peliculas.filter(
                p=>p.genero===genero
            )
        );
    }
});


renderizar();

// CARGAR FOOTER
function cargarFooter() {
    const footer = document.getElementById("footer");

    if (footer) {
        fetch("./components/footer.html")
            .then(respuesta => respuesta.text())
            .then(data => {
                footer.innerHTML = data;
            })
            .catch(error => console.log(error));
    }
}

cargarFooter();