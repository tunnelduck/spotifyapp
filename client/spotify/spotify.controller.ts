import {SpotifyService} from './spotify.service';

export class SpotifyComponent {
  
  isChoosingSong: Boolean = false;
		submissionSuccess: Boolean = false;
  song: any = "";
  email: string = "";
  name: string = "";
  comment: string = "";
  pageNum: Number = 1;
  pageSize: Number = 20;
  total: Number;
  songSearch: string = "";
  songs: Array<any> = [];
  spotifyService: SpotifyService;
		isSaving: Boolean = false;
  
   chooseSongToggle(toggleValue:Boolean) {
     this.isChoosingSong = toggleValue;
   }
   
   selectSong(song:any) {
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
     if(!this.song || this.isSaving) {
       return;
     }
					
					this.isSaving = true;
     
     this.spotifyService.saveSubmission(this.name, this.email, this.song.id, this.comment).then(response => {
						 
							if(response.id) {
							  this.submissionSuccess = true;
							} else {
								this.isSaving = false;
								 alert('there was an error');
							}
     });
					
   }

   constructor(spotifyService:SpotifyService) {
     this.isChoosingSong = false;
     this.songs =[];
     this.pageSize = 20;
     this.pageNum = 1;
     this.spotifyService = spotifyService;
   }
}

angular.module('spartinHouseApp', ['ui.bootstrap']).controller('spotifyController', function() {
  
}).service('spotifyService', SpotifyService).component('spotify', {
    controller: SpotifyComponent,
    templateUrl: 'spotifyComponent.html'
});