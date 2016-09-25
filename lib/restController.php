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
    private $data = [];
    private $application = null;
    private $className = '';
    private $action = '';
    private $parameter = '';

    public function __construct(RestApplication $app)
    {

        $this->request = $app->getRequest();
        $this->response = $app->getResponse();

        
        
//        Log::debug($this->className . '::' . $this->method . '(' . $this->parameter . ')');
        
    }

    public function load() {}

    public function render()
    {
        $this->load();
        
        $qstring = str_replace('/api/', '', $this->request->getRequestUri());
        $qParts = explode('/', $qstring);
        
        $this->apiName = $qParts[0];
        $this->className = ucfirst($this->apiName);
        $action = isset($qParts[1]) ? $qParts[1] : '';
        $parameter = isset($qParts[2]) ? $qParts[2] : null;
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
        
        if(method_exists($this, $action)) {
            
            $ref = new \ReflectionMethod($this, $action);
            if(count($params) > 0) {
                $ref->invokeArgs($this, $params);
            } else {
                $ref->invoke($this);
            }
            
//            if(isset($parameter)) {
//                $this->$action($parameter);
//            } else {
//                $this->$action();
//            }
        }
        
        
        $this->response->sendJsonData();
    }


    
}
