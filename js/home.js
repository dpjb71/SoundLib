/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var rest = new SoundLib.Rest()
var ui = new SoundLib.UI()

var Home = function() {}

Home.getUserFavorites = function(userId) {
    rest.get('/api/playlist/userFavorites/' + userId, function(data) {
        ui.olList('playlist', data.playlist)
    })
    
}