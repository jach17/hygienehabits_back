import { pool } from "../db.js";
import {jsonResponse, isJSONempty, RESULT_CODE_ERROR, STATUS_CODE_ERROR, RESULT_CODE_SUCCESS, STATUS_CODE_SUCCESS} from "./component.js"
/** Routes for tutor services */


/*
const idTutor = dbResponse[0].idTutor; linea pa sacar el id jeje
        
*/


export const authTutor = async(req,res)=>{
    try{
        const query = "SELECT * FROM tb_tutor WHERE nameTutor = ? AND passwordTutor = ?";
        const {nameTutor, passwordTutor} = req.body;
        const [dbResponse] = await pool.query(query, [nameTutor, passwordTutor]);
        const isRegistred = !isJSONempty(dbResponse);
        res.status(200).json(
            jsonResponse(
                RESULT_CODE_SUCCESS,
                [
                    {
                        "isRegistred":isRegistred
                    }
                ],
                STATUS_CODE_SUCCESS
            )
        );
    }catch(e){
        res.status(500).json(
            jsonResponse(
                RESULT_CODE_ERROR,
                e,
                STATUS_CODE_ERROR
            )
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
            jsonResponse(
                RESULT_CODE_SUCCESS,
                result,
                STATUS_CODE_SUCCESS
            )
        );
    }catch(e){
        return res.status(500).json(
            jsonResponse(
                RESULT_CODE_ERROR,
                e,
                STATUS_CODE_ERROR
            )
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
            jsonResponse(
                RESULT_CODE_SUCCESS,
                result,
                STATUS_CODE_SUCCESS
            )
        );
    }catch(e){
        return res.status(500).json(
            jsonResponse(
                RESULT_CODE_ERROR,
                e,
                STATUS_CODE_ERROR
            )
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
            jsonResponse(
                RESULT_CODE_SUCCESS,
                response,
                STATUS_CODE_SUCCESS
            )
        );
    }catch(e){
        return res.status(500).json(
            jsonResponse(
                RESULT_CODE_ERROR,
                e,
                STATUS_CODE_ERROR
            )
        );  
    }

}