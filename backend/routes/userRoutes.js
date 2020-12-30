const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerHandler);
router.post("/login", userController.loginHandler);

module.exports = router;
