import { pool } from "../db.js";
import {jsonResponse, isJSONempty, RESULT_CODE_ERROR, STATUS_CODE_ERROR, RESULT_CODE_SUCCESS, STATUS_CODE_SUCCESS} from "./component.js"


/**  Routes for player services */

export const authPlayer = async (req, res)=>{
    try{
        const query="SELECT * FROM tb_player WHERE namePlayer=? AND passwordPlayer=?";
        const {namePlayer, passwordPlayer} = req.body;
        const [dbResponse] = await pool.query(query, [namePlayer, passwordPlayer]);
        const isRegistred=!isJSONempty(dbResponse);
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

export const getPlayerById = async(req,res)=>{
    try{
        const idToFind = req.params.id
        const query='SELECT * FROM tb_player WHERE idPlayer=?';
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

export const postPlayer = async(req, res)=>{
    try{
        const {namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor} = req.body
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

export const getPlayers = async(req, res)=>{
    try{
        const query = 'SELECT * FROM tb_player';
        let [result] = await pool.query(query);
        if(isJSONempty(result)){
            console.log("Json empty")
            result = [{"Error":"No hay jugadores registrados"}];
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