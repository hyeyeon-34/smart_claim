const router = require("express").Router(); // api path를 전달해 주는 메서드

const { newHistory } = require("../controllers/post_controllers");
const { appendHistory } = require("../controllers/post_controllers");

router.post("/claims", newHistory);
router.post("/call-histories", appendHistory);

module.exports = router;
