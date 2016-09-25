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
        if($this->request->getMethod() == 'GET') {
            $favorites = \SoundLib\Models\Playlist::getUserFavorites($userId);
            $this->response->setData($favorites);
        } else {
            $this->response->returnCode(405);
        }
    }
 
    public function addTrack($playlist, $trackId)
    {
        if($this->request->getMethod() == 'PUT') {
            $return = \SoundLib\Models\Playlist::addTrack($playlist, $trackId);
            $this->response->setData($return);
        } else {
            $this->response->returnCode(405);
        }
    }
    
    public function removeTrack($trackId)
    {
        if($this->request->getMethod() == 'DELETE') {
            $return = \SoundLib\Models\Playlist::removeTrack($trackId);
            $this->response->setData($return);
        } else {
            $this->response->returnCode(405);
        }
    }
}
