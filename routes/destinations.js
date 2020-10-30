const express = require('express');
 const router = express.Router();
 const destinationsCtrl = require('../controllers/destinations');
 
 router.get('/flights/:id/destinations/:id2', destinationsCtrl.deleteOne);
 router.post('/flights/:id/destinations', destinationsCtrl.create);
 
 module.exports = router;