const router = require("express").Router();

const {
  getUser,
  getUsers,
  getUserClaims,
  getClaim,
  getAllClaims,
  getClaimsByProcess,
  getUserClaimsByProcess,
  getHistory,
  getClaimHistories,
} = require("../controllers/get_controllers");

///////////////////////// 유저 조회 엔드포인트 /////////////////////////
router.get("/users", getUsers); // 모든 유저 조회
router.get("/users/:user-id", getUser); // 특정 유저 조회

///////////////////////// 클레임 조회 엔드포인트 /////////////////////////
router.get("/claims/:claim-id", getClaim); // 특정 클레임 조회
// /claims: 모든 클레임 조회 또는 조건부 조회 (process, user_id 포함)
router.get("/claims", async (req, res) => {
  const { process, user } = req.query;

  try {
    if (process && user) {
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

///////////////////////// 상담 이력 조회 엔드포인트 /////////////////////////
router.get("/histories/:history-id", getHistory); // 특정 상담 이력 조회
router.get("/claims/:claim-id/histories", getClaimHistories); // 특정 클레임의 모든 상담 이력 조회

module.exports = router;
