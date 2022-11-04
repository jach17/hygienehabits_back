import { pool } from "../db.js";
import {jsonResponse, isJSONempty, RESULT_CODE_ERROR, STATUS_CODE_ERROR, RESULT_CODE_SUCCESS, STATUS_CODE_SUCCESS} from "./component.js"

/* RUTAS PARA LOS REPORTES */
export const postReport = async(req, res)=>{
    try{
        const {dateStartLevel, dateEndLevel, idSesionOwner, currentScoreLevel, idLevelPlayed} = req.body
        let response =[];
        const yaRegistrado='SELECT * FROM tb_sesion WHERE idSesion = ?';
        const [result] = await pool.query(yaRegistrado, idSesionOwner);
        if(!isJSONempty(result)){
            const query='INSERT INTO tb_report (dateStartLevel, dateEndLevel, idSesionOwner, currentScoreLevel, idLevelPlayed) VALUES (?,?,?,?,?)';
            const [row] = await pool.query(query, [dateStartLevel, dateEndLevel, idSesionOwner, currentScoreLevel, idLevelPlayed]);
            response = [{"report created":"true","insertedId":row.insertId}];
        }else{
            response = [{"report created":"false","Error":"La información de la sesión es incorrecta"}];
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