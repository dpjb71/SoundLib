<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of controller
 *
 * @author David
 */
abstract class RestController
{
    use HttpTransport;
    //put your code here

    public function __construct(RestApplication $app)
    {
        $this->request = $app->getRequest();
        $this->response = $app->getResponse();
    }

    public function head() {}
    public function get() {}
    public function post() {}
    public function put() {}
    public function patch() {}
    public function delete() {}

  
}
