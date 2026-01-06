const express = require('express')
const join = require('node:path')
const bodyParser = require('body-parser')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const browserDistFolder = "./browser";
const app = express();

app.use(bodyParser.json({limit: '3mb'}))
app.use(cors());
app.use(express.static(path.join(__dirname,'build')));
app.use(fileUpload())
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Header','Content-Type, Authorization');
  next();
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

const download_router = require('./routes/download_router.js');
app.use('/api/v1',download_router)

app.get('/',(req,res) => {
  res.send("Hello")
});

const port = process.env['PORT'] || 4000;
app.listen(port, (error) => {
    if (error) {
        console.error(error.message);
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });

