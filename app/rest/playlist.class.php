<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Rest;

/**
 * Description of playlist
 *
 * @author David
 */
class Playlist extends \SoundLib\Lib\RestController
{
    //put your code here
    public function userFavorites($userId)
    {
        $data = \SoundLib\Models\Playlist::getUserFavorites($userId);
        $this->response->sendJsonData($data);
    }
        
}
