const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {departsDate});
}
function index(req, res) {
    Flight.find({}, function(err, flights) {
      res.render('flights/index', { flights });
    });
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('ticket').exec(function(err, flight) {
    // Ticket.find({}).where('_id').nin(flight.ticket) <-- Mongoose query builder
    // Native MongoDB approach 
    Ticket.find(
     {flight: flight._id},
     function(err, tickets) {
       console.log(tickets);
       res.render('flights/show', {
         title: 'Flight Detail', flight, tickets
       });
     }
   );
  });
}


function create(req, res) {

  for (let key in req.body){
    if(req.body[key] === '') delete req.body[key];
  }
  const flight = new Flight(req.body);
  flight.save(function(err) {
    if (err) return res.render('flights/new');
    console.log(flight);
    res.redirect(`/flights/${flight._id}`);
  });
}

function assignTicket(req, res){

    Flight.findById(req.params.id)
    .populate('ticket').exec(function(err, flight) {
      Ticket.find(
       {flight: flight._id},
       function(err, tickets) {
         console.log(tickets);
         res.render('flights/show', {
           title: 'Flight Detail', flight, tickets
         });
       }
     );
    });
  }

  // Flight.findById(req.params.id, function(err, flight) {
  //   flight.ticket.push(req.body.ticketId);
  //   flight.save(function(err) {
  //     res.redirect(`/flights/${flight._id}`);
  //   });
  // });


function createTicket(req, res){

  const ticket = new Ticket(req.body);
  ticket.flight = req.params.id;
  ticket.save(function(err) {
    if (err) return res.render(`/flights/${req.params.id}`);
    console.log(ticket);
    res.redirect(`/flights/${req.params.id}`);
  });
}
      
module.exports = {
    index,
    new: newFlight,
    show,
    create,
    createTicket, assignTicket
  };