const express = require('express');
const path = require('path');
const http = require('http');
const multer = require('multer');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const characters = require('./routes/characters');
const team = require('./routes/team');
const characterService = require('./services/character.service');

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
const app = express();

characterService.mock();
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
  fs.mkdir(newPath, err => { console.log(err)
    console.log(newPath + req.file.originalname);
    console.log(req.file.path);
    fs.rename(req.file.path, newPath + '/' + req.file.originalname, (err)  => {console.log(err);
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
const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;
