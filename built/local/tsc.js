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
        console.log(this);
    };
    return SpotifyComponent;
}());
angular.module('spartinHouseApp', []).controller('spotifyController', function () {
}).component('spotify', {
    controller: SpotifyComponent,
    templateUrl: 'spotifyComponent.html'
});
