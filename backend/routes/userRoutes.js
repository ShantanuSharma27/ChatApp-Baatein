const express = require('express');
const router = express.Router();
const { registerUser, authUser,allUsers } = require('../controllers/userControllers');
const {protect}=require("../middlewares/authMiddleware")
router.post("/",registerUser);
router.post("/login", authUser);
router.route('/').get(protect, allUsers);

module.exports = router;
