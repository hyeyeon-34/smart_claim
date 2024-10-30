const router = require("express").Router();

const {
  getUsers,
  getUser,
  patchUser,
  patchInsuranceStatus,
} = require("../controllers/users_ctrls");

// ------------------------------- GET users -------------------------------
router.get("/users", getUsers); // 모든 유저 조회
router.get("/users/:user_id", getUser); // 특정 유저 조회 -> /users/:user_id

// ------------------------------- PATCH users -------------------------------
router.patch("/users/:user_id", patchUser); // 특정 유저 정보 수정
router.patch("/users/:user_id/cancel-insurance", patchInsuranceStatus); // 특정 유저 보험 해지

// ------------------------------- POST users -------------------------------
// 고객 등록 -> /users

// ------------------------------ DELETE users ------------------------------
// 고객 삭제 -> /users/:user_id

module.exports = router;
