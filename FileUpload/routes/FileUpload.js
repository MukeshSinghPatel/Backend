const express = require("express")
const router = express.Router();

const {localFileUpload} = require("../controllers/fileUpload");

// use routes
router.post("/localFileUpload", localFileUpload);

module.exports = router;