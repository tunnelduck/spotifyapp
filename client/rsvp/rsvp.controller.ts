export class RsvpComponent {
    submissionSuccess: Boolean = false;
    partyTotal: Number;
    name: String;
    isAttending: Boolean;
    rsvpService: RsvpService;
    isSaving: Boolean = false;
    
    submit() {
        if(this.isSaving) {
            return;
        }
        
        this.isSaving = true;
        
        this.rsvpService.saveSubmission(this.name, this.isAttending, this.partyTotal).then(response => {
            if(response.id) {
                this.submissionSuccess = true;
            } else {
                this.isSaving = false;
                alert('there was an error')
            }
        })
    }
    
    constructor(rsvpService:RsvpService) {
        this.rsvpService = rsvpService
    }
}

export class RsvpService {
    httpService: ng.IHttpService;
    
    public saveSubmission(name: String, isAttending: Boolean, partyTotal:Number): ng.IPromise<any> {
        return this.httpService({
            method: 'POST',
            url: '/api/rsvp',
            data: {
                name: name,
                partyTotal: partyTotal,
                isAttending: isAttending
            }
        }).then(function(response) {
            return response.data;
        })
    }
    
    constructor($http:ng.IHttpService) {
        this.httpService = $http;
    }
}

angular.module('spartinHouseRsvpApp', []).controller('rsvpController', function() {
  
}).service('rsvpService', RsvpService).component('rsvp', {
    controller: RsvpComponent,
    templateUrl: 'rsvpComponent.html'
});