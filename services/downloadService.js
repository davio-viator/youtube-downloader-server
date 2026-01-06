const fs = require('fs');
// const ytdl = require('ytdl-core')
const ytdl = require('@distube/ytdl-core');


const downloadPath = "./downloads";

async function basicDownload(req,res) {
    console.log("service used")
    var link, options = {}
    link = "https://www.youtube.com/watch?v=n5Zynb1KhVo"
    // ytdl.getBasicInfo(link)
    // .then(basicInfo => {
    //     fs.writeFileSync(`${downloadPath}/basic-info.json`,JSON.stringify(basicInfo));
    //     ytdl.getInfo(link)
    //     .then(info => {
    //         fs.writeFileSync(`${downloadPath}/info.json`,JSON.stringify(info));
    //     })
    // });

    // ytdl.getInfo(link)
    // .then(info => {
    //     fs.writeFileSync(`${downloadPath}/info.json`,JSON.stringify(info));
    // })
    
    
    ytdl(link)
    .pipe(fs.createWriteStream ( `${downloadPath}/ video.mp4`  ))
    .on('finish', () => {
        console.log("finished")
    })
    .on('error',(err) => {
        console.error('Erreur lors du téléchargement de la vidéo :', err);
    })
};


module.exports = {
    basicDownload,
}