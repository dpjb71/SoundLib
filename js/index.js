/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var currentUser = 1

SoundLib.ready(function() {
    SoundLib.getUserInfo(currentUser)
    SoundLib.getCollection()
    SoundLib.getUserFavorites()
})