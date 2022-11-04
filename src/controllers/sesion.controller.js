import { pool } from "../db.js";
import {jsonResponse, isJSONempty, RESULT_CODE_ERROR, STATUS_CODE_ERROR, RESULT_CODE_SUCCESS, STATUS_CODE_SUCCESS} from "./component.js"

export const getSesions = async(req, res)=>{
    try{
        const query = 'SELECT * FROM tb_sesion';
        let [result] = await pool.query(query);
        if(isJSONempty(result)){
            result = [{"Error":"No hay sesiones registradas"}];
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

export const postSesion = async(req, res)=>{
    try{
        const {dateStart, dateEnd, idPlayerOwner} = req.body
        let response =[];
        const yaRegistrado='SELECT * FROM tb_player WHERE idPlayer = ?';
        const [result] = await pool.query(yaRegistrado, idPlayerOwner);
        if(!isJSONempty(result)){
            const query='INSERT INTO tb_sesion (dateStart, dateEnd, idPlayerOwner) VALUES (?,?,?)';
            const [row] = await pool.query(query, [dateStart, dateEnd, idPlayerOwner]);
            response = [{"sesion created":"true","insertedId":row.insertId}];
        }else{
            response = [{"sesion created":"false","Error":"La información del usuario es incorrecta"}];
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