//lo que hace este javascript es declaras objetos, en la funcion inicio creamos en memorias las imagenes que vamos a usar
//en las funciones confirmar vamos a setear la variable imagenOk en true para estar seguros que ya se cargaron las imagenes
//en la función dibujar vamos a dibujar todas las imagenes 

var tablero;
//declaramos objetos
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
var fondo = {
    imagenURL: "fondo.png",
    imagenOK: false
};
var tifis = {
    frenteOK: false,
    atrasOK: false,
    derOK: false,
    izqOK: false,
    velocidad: 50,
    x: 0,
    y: 0
};
var liz = {
    imagenOK: false,
    x: 400,
    y: 200
};
function inicio()
{
    var canvas = document.getElementById("campo");
    tablero = canvas.getContext("2d");

    //fondo es un objeto e imagen es una variable de tipo Image
    fondo.imagen = new Image();
    fondo.imagen.src = fondo.imagenURL;
    //cuando mi imagen cargue hay que ir a la funcion confirmarFondo y decir ok
    fondo.imagen.onload = confirmarFondo;

    tifis.frente = new Image();
    tifis.frente.src = "diana-frente.png";
    tifis.frente.onload = confirmarFrente;

    //creo una imagen en memoria y luego le meto diana-atras.png
    tifis.atras = new Image();
    tifis.atras.src = "diana-atras.png";
    //cuando carga la imagen en el navegador se dispara la función confirmarAtras
    tifis.atras.onload = confirmarAtras;

    tifis.izq = new Image();
    tifis.izq.src = "diana-izq.png";
    tifis.izq.onload = confirmarIzq;

    tifis.der = new Image();
    tifis.der.src = "diana-der.png";
    tifis.der.onload = confirmarDer;

    liz.imagen = new Image();
    liz.imagen.src = "liz.png";
    liz.imagen.onload = confirmarLiz;

    //escucha el evento keydown
    document.addEventListener("keydown", teclado);

}

// funcion que le llega que tecla del teclado oprimiste 
function teclado(evento){
    var codigo = evento.keyCode;
    if(codigo == teclas.UP)
    {
        tifis.y -= tifis.velocidad;
        if ((tifis.y==200 && tifis.x<=100) || (tifis.y==200 && tifis.x==200) || (tifis.y==350 && tifis.x>=150) || (tifis.y==-50 && tifis.x>=0)){
            tifis.y += tifis.velocidad;
        }       
    }
     if ( codigo == teclas.DOWN){
        //tifis avanza
        tifis.y+=tifis.velocidad;
        //si tifis esta en la coordenada y>= 150 y en la coordenada x<140 no podra pasar
         if((tifis.y==200 && tifis.x<150) || (tifis.y==350 && tifis.x>100 ) || (tifis.y==500 && tifis.x>=0) ){
            tifis.y-=tifis.velocidad;
         }
    }
    if(codigo == teclas.LEFT)
    {
        tifis.x -= tifis.velocidad;
        if ((tifis.x==100 && tifis.y==200) || (tifis.x==200 && tifis.y<=200) || (tifis.x==-50 && tifis.y>=0)){
            tifis.x += tifis.velocidad;
        }
    }
    if(codigo == teclas.RIGHT){
        tifis.x += tifis.velocidad;
        if((tifis.x==200 && tifis.y<=200) || (tifis.x>=150 && tifis.y==350) || (tifis.x==500 && tifis.y>=0)) {

            tifis.x -= tifis.velocidad;
        }
    }
    dibujar(codigo);
}
function confirmarFondo(){
    //cambia imagene a verdadero
    fondo.imagenOK = true;
    //se va a la funcion dibujar
    dibujar();
}

function confirmarFrente(){
    tifis.frenteOK = true;
    dibujar();
}
function confirmarAtras(){
    tifis.atrasOK = true;
    dibujar();
}
function confirmarIzq(){
    tifis.izqOK = true;
    dibujar();
}
function confirmarDer(){
    tifis.derOK = true;
    dibujar();
}

function confirmarLiz(){
    liz.imagenOK = true;
    dibujar();
}

function dibujar(direccion){
    //pregunta si el fondo ya se cargo
    if(fondo.imagenOK){
        //dibuja la imagen
        tablero.drawImage(fondo.imagen, 0, 0);    
    }

    var tifisOrientada = tifis.frente;
    //si frente, atras, der e izq estan ok, es decir estan cargadas 
    if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK)
    {
        if(direccion == teclas.DOWN || direccion == undefined)
        {
            tifisOrientada = tifis.frente;
        }
        else if(direccion == teclas.UP)
        {
            tifisOrientada = tifis.atras;
        }
        else if(direccion == teclas.LEFT)
        {
            tifisOrientada = tifis.izq;
        }
        else if(direccion == teclas.RIGHT)
        {
            tifisOrientada = tifis.der;
        }
    }
    tablero.drawImage(tifisOrientada, tifis.x, tifis.y);

    if(liz.imagenOK)
    {
        tablero.drawImage(liz.imagen, liz.x, liz.y);
    }
}