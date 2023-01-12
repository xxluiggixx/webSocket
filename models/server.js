const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app    = express();
        this.PORT   = process.env.PORT || 8080;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);

        this.paths = {};

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
    }


    middlewares() {

        //CORS
        this.app.use( cors() );

        //directorio publico
        this.app.use( express.static('public') );

    }

    routes(){

    }

    sockets(){
        this.io.on('connection',socketController);
    }

    listen(){
        this.server.listen(this.PORT, () =>{
            console.log('Server listening on http://localhost:',this.PORT);
        })
    }
}

module.exports = Server;
