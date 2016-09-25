/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var rest = new SoundLib.Rest()
var ui = new SoundLib.UI()

var currentPlaylist = 0

var Home = function() {}

Home.getUserInfo = function() {
    rest.get('/api/user/info/' + currentUser, function(data) {
        
        var user = data.info[0]
        document.getElementById('name').innerHTML = user.name
        document.getElementById('email').innerHTML = user.email
        
    })
    
}

Home.getUserFavorites = function() {
    rest.get('/api/playlist/userFavorites/' + currentUser, function(data) {
        var result = '<ol>'
        currentPlaylist = data.pid
        data = data.playlist
        if(data[0].artist === null && data[0].title === null) {
            result = 'La playlist est vide';
        } else {
            for(var i = 0; i < data.length; i++) {
                result += '<li><a href="javascript:Home.removeTrackFromPlaylist(' + data[i].id + ')" ><img src="/css/images/delete.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + '</li>'
            }
            result += '</ol>'
        }
        
        var div = document.getElementById('playlist')
        if(div !== undefined) {
            div.innerHTML = result;
        }
    })
    
}

Home.addTrackToPlaylist = function(trackId) {
    rest.put('/api/playlist/addTrack/' + currentPlaylist, {'track' : trackId}, function(data) {
        if(data.inserted == 1) {
            Home.getUserFavorites()
        }
    })
}

Home.removeTrackFromPlaylist = function(trackId) {
    rest.delete('/api/playlist/removeTrack/' + trackId, function(data) {
        if(data.deleted == 1) {
            Home.getUserFavorites()
        }
    })
}

SoundLib.ready(function() {
    Home.getUserInfo(1)
    Home.getUserFavorites()
})
