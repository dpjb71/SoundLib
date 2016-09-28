/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var currentUser = 1
var sl = new SoundLib('sl')

SoundLib.DOM.ready(function() {
    sl.getUserInfo(this.currentUser)
    sl.getCollection()
    sl.getUserFavorites()
})