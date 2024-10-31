const router = require('express').Router();
const {
  UserLogin,
  ManagerLogin,
  InsurerLogin,
  ChangeManagerPassword,
} = require('../controllers/login_ctrls');

// 고객 로그인
router.post('/login/user', UserLogin);

// 상담사 로그인
router.post('/login/manager', ManagerLogin);

// 보험사 직원 로그인
router.post('/login/insurer', InsurerLogin);

// 상담사 비밀번호 변경
router.patch('/login/manager/changepw', ChangeManagerPassword);

module.exports = router;
