 //Cuando te da error del this sustituye por window usar el bind(this)

const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10


class Juego {
    constructor (){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
        
    }
    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        // esto es mejor que ponerlo en la funcnion de agregar eventos despues del this.elegirColor
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        //el hide es una clase de css que oculta el empezar juego
        
       //indica que el usuario arranca en este nivel a medida que le acierta
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }
    generarSecuencia() {
        //es importante la funcion fill para que el map nos funcione ya que el fill define elementos dentro del array
        //el Math.floor nos redondea para abajo el numero
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor (Math.random() * 4))
    }
    siguienteNivel(){
        //Para agregar atributos se puede hacer con this.
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarNumeroAColor(numero){
        switch (numero){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'     
        }
    }

    transformarColorANumero(color){
        switch (color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3    
        }
    }

    iluminarSecuencia(){
        //this.nivel es que va a recorrer ir hasta donde se encuentre el usuario
        for(let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[1])
            //Llamamos a la funcion para que se iluminen los colores
            //el 1000 * i es muy importante ya que i la primera vez es 0 , despues 1 sec, 2,etc
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }
    iluminarColor(color){
        //agregamos el css con classlist
        this.colores[color].classList.add('light')
        // creamos la funcion para que se ilumine y se apage con settimeout
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
        //En el addeventliss le agregamos primero el nombre del evento y despues la funcion

        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
            if(this.nivel === (ULTIMO_NIVEL + 1)){
               this.ganoElJuego()
            }else {
                //Cuando te da error del this sustituye por window usar el bind(this)
                setTimeout(this.siguienteNivel,1500)
            }
            }
        } else {
            this.perdioElJuego()
        }
    }
    ganoElJuego(){
        swal('Platzi', 'Felicitaciones, ganaste el juego', 'success')
        .then(this.inicializar)
    }
    perdioElJuego(){
        swal('Platzi', 'Lo lamentamos perdiste', 'error')
        .then(()=>{
                    this.eliminarEventosClick()
                    this.inicializar()
        })
    }
}



function empezarJuego(){
   window.juego = new Juego()
}