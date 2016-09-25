<?php
namespace SoundLib\Controllers;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of home
 *
 * @author David
 */
class Home extends \SoundLib\Lib\Controller
{
    //put your code here

    protected $banner = "SoundLib";
    protected $collection = "";
    protected $userid = 0;
    
    public function load()
    {
        
        $allTracks = \SoundLib\Models\Collection::getAllTracks();
        $result = '<ol>';
        $data = $allTracks->collection;
        $c = count($data);
        for($i = 0; $i < $c; $i++) {
            $result .= '<li><a href="javascript:Home.addTrackToPlaylist(' . $data[$i]->id . ')" ><img src="/css/images/add.png" /></a>&nbsp;' . $data[$i]->artist . ' - ' . $data[$i]->title . '</li>';
        }
        $result .= '</ol>';
        
        $this->collection = $result;
            
        $this->userid = 1;
    }
}
