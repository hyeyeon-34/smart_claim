const router = require("express").Router();

const {
  getClaim,
  getDelRequestClaims,
  getUserClaimsByProcess,
  getUserClaims,
  getClaimsByProcess,
  getAllClaims,
  getHistory,
  getClaimHistories,
  newHistory,
  appendHistory,
  updateClaim,
  requestDeleteClaim,
  updateHistory,
  approveDeleteClaim,
  addSatisfaction,
} = require("../controllers/claims_histories_ctrls");

// ------------------------------- GET claims -------------------------------
router.get("/claims/:claim_id", getClaim);
router.get("/claims", async (req, res) => {
  const { process, user, is_deleted } = req.query;

  try {
    if (is_deleted == 2) {
      const result = await getDelRequestClaims(is_deleted);
      res.status(200).json(result);
    } else if (process && user) {
      // 특정 유저의 상태별 클레임 조회 -> /claims?process={process_idx}&user={id}
      const result = await getUserClaimsByProcess(process, user);
      res.status(200).json(result);
    } else if (user) {
      // 특정 유저의 모든 클레임 조회 -> /claims?user={id}
      const result = await getUserClaims(user);
      res.status(200).json(result);
    } else if (process) {
      // 특정 상태의 모든 클레임 조회 -> /claims?process={process_id}
      const result = await getClaimsByProcess(process);
      res.status(200).json(result);
    } else {
      // 쿼리 파라미터가 없으면 모든 클레임 조회 -> /claims
      const result = await getAllClaims();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------------------ GET histories ------------------------------
router.get("/histories/:history_id", getHistory); // 특정 상담 이력 조회
router.get("/histories", getClaimHistories); // 특정 클레임의 모든 상담 이력 조회 -> /histories?claim={id}

// ------------------------ POST claims and histories ------------------------
router.post("/claims", newHistory);
router.post("/call-histories", appendHistory);

// --------------------------- POST satisfaction ---------------------------
// 특정 상담에 대한 만족도 등록
router.post("/satisfactions", addSatisfaction);

// ------------------------------ PATCH claims ------------------------------
// 특정 클레임 수정
router.patch("/claims/:claim_id", updateClaim);

// 특정 클레임 삭제 요청
router.patch("/claims/:claim_id/request-delete", requestDeleteClaim);

// ----------------------------- PATCH histories -----------------------------
// 특정 상담이력 수정
router.patch("/histories/:history_id", updateHistory);

// ------------------------------ DELETE claims ------------------------------
// 특정 클레임 삭제 승인
router.patch("/claims/:claim_id/approve-delete", approveDeleteClaim);

module.exports = router;
