<?php
namespace SoundLib\Lib;

include 'core.php';

use SoundLib\Lib\RestRouter;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of application
 *
 * @author David
 */
class RestApplication
{
    //put your code here
    use HttpTransport;
    
    public static function create()
    {
        (new RestApplication())->run();
    }

    public function run()
    {
        $this->request = new Request();
        $this->response = new Response();
        
        $router = new RestRouter($this);
        if($router->translate()) {
            $router->dispatch();
        } else {
            $this->response->returnCode(404);
            $this->response->sendJsonData(['Error' => "404 : You're searching in the wrong place"]);
            
        }
        
    }
}
