const router = require("express").Router();

const { patchUser } = require("../controllers/patch_controllers");

router.patch("/users/:user_id", patchUser);

module.exports = router;
