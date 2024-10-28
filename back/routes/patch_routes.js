const router = require("express").Router();

const { patchUser } = require("../controllers/patch_controllers");

router.patch("/users/:user-id", patchUser);

module.exports = router;
