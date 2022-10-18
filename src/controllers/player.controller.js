import { pool } from "../db.js";
/*****
 * Rutas de prueba de coneccion y manipulacion con las bases de datos
 * 
 * 
 */
export const testGetRoute = async(req, res)=>{
        try{
            const [result] = await pool.query('SELECT * FROM tb_player');
            console.log("db connection and routes con get");
            res.send(result);
        }catch(error){
            return res.json({
                message:'Algo salió mal xd',
                er:error

            });
        }
    }

export const testPostRoute = async(req, res)=>{
    const {namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor} = req.body
    const [row] = await pool.query('INSERT INTO tb_player (namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor) VALUES (?,?,?,?,?)', [namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor]);
    console.log("db connection and routes con post");
    res.json({'Inserted id':row.insertId});
}

export const testGetRouteParams = async(req, res)=>{
    const idToFind = req.params.id
    const [result] = await pool.query('SELECT * FROM tb_player WHERE idPlayer=?', idToFind);
    res.send(result[0]);
}