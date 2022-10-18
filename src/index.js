import express from 'express';
import playerRoutes from './routes/player.routes.js'
import {PORT} from './config.js'

const api = '/api/hygienehabits';
const app = express();
app.use(express.json());
/*****
 * Test api url and db connection
 */
app.use(`${api}/test/dbconnection`,playerRoutes);


app.use((req, res, next)=>{
    res.status(404).json({
        message:"La ruta especificada no coincide con ninguna... para mayor información pongase en contacto con el cuchau c:"
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});