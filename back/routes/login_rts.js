const router = require("express").Router();
const {
  userLogin,
  managerLogin,
  insurerLogin,
} = require("../controllers/login_ctrls");

// 고객 로그인
router.post("/login/user", userLogin);

// 상담사 로그인
router.post("/login/manager", managerLogin);

// 보험사 직원 로그인
router.post("/login/insurer", insurerLogin);

module.exports = router;
