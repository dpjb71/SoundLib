/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var SoundLib = function() {
    
}

SoundLib.ready = function(f){/in/.test(document.readyState)?setTimeout('SoundLib.ready('+f+')',9):f()}

SoundLib.Rest = function() {
    
}

SoundLib.Rest.prototype.head = function(url, callback) {
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

SoundLib.Rest.prototype.get = function(url, callback) {
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

SoundLib.Rest.prototype.post = function(url, data, callback) {
    
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

SoundLib.Rest.prototype.patch = function(url, data, callback) {
    
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

SoundLib.Rest.prototype.put = function(url, data, callback) {
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

SoundLib.Rest.prototype.delete = function(url, callback) {
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
