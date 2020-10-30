var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');

/* GET users listing. */
router.get('/', flightsCtrl.index);

router.get('/new', flightsCtrl.new);
router.post('/', flightsCtrl.create);
router.get('/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create);
router.post('/:id/tickets', flightsCtrl.createTicket);
router.get('/:id/tickets', flightsCtrl.assignTicket);

module.exports = router;
