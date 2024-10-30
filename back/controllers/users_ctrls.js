const database = require("../database/database");

// ------------------------------- GET users -------------------------------
// 특정 보험고객 정보 가져오기 -> /users/:user_id
exports.getUser = async (req, res) => {
  const { user_id } = req.params;
  const query = "SELECT * FROM users WHERE user_id = $1";
  try {
    const result = await database.query(query, [user_id]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 보험고객 정보 전부 다 가져오기 -> /users
exports.getUsers = async (req, res) => {
  const query = "SELECT * FROM users";
  try {
    const result = await database.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ------------------------------- PATCH users -------------------------------
// 특정 고객 정보 변경 -> /users/:user_id
exports.patchUser = async (req, res) => {
  const { user_id } = req.params;
  const { model_idx, user_pn, email, gender } = req.body;
  try {
    const userResult = await database.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    query =
      "UPDATE users SET gender = $1, model_idx = $2, user_pn = $3, email = $4 WHERE user_id = $5";
    const updateResult = await database.query(query, [
      gender,
      model_idx,
      user_pn,
      email,
      user_id,
    ]);
    return res.status(200).json({ msg: "User info updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 특정 고객 보험 해지 -> /users/:user_id/cancel-insurance
exports.patchInsuranceStatus = async (req, res) => {
  const { user_id } = req.params;
  try {
    const userResult = await database.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    query = "UPDATE users SET cancellation_status = true WHERE user_id = $1";
    await database.query(query, [user_id]);
    return res.status(200).json({ msg: "Cancel insurance successfully" });
  } catch (error) {}
};

// ------------------------------- POST users -------------------------------
// 고객 등록 -> /users

// ------------------------------ DELETE users ------------------------------
// 고객 삭제 -> /users/:user_id
