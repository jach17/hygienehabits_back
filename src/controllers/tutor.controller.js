import { pool } from "../db.js";
/****
 * Rutas para servicios relacionados al control de la tabla de tutor
 */

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