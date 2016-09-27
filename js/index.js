/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var rest = new SoundLib.Rest()

var currentUser = 1
var currentPlaylist = 0

var Home = function() {}

Home.getUserInfo = function() {
    rest.get('/api/user/' + currentUser, function(data) {
        
        var user = data.info[0]
        document.getElementById('name').innerHTML = user.name
        document.getElementById('email').innerHTML = user.email
    })
}

Home.getCollection = function() {
    rest.get('/api/collection/' + currentUser, function(data) {
        var result = '<ol>'
        data = data.collection

            for(var i = 0; i < data.length; i++) {
                var duration = data[i].duration
                
                var minutes = Math.floor(duration / 60)
                var seconds = duration - (minutes * 60)
                duration = minutes + ':' + ('00' + seconds).toString().slice(-2)
            
                result += '<li><a href="javascript:Home.addTrackToPlaylist(' + data[i].id + ')" ><img src="/css/images/add.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
            }
            result += '</ol>'
        
        var div = document.getElementById('collection')
        if(div !== undefined) {
            div.innerHTML = result
        }
    })
    
}

Home.getUserFavorites = function() {
    rest.get('/api/playlist/' + currentUser, function(data) {
        var result = '<ol>'
        currentPlaylist = data.pid
        data = data.playlist
        if(data[0].artist === null && data[0].title === null) {
            result = 'La playlist est vide'
        } else {
            for(var i = 0; i < data.length; i++) {
                var duration = data[i].duration
                
                var minutes = Math.floor(duration / 60)
                var seconds = duration - (minutes * 60)
                duration = minutes + ':' + ('00' + seconds).toString().slice(-2)
            
                result += '<li><a href="javascript:Home.removeTrackFromPlaylist(' + data[i].id + ')" ><img src="/css/images/delete.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
            }
            result += '</ol>'
        }
        
        var div = document.getElementById('playlist')
        if(div !== undefined) {
            div.innerHTML = result
        }
    })
    
}

Home.addTrackToPlaylist = function(trackId) {
    rest.put('/api/playlist/' + currentPlaylist, {'track' : trackId}, function(data) {
        if(data.inserted == 1) {
            Home.getUserFavorites()
        }
    })
}

Home.removeTrackFromPlaylist = function(trackId) {
    rest.delete('/api/playlist/' + trackId, function(data) {
        if(data.deleted == 1) {
            Home.getUserFavorites()
        }
    })
}

SoundLib.ready(function() {
    Home.getUserInfo(1)
    Home.getCollection()
    Home.getUserFavorites()
})