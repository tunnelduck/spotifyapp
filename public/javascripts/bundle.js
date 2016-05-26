(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var spotify_service_1 = require('./spotify.service');
var SpotifyComponent = (function () {
    function SpotifyComponent(spotifyService) {
        this.isChoosingSong = false;
        this.song = "";
        this.pageNum = 1;
        this.pageSize = 20;
        this.songSearch = "";
        this.songs = [];
        this.isChoosingSong = false;
        this.songs = [];
        this.pageSize = 20;
        this.pageNum = 1;
        this.spotifyService = spotifyService;
    }
    SpotifyComponent.prototype.chooseSongToggle = function (toggleValue) {
        this.isChoosingSong = toggleValue;
    };
    SpotifyComponent.prototype.selectSong = function (song) {
        this.chooseSongToggle(false);
        this.song = song;
    };
    SpotifyComponent.prototype.searchSongs = function (reset) {
        var _this = this;
        if (reset) {
            this.pageNum = 1;
        }
        this.spotifyService.getSongs(this.songSearch, this.pageNum).then(function (response) {
            _this.songs = response.tracks;
            _this.total = response.total;
        });
    };
    SpotifyComponent.prototype.submit = function () {
        if (!this.song) {
            return;
        }
        console.log("done");
    };
    return SpotifyComponent;
}());
exports.SpotifyComponent = SpotifyComponent;
angular.module('spartinHouseApp', []).controller('spotifyController', function () {
}).service('spotifyService', spotify_service_1.SpotifyService).component('spotify', {
    controller: SpotifyComponent,
    templateUrl: 'spotifyComponent.html'
});
},{"./spotify.service":2}],2:[function(require,module,exports){
"use strict";
var SpotifyService = (function () {
    function SpotifyService($http) {
        this.httpService = $http;
    }
    SpotifyService.prototype.getSongs = function (songSearch, pageNum) {
        return this.httpService({
            method: 'GET',
            url: "/api/spotify?tracktitle=" + songSearch + "&pagenum=" + pageNum
        }).then(function (response) {
            return response.data;
        });
    };
    return SpotifyService;
}());
exports.SpotifyService = SpotifyService;
},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
