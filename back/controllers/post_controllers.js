const database = require("../database/database");

// 첫 문의전화 ( 새로운 클레임번호와 히스토리 생성) 
exports.newHistory = async (req, res) => {
  const client = await database.connect(); // 데이터베이스 클라이언트 연결
  const { claim_type_idx, user_id, manager_idx, progress_idx, comment } =
    req.body;

  try {
    await client.query("BEGIN"); // 트랜잭션 시작
    // 첫번째 쿼리
    const result = await client.query(
      "INSERT INTO Claim (claim_type_idx, user_id, last_comment, last_manager,last_assigned, document, compensation) VALUES($1, $2, $3, $4, $5, $6, $7)RETURNING claim_id",
      [
        claim_type_idx,
        user_id,
        comment,
        manager_idx,
        progress_idx,
        false,
        false,
      ]
    );
    const claim_id = String(result.rows[0].claim_id);

    // 두번째 쿼리
    const now = new Date();
    await client.query(
      "INSERT INTO Call_History (claim_id, manager_idx, progress_idx, comment, history_created_at) VALUES($1, $2, $3, $4, $5)",
      [claim_id, manager_idx, progress_idx, comment, now]
    );
    await client.query("COMMIT"); // 트랜잭션 커밋
    res.status(201).send("History and claim created successfully");
  } catch (error) {
    await client.query("ROLLBACK"); // 트랜잭션 롤백
    res.status(500).json({ error: error.message });
  } finally {
    client.release(); // 데이터베이스 연결 해제
  }
};

// 기존 클레임과 새로운 히스토리 연결
exports.appendHistory = async (req, res) => {
  const client = await database.connect();
  const now = new Date();
  const { claim_id, manager_idx, progress_idx, comment } = req.body;

  try {
    await client.query("BEGIN");
    // 첫번째 쿼리
    await client.query(
      "Insert Into Call_History (claim_id, manager_idx, progress_idx, comment, history_created_at) values($1, $2, $3, $4, $5)",
      [claim_id, manager_idx, progress_idx, comment, now]
    );

    // 두번째 쿼리
    await client.query(
      "Update Claim Set last_comment = $1, last_manager = $2, last_assigned = $3 where claim_id = $4",
      [comment, manager_idx, progress_idx, claim_id]
    );
    await client.query("COMMIT");
    res.status(201).send("History created and claim updated successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};
