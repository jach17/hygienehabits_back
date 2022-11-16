import { pool } from "../db.js";
import {
  jsonResponse,
  isJSONempty,
  RESULT_CODE_ERROR,
  STATUS_CODE_ERROR,
  RESULT_CODE_SUCCESS,
  STATUS_CODE_SUCCESS,
} from "./component.js";

export const getSesionsByPlayerId = async (req, res) => {
  try {
    const idPlayerOwner = req.params.id;
    const superquery =
      "SELECT * FROM tb_sesion WHERE tb_sesion.idPlayerOwner=?";
    let [result] = await pool.query(superquery, idPlayerOwner);
    if (isJSONempty(result)) {
      result = [{ Error: "No hay sesiones registradas" }];
    }
    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, result, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};

export const getSesions = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_sesion";
    let [result] = await pool.query(query);
    if (isJSONempty(result)) {
      result = [{ Error: "No hay sesiones registradas" }];
    }
    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, result, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};
export const updateSesionDateEndById = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const { dateEnd } = req.body;
    let response = [];
    const query = `UPDATE tb_sesion SET dateEnd=?  WHERE idSesion=${idToUpdate}`;
    const [row] = await pool.query(query, dateEnd);

    if (row.affectedRows != 0) {
      response = [{ "sesion updated": "true", "id affected": idToUpdate }];
    } else {
      response = [{ "sesion updated": "false", Error: "Algo salió mal" }];
    }

    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, response, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};
export const postSesion = async (req, res) => {
  try {
    const { dateStart, dateEnd, idPlayerOwner } = req.body;
    let response = [];
    const yaRegistrado = "SELECT * FROM tb_player WHERE idPlayer = ?";
    const [result] = await pool.query(yaRegistrado, idPlayerOwner);
    if (!isJSONempty(result)) {
      const query =
        "INSERT INTO tb_sesion (dateStart, dateEnd, idPlayerOwner) VALUES (?,?,?)";
      const [row] = await pool.query(query, [
        dateStart,
        dateEnd,
        idPlayerOwner,
      ]);
      response = [{ "sesion created": "true", insertedId: row.insertId }];
    } else {
      response = [
        {
          "sesion created": "false",
          Error: "La información del usuario es incorrecta",
        },
      ];
    }
    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, response, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};
