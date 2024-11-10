const express = require('express');
const router = express.Router();
const authController = require("../controller/authcontroller");

router.post("/login",authController.login);
router.patch('/reset-password', authController.resetPassword);

module.exports = router;