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

    protected $text = "SoundLib in action!";
    protected $collection = "";
    
    public function load()
    {
        $collection = \SoundLib\Models\Collection::getAllTracks();
        $result = '<ol>';
        $data = $collection['collection'];
        $c = count($data);
        for($li = 0; $li < $c; $li++) {
            $result .= '<li>' . $data[$li]->artist . ' - ' . $data[$li]->title . '</li>';
        }
        $result .= '</ol>';
        
        $this->collection = $result;
            
        
    }
}
