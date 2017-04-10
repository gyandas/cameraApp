'use strict';

var express = require('express');
var router = express.Router();
var Leads = require('../models/leadModel');
var sendEmail = require('../utils/sendEmail');

router.get('/', function(req, res) {
    Leads.find({}, function(err, leads) {
        if (err) throw err;
        res.send(leads);
    });
});

router.get('/:id', function(req, res) {
    Leads.findById({ _id: req.params.id }, function(err, lead) {
        if (err) throw err;
        res.send(lead);
    });
});

router.post('/', function(req, res) {
    var newTodo = Leads({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image
    });
    newTodo.save(function(err) {
        if (err) throw err;
        res.send({status:'success'});
    });
    var html = `Dear ${newTodo.name.charAt(0).toUpperCase() + newTodo.name.slice(1)},<br><br>With best compliments from GSK.<br><br><img src=${newTodo.image}><br><br>Regards,<br><b>Team GSK</b>`;
    sendEmail(newTodo.email, 'Sweet memories at GSK Excellence Awards 2016', html);
    /*// Send email
    var mailOptions = {
        from: 'sameergkoli@gmail.com', // sender address
        to: newTodo.email, // list of receivers
        subject: 'Thank you!!!', // Subject line
        //text: text //, // plaintext body
        html: html // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            //res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            //res.json({yo: info.response});
        };
    });*/
});

router.put('/:id', function(req, res) {
    Leads.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email}, function(err, todo) {
        if (err) throw err;
        res.send({status:'success'});
    });
});

router.delete('/:id', function(req, res) {
    Leads.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        res.send({status:'success'});
    })
});

/*router.post('/deleteAll', function(req, res) {
    Leads.remove({}, function(err) {
        //if (err) throw err;
        if (err) console.log(err);
        res.send('success');
    })
});*/

module.exports = router;