/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 * @param {type} target
 * @param {type} data
 * @returns {result|String}
 */
SoundLib.UI.prototype.olList = function(target, data) {
    result = '<ol>'
    for(var li = 0; li < data.length; li++) {
        result += '<li><img src"/css/images/add.png" />' + data[li].artist + ' - ' + data[li].title + '</li>'
    }
    result += '</ol>'
    

    var div = document.getElementById(target)
    if(div !== undefined) {
        div.innerHTML = result;
    }
    
}
