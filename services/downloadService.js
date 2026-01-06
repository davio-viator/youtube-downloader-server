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

function getInfoSync(req,res) {
    const output = execSync(`yt-dlp ${link} -J`).toString()
    const formats = JSON.parse(output).formats
    const acceptableExt = ['mp3', 'mp4', 'webm']
    const acceptableSizes = ['144p', '240p', '360p', '480p', '720p', '1080p']
    const availableQuality = {
        '144p':false,
        '240p':false,
        '360p':false,
        '480p':false,
        '720p':false,
        '1080p':false,

    }
    const acceptableFormats = []
    for(format in formats) {
        const ext = formats[format].ext
        const size = formats[format].format_note
        if(acceptableExt.includes(ext) && acceptableSizes.includes(size)){
            acceptableFormats.push(formats[format])
            if(availableQuality[size] == false) availableQuality[size] = true
        }
    }
    acceptableFormats.push({availableQuality})
    return acceptableFormats;
}

function getInfo(req,res,data) {
    const formats = JSON.parse(data).formats
    const acceptableExt = ['mp3', 'mp4', 'webm']
    const acceptableSizes = ['144p', '240p', '360p', '480p', '720p', '1080p']
    const availableQuality = {
        '144p':false,
        '240p':false,
        '360p':false,
        '480p':false,
        '720p':false,
        '1080p':false,

    }
    const acceptableFormats = []
    for(format in formats) {
        const ext = formats[format].ext
        const size = formats[format].format_note
        if(acceptableExt.includes(ext) && acceptableSizes.includes(size)){
            acceptableFormats.push(formats[format])
            if(availableQuality[size] == false) availableQuality[size] = true
        }
    }
    acceptableFormats.push({availableQuality})
    return acceptableFormats;
}




module.exports = {
    basicDownload,
    getInfoSync,
    getInfo,
}