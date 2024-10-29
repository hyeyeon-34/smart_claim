const database = require("../database/database");

// 고객정보 1명의 정보 변경
exports.patchUser = async (req, res) => {
  const { user_id } = req.params;
  const { model_idx, pn, email, gender } = req.body;
  try {
    const userResult = await database.query(
      "select * from Users where user_id = $1",
      [user_id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const updateResult = await database.query(
      "UPDATE Users SET gender = $1, model_idx = $2, pn = $3, email = $4, WHERE user_id = $5",
      [gender, model_idx, pn, email, user_id]
    );
    res.json({ message: "User info updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

