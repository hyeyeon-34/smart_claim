const database = require("../database/database");

///////////////////////// 유저 관련 엔드포인트 /////////////////////////
// 특정 보험고객 정보 가져오기
exports.getUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await database.query(
      "SELECT * FROM Users WHERE user_id = $1",
      [user_id]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 보험고객 정보 전부 다 가져오기
exports.getUsers = async (req, res) => {
  try {
    const result = await database.query("SELECT * FROM Users");
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// user_id에 해당하는 모든 클레임 정보 가져오기
exports.getUserClaims = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await database.query(
      "SELECT * FROM Claim WHERE user_id = $1",
      [user_id]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// user_id와 진행상황 기반으로 클레임 정보 가져오기
// /claims?process={process_name}&user={id}
// /users/:user_id/claims/process?process={process_name}
exports.getUserClaimsByProcess = async (req, res) => {
  const { user_id } = req.params;
  const { process } = req.query;

  try {
    const result = await database.query(
      "SELECT * FROM claim WHERE last_assigned = $1 and user_id = $2",
      [process, user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

///////////////////////// 클레임 관련 엔드포인트 /////////////////////////
// claim_id에 해당하는 클레임 정보 가져오기
exports.getClaim = async (req, res) => {
  const { claim_id } = req.params;

  try {
    const result = await database.query(
      "SELECT * FROM Claim WHERE claim_id = $1",
      [claim_id]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 특정 진행상황인 클레임들 가져오기
// /claims/process?process={process_name}
exports.getClaimsByProcess = async (req, res) => {
  const { process } = req.query;
  try {
    const result = await database.query(
      "SELECT * FROM claim WHERE last_assigned = $1",
      [process]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//claims에 있는 모든 정보 가져오기
exports.getAllClaims = async (req, res) => {
  try {
    const result = await database.query("SELECT * FROM Claim");
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

///////////////////////// 상담내역 가져오기 /////////////////////////
// history_id에 해당하는 상담이력 정보 가져오기
exports.getHistory = async (req, res) => {
  const { history_id } = req.params;

  try {
    const result = await database.query(
      "SELECT * FROM Call_History WHERE history_id = $1",
      [history_id]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//특정 claim_id 기준 모든 상담이력 불러오기
exports.getClaimHistories = async (req, res) => {
  const { claim_id } = req.params;
  try {
    const result = await database.query(
      "SELECT * FROM Call_History WHERE Claim_id = $1",
      [claim_id]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
