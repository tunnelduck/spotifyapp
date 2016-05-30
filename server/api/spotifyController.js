'use strict';

var express = require('express');
var binder = require('model-binder');
var spotifySongSubmissionModel = require('../models/spotifySongSubmission.model').model;
var router = express.Router();

var spotifySearch = require('../integrations/spotify/spotifySearch').search;

router.get('/', function(req, res) {
  spotifySearch(req.query.tracktitle, req.query.pagenum)
    .then(function(entity) {

        return {
          tracks: entity.tracks.items.map(function(item) {
            var artistObj = item.artists[0];
            var trackTitle = item.name;
            
            return {
              artist: artistObj.name,
              trackTitle: trackTitle,
              id: item.id
            };
          }),
          total: entity.tracks.total
       };
    }).then(function(result) {
        res.json(result);
    })

});

router.post('/', binder(spotifySongSubmissionModel), function(req, res) {
  
  req.requestModel.active = true;
  req.requestModel.submissionDate = new Date();
  
  req.requestModel.save(function(err, model) {
    console.log(err);
    res.json({
      id: model._id  
    });
  })
});

module.exports = router;