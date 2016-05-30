'use strict';

var mongoose = require('mongoose');

var RsvpSubmissionSchema = new mongoose.Schema({
  name: String,
  isAttending: Boolean,
  partyTotal: Number,
  submissionDate: { type: Date, default: Date.now }
});

module.exports = {
  model: mongoose.model('RsvpSubmission', RsvpSubmissionSchema)
}
