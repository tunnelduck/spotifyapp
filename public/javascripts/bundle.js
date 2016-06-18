(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var HomeComponent = (function () {
    function HomeComponent() {
        this.myInterval = 5000;
        this.noWrapSlides = false;
        this.slides = [
            {
                image: '/images/1.png', text: '', id: 0
            },
            {
                image: '/images/2.png', text: '', id: 1
            },
            {
                image: '/images/3.png', text: '', id: 2
            },
            {
                image: '/images/4.png', text: '', id: 3
            },
            {
                image: '/images/5.png', text: '', id: 4
            },
            {
                image: '/images/6.png', text: '', id: 5
            }
        ];
    }
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
angular.module('spartinHouseHomeApp', ['ui.bootstrap', 'ngAnimate']).controller('homeController', function () {
}).component('home', {
    controller: HomeComponent,
    template: "\n      <uib-carousel active=\"active\" interval=\"$ctrl.myInterval\" no-wrap=\"$ctrl.noWrapSlides\">\n        <uib-slide ng-repeat=\"slide in $ctrl.slides track by slide.id\" index=\"slide.id\">\n          <img ng-src=\"{{slide.image}}\" style=\"margin:auto;\">\n        </uib-slide>\n      </uib-carousel>"
});
},{}],2:[function(require,module,exports){
"use strict";
var RsvpComponent = (function () {
    function RsvpComponent(rsvpService) {
        this.submissionSuccess = false;
        this.isSaving = false;
        this.rsvpService = rsvpService;
    }
    RsvpComponent.prototype.submit = function () {
        var _this = this;
        if (this.isSaving) {
            return;
        }
        this.isSaving = true;
        this.rsvpService.saveSubmission(this.name, this.isAttending, this.partyTotal).then(function (response) {
            if (response.id) {
                _this.submissionSuccess = true;
            }
            else {
                _this.isSaving = false;
                alert('there was an error');
            }
        });
    };
    return RsvpComponent;
}());
exports.RsvpComponent = RsvpComponent;
var RsvpService = (function () {
    function RsvpService($http) {
        this.httpService = $http;
    }
    RsvpService.prototype.saveSubmission = function (name, isAttending, partyTotal) {
        return this.httpService({
            method: 'POST',
            url: '/api/rsvp',
            data: {
                name: name,
                partyTotal: partyTotal,
                isAttending: isAttending
            }
        }).then(function (response) {
            return response.data;
        });
    };
    return RsvpService;
}());
exports.RsvpService = RsvpService;
angular.module('spartinHouseRsvpApp', []).controller('rsvpController', function () {
}).service('rsvpService', RsvpService).component('rsvp', {
    controller: RsvpComponent,
    templateUrl: 'rsvpComponent.html'
});
},{}],3:[function(require,module,exports){
"use strict";
var spotify_service_1 = require('./spotify.service');
var SpotifyComponent = (function () {
    function SpotifyComponent(spotifyService) {
        this.isChoosingSong = false;
        this.submissionSuccess = false;
        this.song = "";
        this.email = "";
        this.name = "";
        this.comment = "";
        this.pageNum = 1;
        this.pageSize = 20;
        this.songSearch = "";
        this.songs = [];
        this.isSaving = false;
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
        var _this = this;
        if (!this.song || this.isSaving) {
            return;
        }
        this.isSaving = true;
        this.spotifyService.saveSubmission(this.name, this.email, this.song.id, this.comment).then(function (response) {
            if (response.id) {
                _this.submissionSuccess = true;
            }
            else {
                _this.isSaving = false;
                alert('there was an error');
            }
        });
    };
    return SpotifyComponent;
}());
exports.SpotifyComponent = SpotifyComponent;
angular.module('spartinHouseApp', ['ui.bootstrap']).controller('spotifyController', function () {
}).service('spotifyService', spotify_service_1.SpotifyService).component('spotify', {
    controller: SpotifyComponent,
    templateUrl: 'spotifyComponent.html'
});
},{"./spotify.service":4}],4:[function(require,module,exports){
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
    SpotifyService.prototype.saveSubmission = function (name, email, songId, comment) {
        return this.httpService({
            method: 'POST',
            url: '/api/spotify',
            data: {
                name: name,
                email: email,
                songId: songId,
                comment: comment
            }
        }).then(function (response) {
            return response.data;
        });
    };
    return SpotifyService;
}());
exports.SpotifyService = SpotifyService;
},{}]},{},[3,2,1])


//# sourceMappingURL=bundle.js.map
