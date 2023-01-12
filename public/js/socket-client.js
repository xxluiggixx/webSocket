//Refer html

const lblOnline     = document.querySelector('#lblOnline');
const lblOffline    = document.querySelector('#lblOffline');
const textMensaje   = document.querySelector('#textMensaje');
const btnEnviar     = document.querySelector('#btnEnviar');
const div = document.querySelector("#data")



const socket = io();

socket.on('connect', () =>{
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''

});
socket.on('disconnect', () =>{
    lblOnline.style.display = 'none'
    lblOffline.style.display = ''

});

socket.on('enviar-mensaje', (payload) => {
    const {mensaje} = payload
    //div.textContent = mensaje;
    console.log(payload);
})


btnEnviar.addEventListener('click', () => {
    
    const mensaje = textMensaje.value;
    const payload = {
        mensaje,
        id: '123',
        fecha: new Date().getTime()
    }
    
    socket.emit( 'enviar-mensaje',payload, ( id ) => {
        console.log('Desde el server', id);
    });
})