const  dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const express = require('express');
const MongoClient = require('mongodb').MongoClient
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const characters = require('./routes/characters');
const team = require('./routes/team');
const app = express();

const UPLOAD_DIR = './dist/assets/img/characters/';
fs.mkdir('_tmp', () => {});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '_tmp' )
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
var upload = multer({ storage: storage })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api/character', characters);
app.use('/api/team', team);
app.post('/api/character/upload', upload.single('file'), (req, res, cb)  => {
  //Create new dir with id of character
  const newPath = UPLOAD_DIR + req.body.dirName;
  fs.mkdir(newPath, err => { 
    fs.rename(req.file.path, newPath + '/' + req.file.originalname, (err)  => {
      res.status(200).json({   
        success: true 
      })
    }); 
  }) 
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

const port = process.env.PORT || 3000;

/**
 * Listen on provided port, on all network interfaces.
 */
const server = http.createServer(app);

const initDb = (Db) => {
  Db.createCollection("characters", { autoIndex: false });
}
MongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('sdo');
  initDb(db);
  server.listen(port, () => console.log(`API running on localhost:${port}`));
})