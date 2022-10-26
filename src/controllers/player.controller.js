import { pool } from "../db.js";

/**  Routes for player services */

export const authPlayer = async (req, res)=>{
    const query="SELECT * FROM tb_player WHERE namePlayer=? AND passwordPlayer=?";
    const {namePlayer, passwordPlayer} = req.body;
    const [row] = await pool.query(query, [namePlayer, passwordPlayer]);
    let isRegistred=false;
    if(row.length>0){
        isRegistred=true;
    }else{
        isRegistred=false;
    }
    res.status(200).json(
        {
            "result":"1",
            "message":
            {
                "response":[
                    {
                        "isRegistred":isRegistred
                    }
                ]
            },
            "code":"200"
        }
    );
}

export const getPlayerById = async(req,res)=>{
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




export const postPlayer = async(req, res)=>{
    try{
        const {namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor} = req.body
        const authTokenTutorWithIdTutor = "SELECT * FROM tb_tutor WHERE idTutor=? AND authTokenTutor=?";
        const [r] = await pool.query(authTokenTutorWithIdTutor, [idTutorOwner, authTokenTutor]);
        if(r.length>0){
            const query='SELECT * FROM tb_player WHERE namePlayer = ?';
            const [result] = await pool.query(query, namePlayer);
            if(result.length==0){
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
                    
            }else{
                res.status(200).json(
                    {
                        "result":"1",
                        "message":
                        {
                            "response":[
                                {
                                    "Error":"Ese nombre ya se encuentra registrado"
                                }
                            ]
                        },
                        "code":"200"
                    }
                );
            }
        }else{
            res.status(200).json(
                {
                    "result":"1",
                    "message":
                    {
                        "response":[
                            {
                                "Error":"Ocurrió un error al verificar la información del tutor"
                            }
                        ]
                    },
                    "code":"200"
                }
            );
        }
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


export const getPlayers = async(req, res)=>{
    try{
        const query = 'SELECT * FROM tb_player';
        let [result] = await pool.query(query);
        if(result.length==0){
            result = [{"Error":"No hay jugadores registrados"}];
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
};