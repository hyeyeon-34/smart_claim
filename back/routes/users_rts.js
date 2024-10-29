const { getUsers, getUser, patchUser } = require("../controllers/users_ctrls");

const router = require("express").Router();

// ------------------------------- GET users -------------------------------
router.get("/users", getUsers); // 모든 유저 조회
router.get("/users/:user_id", getUser); // 특정 유저 조회 -> /users/:user_id

// ------------------------------- PATCH users -------------------------------
router.patch("/users/:user_id", patchUser);

// ------------------------------- POST users -------------------------------
// 고객 등록 -> /users

// ------------------------------ DELETE users ------------------------------
// 고객 삭제 -> /users/:user_id

module.exports = router;
