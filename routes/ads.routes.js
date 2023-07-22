const express = require('express');
const router = express.Router();

const AdController = require('../controllers/ads.controller');

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.post('/ads', AdController.addAd);
router.delete('/ads/:id', AdController.deleteAd);
router.put('/ads/:id', AdController.uppdateAd);
router.get('/ads/search/:searchPhrase', AdController.searchPhrase);

module.exports = router;