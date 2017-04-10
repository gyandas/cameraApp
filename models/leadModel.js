'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadSchema = new Schema({
    name: String,
    email: String,
    image: String
});

var Leads = mongoose.model('Leads', leadSchema);

module.exports = Leads;