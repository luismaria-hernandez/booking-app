//ELEMENTOS HTML

let btnBuscar = document.getElementById("buscar");
let contenedor = document.getElementById("reservaVisor");
let btnIngresar = document.getElementById("ingresar");
let areaUsuario = document.getElementById("areaUsuario");
let misReservas = document.getElementById("misReservas");

//CLASES

class Reservas {
  constructor(id, src, nombre, ingreso, egreso, adultos, ninos) {
    this.id = parseInt(id);
    this.src = src;
    this.nombre = nombre;
    this.ingreso = new Date(ingreso);
    this.egreso = new Date(egreso);
    this.adultos = parseInt(adultos);
    this.ninos = parseInt(ninos);
  }

  calcularDias() {
    let cantDias = this.egreso.getDate() - this.ingreso.getDate();

    return cantDias;
  }

  escribirIngreso() {
    let formatoFinal =
      this.ingreso.getDate() +
      1 +
      "/" +
      (this.ingreso.getMonth() + 1) +
      "/" +
      this.ingreso.getFullYear();

    return formatoFinal;
  }

  escribirEgreso() {
    let formatoFinal =
      this.egreso.getDate() +
      1 +
      "/" +
      (this.egreso.getMonth() + 1) +
      "/" +
      this.egreso.getFullYear();

    return formatoFinal;
  }

  calcularPrecio() {
    let precioAdultos = 3500 * this.adultos;
    let precioNinos = 1500 * this.adultos;

    let precioTotal = (precioAdultos + precioNinos) * this.calcularDias();

    return precioTotal;
  }
}

//VARIABLES

const cabanas = [
  {
    id: 1,
    src: "recursos/cabaña1.jpg",
    nombre: "Los Osos",
    ingreso: "2022-10-3",
    egreso: "2022-10-9",
    adultos: 2,
    ninos: 2,
  },
  {
    id: 2,
    src: "recursos/cabaña2.jpg",
    nombre: "Los Pumas",
    ingreso: "2022-10-10",
    egreso: "2022-10-16",
    adultos: 7,
    ninos: 0,
  },
  {
    id: 3,
    src: "recursos/cabaña3.jpg",
    nombre: "Los Álamos",
    ingreso: "2022-10-17",
    egreso: "2022-10-23",
    adultos: 4,
    ninos: 4,
  },
  {
    id: 4,
    src: "recursos/cabaña4.jpg",
    nombre: "Los vados",
    ingreso: "2022-10-3",
    egreso: "2022-10-9",
    adultos: 2,
    ninos: 2,
  },
];
const carrito = [];

const reservas = [];

//FUNCIONES

function comprobarUsuario(){

    let mail = sessionStorage.getItem('mail');
    let control = true;

    if(mail == null){
        alert('Para poder reservar tiene que ingresar al sistema');
        control = false;

        location.href ="paginas/login.html";
    }

    return control;
}

function guardarReserva(idReserva) {

  const item = reservas.find((res) => (res.id = idReserva));
  carrito.push(item);

  if (carrito.length != 0) {

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
    alert('Agregado a "Mis Reservas"');

    location.href="paginas/mis-reservas.html";
  }

}

function usuarioLoggeado(){

    let mail = sessionStorage.getItem('mail');

    if(areaUsuario != null){

        if(mail != null){
            areaUsuario.innerHTML = `<nav class="header__nav-areausuario-nav">
            <ul class="header__nav-areausuario-nav-lista">
                <li class="header__nav-areausuario-nav-lista-item"><a href="#">${mail}</a></li>
                <li class="header__nav-areausuario-nav-lista-item"><a href="#"><i class="fa-solid fa-arrow-right-from-bracket"></i></a></li>
            </ul>
        </nav>`;

        }else {
            areaUsuario.innerHTML = `<a class="header__nav-areausuario-ingresar" href="paginas/login.html">Ingresar</a>`;
        }
    }
}

