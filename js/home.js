/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Home = function() {}

Home.getUserFavorites = function(userId) {
    SoundLib.get('/api/playlist/userFavorites/' + userId, function(data) {
        if(typeof data === 'object') {
            alert(JSON.stringify(data))
        } else {
            alert(data)
        }
    })
    
}