const database = require("../database/database");

///////////////////////// 유저 조회 엔드포인트 /////////////////////////
// 특정 보험고객 정보 가져오기
exports.getUser = async (req, res) => {
  const { user_id } = req.params;
  const query = "SELECT * FROM Users WHERE user_id = $1";
  try {
    const result = await database.query(query, [user_id]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 보험고객 정보 전부 다 가져오기
exports.getUsers = async (req, res) => {
  const query = "SELECT * FROM Users";
  try {
    const result = await database.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

///////////////////////// 클레임 조회 엔드포인트 /////////////////////////
// claim_id에 해당하는 클레임 정보 가져오기
exports.getClaim = async (req, res) => {
  const { claim_id } = req.params;
  const query = "SELECT * FROM Claim WHERE claim_id = $1";

  try {
    const result = await database.query(query, [claim_id]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 특정 유저의 상태별 클레임 정보 가져오기 -> /claims?process={process_name}&user={id}
exports.getUserClaimsByProcess = async (process, user_id) => {
  const query = "SELECT * FROM claim WHERE last_assigned = $1 AND user_id = $2";
  const result = await database.query(query, [process, user_id]);
  return result.rows;
};

// 특정 유저의 해당하는 모든 클레임 정보 가져오기 -> /claims?user={id}
exports.getUserClaims = async (user_id) => {
  const query = "SELECT * FROM Claim WHERE user_id = $1";
  const result = await database.query(query, [user_id]);
  return result.rows;
};

// 특정 진행상황인 클레임들 가져오기 -> /claims?process={process_id}
exports.getClaimsByProcess = async (process) => {
  const query = "SELECT * FROM claim WHERE last_assigned = $1";
  const result = await database.query(query, [process]);
  return result.rows;
};

//claims에 있는 모든 정보 가져오기 -> /claims
exports.getAllClaims = async () => {
  const query = "SELECT * FROM Claim";
  const result = await database.query(query);
  return result.rows;
};

///////////////////////// 상담내역 가져오기 /////////////////////////
// history_id에 해당하는 상담이력 정보 가져오기
exports.getHistory = async (req, res) => {
  const { history_id } = req.params;
  const query = "SELECT * FROM Call_History WHERE history_id = $1";

  try {
    const result = await database.query(query, [history_id]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//특정 claim_id 기준 모든 상담이력 불러오기
exports.getClaimHistories = async (req, res) => {
  const {claim} = req.query;
  const query = "SELECT * FROM Call_History WHERE Claim_id = $1";
  try {
    const result = await database.query(query, [claim]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 특정 claim_id 기준 모든 서류 가져오기
exports.getAllDocs = async(req,res) =>{
  const {claim} = req.query;
  const query = "SELECT * from Document_Status WHERE Claim_id = $1";
  try {
    const result = await database.query(query, [claim]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({error : error.message})
  }
}

////////////상담사 조회////////////////////
exports.getAllMangers = async(req,res) =>{
  const query = "SELECT * from Manager"
  try {
    const result = await database.query(query);
    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}

exports.getManager = async(req, res) =>{
  const {manager_idx} = req.params
  const query = "SELECT * from Manager WHERE manager_idx=$1"
  try {
    const result = await database.query(query,[manager_idx]);
    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({error : error.message})
  }
}


// 상담사가 검토 후 보험사에게 승인 요청 보낸 서류 가져오기 
// exports.getApprovalDocs = async(req, res) =>{
//   const {}
// }