function verMisReservas(){

  let mail = sessionStorage.getItem('mail');

  if(misReservas != null){

    if(mail != null){
      const carritoReservas = JSON.parse(sessionStorage.getItem('carrito'));

      console.log(carritoReservas);

      carritoReservas.forEach(cr => {

        misReservas.innerHTML += `<article class="main__misreservas-visor-tarjeta">
        <img class="main__misreservas-visor-tarjeta-img" src="../${cr.src}">
        <table class="main__misreservas-visor-tarjeta-tabla">
            <thead>
                <th>Nombre</th><th>Entrada</th><th>Salida</th><th>Adultos</th><th>Niños</th><th>Precio</th><th>Acciones</th>
            </thead>
            <tbody>
                <td>${
                  cr.nombre
                }</td><td>${cr.ingreso}</td><td>${cr.egreso}</td><td>${
          cr.adultos
        }</td><td>${
          cr.ninos
        }</td><td>$-</td></td><td><button class="main__misreservas-visor-tarjeta-tabla-botonE agregar-carrito" id="boton${
          cr.id
        }">Eliminar</button></td>
                        </tbody>
                    </table>
                </article>`;

      });
    }
    else {
      misReservas.innerHTML += `<p class="main__reserva-visor-noResult">No hay reservas</p>`;
    }
  }

}

//EVENTOS
window.onload = usuarioLoggeado();
window.onload = verMisReservas();

if (btnBuscar != null) {
  btnBuscar.addEventListener("click", () => {
    reservas.length = 0;
    contenedor.innerHTML = ``;

    let ingreso = new Date(document.getElementById("ingreso").value);
    let egreso = new Date(document.getElementById("egreso").value);
    let adultos = document.getElementById("adultos").value;
    let ninos = document.getElementById("ninos").value;

    cabanas.forEach((e) => {
      let fecha1 = new Date(e.ingreso);
      let fecha2 = new Date(e.egreso);

      if (
        ingreso >= fecha1 &&
        egreso <= fecha2 &&
        adultos <= e.adultos &&
        ninos <= e.ninos
      ) {
        const r = new Reservas(
          e.id,
          e.src,
          e.nombre,
          ingreso,
          egreso,
          adultos,
          ninos
        );

        reservas.push(r);

        console.log(reservas);
      }
    });

    if (reservas.length != 0) {
      reservas.forEach((r) => {
        const card = `<article class="main__reserva-visor-tarjeta">
            <img class="main__reserva-visor-tarjeta-img" src="${r.src}">
            <table class="main__reserva-visor-tarjeta-tabla">
                <thead>
                    <th>Nombre</th><th>Entrada</th><th>Salida</th><th>Adultos</th><th>Niños</th><th>Precio</th><th>Acciones</th>
                </thead>
                <tbody>
                    <td>${
                      r.nombre
                    }</td><td>${r.escribirIngreso()}</td><td>${r.escribirEgreso()}</td><td>${
          r.adultos
        }</td><td>${
          r.ninos
        }</td><td>$${r.calcularPrecio()}</td></td><td><button class="main__reserva-visor-tarjeta-tabla-botonR agregar-carrito" id="boton${
          r.id
        }">Reservar</button></td>
                </tbody>
            </table>
        </article>`;

        contenedor.innerHTML += card;

        const btnReservar = document.getElementById(`boton${r.id}`);

        btnReservar.addEventListener("click", () => {
          if (comprobarUsuario()) {
            guardarReserva(r.id)
          }
        });
      });
    } else {
      contenedor.innerHTML += `<p class="main__reserva-visor-noResult">No se han encontrado resultados</p>`;
    }
  });
}

if(btnIngresar!=null){
    btnIngresar.addEventListener('click',()=>{
        
        let mail = document.getElementById('mail').value;
        let clave = document.getElementById('clave').value;

        console.log(mail);
        console.log(clave);

        if(mail == 'usuario@mail.com' && clave == 'clave123')
        {
            sessionStorage.setItem('mail',mail);
            alert('Ingreso exitoso');
            location.href = "../index.html";
            
        }
        else {
            alert('Usuario o contraseña inválida. Por favor, intente de nuevo.');
        }

    });

}
