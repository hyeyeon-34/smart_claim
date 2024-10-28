const router = require('express').Router(); // api path를 전달해 주는 메서드

const { getUser } = require('../controllers/getuser');
const { getUsers } = require('../controllers/getuser');
const {patchUser} = require('../controllers/getuser')
const {getUserClaims} = require('../controllers/getuser')
const {getClaims} = require('../controllers/getuser')
const {getHistory} = require('../controllers/getuser')
const {getAllClaims} = require('../controllers/getuser')
const {getHistoryOfClaim} = require('../controllers/getuser')
const {newHistory} = require('../controllers/getuser')
const {appendHistory} = require('../controllers/getuser')
const {getProgressClaim} = require('../controllers/getuser')
const {getUserProgressClaim} = require('../controllers/getuser')

router.get('/users', getUsers);
router.get('/users/:user_id', getUser);
router.patch('/users/:user_id',patchUser)
router.get('/users/:user_id/claims', getUserClaims)
router.get('/claims/:claim_id', getClaims)
router.get('/history/:history_id', getHistory)
router.get('/claims', getAllClaims)
router.get('/histories', getHistoryOfClaim)
router.post('/claims', newHistory)
router.post('/call_histories', appendHistory)
router.get('/progressclaims',getProgressClaim)
router.get('/userprogressclaims', getUserProgressClaim)

// router.get('/histories/:claim_id', getHistoryOfClaim)
module.exports = router; // router 변수를 모듈로 사용할 수 있도록 설정