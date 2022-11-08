"use strict";

//ELEMENTOS HTML

let btnBuscar = document.getElementById("buscar");
let contenedor = document.getElementById("reservaVisor");
let btnIngresar = document.getElementById("ingresar");
let areaUsuario = document.getElementById("areaUsuario");
let misReservas = document.getElementById("misReservas");

//CLASES

class Estadias {
  constructor(id, src, nombre, ingreso, egreso, adultos, ninos) {
    this.id = parseInt(id);
    this.src = src;
    this.nombre = nombre;
    this.ingreso = ingreso;
    this.egreso = egreso;
    this.adultos = parseInt(adultos);
    this.ninos = parseInt(ninos);
  }

  calcularDias() {
    let cantDias = this.egreso.diff(this.ingreso);

    return cantDias.as('days');

  }

  calcularPrecio() {
    let precioAdultos = 3500 * this.adultos;
    let precioNinos = 1500 * this.adultos;

    let precioTotal = (precioAdultos + precioNinos) * this.calcularDias();

    return precioTotal;
  }
}

class Reservaciones {
  constructor(id,src,nombre,entrada,salida,adultos,ninos,precio){
    this.id=id;
    this.src=src;
    this.nombre=nombre;
    this.entrada=entrada;
    this.salida=salida;
    this.adultos=adultos;
    this.ninos=ninos;
    this.precio=precio;
  }
}

//VARIABLES

const cabanas = [
  {
    id: 1,
    src: "recursos/cabaña1.jpg",
    nombre: "Los Osos",
    ingreso: "2022-11-07",
    egreso: "2022-11-13",
    adultos: 2,
    ninos: 2,
  },
  {
    id: 2,
    src: "recursos/cabaña2.jpg",
    nombre: "Los Pumas",
    ingreso: "2022-11-14",
    egreso: "2022-11-20",
    adultos: 7,
    ninos: 0,
  },
  {
    id: 3,
    src: "recursos/cabaña3.jpg",
    nombre: "Los Álamos",
    ingreso: "2022-11-21",
    egreso: "2022-11-27",
    adultos: 4,
    ninos: 4,
  },
  {
    id: 4,
    src: "recursos/cabaña4.jpg",
    nombre: "Los vados",
    ingreso: "2022-11-07",
    egreso: "2022-11-13",
    adultos: 2,
    ninos: 2,
  },
];
const reservas = [];
const encontrado = [];

//FUNCIONES

function comprobarUsuario() {
  let mail = sessionStorage.getItem("mail");
  let control = true;

  if (mail == null) {
    Swal.fire({
      title: 'Atención',
      text: 'Para poder reservar tiene que ingresar al sistema',
      icon: 'info'
    }).then((resultado) =>{
      if(resultado.isConfirmed){
        location.href = "paginas/login.html";
      }
    }); 
    control = false;   
  }

  return control;
}

function guardarReserva(idItem) {

  const item = encontrado.find((enc)=>enc.id = idItem);
  const DateTime = luxon.DateTime;

  let id = item.id;
  let src = item.src;
  let nombre = item.nombre;
  let ingreso = DateTime.fromISO(item.ingreso);
  let egreso = DateTime.fromISO(item.egreso);
  let adultos = item.adultos;
  let ninos = item.ninos;
  let precio = item.calcularPrecio();

  const r = new Reservaciones(id,src,nombre,(ingreso).toFormat('yyyy-MM-dd'),(egreso).toFormat('yyyy-MM-dd'),adultos,ninos,precio);

  reservas.push(r);
  verMisReservas();

  console.log(reservas);

  Swal.fire({
    title: "Agregado a mis reservas",
    icon: "info"
  });

}

function usuarioLoggeado() {
  let mail = sessionStorage.getItem("mail");

  if (areaUsuario != null) {
    if (mail != null) {
      areaUsuario.innerHTML = `<nav class="header__nav-areausuario-nav">
            <ul class="header__nav-areausuario-nav-lista">
                <li class="header__nav-areausuario-nav-lista-item"><a href="#">${mail}</a></li>
                <li class="header__nav-areausuario-nav-lista-item"><button type="button" id="cerrarSesion"><i class="fa-solid fa-arrow-right-from-bracket"></i></button></li>
            </ul>
        </nav>`;

        let btnCerrarSesion = document.getElementById("cerrarSesion");

        btnCerrarSesion.addEventListener("click",()=>{

          Swal.fire({
            title: 'Está seguro que desea cerrar sesión?',
            text: 'Al cerrar sesión se perderan los datos de las reservas que haya hecho hasta el momento',
            icon: 'warning',
            showCancelButton: true,
          }).then((respuesta) =>{
            if(respuesta.isConfirmed){
              sessionStorage.removeItem('mail');
              location.href="index.html";
            }
          });
        });

    } else {
      areaUsuario.innerHTML = `<a class="header__nav-areausuario-ingresar" href="paginas/login.html">Ingresar</a>`;
    }
  }
}

function eliminarReserva(id){

  const item = reservas.find((res) => res.id = id);

  let posicion = reservas.indexOf(item);

}

