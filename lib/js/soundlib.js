/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SoundLib = function() {
    
}

SoundLib.ready = function(f){/in/.test(document.readyState)?setTimeout('SoundLib.ready('+f+')',9):f()}

SoundLib.getUserInfo = function() {
    Rest.get('/api/user/' + currentUser, function(data) {
        
        var user = data.info[0]
        document.getElementById('name').innerHTML = user.name
        document.getElementById('email').innerHTML = user.email
    })
}

SoundLib.getCollection = function() {
    Rest.get('/api/collection', function(data) {
        var result = '<ol>'
        data = data.collection

        for(var i = 0; i < data.length; i++) {
            var duration = data[i].duration

            var minutes = Math.floor(duration / 60)
            var seconds = duration - (minutes * 60)
            duration = minutes + ':' + ('00' + seconds).toString().slice(-2)

            result += '<li><a href="javascript:SoundLib.addTrackToPlaylist(' + data[i].id + ')" ><img src="/css/images/add.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
        }
        result += '</ol>'
        
        var div = document.getElementById('collection')
        if(div !== undefined) {
            div.innerHTML = result
        }
    })
    
}

SoundLib.getUserFavorites = function() {
    Rest.get('/api/playlist/' + currentUser, function(data) {
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
            
                result += '<li><a href="javascript:SoundLib.removeTrackFromPlaylist(' + data[i].id + ')" ><img src="/css/images/delete.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
            }
            result += '</ol>'
        }
        
        var div = document.getElementById('playlist')
        if(div !== undefined) {
            div.innerHTML = result
        }
    })
    
}

SoundLib.addTrackToPlaylist = function(trackId) {
    Rest.put('/api/playlist/' + currentPlaylist, {'track' : trackId}, function(data) {
        if(data.inserted == 1) {
            SoundLib.getUserFavorites()
        }
    })
}

SoundLib.removeTrackFromPlaylist = function(trackId) {
    Rest.delete('/api/playlist/' + trackId, function(data) {
        if(data.deleted == 1) {
            SoundLib.getUserFavorites()
        }
    })
}

var Rest = (function() {
    var F = function() {

    }

    F.prototype.head = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('HEAD', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                }
                else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }

    F.prototype.get = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText)
                    callback.call(this, data)
                }
                else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }

    F.prototype.post = function(url, data, callback) {

        var xhr = new XMLHttpRequest()

        var params = '';
        for(var key in data) {
            if (data.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + data[key])
            }
        }
        params = params.substring(1);

        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    callback.call(this, xhr.responseText)
                }
                else if (xhr.status !== 200) {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send(params);
    }

    F.prototype.patch = function(url, data, callback) {

        var xhr = new XMLHttpRequest()

        var params = '';
        for(var key in data) {
            if (data.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + data[key])
            }
        }
        params = params.substring(1);

        xhr.open('PATCH', url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    callback.call(this, xhr.responseText)
                } else if (xhr.status !== 200) {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send(params);
    }

    F.prototype.put = function(url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    callback.call(this, JSON.parse(xhr.responseText))
                } else if (xhr.status !== 200) {
                    callback.call(this, xhr.status)
                }
            }
        };
        xhr.send(JSON.stringify(data));    
    }

    F.prototype.delete = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('DELETE', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    callback.call(this, JSON.parse(xhr.responseText))
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }
    
    return new F()
})()
