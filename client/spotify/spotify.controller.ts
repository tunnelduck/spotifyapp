import {SpotifyService} from './spotify.service';

export class SpotifyComponent {
  
  isChoosingSong: Boolean = false;
  song: string = "";
  pageNum: Number = 1;
  pageSize: Number = 20;
  total: Number;
  songSearch: string = "";
  songs: Array<any> = [];
  spotifyService: SpotifyService;
  
   chooseSongToggle(toggleValue:Boolean) {
     this.isChoosingSong = toggleValue;
   }
   
   selectSong(song:string) {
     this.chooseSongToggle(false);
     this.song = song;
   }
  
   searchSongs(reset:Boolean) {
     if(reset) {
       this.pageNum = 1;
     }
     
     this.spotifyService.getSongs(this.songSearch, this.pageNum).then(response => {
       this.songs = response.tracks;
       this.total = response.total;
     });
   }
   
   submit() {
     if(!this.song) {
       return;
     }
     
     console.log("done");
   }

   constructor(spotifyService:SpotifyService) {
     this.isChoosingSong = false;
     this.songs =[];
     this.pageSize = 20;
     this.pageNum = 1;
     this.spotifyService = spotifyService;
   }
}

angular.module('spartinHouseApp', []).controller('spotifyController', function() {
  
}).service('spotifyService', SpotifyService).component('spotify', {
    controller: SpotifyComponent,
    templateUrl: 'spotifyComponent.html'
});