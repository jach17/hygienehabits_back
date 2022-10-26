import { pool } from "../db.js";
/** Routes for tutor services */

const isJSONempty = (json) => {
    if(json.length==0){
        return true;
    }else{
        return false;
    }
}

export const authTutor = async(req,res)=>{
    try{
        const query = "SELECT * FROM tb_tutor WHERE nameTutor = ? AND passwordTutor = ?";
        const {nameTutor, passwordTutor} = req.body;
        const [dbResponse] = await pool.query(query, [nameTutor, passwordTutor]);
        let sePuedeRegistrar = false;
        if(isJSONempty(dbResponse)){
            sePuedeRegistrar = true;
        }else{
            sePuedeRegistrar=false;
        }
        res.status(200).json(
            {
                "result":"1",
                "message":
                {
                    "response":[
                        {
                            "isRegistred":sePuedeRegistrar
                        }
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

export const getTutorById = async(req, res)=>{
    try{
        const idToFind = req.params.id
        const query='SELECT * FROM tb_tutor WHERE idTutor=?';
        let [result] = await pool.query(query, idToFind);
        if(isJSONempty(result)){
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


export const getTutors = async(req, res)=>{
    try{
        const query = 'SELECT * FROM tb_tutor';
        let [result] = await pool.query(query);
        if(isJSONempty(result)){
            result=[{"Error":"No hay tutores registrados"}];
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

export const postTutor = async(req, res)=>{
    try{
        const {nameTutor,passwordTutor,ageTutor,authTokenTutor} = req.body
        const isTutorRegistred = "SELECT * FROM tb_tutor WHERE nameTutor=?";
        let [result] = await pool.query(isTutorRegistred, nameTutor);
        let response =[];
        if(isJSONempty(result)){
            const query='INSERT INTO tb_tutor (nameTutor,passwordTutor,ageTutor,authTokenTutor) VALUES (?,?,?,?)';
            const [row] = await pool.query(query, [nameTutor,passwordTutor,ageTutor,authTokenTutor]);
            response = [{"insertedId":row.insertId}];
            
        }else{
            response = [{"Error":"Ese nombre ya se encuentra registrado"}];
            
        }
        res.status(200).json(
            {
                "result":"1",
                "message":
                {
                    "response":response
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