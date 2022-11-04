import { pool } from "../db.js";
import {jsonResponse, isJSONempty, RESULT_CODE_ERROR, STATUS_CODE_ERROR, RESULT_CODE_SUCCESS, STATUS_CODE_SUCCESS} from "./component.js"

/* RUTAS PARA LOS REPORTES */
export const postReports = async(req, res)=>{
    try{
        const {dateStartLevel, dateEndLevel, idSesionOwner, currentScoreLevel, idLevelPlayed} = req.body
        const authTokenTutorWithIdTutor = "SELECT * FROM tb_tutor WHERE idTutor=? AND authTokenTutor=?";
        const [authTokenTutorWithIdResult] = await pool.query(authTokenTutorWithIdTutor, [idTutorOwner, authTokenTutor]);
        let response =[];
        if(!isJSONempty(authTokenTutorWithIdResult)){
            const yaRegistrado='SELECT * FROM tb_player WHERE namePlayer = ?';
            const [result] = await pool.query(yaRegistrado, namePlayer);
            if(isJSONempty(result)){
                const query='INSERT INTO tb_player (namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor) VALUES (?,?,?,?,?)';
                const [row] = await pool.query(query, [namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor]);
                response = [{"inserted":"true","insertedId":row.insertId}];
            }else{
                response = [{"inserted":"false","Error":"Ese nombre ya se encuentra registrado"}];
            }
        }else{
            response = [{"inserted":"true","Error":"Ocurrió un error al verificar la información del tutor"}];
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



export const getReports = async(req, res)=>{
    try{
        const query = 'SELECT * FROM tb_report';
        let [result] = await pool.query(query);
        if(isJSONempty(result)){
            result = [{"Error":"No hay reportes registrados"}];
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