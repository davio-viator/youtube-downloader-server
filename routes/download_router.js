const express = require('express')
const router = express.Router();
const downloadService = require('../services/downloadService.js');
const exec = require('child_process').exec
const execSync = require('child_process').execSync
const link = "https://www.youtube.com/watch?v=ciPYX2ZWBok"

router.get('/basic-download-old',async (req,res) => {
    await downloadService.basicDownload()
    res.send("download was used")
});

router.get('/basic-download',async (req,res) => {
    
    // const name = req.body.name
    const name = "test-dl"
    const location = "./downloads/"
    const outputName = `-o ${location}${name}.%(ext)s`
    const output = execSync(`yt-dlp ${outputName} ${link} --no-keep-fragments`, {encoding: 'utf-8'})
    
    res.send(`download was used, the output was: \n${output}`)
});

router.get('/get-info',(req,res) => {
    const acceptableFormats = downloadService.getInfo()
    res.send(acceptableFormats);
})

router.get('/test-exec',(req,res) => {
    exec(`yt-dlp ${link} -J`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        const acceptableFormats = downloadService.getInfo(req,res,stdout)
        res.send(acceptableFormats);
    })

})

module.exports = router