import { pool } from "../db.js";
/*****
 * Rutas de prueba de conexion y manipulacion con las bases de datos
 * 
 * 
 */

export const testNoDBRoute =(req, res)=>{
    try{
        throw "Error de prueba bro xd";
        res.status(200).json(
            {
                "result":"1",
                "message":
                {
                    "response":[
                        {
                            "Server is running": "true",
                        },
                    ]
                },
                "code":"200"
            }
        );
    }catch(e){
        res.status(500).json(
            {
                "result":"0",
                "message":
                {
                    "response":[
                        {
                            "Error": e,
                        },
                    ]
                },
                "code":"500"
            }
        );
    }
}


export const testGetRoute = async(req, res)=>{
        try{
            const [result] = await pool.query('SELECT * FROM tb_player');
            
            res.status(200).json(
                {
                    "result":"1",
                    "message":
                    {
                        "response":result
                    },
                    "code":"200"
                }
            );
            

            
        }catch(error){
            return res.json({
                message:'Algo salió mal xd',
                er:error

            });

        }
    }

export const testPostRoute = async(req, res)=>{
    try{
        const {namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor} = req.body
    const [row] = await pool.query('INSERT INTO tb_player (namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor) VALUES (?,?,?,?,?)', [namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor]);
    console.log("db connection and routes con post");
    res.json({'Inserted id':row.insertId});
    }catch(error){
return res.json({
                message:'Algo salió mal xd',
                er:error

            });
            
    }
}

export const testGetRouteParams = async(req, res)=>{
    const idToFind = req.params.id
    const [result] = await pool.query('SELECT * FROM tb_player WHERE idPlayer=?', idToFind);
    res.send(result[0]);
}