const router = require('express').Router();
const {
  userLogin,
  managerLogin,
  insurerLogin,
  changeManagerPassword,
} = require('../controllers/login_ctrls');

// 고객 로그인
router.post('/login/user', userLogin);

// 상담사 로그인
router.post('/login/manager', managerLogin);

// 보험사 직원 로그인
router.post('/login/insurer', insurerLogin);

// 상담사 비밀번호 변경
router.patch('/login/manager/changepw', changeManagerPassword);

module.exports = router;
