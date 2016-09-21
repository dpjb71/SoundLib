<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Models;

/**
 * Description of Playlist
 *
 * @author David
 */
class Playlist
{
    //put your code here
    public static function getUserFavorites($userId)
    {
        return ['playlist' => [['artist' => 'Iron Maiden', 'title' => 'The Book of Souls']]];
    }
}
