const database = require("../database/database");

// ------------------------------- GET claims -------------------------------
// claim_id에 해당하는 클레임 정보 가져오기
exports.getClaim = async (req, res) => {
  const { claim_id } = req.params;
  const query = 'SELECT * FROM "Claim" WHERE claim_id = $1';

  try {
    const result = await database.query(query, [claim_id]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 삭제 요청된 클레임 정보 가져오기 -> /claims?is_deleted=2
exports.getDelRequestClaims = async (is_deleted) => {
  const query = 'SELECT * FROM "Claim" WHERE delete_approval = $1';
  const result = await database.query(query, [is_deleted]);
  return result.rows;
};

// 특정 유저의 상태별 클레임 정보 가져오기 -> /claims?process={process_name}&user={id}
exports.getUserClaimsByProcess = async (process, user_id) => {
  const query =
    'SELECT * FROM "Claim" WHERE last_assigned = $1 AND user_id = $2';
  const result = await database.query(query, [process, user_id]);
  return result.rows;
};

// 특정 유저의 해당하는 모든 클레임 정보 가져오기 -> /claims?user={id}
exports.getUserClaims = async (user_id) => {
  const query = 'SELECT * FROM "Claim" WHERE user_id = $1';
  const result = await database.query(query, [user_id]);
  return result.rows;
};

// 특정 진행상황인 클레임들 가져오기 -> /claims?process={process_id}
exports.getClaimsByProcess = async (process) => {
  const query = 'SELECT * FROM "Claim" WHERE last_assigned = $1';
  const result = await database.query(query, [process]);
  return result.rows;
};

//claims에 있는 모든 정보 가져오기 -> /claims
exports.getAllClaims = async () => {
  const query = 'SELECT * FROM "Claim"';
  const result = await database.query(query);
  return result.rows;
};

// ------------------------------ GET histories ------------------------------
// history_id에 해당하는 상담이력 정보 가져오기
exports.getHistory = async (req, res) => {
  const { history_id } = req.params;
  const query = 'SELECT * FROM "Call_History" WHERE history_id = $1';

  try {
    const result = await database.query(query, [history_id]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//특정 claim_id 기준 모든 상담이력 불러오기 -> /histories?claim={id}
exports.getClaimHistories = async (req, res) => {
  const { claim } = req.query;
  const query = 'SELECT * FROM "Call_History" WHERE Claim_id = $1';
  try {
    const result = await database.query(query, [claim]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ------------------------ POST claims and histories ------------------------
// 첫 문의전화 ( 새로운 클레임번호와 히스토리 생성)
exports.newHistory = async (req, res) => {
  const client = await database.connect(); // 데이터베이스 클라이언트 연결
  const { claim_type_idx, user_id, manager_idx, progress_idx, comment } =
    req.body;

  try {
    await client.query("BEGIN"); // 트랜잭션 시작
    // 첫번째 쿼리
    const result = await client.query(
      'INSERT INTO "Claim" (claim_type_idx, user_id, last_comment, last_manager,last_assigned, document, compensation) VALUES($1, $2, $3, $4, $5, $6, $7)RETURNING claim_id',
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
      'INSERT INTO "Call_History" (claim_id, manager_idx, progress_idx, comment, history_created_at) VALUES($1, $2, $3, $4, $5)',
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
      'INSERT INTO "Call_History" (claim_id, manager_idx, progress_idx, comment, history_created_at) VALUES($1, $2, $3, $4, $5)',
      [claim_id, manager_idx, progress_idx, comment, now]
    );

    // 두번째 쿼리
    await client.query(
      'UPDATE "Claim" Set last_comment = $1, last_manager = $2, last_assigned = $3 WHERE claim_id = $4',
      [comment, manager_idx, progress_idx, claim_id]
    );
    await client.query("COMMIT");
    res.status(201).send("History updated and claim created successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

// --------------------------- POST satisfaction ---------------------------
// 특정 상담에 대한 만족도 등록

// ------------------------------ PATCH claims ------------------------------
// 특정 클레임 수정

// 특정 클레임 삭제 요청

// ----------------------------- PATCH histories -----------------------------
// 특정 상담이력 수정

// ------------------------------ DELETE claims ------------------------------
// 특정 클레임 삭제 승인
