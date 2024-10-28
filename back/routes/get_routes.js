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

// 유저 관련 엔드포인트
router.get("/users", getUsers); // 모든 유저 조회
router.get("/users/:user_id", getUser); // 특정 유저 조회
router.get("/users/:user_id/claims", getUserClaims); // 유저의 모든 클레임 조회
router.get("/users/:user_id/claims/process", getUserClaimsByProcess); // 유저의 특정 상태별 클레임 조회

// 클레임 관련 엔드포인트
router.get("/claims", getAllClaims); // 모든 클레임 조회
router.get("/claims/:claim_id", getClaim); // 특정 클레임 조회
router.get("/claims/process", getClaimsByProcess); // 상태별 클레임 조회

// 상담 이력 관련 엔드포인트
router.get("/histories/:history_id", getHistory); // 특정 상담 이력 조회
router.get("/claims/:claim_id/histories", getClaimHistories); // 특정 클레임의 모든 상담 이력 조회

module.exports = router;
