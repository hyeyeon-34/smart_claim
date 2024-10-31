const { getAllManagers, getManager, updateManager } = require("../controllers/managers_ctrls");

const router = require("express").Router();

router.get('/managers', getAllManagers)
router.get('/managers/:manager', getManager)
router.patch('/managers/:manager', updateManager)
module.exports = router;
