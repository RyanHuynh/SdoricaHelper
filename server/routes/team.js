var express = require('express');
var router = express.Router();
var TeamService = require('../services/team.service');
router.post('/save', async(req, res) => {
  try {
    const status = await TeamService.create(req.body);
    if (status) {
      return res.status(200).json({ success: true })
    }
    return res.status(400).json({ success: false })
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
});
router.get('/list', async(req, res) => {
  try {
    const status = await TeamService.list(req.query.mode);
    if (status.success) {
      return res.status(200).json({ 
        data: status.data,
        success: true 
      })
    }
    return res.status(400).json({ success: false })
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
})
module.exports = router;
