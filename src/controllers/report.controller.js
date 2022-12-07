import { pool } from "../db.js";
import {
  jsonResponse,
  isJSONempty,
  RESULT_CODE_ERROR,
  STATUS_CODE_ERROR,
  RESULT_CODE_SUCCESS,
  STATUS_CODE_SUCCESS,
} from "./component.js";

/* RUTAS PARA LOS REPORTES */

export const getFullReportByPlayer = async (req, res) => {
  try {
    //DATA TO RETURN
    /***
     * Nameplayer
     * DescriptionTitle
     * CurrentScoreLevel
     * MaxScoreLevel
     *  -- CalculateProgress
     * DateStartLevel
     * DateEndLevel
     *  -- Calculate Playing time
     * DateStartSession
     * TutorComment
     *
     *
     */

    const idPlayerOwner = req.params.id;
    const superquery =
      "SELECT idPlayer, descriptionTitle, namePlayer, dateStartLevel, dateEndLevel, currentScoreLevel, maxScore, dateStart, tutorFeedback FROM tb_player JOIN (SELECT * FROM tb_sesion JOIN (SELECT * FROM tb_report JOIN tb_level WHERE tb_report.idLevelPlayed=tb_level.idLevel)as asas WHERE asas.idSesionOwner=tb_sesion.idSesion) as RES WHERE tb_player.idPlayer=RES.idPlayerOwner and tb_player.idPlayer=?;";
    let [result] = await pool.query(superquery, idPlayerOwner);
    if (isJSONempty(result)) {
      result = [{ Error: "No hay reportes registrados" }];
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

export const getReportsByPlayerId = async (req, res) => {
  try {
    const idPlayerOwner = req.params.id;
    //const superquery = 'SELECT * FROM tb_player JOIN (SELECT * FROM tb_sesion JOIN tb_report WHERE tb_report.idSesionOwner=tb_sesion.idSesion) as RES WHERE tb_player.idPlayer=RES.idPlayerOwner and tb_player.idPlayer=?'
    const superquery =
      "SELECT idPlayer, namePlayer, dateStartLevel, dateEndLevel, currentScoreLevel, descriptionTitle FROM tb_player JOIN (SELECT * FROM tb_sesion JOIN (SELECT * FROM tb_report JOIN tb_level WHERE tb_report.idLevelPlayed=tb_level.idLevel)as asas WHERE asas.idSesionOwner=tb_sesion.idSesion) as RES WHERE tb_player.idPlayer=RES.idPlayerOwner and tb_player.idPlayer=?";
    //const query = 'SELECT * FROM tb_report WHERE ';
    let [result] = await pool.query(superquery, idPlayerOwner);
    if (isJSONempty(result)) {
      result = [{ Error: "No hay reportes registrados" }];
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

export const addTutorFeedback = async (req, res) => {
  try {
    //UPDATE tb_report SET tutorFeedback=Comentario

    const idToUpdate = req.params.id;
    const { tutorComment } = req.body;
    let response = [];
    const query = `UPDATE tb_report SET tutorFeedback=?  WHERE idReport=${idToUpdate}`;
    const [row] = await pool.query(query, tutorComment);
    if (row.affectedRows != 0) {
      response = [{ "feedback recived": "true", "id affected": idToUpdate }];
    } else {
      response = [
        {
          "feedback recived": "false",
          Error: "Algo salió mal: " + row.affectedRows,
        },
      ];
    }
    res.status(200).json(
      jsonResponse(
        RESULT_CODE_SUCCESS,
        [
          {
            response,
          },
        ],
        STATUS_CODE_SUCCESS
      )
    );
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};

export const postReport = async (req, res) => {
  try {
    const {
      dateStartLevel,
      dateEndLevel,
      idSesionOwner,
      currentScoreLevel,
      idLevelPlayed,
    } = req.body;
    let response = [];
    const yaRegistrado = "SELECT * FROM tb_sesion WHERE idSesion = ?";
    const [result] = await pool.query(yaRegistrado, idSesionOwner);
    if (!isJSONempty(result)) {
      const query =
        "INSERT INTO tb_report (dateStartLevel, dateEndLevel, idSesionOwner, currentScoreLevel, idLevelPlayed, tutorFeedback) VALUES (?,?,?,?,?,?)";
      const [row] = await pool.query(query, [
        dateStartLevel,
        dateEndLevel,
        idSesionOwner,
        currentScoreLevel,
        idLevelPlayed,
        "Comentario",
      ]);
      response = [{ "report created": "true", insertedId: row.insertId }];
    } else {
      response = [
        {
          "report created": "false",
          Error: "La información de la sesión es incorrecta",
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

export const getReports = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_report";
    let [result] = await pool.query(query);
    if (isJSONempty(result)) {
      result = [{ Error: "No hay reportes registrados" }];
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
