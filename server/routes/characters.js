var express = require('express');
var router = express.Router();
var CharacterService = require('../services/character.service');
router.post('/save', async(req, res, next) => {
  console.log(2);
  try {
    console.log(3);
    const status = await CharacterService.create(req.body);
    console.log(1);
    if (status) {
      return res.status(200).json({ success: true })
    }
    return res.status(400).json({ success: false })
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
});

module.exports = router;
