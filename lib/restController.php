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
    private $className = '';

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

    public function render()
    {
        $qstring = str_replace('/api/', '', $this->request->getRequestUri());
        $qParts = explode('/', $qstring);
        
        $this->apiName = $qParts[0];
        $this->className = ucfirst($this->apiName);
        $method = $this->request->getMethod();
        $parameter = isset($qParts[1]) ? $qParts[1] : null;
        $data = [];
        
        $request_body = file_get_contents('php://input');
        if(!empty($request_body)) {
            $data = json_decode($request_body, true);
        }
        
        $params = [];
        if(count($data) > 0) {
            $params = array_values($data);
            if($parameter !== null) {
                array_unshift($params, $parameter);
            }
        } else {
            if($parameter !== null) {
                $params = [$parameter];
            }
        }
            
        $ref = new \ReflectionMethod($this, $method);
        if(count($params) > 0) {
            $ref->invokeArgs($this, $params);
        } else {
            $ref->invoke($this);
        }
        
        $this->response->sendJsonData();
    }


    
}
