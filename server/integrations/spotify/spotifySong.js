/**
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
var request = require('request-promise');

function getAccessToken() {
    var client_id = process.env.SPOTIFY_ID; // Your client id
    var client_secret = process.env.SPOTIFY_SECRET; // Your client secret

    console.log(client_id + ' ' + client_secret + ' ' + process.env.GOOGLE_SECRET);

    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    return request.post(authOptions);
}

function searchWithToken (trackId, body) {
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
        url: 'https://api.spotify.com/v1/tracks/' + trackId,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };
    return request.get(options);
}

function search(trackId) { 
    
    return getAccessToken().then(function(response) {
        return searchWithToken(trackId, response);       
    });
}

module.exports = {
    search: search
}


