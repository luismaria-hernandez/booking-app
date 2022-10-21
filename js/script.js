'use strict'

let btnBuscar = document.getElementById('buscar');
let contenedor = document.getElementById('reservaVisor');

const cabanas = [
    {
        id:1,
        src:'recursos/cabaña1.jpg',
        nombre:'Los Osos',
        ingreso: '2022-10-3',
        egreso: '2022-10-9',
        adultos: 2,
        ninos: 2
    },
    {
        id:2,
        src:'recursos/cabaña2.jpg',
        nombre:'Los Pumas',
        ingreso:'2022-10-10',
        egreso: '2022-10-16',
        adultos: 7,
        ninos: 0
    },
    {
        id:3,
        src:'recursos/cabaña3.jpg',
        nombre:'Los Álamos',
        ingreso: '2022-10-17',
        egreso: '2022-10-23',
        adultos: 4,
        ninos: 4
    },
    {
        id:4,
        src:'recursos/cabaña4.jpg',
        nombre:'Los vados',
        ingreso: '2022-10-3',
        egreso: '2022-10-9',
        adultos: 2,
        ninos: 2
    }
];


btnBuscar.addEventListener('click',()=>{

    let encontrado = [];
    contenedor.innerHTML =``;

    let ingreso = new Date (document.getElementById('ingreso').value);
    let egreso = new Date(document.getElementById('egreso').value);
    let adultos = document.getElementById('adultos').value;
    let ninos = document.getElementById('ninos').value;

    cabanas.forEach(e => {
        let fecha1 = new Date(e.ingreso);
        let fecha2 = new Date(e.egreso);

        if(ingreso>=fecha1 && egreso <=fecha2 && adultos<=e.adultos && ninos<=e.ninos){
            encontrado.push(e);
        }
    });

    if(encontrado.length!=0){

        encontrado.forEach(e=>{

            const card = `<article class="main__reserva-visor-tarjeta">
            <img class="main__reserva-visor-tarjeta-img" src="${e.src}">
            <table class="main__reserva-visor-tarjeta-tabla">
                <thead>
                    <th>Nombre</th><th>Entrada</th><th>Salida</th><th>Adultos</th><th>Niños</th><th>Acciones</th>
                </thead>
                <tbody>
                    <td>${e.nombre}</td><td>${e.ingreso}</td><td>${e.egreso}</td><td>${e.adultos}</td><td>${e.ninos}</td><td><button class="main__reserva-visor-tarjeta-tabla-botonR agregar-carrito" id="boton${e.id}">Reservar</button></td>
                </tbody>
            </table>
        </article>`;
            
            contenedor.innerHTML += card;
        })
        
    }
    else{
        contenedor.innerHTML += `<p class="main__reserva-visor-noResult">No se han encontrado resultados</p>`;
    }

});





