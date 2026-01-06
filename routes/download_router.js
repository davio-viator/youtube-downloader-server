const express = require('express')
const router = express.Router();
const downloadService = require('../services/downloadService.js');

router.get('/basic-download',async (req,res) => {
    await downloadService.basicDownload()
    res.send("download was used")
});

module.exports = router