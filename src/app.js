import express from 'express';
import playerRoutes from './routes/player.routes.js'
import tutorRouter from './routes/tutor.routes.js';


const api = '/api/hygienehabits';
const app = express();
app.use(express.json());
/*****
 * Test api url and db connection
 */
app.use(`${api}/test/dbconnection`,playerRoutes);
/*** TUTOR ROUTES ***/
app.use(api, tutorRouter);

app.use((req, res, next)=>{
    res.status(404).json(
        {
            "result":"0",
            "message":
            {
                "response":[
                    {
                        "Error": "No se encontró la ruta especificada. Consulte la documentación para más información",
                    },
                ]
            },
            "code":"404"
        }
    );
});

export default app;