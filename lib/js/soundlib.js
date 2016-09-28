/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SoundLib = function(instanceName) {
    this.instanceName = instanceName
    this.currentUser = 0
    this.currentPlaylist = 1
    this.instance = null
}

SoundLib.DOM = function () {}

SoundLib.DOM.ready = function(f){/in/.test(document.readyState)?setTimeout('SoundLib.DOM.ready('+f+')',9):f()}

SoundLib.prototype.getName = function() { 
   var funcNameRegex = /function (.{1,})\(/;
   var results = (funcNameRegex).exec((this).constructor.toString());
   return (results && results.length > 1) ? results[1] : "";
}

SoundLib.prototype.getInstance = function() {
    if(this.instance === null) {
        this.instance = (this).constructor.toString()
    }
    
    return this.instance
}

/**
 * Performs a get request on User object and retrieves its properties giving its Id
 * 
 * @returns JSON stream
 */
SoundLib.prototype.getUserInfo = function(userId) {
    this.currentUser = userId
    Rest.get('/api/user/' + this.currentUser, function(data) {
        var user = data.info[0]
        document.getElementById('name').innerHTML = user.name
        document.getElementById('email').innerHTML = user.email
    })
}

/**
 * Performs a get request on collection object and retrieves all the tracks
 * 
 * @returns JSON stream
 */
SoundLib.prototype.getCollection = function() {
    var the = this
    Rest.get('/api/collection', function(data) {
        var result = '<ol>'
        data = data.collection

        for(var i = 0; i < data.length; i++) {
            var duration = data[i].duration

            var minutes = Math.floor(duration / 60)
            var seconds = duration - (minutes * 60)
            duration = minutes + ':' + ('00' + seconds).toString().slice(-2)

            result += '<li><a href="javascript:' + the.instanceName + '.addTrackToPlaylist(' + data[i].id + ')" ><img src="/css/images/add.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
        }
        result += '</ol>'
        
        var div = document.getElementById('collection')
        if(div !== undefined) {
            div.innerHTML = result
        }
    })
    
}

/**
 * Performs a get request on user's playlist and retrieves all its tracks giving the userId
 * 
 * @returns JSON stream
 */
SoundLib.prototype.getUserFavorites = function() {
    var the = this
    Rest.get('/api/playlist/' + this.currentUser, function(data) {
        var result = '<ol>'
        this.currentPlaylist = data.pid
        data = data.playlist
        if(data[0].artist === null && data[0].title === null) {
            result = 'La playlist est vide'
        } else {
            for(var i = 0; i < data.length; i++) {
                var duration = data[i].duration
                
                var minutes = Math.floor(duration / 60)
                var seconds = duration - (minutes * 60)
                duration = minutes + ':' + ('00' + seconds).toString().slice(-2)
            
                result += '<li><a href="javascript:' + the.instanceName + '.removeTrackFromPlaylist(' + data[i].id + ')" ><img src="/css/images/delete.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
            }
            result += '</ol>'
        }
        
        var div = document.getElementById('playlist')
        if(div !== undefined) {
            div.innerHTML = result
        }
    })
    
}

/**
 * Performs a put request on user's playlist to add title chosen in the collection by its Id collection
 * 
 * @returns JSON stream
 */
SoundLib.prototype.addTrackToPlaylist = function(trackId) {
    var the = this
    Rest.put('/api/playlist/' + this.currentPlaylist, {'track' : trackId}, function(data) {
        if(data.inserted == 1) {
            the.getUserFavorites()
        }
    })
}

/**
 * Performs a delete request on user's playlist to remove a title giving its Id in playlist
 * 
 * @returns JSON stream
 */
SoundLib.prototype.removeTrackFromPlaylist = function(trackId) {
    var the = this
    Rest.delete('/api/playlist/' + trackId, function(data) {
        if(data.deleted == 1) {
            the.getUserFavorites()
        }
    })
}


var Rest = (function() {
    var F = function() {

    }

    /**
     * Performs a HEAD request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream
     */
    F.prototype.head = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('HEAD', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }

    /**
     * Performs a GET request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream
     */
     F.prototype.get = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }

    /**
     * Performs a POST request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
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
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send(params);
    }

    /**
     * Performs a PATCH request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
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
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send(params);
    }

    /**
     * Performs a PUT request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
    F.prototype.put = function(url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        };
        xhr.send(JSON.stringify(data));    
    }

    /**
     * Performs a DELETE request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
    F.prototype.delete = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('DELETE', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }
    
    return new F()
})()

