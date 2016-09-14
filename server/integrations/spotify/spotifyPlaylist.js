/**
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
var request = require('request-promise');

function getAccessToken() {
    var client_id = process.env.SPOTIFY_ID; // Your client id
    var client_secret = process.env.SPOTIFY_SECRET; // Your client secret

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

function addWithToken (uris) {
    // use the access token to access the Spotify Web API

    var options = {
        url: 'https://api.spotify.com/v1/users/tunnelduck/playlists/4RLunXR73BC1cL16qJ4xll/tracks',
        headers: {
            'Authorization': 'Bearer ' + 'AQC04bx282Bh6nEHiRdoja9T4Gp8L81-Yi8C1u7K6bp0Z4VMs3rpMGk-IdA7tLXmiDi2_zQ1YdVBh2zh96zS2eXH9nrNFi4BukuLm9FQE5TKqtfHiHQ0ILb3cTFUi4a-VqxrN1zUPIvY9AO4gopjKECRKp2G265gn12YebiCLa6tawWax1ky4OUqPAYr7bZVYFd0qBnI5jmAbPREiAJbLfDqfrwcuzCQFtwHer_z1ChP3WvCkbQD6AWUa3X-rOEy8SAk1GILW0Jr9LttM2jaXgH5yMkllpBO0Oq8DkQaV6y6_lFNfS7Oam60sDVGSszDK-M'
        },
        json: true,
        body: {
            uris: uris
        }
    };
    return request.post(options);
}

function add(uris) { 
    console.log(uris);
    return addWithToken(uris);       

}

module.exports = {
    add: add
}


