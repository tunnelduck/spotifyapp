'use strict';

var express = require('express');
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

module.exports = router;