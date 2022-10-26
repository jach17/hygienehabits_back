import { pool } from "../db.js";
/** Routes for tutor services */

export const getTutorById = async(req, res)=>{
    try{
        const idToFind = req.params.id
        const query='SELECT * FROM tb_tutor WHERE idTutor=?';
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


export const getTutors = async(req, res)=>{
    try{
        const query = 'SELECT * FROM tb_tutor';
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
};

export const postTutor = async(req, res)=>{
    try{
        const {nameTutor,passwordTutor,ageTutor,authTokenTutor} = req.body
        const query='INSERT INTO tb_tutor (nameTutor,passwordTutor,ageTutor,authTokenTutor) VALUES (?,?,?,?)';
        const [row] = await pool.query(query, [nameTutor,passwordTutor,ageTutor,authTokenTutor]);
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