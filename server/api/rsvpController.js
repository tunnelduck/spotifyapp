'use strict';

var express = require('express');
var binder = require('model-binder');
var rsvpSubmissionModel = require('../models/rsvpSubmission.model').model;
var router = express.Router();

router.post('/', binder(rsvpSubmissionModel), function(req, res) {
  
  req.requestModel.submissionDate = new Date();

  req.requestModel.save(function(err, model) {
    console.log(err);
    res.json({
      id: model._id  
    });
  })
});

module.exports = router;