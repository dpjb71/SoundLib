<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Controllers;

/**
 * Description of info
 *
 * @author David
 */
class Info extends \SoundLib\Lib\Controller
{
    //put your code here
    protected $info = '';
    
    public function load()
    {
        ob_start();
        phpinfo(INFO_VARIABLES);
        $this->info = ob_get_contents();
        ob_end_clean();
        
    }
}
