var express = require('express');
var router = express.Router();
var CharacterService = require('../services/character.service');
router.post('/save', async(req, res) => {
  try {
    var result = await CharacterService.create(req.body);console.log(2);
    if (result.success) {
      return res.status(200).json({ 
        success: true,
        data: result.data
      })
    }
    return res.status(400).json({ success: false });    
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
});
router.get('/list', async(req, res) => {
  try {
    const status = await CharacterService.list(req.query.position);
    if (status.success) {
      return res.status(200).json({ 
        data: status.data,
        success: true 
      })
    }
    
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
})
router.get('/get', async(req, res) => {
  try {
    const status = await CharacterService.get(req.query.id);
    if (status.success) {
      return res.status(200).json({ 
        data: status.data,
        success: true 
      })
    } 
    return res.status(400).json({ success: false })
  } catch (err) {
    return res.status(400).join({ error: err.message, success: false });
  }
})
module.exports = router;
