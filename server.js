const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importa el paquete cors


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: '*',
  }));
io.on('connection', socket => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  
  socket.on('sendCoordinates', coordinates => {
    console.log('Coordenadas recibidas:', coordinates);
    // Aquí puedes procesar las coordenadas como desees
    io.emit('coordenadas', coordinates); 
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