function verMisReservas() {
  let mail = sessionStorage.getItem("mail");

  if (misReservas != null) {
    if (mail != null) {

      misReservas.innerHTML =``;

      reservas.forEach((r) => {

        let {
          id,
          src,
          nombre,
          entrada,
          salida,
          adultos,
          ninos,
          precio
        } = r

        console.log(reservas);

        misReservas.innerHTML += `<article class="main__misreservas-visor-tarjeta">
        <img class="main__misreservas-visor-tarjeta-img" src="../${src}">
        <table class="main__misreservas-visor-tarjeta-tabla">
            <thead>
                <th>Nombre</th><th>Entrada</th><th>Salida</th><th>Adultos</th><th>Niños</th><th>Precio</th><th>Acciones</th>
            </thead>
            <tbody>
                <td>${nombre}</td><td>${entrada}</td><td>${salida}</td><td>${adultos}</td><td>${ninos}</td><td>${precio}</td></td><td><button class="main__misreservas-visor-tarjeta-tabla-botonE" id="boton${id}">Eliminar</button></td>
                        </tbody>
                    </table>
                </article>`;
        
        let btnEliminar = document.getElementById(`boton${id}`);
        
        btnEliminar.addEventListener('click',()=>{
            eliminarReserva(id);
        });
        
      });
    } else {
      misReservas.innerHTML += `<p class="main__reserva-visor-noResult">No hay reservas</p>`;
    }
  }
}

function configurarFechas() {

  const DateTime = luxon.DateTime;

  let fechas = document.querySelectorAll('input[type="date"]');
  let inicio = DateTime.now().toFormat('yyyy-MM-dd');
  let fin = DateTime.now().plus({months:4}).toFormat('yyyy-MM-dd');

  fechas.forEach(e=>{
    e.setAttribute("min",inicio);
    e.setAttribute("max",fin);
  });

}

//EVENTOS
window.onload = usuarioLoggeado();
window.onload = verMisReservas();
window.onload = configurarFechas();

if (btnBuscar != null) {
  btnBuscar.addEventListener("click", () => {
    
    const DateTime = luxon.DateTime;
    encontrado.length=0;
    contenedor.innerHTML = ``;

    let ingreso = DateTime.fromISO(document.getElementById("ingreso").value);
    let egreso = DateTime.fromISO(document.getElementById("egreso").value);
    let adultos = document.getElementById("adultos").value;
    let ninos = document.getElementById("ninos").value;

    cabanas.forEach((e) => {
      let fecha1 = DateTime.fromISO(e.ingreso);
      let fecha2 = DateTime.fromISO(e.egreso);

      if (ingreso >= fecha1 && egreso <= fecha2 && adultos <= e.adultos && ninos <= e.ninos) {
        const estadia = new Estadias(e.id,e.src,e.nombre,ingreso,egreso,adultos,ninos);

        encontrado.push(estadia);
      }
    });

    if (encontrado.length != 0) {
      encontrado.forEach((encontrado) => {

        let {
          id,
          src,
          nombre,
          ingreso,
          egreso,
          adultos,
          ninos
        } = encontrado

        const card = `<article class="main__reserva-visor-tarjeta">
            <img class="main__reserva-visor-tarjeta-img" src="${src}">
            <table class="main__reserva-visor-tarjeta-tabla">
                <thead>
                    <th>Nombre</th><th>Entrada</th><th>Salida</th><th>Adultos</th><th>Niños</th><th>Precio</th><th>Acciones</th>
                </thead>
                <tbody>
                    <td>${
                      nombre
                    }</td><td>${(ingreso).toFormat('yyyy-MM-dd')}</td><td>${(egreso).toFormat('yyyy-MM-dd')}</td><td>${
          adultos
        }</td><td>${
          ninos
        }</td><td>$${encontrado.calcularPrecio()}</td></td><td><button class="main__reserva-visor-tarjeta-tabla-botonR agregar-carrito" id="boton${
          id
        }">Reservar</button></td>
                </tbody>
            </table>
        </article>`;

        contenedor.innerHTML += card;

        const btnReservar = document.getElementById(`boton${id}`);

        btnReservar.addEventListener("click", () => {
          if (comprobarUsuario()) {
              guardarReserva(id);
          }
        });
      });
    } else {
      contenedor.innerHTML += `<p class="main__reserva-visor-noResult">No se han encontrado resultados</p>`;
    }
  });
}

if (btnIngresar != null) {
  btnIngresar.addEventListener("click", () => {
    let mail = document.getElementById("mail").value;
    let clave = document.getElementById("clave").value;

    if (mail == "usuario@mail.com" && clave == "clave123") {
      sessionStorage.setItem("mail", mail);
      Swal.fire({
        title:'Ingreso exitoso',
        icon: 'success',
        timer: 3000
      }).then((resultado) => {
        if(resultado.isConfirmed){
          location.href = "../index.html";
        }
      })
    } else {
      Swal.fire({
        title: 'Usuario o contraseña inválidos',
        text: 'Por favor, vuelva a intentar.',
        icon: 'error'
      })
    }
  });
}
