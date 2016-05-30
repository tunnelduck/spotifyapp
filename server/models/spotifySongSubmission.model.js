'use strict';

var mongoose = require('mongoose');

var SpotifySongSubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  songId: String,
  active: Boolean,
  comment: String,
  submissionDate: { type: Date, default: Date.now }
});

module.exports = {
  model: mongoose.model('SpotifySongSubmission', SpotifySongSubmissionSchema)
}
