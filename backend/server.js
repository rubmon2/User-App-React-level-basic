import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import rutasApp from './index.js';
import { conectDB } from './src/db/db.js';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: 'http://localhost:3000', // Permitir solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  }),
);
conectDB();
app.use(express.json());

// app.use("/",(req,res)=>{
//     res.json({message:"server is up mtf"})
// })

app.use('/', rutasApp);
app.listen(PORT, async () => {
  console.log(`server listenen in ${PORT}`);
});
