const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const AdController = require('../controllers/ads.controller');

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.post('/ads', authMiddleware, AdController.addAd);
router.delete('/ads/:id', authMiddleware, AdController.deleteAd);
router.put('/ads/:id', authMiddleware, AdController.uppdateAd);
router.get('/ads/search/:searchPhrase', AdController.searchPhrase);

module.exports = router;