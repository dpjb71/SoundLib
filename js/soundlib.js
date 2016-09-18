/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var SoundLib = function () {}

SoundLib.get = function(url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = function() {
        if(typeof callback === 'function') {
            if (xhr.status === 200) {
                callback.call(xhr.responseText)
            }
            else {
                callback.call(xhr.status)
            }
        }
    }
    xhr.send()
}

SoundLib.post = function(url, data, callback) {
    
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
                callback.call(xhr.responseText)
            }
            else if (xhr.status !== 200) {
                callback.call(xhr.status)
            }
        }
    }
    xhr.send(params);
}

SoundLib.patch = function(url, data, callback) {
    
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
                callback.call(xhr.responseText)
            }
            else if (xhr.status !== 200) {
                callback.call(xhr.status)
            }
        }
    }
    xhr.send(params);
}

SoundLib.put = function(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if(typeof callback === 'function') {
            if (xhr.status === 200) {
                callback.call(JSON.parse(xhr.responseText))
            }
            else if (xhr.status !== 200) {
                callback.call(xhr.status)
            }
        }
    };
    xhr.send(JSON.stringify(data));    
}

SoundLib.delete = function(url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('DELETE', url)
    xhr.onload = function() {
        if(typeof callback === 'function') {
            if (xhr.status === 204) {
                callback.call(0)
            }
            else {
                callback.call(xhr.status)
            }
        }
    }
    xhr.send()
}