let Paciente = document.querySelector('#inputNombre')
let Edad = document.querySelector('#inputEdad')
let Sintoma = document.querySelector('#TextArea')
let BtnAgregar = document.querySelector('#BtnAgregar')
let AgregarFila = document.querySelector('#BodyTable')
let BtnAtenderPaciente = document.querySelector('#BtnAtenderPaciente')
let mostrarNombre = document.querySelector('#NombrePaciente')
let mostrarMasDatos = document.querySelector('#DatosExtras')
let VerTurnos = document.querySelector('#Turno')

let id = 0

class Node {
    constructor(paciente, edad, sintoma) {
        this.paciente = paciente
        this.edad = edad
        this.sintoma = sintoma
        this.next = null
        this.position = id
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    peek() {
        return this.first;
    }
    enqueue(paciente, edad, sintoma) {
        const newNode = new Node(paciente, edad, sintoma);
        if (this.length === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
        return this;
    }
    dequeue() {
        if (!this.first) {
            return null;
        }
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.length--;
        return this;
    }
    isEmpty() {
        if (this.length === 0) {
            return 'Lista vacia'
        } else {
            return this
        }
    }
    printQueue() {
        if (this.length == 0) {
            return 'No hay clientes en espera'
        } else {
            return myClinic
        }
    }
}

const myClinic = new Queue();

const crearFila = () => {
    id++
    if (Paciente.value, Edad.value, Sintoma.value == '') {
        return alert('Favor de llenar los campos')
    } else{
        return `
        <tr>
            <th>${id}</th>
            <td>${Paciente.value}</td>
            <td>${Edad.value}</td>
            <td>${Sintoma.value}</td>
            <td>${hora()}</td>
        </tr>
        `
    }
}

const decir = (texto) => {
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-ES";
    window.speechSynthesis.speak(voz);
};


const mostrarTurno = () => {
    if (myClinic.length === 0) {
        VerTurnos.textContent='No hay mas pacientes'
    } else {
        VerTurnos.textContent = ' ' + myClinic.peek().paciente
    }
}

const hora = () =>{
    const date = new Date();
    const hora =  date.getHours()
    const minutos=  date.getMinutes()
    const segundos=  date.getSeconds()
    
    return hora + ':' + minutos + ':' + segundos
}

BtnAgregar.addEventListener('click', (event) => {
    event.preventDefault()
    if (Paciente.value, Edad.value, Sintoma.value == '') {
        return alert('Favor de llenar los campos')
    } else if(Edad.value > 120){
        return alert('Edad no admitido')
    } else {
        myClinic.enqueue(Paciente.value, Edad.value, Sintoma.value)
        AgregarFila.innerHTML += crearFila()
    }
    mostrarTurno()
    Paciente.value = ''
    Edad.value = ''
    Sintoma.value = ''
})

BtnAtenderPaciente.addEventListener('click', (event) => {
    event.preventDefault()
    if (myClinic.length == 0) {
        mostrarNombre.textContent = 'No hay pacientes'
        mostrarMasDatos.textContent = ''
        AgregarFila.innerHTML = ''
        VerTurnos.textContent = ' No hay pacientes'
        id = 0
    } else {
        const texto = `Turno de ${myClinic.peek().paciente}`;
        decir(texto);
        mostrarNombre.textContent = myClinic.peek().paciente
        mostrarMasDatos.textContent = myClinic.peek().edad + ' - ' + myClinic.peek().sintoma
        myClinic.dequeue()
        mostrarTurno()

        console.dir(AgregarFila, 'soy agregar fila')
        if (AgregarFila.firstElementChild) {
            AgregarFila.removeChild(AgregarFila.firstElementChild)
        }
    }
})


