import { pool } from "../db.js";
import {jsonResponse, isJSONempty, RESULT_CODE_ERROR, STATUS_CODE_ERROR, RESULT_CODE_SUCCESS, STATUS_CODE_SUCCESS} from "./component.js"


export const getLevels = async(req,res)=>{
    try{
        const query = 'SELECT * FROM tb_level';
        let [result] = await pool.query(query);
        if(isJSONempty(result)){
            result = [{"Error":"No hay niveles registrados"}];
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