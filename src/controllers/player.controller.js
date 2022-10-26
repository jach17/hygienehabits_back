import { pool } from "../db.js";
/**
 * Rutas de prueba de conexion y manipulacion con las bases de datos
 */

export const testNoDBRoute =(req, res)=>{
    try{
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
        return res.status(500).json(
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
        const query = 'SELECT * FROM tb_player';
        const [result] = await pool.query(query);
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
    }catch(e){
        return res.status(500).json(
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

export const testPostRoute = async(req, res)=>{
    try{
        const {namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor} = req.body
        const query='INSERT INTO tb_player (namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor) VALUES (?,?,?,?,?)';
        const [row] = await pool.query(query, [namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor]);
        res.status(200).json(
            {
                "result":"1",
                "message":
                {
                    "response":[
                        {
                            "insertedId":row.insertId
                        }
                    ]
                },
                "code":"200"
            }
        );
    }catch(e){
        return res.status(500).json(
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

export const testGetRouteParams = async(req, res)=>{
    try{
        const idToFind = req.params.id
        const query='SELECT * FROM tb_player WHERE idPlayer=?';
        let [result] = await pool.query(query, idToFind);
        if(result.length==0){
            result= [{"Error":"El id solicitado no se encuentra registrado"}];
        }
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
    }catch(e){
        return res.status(500).json(
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