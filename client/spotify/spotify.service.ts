export class SpotifyService {
    
    httpService: ng.IHttpService;
    
    public getSongs(songSearch: string, pageNum: Number) : ng.IPromise<any> {

        return this.httpService({
          method: 'GET',
          url: `/api/spotify?tracktitle=${songSearch}&pagenum=${pageNum}`
        }).then(function(response) {
          return response.data;
        });

    }
    
    constructor($http:ng.IHttpService) {
        this.httpService = $http;
    }
}